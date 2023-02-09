import { PrismaClient } from '@prisma/client';

import type { NextApiResponse, NextApiRequest } from 'next';

import {
    getServingUnitFormat,
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

    let condensedValidated, orderByValidated, orderByFieldValidated;

    // Query parameter validations
    if (condensed) {
        const validateCondensed = validateQueryParamCondensed(condensed);
        if (validateCondensed.code !== 200) {
            return res.status(validateCondensed.code).json(validateCondensed.message);
        }
        condensedValidated = validateCondensed.paramValue as string;
    }

    if (orderBy || orderByField) {
        const validateOrderByField = validateQueryParamOrderByField(orderBy, orderByField, ['createdAt', 'name', 'namePlural']);
        if (validateOrderByField.code !== 200) {
            return res.status(validateOrderByField.code).json(validateOrderByField.message);
        }
        orderByValidated = validateOrderByField.paramValue[0] as string;
        orderByFieldValidated = validateOrderByField.paramValue[1] as string;
    }

    // Query recipes based on parameters
    const servingUnits = await prisma.servingUnit.findMany({
        select: getServingUnitFormat((condensedValidated === 'true')),
        orderBy: {
            [orderByFieldValidated as string]: orderByValidated,
        },
    });

    res.status(200).json(servingUnits);
}
