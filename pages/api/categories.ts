import { PrismaClient } from '@prisma/client';

import type { NextApiResponse, NextApiRequest } from 'next';

import {
    getRecipeCategoryFormat,
    validateQueryParamCondensed,
    validateQueryParamOrderByField,
    validateQueryParamShowOnly,
} from '../../prisma/utils';

type Category = {
    id: number,
    createdAt: Date,
    name: string,
}

type CategoriesResponse = {
    courseTypes?: Category[],
    cuisines?: Category[],
    dietaryRestrictions?: Category[],
    dishTypes?: Category[],
}

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        condensed,
        orderBy,
        orderByField,
        showOnly,
    } = req.query;

    let condensedValidated, orderByValidated, orderByFieldValidated, showOnlyValidated;

    // Query parameter validations
    if (condensed) {
        const validateCondensed = validateQueryParamCondensed(condensed);
        if (validateCondensed.code !== 200) {
            return res.status(validateCondensed.code).json(validateCondensed.message);
        }
        condensedValidated = validateCondensed.paramValue as string;
    }

    if (orderBy || orderByField) {
        const validateOrderByField = validateQueryParamOrderByField(orderBy, orderByField, ['createdAt', 'title', 'sourceName', 'prepTimeMin', 'cookTimeMin', 'servingAmount']);
        if (validateOrderByField.code !== 200) {
            return res.status(validateOrderByField.code).json(validateOrderByField.message);
        }
        orderByValidated = validateOrderByField.paramValue[0] as string;
        orderByFieldValidated = validateOrderByField.paramValue[1] as string;
    }

    if (showOnly) {
        const validateShowOnly = validateQueryParamShowOnly(showOnly);
        if (validateShowOnly.code !== 200) {
            return res.status(validateShowOnly.code).json(validateShowOnly.message);
        }
        showOnlyValidated = validateShowOnly.paramValue;
    }

    // Query recipes based on parameters
    const response: CategoriesResponse = {};

    if (!showOnlyValidated || showOnlyValidated.includes('coursetypes')) {
        const courseTypes = await prisma.recipeCourseType.findMany({
            select: getRecipeCategoryFormat((condensedValidated === 'true')),
            orderBy: {
                [orderByFieldValidated as string]: orderByValidated,
            },
        });

        response.courseTypes = courseTypes;
    }

    if (!showOnlyValidated || showOnlyValidated.includes('cuisines')) {
        const cuisines = await prisma.recipeCuisine.findMany({
            select: getRecipeCategoryFormat((condensedValidated === 'true')),
            orderBy: {
                [orderByFieldValidated as string]: orderByValidated,
            },
        });

        response.cuisines = cuisines;
    }

    if (!showOnlyValidated || showOnlyValidated.includes('dietaryrestrictions')) {
        const dietaryRestrictions = await prisma.recipeDietaryRestriction.findMany({
            select: getRecipeCategoryFormat((condensedValidated === 'true')),
            orderBy: {
                [orderByFieldValidated as string]: orderByValidated,
            },
        });

        response.dietaryRestrictions = dietaryRestrictions;
    }

    if (!showOnlyValidated || showOnlyValidated.includes('dishtypes')) {
        const dishTypes = await prisma.recipeDishType.findMany({
            select: getRecipeCategoryFormat((condensedValidated === 'true')),
            orderBy: {
                [orderByFieldValidated as string]: orderByValidated,
            },
        });

        response.dishTypes = dishTypes;
    }

    res.status(200).json(response);
}
