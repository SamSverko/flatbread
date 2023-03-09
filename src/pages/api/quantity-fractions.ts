import { prisma } from '../../prisma/db';
import {
    getQuantityFractionFormat,
    validateQueryParamCondensed,
    validateQueryParamOrderByField,
} from '../../prisma/utils';

import type { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;
    const {
        condensed,
        orderBy,
        orderByField,
    } = req.query;

    let condensedValidated, orderByValidated, orderByFieldValidated;

    if (method === 'GET') {
        // VALIDATION =============================================================
        if (condensed) {
            condensedValidated = validateQueryParamCondensed(res, condensed);
            if (condensedValidated === undefined) return;
        }

        if (orderBy || orderByField) {
            const orderByFieldValidation = validateQueryParamOrderByField(res, orderBy, orderByField, ['createdAt', 'name', 'value']);
            if (orderByFieldValidation === undefined) return;

            orderByValidated = orderByFieldValidation.orderBy;
            orderByFieldValidated = orderByFieldValidation.orderByField;
        }

        // QUERY ==================================================================
        const quantityFractions = await prisma.quantityFraction.findMany({
            select: getQuantityFractionFormat(condensedValidated),
            orderBy: {
                [orderByFieldValidated as string]: orderByValidated,
            },
        });

        res.status(200).json(quantityFractions);
    } else {
        const permittedMethods = ['GET'];
        res.setHeader('Allow', permittedMethods);
        return res.status(405).json({ error: `Method \`${method}\` not allowed. Allowed methods: \`${permittedMethods.join('`, `')}\`.` });
    }
}
