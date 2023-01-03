import { PrismaClient, RecipeCourseType } from '@prisma/client';

import { getRecipeCategoryFormat } from '../../../prisma/utils';

import type { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();

    const { allData, category } = req.query;
    const categoryString = category?.toString().toLowerCase();

    let categoryTable: 'recipeCourseType' | 'recipeCuisine' | 'recipeDietaryRestriction' | 'recipeDishType' | '' = '';
    let recipeCategories: RecipeCourseType[] = [];

    if (categoryString === 'coursetypes') {
        categoryTable = 'recipeCourseType';
    } else if (categoryString === 'cuisines') {
        categoryTable = 'recipeCuisine';
    } else if (categoryString === 'dietaryrestrictions') {
        categoryTable = 'recipeDietaryRestriction';
    } else if (categoryString === 'dishtypes') {
        categoryTable = 'recipeDishType';
    }

    if (categoryTable && categoryTable.length > 0) {
        recipeCategories = await prisma[categoryTable].findMany(getRecipeCategoryFormat(allData?.toString() === 'true'));
    }

    res.status(200).json(recipeCategories);
}
