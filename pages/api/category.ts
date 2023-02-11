import { Prisma, PrismaClient } from '@prisma/client';

import type { NextApiResponse, NextApiRequest } from 'next';

import {
    categoryTables,
    validateQueryParamCategory,
    validateQueryParamId,
    validateQueryParamName,
} from '../../prisma/utils';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;
    const {
        category,
        id,
        name,
    } = req.query;

    let categoryValidated,
        idValidated,
        nameValidated;

    if (method === 'DELETE') {
        // VALIDATION =========================================================
        categoryValidated = validateQueryParamCategory(res, category);
        if (categoryValidated === undefined) return;

        idValidated = validateQueryParamId(res, id);
        if (idValidated === undefined) return;

        // QUERY ==============================================================
        try {
            let category;

            if (categoryValidated === categoryTables[0]) {
                category = await prisma.courseType.delete({
                    where: {
                        id: idValidated,
                    },
                });
            } else if (categoryValidated === categoryTables[1]) {
                category = await prisma.cuisine.delete({
                    where: {
                        id: idValidated,
                    },
                });
            } else if (categoryValidated === categoryTables[2]) {
                category = await prisma.dietaryRestriction.delete({
                    where: {
                        id: idValidated,
                    },
                });
            } else if (categoryValidated === categoryTables[3]) {
                category = await prisma.dishType.delete({
                    where: {
                        id: idValidated,
                    },
                });
            }

            return res.status(200).json(category);

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
        categoryValidated = validateQueryParamCategory(res, category);
        if (categoryValidated === undefined) return;

        nameValidated = validateQueryParamName(res, name);
        if (nameValidated === undefined) return;

        // QUERY ==============================================================
        try {
            let category;

            if (categoryValidated === categoryTables[0]) {
                category = await prisma.courseType.create({
                    data: {
                        name: nameValidated,
                    },
                });
            } else if (categoryValidated === categoryTables[1]) {
                category = await prisma.cuisine.create({
                    data: {
                        name: nameValidated,
                    },
                });
            } else if (categoryValidated === categoryTables[2]) {
                category = await prisma.dietaryRestriction.create({
                    data: {
                        name: nameValidated,
                    },
                });
            } else if (categoryValidated === categoryTables[3]) {
                category = await prisma.dishType.create({
                    data: {
                        name: nameValidated,
                    },
                });
            }

            return res.status(201).json(category);

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
        categoryValidated = validateQueryParamCategory(res, category);
        if (categoryValidated === undefined) return;

        idValidated = validateQueryParamId(res, id);
        if (idValidated === undefined) return;

        nameValidated = validateQueryParamName(res, name);
        if (nameValidated === undefined) return;

        // QUERY ==============================================================
        try {
            let category;

            if (categoryValidated === categoryTables[0]) {
                category = await prisma.courseType.update({
                    where: {
                        id: idValidated,
                    },
                    data: {
                        name: nameValidated,
                    },
                });
            } else if (categoryValidated === categoryTables[1]) {
                category = await prisma.cuisine.update({
                    where: {
                        id: idValidated,
                    },
                    data: {
                        name: nameValidated,
                    },
                });
            } else if (categoryValidated === categoryTables[2]) {
                category = await prisma.dietaryRestriction.update({
                    where: {
                        id: idValidated,
                    },
                    data: {
                        name: nameValidated,
                    },
                });
            } else if (categoryValidated === categoryTables[3]) {
                category = await prisma.dishType.update({
                    where: {
                        id: idValidated,
                    },
                    data: {
                        name: nameValidated,
                    },
                });
            }

            return res.status(200).json(category);

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
