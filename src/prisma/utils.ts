import { Prisma } from '@prisma/client';

import type { NextApiResponse } from 'next';
import type { Category } from '../types';

// Static data
export const categoryTables: Category[] = [
    'courseType',
    'cuisine',
    'dietaryRestriction',
    'dishType',
];

// there are 10,080 minutes in one week - figuring a recipe won't take longer than that?
export const cookTimeMinsMaxValue = 10080;
export const idMaxValue = 999999999;
export const nameMaxCharLength = 128;
export const prepTimeMinsMaxValue = 10080;
export const recipeIdMaxCharLength = 128;
export const servingAmountMaxValue = 9999;
export const slugMaxCharLength = 128;
export const sourceNameMaxCharLength = 128;
export const sourceURLMaxCharLength = 256;
export const titleMaxCharLength = 128;
export const valueMaxValue = 9999;

// Format API data
export function getCategoryFormat(condensed = false): Prisma.CourseTypeSelect {
    return {
        id: (condensed) ? false : true,
        createdAt: (condensed) ? false : true,
        name: true,
    };
}

export function getIngredientFormat(condensed = false): Prisma.IngredientSelect {
    return {
        id: (condensed) ? false : true,
        createdAt: (condensed) ? false : true,
        name: true,
        namePlural: true,
    };
}

export function getIngredientUnitFormat(condensed = false): Prisma.IngredientUnitSelect {
    return {
        id: (condensed) ? false : true,
        createdAt: (condensed) ? false : true,
        name: true,
        nameAbbr: true,
        namePlural: true,
    };
}

export function getQuantityFractionFormat(condensed = false): Prisma.QuantityFractionSelect {
    return {
        id: (condensed) ? false : true,
        createdAt: (condensed) ? false : true,
        name: true,
        value: true,
    };
}

export function getRecipeStepOrNoteFormat(condensed = false): Prisma.RecipeStepSelect {
    return {
        id: (condensed) ? false : true,
        createdAt: (condensed) ? false : true,
        order: true,
        section: true,
        details: true,
    };
}

export function getRecipeFormat(condensed = false): Prisma.RecipeSelect {
    return {
        id: true,
        createdAt: (condensed) ? false : true,
        title: true,
        slug: true,
        sourceName: true,
        sourceURL: true,
        prepTimeMins: true,
        cookTimeMins: true,
        servingAmount: true,
        servingUnit: {
            select: {
                id: (condensed) ? false : true,
                createdAt: (condensed) ? false : true,
                name: true,
                namePlural: true,
            },
        },
        servingUnitId: (condensed) ? false : true,
        courseTypes: {
            select: getCategoryFormat(condensed),
        },
        cuisines: {
            select: getCategoryFormat(condensed),
        },
        dietaryRestrictions: {
            select: getCategoryFormat(condensed),
        },
        dishTypes: {
            select: getCategoryFormat(condensed),
        },
        ingredients: {
            select: {
                id: true,
                createdAt: (condensed) ? false : true,
                order: true,
                section: true,
                quantityWhole: true,
                quantityFraction: {
                    select: getQuantityFractionFormat(condensed),
                },
                quantityFractionId: (condensed) ? false : true,
                quantityMinWhole: true,
                quantityMinFraction: {
                    select: getQuantityFractionFormat(condensed),
                },
                quantityMinFractionId: (condensed) ? false : true,
                quantityMaxWhole: true,
                quantityMaxFraction: {
                    select: getQuantityFractionFormat(condensed),
                },
                quantityMaxFractionId: (condensed) ? false : true,
                unit: {
                    select: {
                        id: (condensed) ? false : true,
                        createdAt: (condensed) ? false : true,
                        name: true,
                        nameAbbr: true,
                        namePlural: true,
                    },
                },
                unitId: (condensed) ? false : true,
                name: {
                    select: getIngredientFormat(condensed),
                },
                nameId: (condensed) ? false : true,
                alteration: true,
                isOptional: true,
                substitutions: {
                    select: getIngredientFormat(condensed),
                },
            },
            orderBy: {
                order: 'asc',
            },
        },
        steps: {
            select: getRecipeStepOrNoteFormat(condensed),
            orderBy: {
                order: 'asc',
            },
        },
        notes: {
            select: getRecipeStepOrNoteFormat(condensed),
            orderBy: {
                order: 'asc',
            },
        },
    };
}

