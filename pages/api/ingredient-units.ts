import { PrismaClient } from '@prisma/client';

import type { NextApiResponse, NextApiRequest } from 'next';

import {
    getIngredientUnitFormat,
    validateQueryParamCondensed,
    validateQueryParamOrderByField,
} from '../../prisma/utils';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        condensed,
        orderBy,
        orderByField,
    } = req.query;

    let condensedValidated,
        orderByValidated,
        orderByFieldValidated;

    // VALIDATION =============================================================
    if (condensed) {
        condensedValidated = validateQueryParamCondensed(res, condensed);
        if (condensedValidated === undefined) return;
    }

    if (orderBy || orderByField) {
        const orderByFieldValidation = validateQueryParamOrderByField(res, orderBy, orderByField, ['createdAt', 'name', 'namePlural']);
        if (orderByFieldValidation === undefined) return;

        orderByValidated = orderByFieldValidation.orderBy;
        orderByFieldValidated = orderByFieldValidation.orderByField;
    }

    // QUERY ==================================================================
    const ingredientUnits = await prisma.ingredientUnit.findMany({
        select: getIngredientUnitFormat(condensedValidated),
        orderBy: {
            [orderByFieldValidated as string]: orderByValidated,
        },
    });

    res.status(200).json(ingredientUnits);
}
