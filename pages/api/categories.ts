import { Prisma, PrismaClient, Recipe } from '@prisma/client';

import type { NextApiResponse, NextApiRequest } from 'next';

import {
    getCategoryFormat,
    validateQueryParamCondensed,
    validateQueryParamOrderByField,
    validateQueryParamShowOnly,
} from '../../prisma/utils';

type Category = {
    id?: number | undefined,
    createdAt?: Date | undefined,
    name?: string | undefined,
    recipes?: Recipe[] | undefined,
    _count?: Prisma.CourseTypeCountOutputType | undefined,
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
        const validateOrderByField = validateQueryParamOrderByField(orderBy, orderByField, ['createdAt', 'name']);
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
        response.courseTypes = await prisma.courseType.findMany({
            select: getCategoryFormat((condensedValidated === 'true')),
            orderBy: {
                [orderByFieldValidated as string]: orderByValidated,
            },
        });
    }

    if (!showOnlyValidated || showOnlyValidated.includes('cuisines')) {
        response.cuisines = await prisma.cuisine.findMany({
            select: getCategoryFormat((condensedValidated === 'true')),
            orderBy: {
                [orderByFieldValidated as string]: orderByValidated,
            },
        });
    }

    if (!showOnlyValidated || showOnlyValidated.includes('dietaryrestrictions')) {
        response.dietaryRestrictions = await prisma.dietaryRestriction.findMany({
            select: getCategoryFormat((condensedValidated === 'true')),
            orderBy: {
                [orderByFieldValidated as string]: orderByValidated,
            },
        });
    }

    if (!showOnlyValidated || showOnlyValidated.includes('dishtypes')) {
        response.dishTypes = await prisma.dishType.findMany({
            select: getCategoryFormat((condensedValidated === 'true')),
            orderBy: {
                [orderByFieldValidated as string]: orderByValidated,
            },
        });
    }

    res.status(200).json(response);
}
