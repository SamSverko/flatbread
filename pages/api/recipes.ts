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

    // Query recipes based on parameters
    if (slug) { // `slug` parameter takes precedence over all other filters
        const recipe = await prisma.recipe.findUnique({
            where: {
                slug: slug.toString().toLowerCase(),
            },
            select: getRecipeFormat((condensed === 'true')),
        });

        return res.status(200).json(recipe);
    } else {
        const recipes = await prisma.recipe.findMany({
            where: {
                title: {
                    search: (title) ? title.toString().toLowerCase().split(' ').join(' & ') : undefined,
                },
            },
            select: getRecipeFormat((condensed === 'true')),
            orderBy: {
                [orderByField as string]: orderBy,
            },
        });

        return res.status(200).json(recipes);
    }
}
