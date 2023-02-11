import { Prisma, PrismaClient } from '@prisma/client';

import type { NextApiResponse, NextApiRequest } from 'next';

import {
    categoryTables,
    validateQueryParamCategory,
    validateQueryParamName,
} from '../../prisma/utils';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;
    const {
        category,
        name,
        nameUpdated,
    } = req.query;

    let categoryValidated,
        nameValidated,
        nameUpdatedValidated;

    if (method === 'PATCH') {
        // VALIDATION =========================================================
        categoryValidated = validateQueryParamCategory(res, category);
        if (categoryValidated === undefined) return;

        nameValidated = validateQueryParamName(res, 'name', name);
        if (nameValidated === undefined) return;

        nameUpdatedValidated = validateQueryParamName(res, 'nameUpdated', nameUpdated);
        if (nameUpdatedValidated === undefined) return;

        // QUERY ==============================================================
        try {
            let category;

            if (categoryValidated === categoryTables[0]) {
                category = await prisma.courseType.update({
                    where: {
                        name: nameValidated,
                    },
                    data: {
                        name: nameUpdatedValidated,
                    },
                });
            } else if (categoryValidated === categoryTables[1]) {
                category = await prisma.cuisine.update({
                    where: {
                        name: nameValidated,
                    },
                    data: {
                        name: nameUpdatedValidated,
                    },
                });
            } else if (categoryValidated === categoryTables[2]) {
                category = await prisma.dietaryRestriction.update({
                    where: {
                        name: nameValidated,
                    },
                    data: {
                        name: nameUpdatedValidated,
                    },
                });
            } else if (categoryValidated === categoryTables[3]) {
                category = await prisma.dishType.update({
                    where: {
                        name: nameValidated,
                    },
                    data: {
                        name: nameUpdatedValidated,
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

        nameValidated = validateQueryParamName(res, 'name', name);
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
    } else {
        const permittedMethods = ['PATCH', 'POST'];
        res.setHeader('Allow', permittedMethods);
        res.status(405).end(`Method \`${method}\` not allowed. Allowed methods: \`${permittedMethods.join('`, `')}\`.`);
    }
}
