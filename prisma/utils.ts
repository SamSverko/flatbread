import { Prisma } from '@prisma/client';

type QueryValidationResponse = {
    code: number,
    message: string,
    paramValue: string | string[],
}

// Format API data
export function getCategoryFormat(condensed = false) {
    return {
        id: (condensed) ? false : true,
        createdAt: (condensed) ? false : true,
        name: true,
    };
}

export function getIngredientFormat(condensed = false): Prisma.IngredientArgs {
    return {
        select: {
            id: (condensed) ? false : true,
            createdAt: (condensed) ? false : true,
            name: true,
            namePlural: true,
        },
    };
}

export function getQuantityFractionFormat(condensed = false): Prisma.QuantityFractionArgs {
    return {
        select: {
            id: (condensed) ? false : true,
            createdAt: (condensed) ? false : true,
            name: true,
            value: true,
        },
    };
}

export function getRecipeStepOrNoteFormat(condensed = false): Prisma.RecipeStepFindManyArgs {
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
                quantityFraction: getQuantityFractionFormat(condensed),
                quantityFractionId: (condensed) ? false : true,
                quantityMinWhole: true,
                quantityMinFraction: getQuantityFractionFormat(condensed),
                quantityMinFractionId: (condensed) ? false : true,
                quantityMaxWhole: true,
                quantityMaxFraction: getQuantityFractionFormat(condensed),
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
                name: getIngredientFormat(condensed),
                nameId: (condensed) ? false : true,
                alteration: true,
                isOptional: true,
                substitutions: getIngredientFormat(condensed),
            },
            orderBy: {
                order: 'asc',
            },
        },
        steps: getRecipeStepOrNoteFormat(condensed),
        notes: getRecipeStepOrNoteFormat(condensed),
    };
}

export function getServingUnitFormat(condensed = false) {
    return {
        id: (condensed) ? false : true,
        createdAt: (condensed) ? false : true,
        name: true,
        namePlural: true,
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
            paramValue: condensed,
        };
    }

    return {
        ...validQueryParam,
        paramValue: condensed,
    };
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
            paramValue: [orderBy, orderByField],
        };
    }

    if (orderBy && !orderByOptions.includes(orderBy)) {
        return {
            code: 400,
            message: `Invalid value for query parameter \`orderBy\`. Fix: Use either \`${orderByOptions.join('`, `')}\`, or omit parameter entirely (along with the \`orderByField\` parameter).`,
            paramValue: [orderBy, orderByField],
        };
    }

    if (orderByField && !orderByFieldOptions.includes(orderByField)) {
        return {
            code: 400,
            message: `Invalid value for query parameter \`orderByField\`. Fix: Use either \`${orderByFieldOptions.join('`, `')}\`, or omit parameter entirely (along with the \`orderBy\` parameter).`,
            paramValue: [orderBy, orderByField],
        };
    }

    return {
        ...validQueryParam,
        paramValue: [orderBy, orderByField],
    };
}

export function validateQueryParamShowOnly(value: string | string[]): QueryValidationResponse {
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
            paramValue: values,
        };
    }

    return {
        ...validQueryParam,
        paramValue: values,
    };
}

export function validateQueryParamSlug(value: string | string[]): QueryValidationResponse {
    const slug = value.toString().toLowerCase();

    if (!slug) {
        return {
            code: 400,
            message: 'Invalid value for query parameter `slug`. Fix: Provide a hyphen joined string.',
            paramValue: slug,
        };
    }

    return {
        ...validQueryParam,
        paramValue: slug,
    };
}

export function validateQueryParamTitle(value: string | string[]): QueryValidationResponse {
    const title = value?.toString().toLowerCase().split(' ').join(' & ');

    if (!title) {
        return {
            code: 400,
            message: 'Invalid value for query parameter `title`. Fix: Provide a string of words. Spaces are allowed',
            paramValue: title,
        };
    }

    return {
        ...validQueryParam,
        paramValue: title,
    };
}
