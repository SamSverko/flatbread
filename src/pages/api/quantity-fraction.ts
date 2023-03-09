import { getServerSession } from 'next-auth/next';
import { Prisma } from '@prisma/client';

import authOptions from './auth/[...nextauth]';
import { prisma } from '../../prisma/db';
import {
    validateQueryParamId,
    validateQueryParamName,
    validateQueryParamValue,
} from '../../prisma/utils';

import type { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;
    const {
        id,
        name,
        value,
    } = req.query;

    let idValidated,
        nameValidated,
        valueValidated;

    // ADMIN-ONLY ROUTE =======================================================
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(405).json({ error: 'You must sign in to access this API route.' });

    if (method === 'DELETE') {
        // VALIDATION =========================================================
        idValidated = validateQueryParamId(res, id);
        if (idValidated === undefined) return;

        // QUERY ==============================================================
        try {
            const quantityFraction = await prisma.quantityFraction.delete({
                where: {
                    id: idValidated,
                },
            });

            return res.status(200).json(quantityFraction);

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return res.status(400).json({
                    code: error.code,
                    message: error.message,
                });
            } else {
                throw error;
            }
        }
    } else if (method === 'POST') {
        // VALIDATION =========================================================
        nameValidated = validateQueryParamName(res, name);
        if (nameValidated === undefined) return;

        valueValidated = validateQueryParamValue(res, value);
        if (valueValidated === undefined) return;

        // QUERY ==============================================================
        try {
            const quantityFraction = await prisma.quantityFraction.create({
                data: {
                    name: nameValidated,
                    value: valueValidated,
                },
            });

            return res.status(201).json(quantityFraction);

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return res.status(400).json({
                    code: error.code,
                    message: error.message,
                });
            } else {
                throw error;
            }
        }
    } else if (method === 'PUT') {
        // VALIDATION =========================================================
        idValidated = validateQueryParamId(res, id);
        if (idValidated === undefined) return;

        if (name) {
            nameValidated = validateQueryParamName(res, name);
            if (nameValidated === undefined) return;
        }

        if (value) {
            valueValidated = validateQueryParamValue(res, value);
            if (valueValidated === undefined) return;
        }

        // QUERY ==============================================================
        try {
            const quantityFraction = await prisma.quantityFraction.update({
                where: {
                    id: idValidated,
                },
                data: {
                    name: nameValidated,
                    value: valueValidated,
                },
            });

            return res.status(201).json(quantityFraction);

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return res.status(400).json({
                    code: error.code,
                    message: error.message,
                });
            } else {
                throw error;
            }
        }
    } else {
        const permittedMethods = ['DELETE', 'POST', 'PUT'];
        res.setHeader('Allow', permittedMethods);
        return res.status(405).json({ error: `Method \`${method}\` not allowed. Allowed methods: \`${permittedMethods.join('`, `')}\`.` });
    }
}
