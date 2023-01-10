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

    let queryTitle: string | undefined = undefined;
    if (title) {
        queryTitle = title.toString().toLowerCase().split(' ').join(' & ');
    }

    // Query recipes based on parameters
    let recipes: unknown[] = [];

    if (slug) { // `slug` parameter takes precedence over all other filters
        const results = await prisma.recipe.findUnique({
            where: {
                slug: slug.toString().toLowerCase(),
            },
            select: getRecipeFormat((condensed === 'true')),
        });

        if (results) recipes.push(results);
    } else {
        recipes = await prisma.recipe.findMany({
            where: {
                title: {
                    search: queryTitle,
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
