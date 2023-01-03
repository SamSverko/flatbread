import { Prisma } from '@prisma/client';

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
        courseTypes: {
            select: {
                id: (allData) ? true : false,
                createdAt: (allData) ? true : false,
                name: true,
            },
        },
        cuisines: {
            select: {
                id: (allData) ? true : false,
                createdAt: (allData) ? true : false,
                name: true,
            },
        },
        dietaryRestrictions: {
            select: {
                id: (allData) ? true : false,
                createdAt: (allData) ? true : false,
                name: true,
            },
        },
        dishTypes: {
            select: {
                id: (allData) ? true : false,
                createdAt: (allData) ? true : false,
                name: true,
            },
        },
        ingredients: {
            select: {
                id: (allData) ? true : false,
                createdAt: (allData) ? true : false,
                order: true,
                section: true,
                quantityWhole: true,
                quantityFraction: {
                    select: {
                        id: (allData) ? true : false,
                        createdAt: (allData) ? true : false,
                        name: true,
                        value: true,
                    },
                },
                quantityFractionId: (allData) ? true : false,
                quantityMinWhole: true,
                quantityMinFraction: {
                    select: {
                        id: (allData) ? true : false,
                        createdAt: (allData) ? true : false,
                        name: true,
                        value: true,
                    },
                },
                quantityMinFractionId: (allData) ? true : false,
                quantityMaxWhole: true,
                quantityMaxFraction: {
                    select: {
                        id: (allData) ? true : false,
                        createdAt: (allData) ? true : false,
                        name: true,
                        value: true,
                    },
                },
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
                name: {
                    select: {
                        id: (allData) ? true : false,
                        createdAt: (allData) ? true : false,
                        name: true,
                        namePlural: true,
                    },
                },
                nameId: (allData) ? true : false,
                alteration: true,
                isOptional: true,
                substitutions: {
                    select: {
                        id: (allData) ? true : false,
                        createdAt: (allData) ? true : false,
                        name: true,
                        namePlural: true,
                    },
                },
            },
            orderBy: {
                order: 'asc',
            },
        },
        steps: {
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
        },
        notes: {
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
        },
    };
}
