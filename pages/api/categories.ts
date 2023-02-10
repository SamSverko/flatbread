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

    let condensedValidated,
        orderByValidated,
        orderByFieldValidated,
        showOnlyValidated;

    // VALIDATION =============================================================
    if (condensed) {
        condensedValidated = validateQueryParamCondensed(res, condensed);
        if (condensedValidated === undefined) return;
    }

    if (orderBy || orderByField) {
        const orderByFieldValidation = validateQueryParamOrderByField(res, orderBy, orderByField, ['createdAt', 'name']);
        if (orderByFieldValidation === undefined) return;

        orderByValidated = orderByFieldValidation.orderBy;
        orderByFieldValidated = orderByFieldValidation.orderByField;
    }

    if (showOnly) {
        showOnlyValidated = validateQueryParamShowOnly(res, showOnly);
        if (showOnlyValidated === undefined) return;
    }

    // QUERY ==================================================================
    const response: CategoriesResponse = {};

    if (!showOnlyValidated || showOnlyValidated.includes('coursetypes')) {
        response.courseTypes = await prisma.courseType.findMany({
            select: getCategoryFormat(condensedValidated),
            orderBy: {
                [orderByFieldValidated as string]: orderByValidated,
            },
        });
    }

    if (!showOnlyValidated || showOnlyValidated.includes('cuisines')) {
        response.cuisines = await prisma.cuisine.findMany({
            select: getCategoryFormat(condensedValidated),
            orderBy: {
                [orderByFieldValidated as string]: orderByValidated,
            },
        });
    }

    if (!showOnlyValidated || showOnlyValidated.includes('dietaryrestrictions')) {
        response.dietaryRestrictions = await prisma.dietaryRestriction.findMany({
            select: getCategoryFormat(condensedValidated),
            orderBy: {
                [orderByFieldValidated as string]: orderByValidated,
            },
        });
    }

    if (!showOnlyValidated || showOnlyValidated.includes('dishtypes')) {
        response.dishTypes = await prisma.dishType.findMany({
            select: getCategoryFormat(condensedValidated),
            orderBy: {
                [orderByFieldValidated as string]: orderByValidated,
            },
        });
    }

    res.status(200).json(response);
}