export function getServingUnitFormat(condensed = false): Prisma.ServingUnitSelect {
    return {
        id: (condensed) ? false : true,
        createdAt: (condensed) ? false : true,
        name: true,
        namePlural: true,
    };
}

// Validate API query parameters
export function validateQueryParamCategoryFilter(res: NextApiResponse, categoryName: string, value: string | string[]) {
    const valueString = value?.toString().trim();

    if (!valueString) {
        return res.status(400).json({
            error: `Missing query parameter ${categoryName}. Fix: Provide a string value. If using multiple values, ensure they are comma-separated.`,
        });
    }

    const categories = valueString.split(',')
        .map((value) => value.trim())
        .filter((value) => value !== '')
        .map((value) => {
            return {
                [categoryName]: {
                    some: {
                        name: {
                            contains: value,
                            mode: 'insensitive',
                        },
                    },
                },
            };
        });

    return categories;
}

export function validateQueryParamCategory(res: NextApiResponse, value: string | string[] | undefined) {
    const category = value?.toString().toLowerCase().trim();
    const formattedCategories = categoryTables.map(category => category.toLowerCase());

    if (!category) {
        return res.status(400).json({
            error: 'Missing query parameter `category`. Fix: Provide a string value.',
        });
    }

    const categoryIndex = formattedCategories.indexOf(category);

    if (categoryIndex === -1) {
        return res.status(400).json({
            error: `Invalid value for query parameter \`category\`. Fix: Use either \`${formattedCategories.join('`, `')}\`.`,
        });
    }

    return categoryTables[categoryIndex];
}

export function validateQueryParamCondensed(res: NextApiResponse, value: string | string[]) {
    const condensed = value?.toString().toLowerCase().trim();

    if (condensed === 'true') {
        return true;
    } else if (condensed === 'false') {
        return false;
    } else {
        return res.status(400).json({
            error: 'Invalid value for query parameter `condensed`. Fix: Use either `true`, `false`, or omit parameter entirely.',
        });
    }
}

export function validateQueryParamCookTimeMins(res: NextApiResponse, value: string | string[]) {
    const cookTimeMins = value?.toString().trim();

    if (!cookTimeMins) {
        return res.status(400).json({
            error: 'Missing query parameter `cookTimeMins`. Fix: Provide a number value.',
        });
    }

    const cookTimeMinsNum = parseInt(cookTimeMins);

    if (isNaN(cookTimeMinsNum)) {
        return res.status(400).json({
            error: 'Invalid value for query parameter `cookTimeMins`. Fix: Provide a number value.',
        });
    }

    if (cookTimeMinsNum > cookTimeMinsMaxValue) {
        return res.status(400).json({
            error: `Invalid value for query parameter \`cookTimeMins\`. Fix: The number value must not exceed ${cookTimeMinsMaxValue}.`,
        });
    }

    return cookTimeMinsNum;
}

export function validateQueryParamCourseTypes(res: NextApiResponse, value: string | string[]) {
    const valueString = value?.toString().toLowerCase().trim();

    if (!valueString) {
        return res.status(400).json({
            error: 'Missing query parameter `courseTypes`. Fix: Provide a string value. If using multiple values, ensure they are comma-separated.',
        });
    }

    const courseTypes = valueString.split(',')
        .map((value) => value.trim())
        .filter((value) => value !== '');

    return courseTypes;
}

export function validateQueryParamCuisines(res: NextApiResponse, value: string | string[]) {
    const valueString = value?.toString().trim();

    if (!valueString) {
        return res.status(400).json({
            error: 'Missing query parameter `cuisines`. Fix: Provide a string value. If using multiple values, ensure they are comma-separated.',
        });
    }

    const cuisines = valueString.split(',')
        .map((value) => value.trim())
        .filter((value) => value !== '');

    return cuisines;
}

export function validateQueryParamDietaryRestrictions(res: NextApiResponse, value: string | string[]) {
    const valueString = value?.toString().toLowerCase().trim();

    if (!valueString) {
        return res.status(400).json({
            error: 'Missing query parameter `dietaryRestrictions`. Fix: Provide a string value. If using multiple values, ensure they are comma-separated.',
        });
    }

    if (valueString === '[]') {
        return [];
    }

    const dietaryRestrictions = valueString.split(',')
        .map((value) => value.trim())
        .filter((value) => value !== '');

    return dietaryRestrictions;
}

