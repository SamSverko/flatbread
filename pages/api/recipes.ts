import { PrismaClient } from '@prisma/client';

import type { NextApiResponse, NextApiRequest } from 'next';

import { getRecipeFormat } from '../../prisma/utils';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        condensed,
        orderBy,
        orderByField,
        slug,
        title,
    } = req.query;

    // Query validation

    // condensed
    const condensedOptions = ['true', 'false'];
    const queryCondensed = condensed?.toString().toLowerCase();
    if (queryCondensed && !condensedOptions.includes(queryCondensed)) {
        res.status(400).json({
            code: 400,
            message: 'Invalid value for query parameter `condensed`. Fix: Use either `true`, `false`, or omit parameter entirely.',
        });
        return;
    }

    // orderBy
    // orderByField
    const orderByOptions = ['asc', 'desc'];
    const orderByFieldOptions = ['title', 'sourceName', 'prepTimeMine', 'cookTimeMin', 'servingAmount'];
    const queryOrderBy = orderBy?.toString().toLowerCase();
    const queryOrderByField = orderByField?.toString();

    if ((queryOrderBy && !queryOrderByField) || !queryOrderBy && queryOrderByField) {
        res.status(400).json({
            code: 400,
            message: 'Parameters `orderBy` and `orderByField` must be used simultaneously. Fix: Provide both parameters or omit both parameters entirely.',
        });
        return;
    }

    if (queryOrderBy && !orderByOptions.includes(queryOrderBy)) {
        res.status(400).json({
            code: 400,
            message: `Invalid value for query parameter \`orderBy\`. Fix: Use either \`${orderByOptions.join('`, `')}\`, or omit parameter entirely.`,
        });
        return;
    }

    if (queryOrderByField && !orderByFieldOptions.includes(queryOrderByField)) {
        res.status(400).json({
            code: 400,
            message: `Invalid value for query parameter \`orderByField\`. Fix: Use either \`${orderByFieldOptions.join('`, `')}\`, or omit parameter entirely (along with the \`orderBy\` parameter).`,
        });
        return;
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
            select: getRecipeFormat((queryCondensed === 'true')),
        });

        if (results) recipes.push(results);
    } else {
        recipes = await prisma.recipe.findMany({
            where: {
                title: {
                    search: (queryTitle) ? queryTitle.split(' ').join(' & ') : undefined,
                },
            },
            select: getRecipeFormat((queryCondensed === 'true')),
            orderBy: {
                [queryOrderByField]: queryOrderBy,
            },
        });
    }

    res.status(200).json(recipes);
}
