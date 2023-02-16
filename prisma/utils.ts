import { Prisma } from '@prisma/client';

import type { NextApiResponse } from 'next';

// Static data
export const categoryTables = [
    'courseType' as const,
    'cuisine' as const,
    'dietaryRestriction' as const,
    'dishType' as const,
];

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
        id: (condensed) ? false : true,
        createdAt: (condensed) ? false : true,
        title: true,
        slug: true,
        sourceName: true,
        sourceURL: true,
        prepTimeMin: true,
        cookTimeMin: true,
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
                id: (condensed) ? false : true,
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
export function validateQueryParamCategory(res: NextApiResponse, value: string | string[]) {
    const category = value?.toString().toLowerCase().trim();
    const formattedCategories = categoryTables.map(category => category.toLowerCase());

    if (!category) {
        return res.status(400).json('Missing query parameter `category`. Fix: Provide a string value.');
    }

    const categoryIndex = formattedCategories.indexOf(category);

    if (categoryIndex === -1) {
        return res.status(400).json(`Invalid value for query parameter \`category\`. Fix: Use either \`${formattedCategories.join('`, `')}\`.`);
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
        return res.status(400).json('Invalid value for query parameter `condensed`. Fix: Use either `true`, `false`, or omit parameter entirely.');
    }
}

export function validateQueryParamCookTimeMin(res: NextApiResponse, value: string | string[]) {
    const cookTimeMin = value?.toString().trim();

    if (!cookTimeMin) {
        return res.status(400).json('Missing query parameter `cookTimeMin`. Fix: Provide a number value.');
    }

    const cookTimeMinNum = parseInt(cookTimeMin);

    if (isNaN(cookTimeMinNum)) {
        return res.status(400).json('Invalid value for query parameter `cookTimeMin`. Fix: Provide a number value.');
    }

    return cookTimeMinNum;
}

export function validateQueryParamCourseTypes(res: NextApiResponse, value: string | string[]) {
    const valueString = value?.toString().toLowerCase().trim();

    if (!valueString) {
        return res.status(400).json('Missing query parameter `courseTypes`. Fix: Provide a string value. If using multiple values, ensure they are comma-separated.');
    }

    const courseTypes = valueString.split(',')
        .map((value) => value.trim())
        .filter((value) => value !== '');

    return courseTypes;
}

export function validateQueryParamCuisines(res: NextApiResponse, value: string | string[]) {
    const valueString = value?.toString().trim();

    if (!valueString) {
        return res.status(400).json('Missing query parameter `cuisines`. Fix: Provide a string value. If using multiple values, ensure they are comma-separated.');
    }

    const cuisines = valueString.split(',')
        .map((value) => value.trim())
        .filter((value) => value !== '');

    return cuisines;
}

export function validateQueryParamDietaryRestrictions(res: NextApiResponse, value: string | string[]) {
    const valueString = value?.toString().toLowerCase().trim();

    if (!valueString) {
        return res.status(400).json('Missing query parameter `dietaryRestrictions`. Fix: Provide a string value. If using multiple values, ensure they are comma-separated.');
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
        return res.status(400).json('Missing query parameter `dishTypes`. Fix: Provide a string value. If using multiple values, ensure they are comma-separated.');
    }

    const dishTypes = valueString.split(',')
        .map((value) => value.trim())
        .filter((value) => value !== '');

    return dishTypes;
}

export function validateQueryParamId(res: NextApiResponse, value: string | string[]) {
    const id = parseInt(value?.toString().trim());

    if (!id) {
        return res.status(400).json('Missing query parameter `id`. Fix: Provide a number value.');
    }

    return id;
}

export function validateQueryParamIngredients(res: NextApiResponse, value: string | string[]) {
    const ingredients = value?.toString();

    if (!ingredients) {
        return res.status(400).json('Missing query parameter `ingredients`. Fix: Provide a string value (JSON).');
    }

    try {
        const ingredientsJSON = JSON.parse(ingredients);
        return ingredientsJSON;
    } catch (error) {
        return res.status(400).json('Invalid value for query parameter `ingredients`. Fix: Provide a valid string value (JSON).');
    }
}

