import { PrismaClient } from '@prisma/client';

import type { NextApiResponse, NextApiRequest } from 'next';

import {
    getRecipeFormat,
    validateQueryParamCondensed,
    validateQueryParamOrderByField,
    validateQueryParamSlug,
    validateQueryParamTitle,
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

    let condensedValidated, orderByValidated, orderByFieldValidated, slugValidated, titleValidated;

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

    if (slug) {
        const validatedSlugField = validateQueryParamSlug(slug);
        if (validatedSlugField.code !== 200) {
            return res.status(validatedSlugField.code).json(validatedSlugField.message);
        }
        slugValidated = validatedSlugField.paramValue as string;
    }

    if (title) {
        const validatedTitleField = validateQueryParamTitle(title);
        if (validatedTitleField.code !== 200) {
            return res.status(validatedTitleField.code).json(validatedTitleField.message);
        }
        titleValidated = validatedTitleField.paramValue as string;
    }

    // Query recipes based on parameters
    if (slugValidated) { // `slug` parameter takes precedence over all other filters
        const recipe = await prisma.recipe.findUnique({
            where: {
                slug: slugValidated,
            },
            select: getRecipeFormat((condensedValidated === 'true')),
        });

        return res.status(200).json(recipe);
    } else {
        const recipes = await prisma.recipe.findMany({
            where: {
                title: {
                    search: (titleValidated) ? titleValidated : undefined,
                },
            },
            select: getRecipeFormat((condensedValidated === 'true')),
            orderBy: {
                [orderByFieldValidated as string]: orderByValidated,
            },
        });

        return res.status(200).json(recipes);
    }
}
