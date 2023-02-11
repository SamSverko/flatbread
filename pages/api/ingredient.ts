import { Prisma, PrismaClient } from '@prisma/client';

import type { NextApiResponse, NextApiRequest } from 'next';

import {
    validateQueryParamId,
    validateQueryParamName,
    validateQueryParamNamePlural,
} from '../../prisma/utils';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;
    const {
        id,
        name,
        namePlural,
    } = req.query;

    let idValidated,
        nameValidated,
        namePluralValidated;

    if (method === 'DELETE') {
        // VALIDATION =========================================================
        idValidated = validateQueryParamId(res, id);
        if (idValidated === undefined) return;

        // QUERY ==============================================================
        try {
            const ingredient = await prisma.ingredient.delete({
                where: {
                    id: idValidated,
                },
            });

            return res.status(200).json(ingredient);

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

        namePluralValidated = validateQueryParamNamePlural(res, namePlural);
        if (namePluralValidated === undefined) return;

        // QUERY ==============================================================
        try {
            const ingredient = await prisma.ingredient.create({
                data: {
                    name: nameValidated,
                    namePlural: namePluralValidated,
                },
            });

            return res.status(201).json(ingredient);

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

        if (namePlural) {
            namePluralValidated = validateQueryParamNamePlural(res, namePlural);
            if (namePluralValidated === undefined) return;
        }

        // QUERY ==============================================================
        try {
            const ingredient = await prisma.ingredient.update({
                where: {
                    id: idValidated,
                },
                data: {
                    name: nameValidated,
                    namePlural: namePluralValidated,
                },
            });

            return res.status(201).json(ingredient);

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
        const permittedMethods = ['DELETE', 'PATCH', 'POST'];
        res.setHeader('Allow', permittedMethods);
        res.status(405).end(`Method \`${method}\` not allowed. Allowed methods: \`${permittedMethods.join('`, `')}\`.`);
    }
}