export function validateQueryParamDishTypes(res: NextApiResponse, value: string | string[]) {
    const valueString = value?.toString().trim();

    if (!valueString) {
        return res.status(400).json({
            error: 'Missing query parameter `dishTypes`. Fix: Provide a string value. If using multiple values, ensure they are comma-separated.',
        });
    }

    const dishTypes = valueString.split(',')
        .map((value) => value.trim())
        .filter((value) => value !== '');

    return dishTypes;
}

export function validateQueryParamId(res: NextApiResponse, value: string | string[] | undefined) {
    if (!value) {
        return res.status(400).json({
            error: 'Missing query parameter `id`. Fix: Provide a number value.',
        });
    }

    const id = parseInt(value?.toString().trim());

    if (id > idMaxValue) {
        return res.status(400).json({
            error: `Invalid value for query parameter \`id\`. Fix: The number value must not exceed ${idMaxValue}.`,
        });
    }

    return id;
}

export function validateQueryParamIngredients(res: NextApiResponse, value: string | string[]) {
    const ingredients = value?.toString();

    if (!ingredients) {
        return res.status(400).json({
            error: 'Missing query parameter `ingredients`. Fix: Provide a string value (JSON).',
        });
    }

    try {
        const ingredientsJSON = JSON.parse(ingredients);
        return ingredientsJSON;
    } catch (error) {
        return res.status(400).json({
            error: 'Invalid value for query parameter `ingredients`. Fix: Provide a valid string value (JSON).',
        });
    }
}

export function validateQueryParamName(res: NextApiResponse, value: string | string[] | undefined) {
    const name = value?.toString().trim();

    if (!name) {
        return res.status(400).json({
            error: 'Missing query parameter `name`. Fix: Provide a string value.',
        });
    }

    if (name.length > nameMaxCharLength) {
        return res.status(400).json({
            error: `Invalid value for query parameter \`name\`. Fix: The string length must not exceed ${nameMaxCharLength} characters.`,
        });
    }

    return name;
}

export function validateQueryParamNameAbbr(res: NextApiResponse, value: string | string[] | undefined) {
    const nameAbbr = value?.toString().trim();

    if (!nameAbbr) {
        return res.status(400).json({
            error: 'Missing query parameter `nameAbbr`. Fix: Provide a string value.',
        });
    }

    if (nameAbbr.length > nameMaxCharLength) {
        return res.status(400).json({
            error: `Invalid value for query parameter \`nameAbbr\`. Fix: The string length must not exceed ${nameMaxCharLength} characters.`,
        });
    }

    return nameAbbr;
}

export function validateQueryParamNamePlural(res: NextApiResponse, value: string | string[] | undefined) {
    const namePlural = value?.toString().trim();

    if (!namePlural) {
        return res.status(400).json({
            error: 'Missing query parameter `namePlural`. Fix: Provide a string value.',
        });
    }

    if (namePlural.length > nameMaxCharLength) {
        return res.status(400).json({
            error: `Invalid value for query parameter \`namePlural\`. Fix: The string length must not exceed ${nameMaxCharLength} characters.`,
        });
    }

    return namePlural;
}

export function validateQueryParamNotes(res: NextApiResponse, value: string | string[]) {
    const notes = value?.toString();

    if (!notes) {
        return res.status(400).json({
            error: 'Missing query parameter `notes`. Fix: Provide a string value (JSON).',
        });
    }

    try {
        const notesJSON = JSON.parse(notes);
        return notesJSON;
    } catch (error) {
        return res.status(400).json({
            error: 'Invalid value for query parameter `notes`. Fix: Provide a valid string value (JSON).',
        });
    }
}

export function validateQueryParamOrderByField(
    res: NextApiResponse,
    orderByValue: string | string[] | undefined,
    orderByFieldValue: string | string[] | undefined,
    orderByFieldOptions: string[],
) {
    const orderByOptions = ['asc', 'desc'];
    const orderBy = orderByValue?.toString().toLowerCase().trim();
    const orderByField = orderByFieldValue?.toString().toLowerCase().trim();
    const formattedOrderByFieldOptions = orderByFieldOptions.map(orderByFieldOption => orderByFieldOption.toLowerCase());

    if ((orderBy && !orderByField) || (!orderBy && orderByField)) {
        return res.status(400).json({
            error: 'Parameters `orderBy` and `orderByField` must be used simultaneously. Fix: Provide both parameters or omit both parameters entirely.',
        });
    }

    if (orderBy && !orderByOptions.includes(orderBy)) {
        return res.status(400).json({
            error: `Invalid value for query parameter \`orderBy\`. Fix: Use either \`${orderByOptions.join('`, `')}\`, or omit parameter entirely (along with the \`orderByField\` parameter).`,
        });
    }

    const orderByFieldIndex = formattedOrderByFieldOptions.indexOf(orderByField as string);

    if (orderByFieldIndex === -1) {
        return res.status(400).json({
            error: `Invalid value for query parameter \`orderByField\`. Fix: Use either \`${orderByFieldOptions.join('`, `')}\`, or omit parameter entirely (along with the \`orderBy\` parameter).`,
        });
    }

    return {
        orderBy: orderBy,
        orderByField: orderByFieldOptions[orderByFieldIndex],
    };
}

