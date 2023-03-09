import { prisma } from '../../prisma/db';
import {
    getRecipeFormat,
    validateQueryParamCategoryFilter,
    validateQueryParamCondensed,
    validateQueryParamOrderByField,
    validateQueryParamRandom,
    validateQueryParamSlug,
    validateQueryParamTitleSearch,
} from '../../prisma/utils';

import type { NextApiResponse, NextApiRequest } from 'next';

interface ANDORQueries {
    [title: string]: {
        search: string | undefined
    } |
    {
        some: {
            name: {
                contains: string
                mode: string
            }
        }
    };
}[];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;
    const {
        condensed,
        courseTypes,
        cuisines,
        dietaryRestrictions,
        dishTypes,
        orderBy,
        orderByField,
        random,
        slug,
        title,
    } = req.query;

    let condensedValidated,
        courseTypesValidated,
        cuisinesValidated,
        dietaryRestrictionsValidated,
        dishTypesValidated,
        orderByValidated,
        orderByFieldValidated,
        randomValidated,
        slugValidated,
        titleValidated;

    if (method === 'GET') {
        // VALIDATION =============================================================
        if (condensed) {
            condensedValidated = validateQueryParamCondensed(res, condensed);
            if (condensedValidated === undefined) return;
        }

        if (courseTypes) {
            courseTypesValidated = validateQueryParamCategoryFilter(res, 'courseTypes', courseTypes);
            if (courseTypesValidated === undefined) return;
        }

        if (cuisines) {
            cuisinesValidated = validateQueryParamCategoryFilter(res, 'cuisines', cuisines);
            if (cuisinesValidated === undefined) return;
        }

        if (dietaryRestrictions) {
            dietaryRestrictionsValidated = validateQueryParamCategoryFilter(res, 'dietaryRestrictions', dietaryRestrictions);
            if (dietaryRestrictionsValidated === undefined) return;
        }

        if (dishTypes) {
            dishTypesValidated = validateQueryParamCategoryFilter(res, 'dishTypes', dishTypes);
            if (dishTypesValidated === undefined) return;
        }

        if (orderBy || orderByField) {
            const orderByFieldValidation = validateQueryParamOrderByField(res, orderBy, orderByField, ['createdAt', 'title', 'sourceName', 'prepTimeMin', 'cookTimeMin', 'servingAmount']);
            if (orderByFieldValidation === undefined) return;

            orderByValidated = orderByFieldValidation.orderBy;
            orderByFieldValidated = orderByFieldValidation.orderByField;
        }

        if (random) {
            randomValidated = validateQueryParamRandom(res, random);
            if (randomValidated === undefined) return;
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
            // Leaving OR here in case this needs changing (hint: it probably will)
            // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#and
            let ANDQueries: ANDORQueries[] = [];
            const ORQueries: ANDORQueries[] = [];

            if (titleValidated) {
                ANDQueries = [...ANDQueries, {
                    title: {
                        search: (titleValidated) ? titleValidated : undefined,
                    },
                }];
            }

            if (courseTypesValidated) {
                ANDQueries = [...ANDQueries, ...courseTypesValidated];
            }

            if (cuisinesValidated) {
                ANDQueries = [...ANDQueries, ...cuisinesValidated];
            }

            if (dietaryRestrictionsValidated) {
                ANDQueries = [...ANDQueries, ...dietaryRestrictionsValidated];
            }

            if (dishTypesValidated) {
                ANDQueries = [...ANDQueries, ...dishTypesValidated];
            }

            const recipes = await prisma.recipe.findMany({
                where: {
                    AND: (ANDQueries.length > 0) ? ANDQueries : undefined,
                    OR: (ORQueries.length > 0) ? ORQueries : undefined,
                },
                select: getRecipeFormat(condensedValidated),
                orderBy: {
                    [orderByFieldValidated as string]: orderByValidated,
                },
            });

            if (randomValidated) {
                if (recipes.length > 0) {
                    const randomNumber = Math.floor(Math.random() * recipes.length);
                    return res.status(200).json([recipes[randomNumber]]);
                } else {
                    return res.status(200).json([]);
                }
            }

            return res.status(200).json(recipes);
        }
    } else {
        const permittedMethods = ['GET'];
        res.setHeader('Allow', permittedMethods);
        return res.status(405).json({ error: `Method \`${method}\` not allowed. Allowed methods: \`${permittedMethods.join('`, `')}\`.` });
    }
}
