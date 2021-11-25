import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const recipes = await prisma.recipe.findMany({
            select: {
                name: true,
                sourceName: true,
                sourceUrl: true,
                yieldAmount: true,
                yieldUnit: {
                    select: {
                        singular: true,
                        plural: true,
                    },
                },
                timePrepMins: true,
                timeCookMins: true,
                courseTypes: {
                    orderBy: {
                        courseType: {
                            name: 'asc',
                        },
                    },
                    select: {
                        courseType: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
                cuisines: {
                    orderBy: {
                        cuisine: {
                            name: 'asc',
                        },
                    },
                    select: {
                        cuisine: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
                dietaryRestrictions: {
                    orderBy: {
                        dietaryRestriction: {
                            name: 'asc',
                        },
                    },
                    select: {
                        dietaryRestriction: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
                dishTypes: {
                    orderBy: {
                        dishType: {
                            name: 'asc',
                        },
                    },
                    select: {
                        dishType: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
                recipeIngredients: {
                    orderBy: {
                        placement: 'asc',
                    },
                    select: {
                        section: true,
                        amount: true,
                        unit: {
                            select: {
                                singular: true,
                                singularShort: true,
                                plural: true,
                                pluralShort: true,
                            },
                        },
                        isUnitPlural: true,
                        name: {
                            select: {
                                singular: true,
                                plural: true,
                            },
                        },
                        isNamePlural: true,
                        alteration: {
                            select: {
                                name: true,
                            },
                        },
                        RecipesIngredientsSubstitutions: {
                            select: {
                                ingredientName: {
                                    select: {
                                        singular: true,
                                        plural: true,
                                    },
                                },
                            },
                        },
                    },
                },
                recipeSteps: {
                    orderBy: {
                        placement: 'asc',
                    },
                    select: {
                        section: true,
                        description: true,
                    },
                },
            },
        });

        res.status(200).json(recipes);
    } catch(error) {
        res.status(500).json({ error: (error as Error).message });
    }
}
