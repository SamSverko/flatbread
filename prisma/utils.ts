import { Prisma } from '@prisma/client';

export function getRecipeCategoryFormat(condensed = false):
Prisma.RecipeCourseTypesArgs |
Prisma.RecipeCuisinesArgs |
Prisma.RecipeDietaryRestrictionsArgs |
Prisma.RecipeDishTypeArgs {
    return {
        select: {
            id: (condensed) ? false : true,
            createdAt: (condensed) ? false : true,
            name: true,
        },
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
        courseTypes: getRecipeCategoryFormat(condensed),
        cuisines: getRecipeCategoryFormat(condensed),
        dietaryRestrictions: getRecipeCategoryFormat(condensed),
        dishTypes: getRecipeCategoryFormat(condensed),
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
