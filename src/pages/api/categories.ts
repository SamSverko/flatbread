import { prisma } from '../../prisma/db';
import {
    getCategoryFormat,
    validateQueryParamCondensed,
    validateQueryParamOrderByField,
    validateQueryParamShowOnly,
} from '../../prisma/utils';

import type { Prisma } from '@prisma/client';
import type { NextApiResponse, NextApiRequest } from 'next';

type CourseTypeResponse = Prisma.CourseTypeGetPayload<{ select: { [K in keyof Prisma.CourseTypeSelect]: true } }>;
type CuisineResponse = Prisma.CourseTypeGetPayload<{ select: { [K in keyof Prisma.CourseTypeSelect]: true } }>;
type DietaryRestrictionResponse = Prisma.CourseTypeGetPayload<{ select: { [K in keyof Prisma.CourseTypeSelect]: true } }>;
type DishTypesResponse = Prisma.CourseTypeGetPayload<{ select: { [K in keyof Prisma.CourseTypeSelect]: true } }>;

type CategoriesResponse = {
    courseTypes?: CourseTypeResponse[];
    cuisines?: CuisineResponse[];
    dietaryRestrictions?: DietaryRestrictionResponse[];
    dishTypes?: DishTypesResponse[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;
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

    if (method === 'GET') {
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
    } else {
        const permittedMethods = ['GET'];
        res.setHeader('Allow', permittedMethods);
        return res.status(405).json({ error: `Method \`${method}\` not allowed. Allowed methods: \`${permittedMethods.join('`, `')}\`.` });
    }
}
