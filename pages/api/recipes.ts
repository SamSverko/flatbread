import { prisma } from '../../prisma/db';
import {
    getRecipeFormat,
    validateQueryParamCondensed,
    validateQueryParamOrderByField,
    validateQueryParamSlug,
    validateQueryParamTitleSearch,
} from '../../prisma/utils';

import type { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        condensed,
        orderBy,
        orderByField,
        slug,
        title,
    } = req.query;

    let condensedValidated,
        orderByValidated,
        orderByFieldValidated,
        slugValidated,
        titleValidated;

    // VALIDATION =============================================================
    if (condensed) {
        condensedValidated = validateQueryParamCondensed(res, condensed);
        if (condensedValidated === undefined) return;
    }

    if (orderBy || orderByField) {
        const orderByFieldValidation = validateQueryParamOrderByField(res, orderBy, orderByField, ['createdAt', 'title', 'sourceName', 'prepTimeMin', 'cookTimeMin', 'servingAmount']);
        if (orderByFieldValidation === undefined) return;

        orderByValidated = orderByFieldValidation.orderBy;
        orderByFieldValidated = orderByFieldValidation.orderByField;
    }

    if (slug) {
        slugValidated = validateQueryParamSlug(res, slug);
        if (slugValidated === undefined) return;
    }

    if (title) {
        titleValidated = validateQueryParamTitleSearch(res, title);
        if (titleValidated === undefined) return;
    }

    // QUERY ==================================================================
    if (slugValidated) { // `slug` parameter takes precedence over all other filters
        const recipe = await prisma.recipe.findUnique({
            where: {
                slug: slugValidated,
            },
            select: getRecipeFormat(condensedValidated),
        });

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found. Fix: Try another `slug` value.' });
        }

        return res.status(200).json(recipe);
    } else {
        const recipes = await prisma.recipe.findMany({
            where: {
                title: {
                    search: (titleValidated) ? titleValidated : undefined,
                },
            },
            select: getRecipeFormat(condensedValidated),
            orderBy: {
                [orderByFieldValidated as string]: orderByValidated,
            },
        });

        return res.status(200).json(recipes);
    }
}
