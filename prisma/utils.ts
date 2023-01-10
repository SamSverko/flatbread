import { Prisma } from '@prisma/client';

type QueryValidationResponse = {
    code: number,
    message: string,
}

// Format API data
export function getRecipeCategoryFormat(condensed = false) {
    return {
        id: (condensed) ? false : true,
        createdAt: (condensed) ? false : true,
        name: true,
    };
}

export function getRecipeIngredientName(condensed = false): Prisma.RecipeIngredientNameArgs {
    return {
        select: {
            id: (condensed) ? false : true,
            createdAt: (condensed) ? false : true,
            name: true,
            namePlural: true,
        },
    };
}

export function getRecipeIngredientQuantityFraction(condensed = false): Prisma.RecipeIngredientQuantityFractionArgs {
    return {
        select: {
            id: (condensed) ? false : true,
            createdAt: (condensed) ? false : true,
            name: true,
            value: true,
        },
    };
}

export function getRecipeStepOrNote(condensed = false): Prisma.RecipeStepsArgs {
    return {
        select: {
            id: (condensed) ? false : true,
            createdAt: (condensed) ? false : true,
            order: true,
            section: true,
            details: true,
        },
        orderBy: {
            order: 'asc',
        },
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
            select: getRecipeCategoryFormat(condensed),
        },
        cuisines: {
            select: getRecipeCategoryFormat(condensed),
        },
        dietaryRestrictions: {
            select: getRecipeCategoryFormat(condensed),
        },
        dishTypes: {
            select: getRecipeCategoryFormat(condensed),
        },
        ingredients: {
            select: {
                id: (condensed) ? false : true,
                createdAt: (condensed) ? false : true,
                order: true,
                section: true,
                quantityWhole: true,
                quantityFraction: getRecipeIngredientQuantityFraction(condensed),
                quantityFractionId: (condensed) ? false : true,
                quantityMinWhole: true,
                quantityMinFraction: getRecipeIngredientQuantityFraction(condensed),
                quantityMinFractionId: (condensed) ? false : true,
                quantityMaxWhole: true,
                quantityMaxFraction: getRecipeIngredientQuantityFraction(condensed),
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
                name: getRecipeIngredientName(condensed),
                nameId: (condensed) ? false : true,
                alteration: true,
                isOptional: true,
                substitutions: getRecipeIngredientName(condensed),
            },
            orderBy: {
                order: 'asc',
            },
        },
        steps: getRecipeStepOrNote(condensed),
        notes: getRecipeStepOrNote(condensed),
    };
}

// Validate API query parameters
const validQueryParam = {
    code: 200,
    message: 'Query parameter is valid.',
};

export function validateQueryParamCondensed(value: string | string[]): QueryValidationResponse {
    const condensedOptions = ['true', 'false'];
    const condensed = value?.toString().toLowerCase();

    if (value && !condensedOptions.includes(condensed)) {
        return {
            code: 400,
            message: 'Invalid value for query parameter `condensed`. Fix: Use either `true`, `false`, or omit parameter entirely.',
        };
    }

    return validQueryParam;
}

export function validateQueryParamShowOnly(value: string | string[]) {
    const options = ['coursetypes', 'cuisines', 'dietaryrestrictions', 'dishtypes'];

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
        return {
            code: 400,
            message: `Invalid value for query parameter \`showOnly\`. Fix: Use any of the following values: \`${options.join('`, `')}\`, or omit parameter entirely. If using multiple values, ensure they are comma-separated.`,
        };
    }

    return validQueryParam;
}

export function validateQueryParamOrderByField(
    orderByValue: string | string[],
    orderByFieldValue: string | string[],
    orderByFieldOptions: string[],
): QueryValidationResponse {
    const orderByOptions = ['asc', 'desc'];
    const orderBy = orderByValue?.toString().toLowerCase();
    const orderByField = orderByFieldValue?.toString();

    if ((orderBy && !orderByField) || (!orderBy && orderByField)) {
        return {
            code: 400,
            message: 'Parameters `orderBy` and `orderByField` must be used simultaneously. Fix: Provide both parameters or omit both parameters entirely.',
        };
    }

    if (orderBy && !orderByOptions.includes(orderBy)) {
        return {
            code: 400,
            message: `Invalid value for query parameter \`orderBy\`. Fix: Use either \`${orderByOptions.join('`, `')}\`, or omit parameter entirely (along with the \`orderByField\` parameter).`,
        };
    }

    if (orderByField && !orderByFieldOptions.includes(orderByField)) {
        return {
            code: 400,
            message: `Invalid value for query parameter \`orderByField\`. Fix: Use either \`${orderByFieldOptions.join('`, `')}\`, or omit parameter entirely (along with the \`orderBy\` parameter).`,
        };
    }

    return validQueryParam;
}