export function validateQueryParamName(res: NextApiResponse, value: string | string[]) {
    const name = value?.toString().trim();

    if (!name) {
        return res.status(400).json('Missing query parameter `name`. Fix: Provide a string value.');
    }

    return name;
}

export function validateQueryParamNameAbbr(res: NextApiResponse, value: string | string[]) {
    const nameAbbr = value?.toString().trim();

    if (!nameAbbr) {
        return res.status(400).json('Missing query parameter `nameAbbr`. Fix: Provide a string value.');
    }

    return nameAbbr;
}

export function validateQueryParamNamePlural(res: NextApiResponse, value: string | string[]) {
    const namePlural = value?.toString().trim();

    if (!namePlural) {
        return res.status(400).json('Missing query parameter `namePlural`. Fix: Provide a string value.');
    }

    return namePlural;
}

export function validateQueryParamNotes(res: NextApiResponse, value: string | string[]) {
    const notes = value?.toString();

    if (!notes) {
        return res.status(400).json('Missing query parameter `notes`. Fix: Provide a string value (JSON).');
    }

    try {
        const notesJSON = JSON.parse(notes);
        return notesJSON;
    } catch (error) {
        return res.status(400).json('Invalid value for query parameter `notes`. Fix: Provide a valid string value (JSON).');
    }
}

export function validateQueryParamOrderByField(
    res: NextApiResponse,
    orderByValue: string | string[],
    orderByFieldValue: string | string[],
    orderByFieldOptions: string[],
) {
    const orderByOptions = ['asc', 'desc'];
    const orderBy = orderByValue?.toString().toLowerCase().trim();
    const orderByField = orderByFieldValue?.toString().toLowerCase().trim();
    const formattedOrderByFieldOptions = orderByFieldOptions.map(orderByFieldOption => orderByFieldOption.toLowerCase());

    if ((orderBy && !orderByField) || (!orderBy && orderByField)) {
        return res.status(400).json('Parameters `orderBy` and `orderByField` must be used simultaneously. Fix: Provide both parameters or omit both parameters entirely.');
    }

    if (orderBy && !orderByOptions.includes(orderBy)) {
        return res.status(400).json(`Invalid value for query parameter \`orderBy\`. Fix: Use either \`${orderByOptions.join('`, `')}\`, or omit parameter entirely (along with the \`orderByField\` parameter).`);
    }

    const orderByFieldIndex = formattedOrderByFieldOptions.indexOf(orderByField);

    if (orderByFieldIndex === -1) {
        return res.status(400).json(`Invalid value for query parameter \`orderByField\`. Fix: Use either \`${orderByFieldOptions.join('`, `')}\`, or omit parameter entirely (along with the \`orderBy\` parameter).`);
    }

    return {
        orderBy: orderBy,
        orderByField: orderByFieldOptions[orderByFieldIndex],
    };
}

export function validateQueryParamPrepTimeMin(res: NextApiResponse, value: string | string[]) {
    const prepTimeMin = value?.toString();

    if (!prepTimeMin) {
        return res.status(400).json('Missing query parameter `prepTimeMin`. Fix: Provide a number value.');
    }

    const prepTimeMinNum = parseInt(prepTimeMin);

    if (isNaN(prepTimeMinNum)) {
        return res.status(400).json('Invalid value for query parameter `prepTimeMin`. Fix: Provide a number value.');
    }

    return prepTimeMinNum;
}

export function validateQueryParamServingAmount(res: NextApiResponse, value: string | string[]) {
    const servingAmount = value?.toString();

    if (!servingAmount) {
        return res.status(400).json('Missing query parameter `servingAmount`. Fix: Provide a number value.');
    }

    const servingAmountNum = parseInt(servingAmount);

    if (isNaN(servingAmountNum)) {
        return res.status(400).json('Invalid value for query parameter `servingAmount`. Fix: Provide a number value.');
    }

    return servingAmountNum;
}