export function validateQueryParamPrepTimeMins(res: NextApiResponse, value: string | string[]) {
    const prepTimeMins = value?.toString();

    if (!prepTimeMins) {
        return res.status(400).json({
            error: 'Missing query parameter `prepTimeMins`. Fix: Provide a number value.',
        });
    }

    const prepTimeMinsNum = parseInt(prepTimeMins);

    if (isNaN(prepTimeMinsNum)) {
        return res.status(400).json({
            error: 'Invalid value for query parameter `prepTimeMins`. Fix: Provide a number value.',
        });
    }

    if (prepTimeMinsNum > prepTimeMinsMaxValue) {
        return res.status(400).json({
            error: `Invalid value for query parameter \`prepTimeMins\`. Fix: The number value must not exceed ${prepTimeMinsMaxValue}.`,
        });
    }

    return prepTimeMinsNum;
}

export function validateQueryParamRandom(res: NextApiResponse, value: string | string[]) {
    const random = value?.toString().toLowerCase().trim();

    if (random === 'true') {
        return true;
    } else if (random === 'false') {
        return false;
    } else {
        return res.status(400).json({
            error: 'Invalid value for query parameter `random`. Fix: Use either `true`, `false`, or omit parameter entirely.',
        });
    }
}

export function validateQueryParamRecipeId(res: NextApiResponse, value: string | string[] | undefined) {
    if (!value) {
        return res.status(400).json({
            error: 'Missing query parameter `id`. Fix: Provide a string value.',
        });
    }

    const id = value?.toString().trim();

    if (id.length > recipeIdMaxCharLength) {
        return res.status(400).json({
            error: `Invalid value for query parameter \`id\`. Fix: The string length must not exceed ${recipeIdMaxCharLength} characters.`,
        });
    }

    return id;
}

export function validateQueryParamServingAmount(res: NextApiResponse, value: string | string[]) {
    const servingAmount = value?.toString();

    if (!servingAmount) {
        return res.status(400).json({
            error: 'Missing query parameter `servingAmount`. Fix: Provide a number value.',
        });
    }

    const servingAmountNum = parseInt(servingAmount);

    if (isNaN(servingAmountNum)) {
        return res.status(400).json({
            error: 'Invalid value for query parameter `servingAmount`. Fix: Provide a number value.',
        });
    }

    if (servingAmountNum > servingAmountMaxValue) {
        return res.status(400).json({
            error: `Invalid value for query parameter \`servingAmount\`. Fix: The number value must not exceed ${servingAmountMaxValue}.`,
        });
    }

    return servingAmountNum;
}

export function validateQueryParamServingUnit(res: NextApiResponse, value: string | string[]) {
    const servingUnit = value?.toString().toLowerCase().trim();

    if (!servingUnit) {
        return res.status(400).json({
            error: 'Missing query parameter `servingUnit`. Fix: Provide a string value.',
        });
    }

    if (servingUnit.length > nameMaxCharLength) {
        return res.status(400).json({
            error: `Invalid value for query parameter \`servingUnit\`. Fix: The string length must not exceed ${nameMaxCharLength} characters.`,
        });
    }

    return servingUnit;
}

export function validateQueryParamShowOnly(res: NextApiResponse, value: string | string[]) {
    const options = categoryTables.map(category => `${category.toLowerCase()}s`);

    const values = value.toString().toLowerCase().split(',')
        .map((value) => value.trim())
        .filter((value) => value !== '');

    let isValid = true;

    values.forEach((value) => {
        if (!options.includes(value)) {
            isValid = false;
            return;
        }
    });

    if (!isValid) {
        return res.status(400).json({
            error: `Invalid value for query parameter \`showOnly\`. Fix: Use any of the following values: \`${options.join('`, `')}\`, or omit parameter entirely. If using multiple values, ensure they are comma-separated.`,
        });
    } else {
        return values;
    }
}

