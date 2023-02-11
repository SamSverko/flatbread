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
    const category = value?.toString().toLowerCase();
    const formattedCategories = categoryTables.map(category => category.toLowerCase());

    if (!category) {
        return res.status(400).json('Missing query parameter `category`. Fix: Provide a value.');
    }

    const categoryIndex = formattedCategories.indexOf(category);

    if (categoryIndex === -1) {
        return res.status(400).json(`Invalid value for query parameter \`category\`. Fix: Use either \`${formattedCategories.join('`, `')}\`.`);
    }

    return categoryTables[categoryIndex];
}

export function validateQueryParamCondensed(res: NextApiResponse, value: string | string[]) {
    const condensed = value?.toString().toLowerCase();

    if (condensed === 'true') {
        return true;
    } else if (condensed === 'false') {
        return false;
    } else {
        return res.status(400).json('Invalid value for query parameter `condensed`. Fix: Use either `true`, `false`, or omit parameter entirely.');
    }
}

export function validateQueryParamName(res: NextApiResponse, param: 'name' | 'nameUpdated', value: string | string[]) {
    const name = value?.toString();

    if (!name) {
        return res.status(400).json(`Missing query parameter \`${param}\`. Fix: Provide a value.`);
    }

    return name;
}

export function validateQueryParamOrderByField(
    res: NextApiResponse,
    orderByValue: string | string[],
    orderByFieldValue: string | string[],
    orderByFieldOptions: string[],
) {
    const orderByOptions = ['asc', 'desc'];
    const orderBy = orderByValue?.toString().toLowerCase();
    const orderByField = orderByFieldValue?.toString().toLowerCase();
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
    const slug = value.toString().toLowerCase();

    if (!slug) {
        return res.status(400).json('Invalid value for query parameter `slug`. Fix: Provide a hyphen joined string.');
    }

    return slug;
}

export function validateQueryParamTitle(res: NextApiResponse, value: string | string[]) {
    const title = value?.toString().toLowerCase().split(' ').join(' & ');

    if (!title) {
        return res.status(400).json('Invalid value for query parameter `title`. Fix: Provide a string of words. Spaces are allowed.');
    }

    return title;
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