export function validateQueryParamServingUnit(res: NextApiResponse, value: string | string[]) {
    const servingUnit = value?.toString().toLowerCase().trim();

    if (!servingUnit) {
        return res.status(400).json('Missing query parameter `servingUnit`. Fix: Provide a string value.');
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
        return res.status(400).json(`Invalid value for query parameter \`showOnly\`. Fix: Use any of the following values: \`${options.join('`, `')}\`, or omit parameter entirely. If using multiple values, ensure they are comma-separated.`);
    } else {
        return values;
    }
}

export function validateQueryParamSlug(res: NextApiResponse, value: string | string[]) {
    const slug = value?.toString().toLowerCase().trim();
    const slugRegEx = /^[a-z0-9]+(?:-[a-z0-9]+)*$/g;

    if (!slug) {
        return res.status(400).json('Missing query parameter `slug`. Fix: Provide a string value (no spaces allowed, separate words with hyphens).');
    }

    if (!slugRegEx.test(slug)) {
        return res.status(400).json('Invalid value for query parameter `slug`. Fix: Provide a value string (allowed characters: letters, numbers, and hyphens).');
    }

    return slug;
}

export function validateQueryParamSourceName(res: NextApiResponse, value: string | string[]) {
    const sourceName = value?.toString().trim();

    if (!sourceName) {
        return res.status(400).json('Missing query parameter `sourceName`. Fix: Provide a string value.');
    }

    return sourceName;
}

export function validateQueryParamSourceURL(res: NextApiResponse, value: string | string[]) {
    const sourceURL = value?.toString().trim();

    if (!sourceURL) {
        return res.status(400).json('Missing query parameter `sourceURL`. Fix: Provide a string value (URL).');
    }

    try {
        const isSourceURLValid = new URL(sourceURL);
        return isSourceURLValid.href;
    } catch (error) {
        return res.status(400).json('Invalid value for query parameter `sourceURL`. Fix: Provide a valid URL.');
    }
}

export function validateQueryParamSteps(res: NextApiResponse, value: string | string[]) {
    const steps = value?.toString().trim();

    if (!steps) {
        return res.status(400).json('Missing query parameter `steps`. Fix: Provide a string value (JSON).');
    }

    try {
        const stepsJSON = JSON.parse(steps);
        return stepsJSON;
    } catch (error) {
        return res.status(400).json('Invalid value for query parameter `steps`. Fix: Provide a valid string value (JSON).');
    }
}

export function validateQueryParamTitle(res: NextApiResponse, value: string | string[]) {
    const title = value?.toString().trim();

    if (!title) {
        return res.status(400).json('Missing query parameter `title`. Fix: Provide a string value (spaces are allowed).');
    }

    return title;
}

export function validateQueryParamTitleSearch(res: NextApiResponse, value: string | string[]) {
    const title = value?.toString().toLowerCase().trim().split(' ').join(' & ');

    if (!title) {
        return res.status(400).json('Missing query parameter `title`. Fix: Provide a string value (spaces are allowed).');
    }

    return title;
}

export function validateQueryParamUUID(res: NextApiResponse, value: string | string[]) {
    const uuid = value?.toString().trim();

    if (!uuid) {
        return res.status(400).json('Missing query parameter `id`. Fix: Provide a string value.');
    }

    return uuid;
}

export function validateQueryParamValue(res: NextApiResponse, value: string | string[]) {
    const paramValue = parseFloat(value?.toString().trim());

    if (!paramValue) {
        return res.status(400).json('Missing query parameter `value`. Fix: Provide a number value.');
    }

    return paramValue;
}

// Handle Prisma errors
export function handlePrismaError(error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return {
            code: error.code,
            message: error.message,
        };
    } else {
        return error;
    }
}
