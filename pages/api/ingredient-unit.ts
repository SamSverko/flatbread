import { Prisma, PrismaClient } from '@prisma/client';

import {
    validateQueryParamId,
    validateQueryParamName,
    validateQueryParamNameAbbr,
    validateQueryParamNamePlural,
} from '../../prisma/utils';

import type { NextApiResponse, NextApiRequest } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;
    const {
        id,
        name,
        nameAbbr,
        namePlural,
    } = req.query;

    let idValidated,
        nameValidated,
        nameAbbrValidated,
        namePluralValidated;

    if (method === 'DELETE') {
        // VALIDATION =========================================================
        idValidated = validateQueryParamId(res, id);
        if (idValidated === undefined) return;

        // QUERY ==============================================================
        try {
            const ingredientUnit = await prisma.ingredientUnit.delete({
                where: {
                    id: idValidated,
                },
            });

            return res.status(200).json(ingredientUnit);

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

        nameAbbrValidated = validateQueryParamNameAbbr(res, nameAbbr);
        if (nameAbbrValidated === undefined) return;

        namePluralValidated = validateQueryParamNamePlural(res, namePlural);
        if (namePluralValidated === undefined) return;

        // QUERY ==============================================================
        try {
            const ingredientUnit = await prisma.ingredientUnit.create({
                data: {
                    name: nameValidated,
                    nameAbbr: nameAbbrValidated,
                    namePlural: namePluralValidated,
                },
            });

            return res.status(201).json(ingredientUnit);

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

        if (nameAbbr) {
            nameAbbrValidated = validateQueryParamNamePlural(res, nameAbbr);
            if (nameAbbrValidated === undefined) return;
        }

        if (namePlural) {
            namePluralValidated = validateQueryParamNamePlural(res, namePlural);
            if (namePluralValidated === undefined) return;
        }

        // QUERY ==============================================================
        try {
            const ingredientUnit = await prisma.ingredientUnit.update({
                where: {
                    id: idValidated,
                },
                data: {
                    name: nameValidated,
                    nameAbbr: nameAbbrValidated,
                    namePlural: namePluralValidated,
                },
            });

            return res.status(201).json(ingredientUnit);

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
        res.status(405).end(`Method \`${method}\` not allowed. Allowed methods: \`${permittedMethods.join('`, `')}\`.`);
    }
}
