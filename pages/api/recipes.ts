import { PrismaClient } from '@prisma/client';

import type { NextApiResponse, NextApiRequest } from 'next';

import {
    getRecipeFormat,
    validateQueryParamCondensed,
    validateQueryParamOrderByField,
} from '../../prisma/utils';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        condensed,
        orderBy,
        orderByField,
        slug,
        title,
    } = req.query;

    // Query parameter validations
    if (condensed) {
        const validateCondensed = validateQueryParamCondensed(condensed);
        if (validateCondensed.code !== 200) {
            return res.status(validateCondensed.code).json(validateCondensed.message);
        }
    }

    if (orderBy || orderByField) {
        const validateOrderByField = validateQueryParamOrderByField(orderBy, orderByField, ['createdAt', 'title', 'sourceName', 'prepTimeMin', 'cookTimeMin', 'servingAmount']);
        if (validateOrderByField.code !== 200) {
            return res.status(validateOrderByField.code).json(validateOrderByField.message);
        }
    }

    const querySlug = slug?.toString().toLowerCase();
    const queryTitle = title?.toString().toLowerCase();

    // Query recipes based on parameters
    let recipes: unknown[] = [];

    if (querySlug) { // `slug` parameter takes precedence over all other filters
        const results = await prisma.recipe.findUnique({
            where: {
                slug: querySlug,
            },
            select: getRecipeFormat((condensed === 'true')),
        });

        if (results) recipes.push(results);
    } else {
        recipes = await prisma.recipe.findMany({
            where: {
                title: {
                    search: (queryTitle) ? queryTitle.split(' ').join(' & ') : undefined,
                },
            },
            select: getRecipeFormat((condensed === 'true')),
            orderBy: {
                [orderByField as string]: orderBy,
            },
        });
    }

    res.status(200).json(recipes);
}
