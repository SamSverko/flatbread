import { PrismaClient } from '@prisma/client';

import type { NextApiResponse, NextApiRequest } from 'next';

import {
    getRecipeCategoryFormat,
    validateQueryParamCondensed,
    validateQueryParamOrderByField,
    validateQueryParamShowOnly,
} from '../../prisma/utils';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        condensed,
        orderBy,
        orderByField,
        showOnly,
    } = req.query;

    // Query parameter validations
    if (condensed) {
        const validateCondensed = validateQueryParamCondensed(condensed);
        if (validateCondensed.code !== 200) {
            return res.status(validateCondensed.code).json(validateCondensed.message);
        }
    }

    if (orderBy || orderByField) {
        const validateOrderByField = validateQueryParamOrderByField(orderBy, orderByField, ['id', 'createdAt', 'name']);
        if (validateOrderByField.code !== 200) {
            return res.status(validateOrderByField.code).json(validateOrderByField.message);
        }
    }

    if (showOnly) {
        const validateShowOnly = validateQueryParamShowOnly(showOnly);
        if (validateShowOnly.code !== 200) {
            return res.status(validateShowOnly.code).json(validateShowOnly.message);
        }
    }
    // TO DO - use the showOnly values below...

    const courseTypes = await prisma.recipeCourseType.findMany({
        select: getRecipeCategoryFormat((condensed === 'true')),
        orderBy: {
            [orderByField as string]: orderBy,
        },
    });

    const cuisines = await prisma.recipeCuisine.findMany({
        select: getRecipeCategoryFormat((condensed === 'true')),
        orderBy: {
            [orderByField as string]: orderBy,
        },
    });

    const dietaryRestrictions = await prisma.recipeDietaryRestriction.findMany({
        select: getRecipeCategoryFormat((condensed === 'true')),
        orderBy: {
            [orderByField as string]: orderBy,
        },
    });

    const dishTypes = await prisma.recipeDietaryRestriction.findMany({
        select: getRecipeCategoryFormat((condensed === 'true')),
        orderBy: {
            [orderByField as string]: orderBy,
        },
    });

    res.status(200).json({
        courseTypes: courseTypes,
        cuisines: cuisines,
        dietaryRestrictions: dietaryRestrictions,
        dishTypes: dishTypes,
    });
}