export function validateQueryParamSlug(res: NextApiResponse, value: string | string[]) {
    const slug = value?.toString().toLowerCase().trim();
    const slugRegEx = /^[a-z0-9]+(?:-[a-z0-9]+)*$/g; // importing this from ../utils causes it to fail sometimes?

    if (!slug) {
        return res.status(400).json({
            error: 'Missing query parameter `slug`. Fix: Provide a string value (no spaces allowed, separate words with hyphens).',
        });
    }

    const slugTest = slugRegEx.test(slug);
    if (!slugTest) {
        return res.status(400).json({
            error: 'Invalid value for query parameter `slug`. Fix: Provide a value string (allowed characters: letters, numbers, and hyphens).',
        });
    }

    if (slug.length > slugMaxCharLength) {
        return res.status(400).json({
            error: `Invalid value for query parameter \`slug\`. Fix: The string length must not exceed ${slugMaxCharLength} characters.`,
        });
    }    

    return slug;
}

export function validateQueryParamSourceName(res: NextApiResponse, value: string | string[]) {
    const sourceName = value?.toString().trim();

    if (!sourceName) {
        return res.status(400).json({
            error: 'Missing query parameter `sourceName`. Fix: Provide a string value.',
        });
    }

    if (sourceName.length > sourceNameMaxCharLength) {
        return res.status(400).json({
            error: `Invalid value for query parameter \`sourceName\`. Fix: The string length must not exceed ${sourceNameMaxCharLength} characters.`,
        });
    }

    return sourceName;
}

export function validateQueryParamSourceURL(res: NextApiResponse, value: string | string[]) {
    const sourceURL = value?.toString().trim();

    if (!sourceURL) {
        return res.status(400).json({
            error: 'Missing query parameter `sourceURL`. Fix: Provide a string value (URL).',
        });
    }

    if (sourceURL.length > sourceURLMaxCharLength) {
        return res.status(400).json({
            error: `Invalid value for query parameter \`sourceURL\`. Fix: The string length must not exceed ${sourceURLMaxCharLength} characters.`,
        });
    }

    try {
        const isSourceURLValid = new URL(sourceURL);
        return isSourceURLValid.href;
    } catch (error) {
        return res.status(400).json({
            error: 'Invalid value for query parameter `sourceURL`. Fix: Provide a valid URL.',
        });
    }
}

export function validateQueryParamSteps(res: NextApiResponse, value: string | string[]) {
    const steps = value?.toString().trim();

    if (!steps) {
        return res.status(400).json({
            error: 'Missing query parameter `steps`. Fix: Provide a string value (JSON).',
        });
    }

    try {
        const stepsJSON = JSON.parse(steps);
        return stepsJSON;
    } catch (error) {
        return res.status(400).json({
            error: 'Invalid value for query parameter `steps`. Fix: Provide a valid string value (JSON).',
        });
    }
}

export function validateQueryParamTitle(res: NextApiResponse, value: string | string[]) {
    const title = value?.toString().trim();

    if (!title) {
        return res.status(400).json({
            error: 'Missing query parameter `title`. Fix: Provide a string value (spaces are allowed).',
        });
    }

    if (title.length > titleMaxCharLength) {
        return res.status(400).json({
            error: `Invalid value for query parameter \`title\`. Fix: The string length must not exceed ${titleMaxCharLength} characters.`,
        });
    }

    return title;
}

export function validateQueryParamTitleSearch(res: NextApiResponse, value: string | string[]) {
    const title = value?.toString().toLowerCase().trim().split(' ').join(' & ');

    if (!title) {
        return res.status(400).json({
            error: 'Missing query parameter `title`. Fix: Provide a string value (spaces are allowed).',
        });
    }

    if (title.length > titleMaxCharLength) {
        return res.status(400).json({
            error: `Invalid value for query parameter \`title\`. Fix: The string length must not exceed ${titleMaxCharLength} characters.`,
        });
    }

    return title;
}

export function validateQueryParamValue(res: NextApiResponse, value: string | string[] | undefined) {
    if (!value) {
        return res.status(400).json({
            error: 'Missing query parameter `value`. Fix: Provide a number value.',
        });
    }

    const paramValue = parseFloat(value?.toString().trim());

    if (paramValue > valueMaxValue) {
        return res.status(400).json({
            error: `Invalid value for query parameter \`value\`. Fix: The number value must not exceed ${valueMaxValue}.`,
        });
    }

    return paramValue;
}
