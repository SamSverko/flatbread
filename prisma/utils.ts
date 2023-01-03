import { Prisma } from '@prisma/client';

export function getRecipeCategoryFormat(allData = false):
Prisma.RecipeCourseTypesArgs |
Prisma.RecipeCuisinesArgs |
Prisma.RecipeDietaryRestrictionsArgs |
Prisma.RecipeDishTypeArgs {
    return {
        select: {
            id: (allData) ? true : false,
            createdAt: (allData) ? true : false,
            name: true,
        },
    };
}

export function getRecipeIngredientName(allData = false): Prisma.RecipeIngredientNameArgs {
    return {
        select: {
            id: (allData) ? true : false,
            createdAt: (allData) ? true : false,
            name: true,
            namePlural: true,
        },
    };
}

export function getRecipeIngredientQuantityFraction(allData = false): Prisma.RecipeIngredientQuantityFractionArgs {
    return {
        select: {
            id: (allData) ? true : false,
            createdAt: (allData) ? true : false,
            name: true,
            value: true,
        },
    };
}

export function getRecipeStepOrNote(allData = false): Prisma.RecipeStepsArgs {
    return {
        select: {
            id: (allData) ? true : false,
            createdAt: (allData) ? true : false,
            order: true,
            section: true,
            details: true,
        },
        orderBy: {
            order: 'asc',
        },
    };
}

export function getRecipeFormat(allData = false): Prisma.RecipeSelect {
    return {
        id: (allData) ? true : false,
        createdAt: (allData) ? true : false,
        title: true,
        slug: true,
        sourceName: true,
        sourceURL: true,
        prepTimeMin: true,
        cookTimeMin: true,
        servingAmount: true,
        servingUnit: {
            select: {
                id: (allData) ? true : false,
                createdAt: (allData) ? true : false,
                name: true,
                namePlural: true,
            },
        },
        servingUnitId: (allData) ? true : false,
        courseTypes: getRecipeCategoryFormat((allData) ? true : false),
        cuisines: getRecipeCategoryFormat((allData) ? true : false),
        dietaryRestrictions: getRecipeCategoryFormat((allData) ? true : false),
        dishTypes: getRecipeCategoryFormat((allData) ? true : false),
        ingredients: {
            select: {
                id: (allData) ? true : false,
                createdAt: (allData) ? true : false,
                order: true,
                section: true,
                quantityWhole: true,
                quantityFraction: getRecipeIngredientQuantityFraction((allData) ? true : false),
                quantityFractionId: (allData) ? true : false,
                quantityMinWhole: true,
                quantityMinFraction: getRecipeIngredientQuantityFraction((allData) ? true : false),
                quantityMinFractionId: (allData) ? true : false,
                quantityMaxWhole: true,
                quantityMaxFraction: getRecipeIngredientQuantityFraction((allData) ? true : false),
                quantityMaxFractionId: (allData) ? true : false,
                unit: {
                    select: {
                        id: (allData) ? true : false,
                        createdAt: (allData) ? true : false,
                        name: true,
                        nameAbbr: true,
                        namePlural: true,
                    },
                },
                unitId: (allData) ? true : false,
                name: getRecipeIngredientName((allData) ? true : false),
                nameId: (allData) ? true : false,
                alteration: true,
                isOptional: true,
                substitutions: getRecipeIngredientName((allData) ? true : false),
            },
            orderBy: {
                order: 'asc',
            },
        },
        steps: getRecipeStepOrNote((allData) ? true : false),
        notes: getRecipeStepOrNote((allData) ? true : false),
    };
}
