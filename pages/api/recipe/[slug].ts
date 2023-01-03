import { PrismaClient } from '@prisma/client';

import { getRecipeFormat } from '../../../prisma/utils';

import type { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();

    const { allData, slug } = req.query;

    const recipe = await prisma.recipe.findUnique({
        where: {
            slug: slug.toString(),
        },
        select: getRecipeFormat(allData?.toString() === 'true'),
    });

    res.status(200).json(recipe);
}
