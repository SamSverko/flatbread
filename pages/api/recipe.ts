import { Prisma } from '@prisma/client';

import { prisma } from '../../prisma/db';
import {
    validateQueryParamCookTimeMin,
    validateQueryParamCourseTypes,
    validateQueryParamCuisines,
    validateQueryParamDietaryRestrictions,
    validateQueryParamDishTypes,
    validateQueryParamIngredients,
    validateQueryParamNotes,
    validateQueryParamPrepTimeMin,
    validateQueryParamServingAmount,
    validateQueryParamServingUnit,
    validateQueryParamSlug,
    validateQueryParamSourceName,
    validateQueryParamSourceURL,
    validateQueryParamSteps,
    validateQueryParamTitle,
    validateQueryParamUUID,
} from '../../prisma/utils';

import type { NextApiResponse, NextApiRequest } from 'next';
import type { RecipeIngredient } from '../../prisma/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;
    const {
        title,
        slug,
        sourceName,
        sourceURL,
        prepTimeMin,
        cookTimeMin,
        servingAmount,
        servingUnit,
        courseTypes,
        cuisines,
        dietaryRestrictions,
        dishTypes,
        ingredients,
        steps,
        notes,
    } = req.body;

    const {
        id,
    } = req.query;

    let idValidated,
        titleValidated,
        slugValidated,
        sourceNameValidated,
        sourceURLValidated,
        prepTimeMinValidated,
        cookTimeMinValidated,
        servingAmountValidated,
        servingUnitValidated,
        courseTypesValidated,
        cuisinesValidated,
        dietaryRestrictionsValidated,
        dishTypesValidated,
        ingredientsValidated,
        stepsValidated,
        notesValidated;

    if (method === 'DELETE') {
        // VALIDATION =========================================================
        idValidated = validateQueryParamUUID(res, id);
        if (idValidated === undefined) return;

        // QUERY ==============================================================
        try {
            const recipeIngredients = prisma.recipeIngredient.deleteMany({
                where: {
                    recipeId: idValidated,
                },
            });

            const recipeSteps = prisma.recipeStep.deleteMany({
                where: {
                    recipeId: idValidated,
                },
            });

            const recipeNotes = prisma.recipeNote.deleteMany({
                where: {
                    recipeId: idValidated,
                },
            });

            const recipe = prisma.recipe.delete({
                where: {
                    id: idValidated,
                },
            });

            const transaction = await prisma.$transaction([
                recipeIngredients,
                recipeSteps,
                recipeNotes,
                recipe,
            ]);

            return res.status(200).json(transaction);

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return res.status(400).json({
                    code: error.code,
                    message: error.message,
                });
            } else {
                throw error;
            }
        }
    } else if (method === 'POST') {
        // VALIDATION =========================================================
        titleValidated = validateQueryParamTitle(res, title);
        if (titleValidated === undefined) return;

        slugValidated = validateQueryParamSlug(res, slug);
        if (slugValidated === undefined) return;

        sourceNameValidated = validateQueryParamSourceName(res, sourceName);
        if (sourceNameValidated === undefined) return;

        if (sourceURL) {
            sourceURLValidated = validateQueryParamSourceURL(res, sourceURL);
            if (sourceURLValidated === undefined) return;
        }

        prepTimeMinValidated = validateQueryParamPrepTimeMin(res, prepTimeMin);
        if (prepTimeMinValidated === undefined) return;

        cookTimeMinValidated = validateQueryParamCookTimeMin(res, cookTimeMin);
        if (cookTimeMinValidated === undefined) return;

        servingAmountValidated = validateQueryParamServingAmount(res, servingAmount);
        if (servingAmountValidated === undefined) return;

        servingUnitValidated = validateQueryParamServingUnit(res, servingUnit);
        if (servingUnitValidated === undefined) return;

        courseTypesValidated = validateQueryParamCourseTypes(res, courseTypes);
        if (courseTypesValidated === undefined) return;

        cuisinesValidated = validateQueryParamCuisines(res, cuisines);
        if (cuisinesValidated === undefined) return;

        if (dietaryRestrictions) {
            dietaryRestrictionsValidated = validateQueryParamDietaryRestrictions(res, dietaryRestrictions);
            if (dietaryRestrictionsValidated === undefined) return;
        }

        dishTypesValidated = validateQueryParamDishTypes(res, dishTypes);
        if (dishTypesValidated === undefined) return;

        ingredientsValidated = validateQueryParamIngredients(res, ingredients) as RecipeIngredient[];
        if (ingredientsValidated === undefined) return;

        stepsValidated = validateQueryParamSteps(res, steps);
        if (stepsValidated === undefined) return;

        notesValidated = validateQueryParamNotes(res, notes);
        if (notesValidated === undefined) return;

        // QUERY ==============================================================
        try {
            const recipe = await prisma.recipe.create({
                data: {
                    title: titleValidated,
                    slug: slugValidated,
                    sourceName: sourceNameValidated,
                    sourceURL: sourceURLValidated,
                    prepTimeMin: prepTimeMinValidated,
                    cookTimeMin: cookTimeMinValidated,
                    servingAmount: servingAmountValidated,
                    servingUnit: {
                        connect: {
                            name: servingUnitValidated,
                        },
                    },
                    courseTypes: {
                        connect: (courseTypesValidated).map((courseType) => {
                            return {
                                name: courseType,
                            };
                        }),
                    },
                    cuisines: {
                        connect: (cuisinesValidated).map((cuisine) => {
                            return {
                                name: cuisine,
                            };
                        }),
                    },
                    dietaryRestrictions: dietaryRestrictionsValidated ? {
                        connect: (dietaryRestrictionsValidated).map((dietaryRestriction) => {
                            return {
                                name: dietaryRestriction,
                            };
                        }),
                    } : undefined,
                    dishTypes: {
                        connect: (dishTypesValidated).map((dishType) => {
                            return {
                                name: dishType,
                            };
                        }),
                    },
                    ingredients: {
                        create: (ingredientsValidated).map((recipeIngredient, index) => {
                            return {
                                order: index,
                                section: recipeIngredient.section,
                                quantityWhole: recipeIngredient.quantityWhole,
                                quantityFraction: recipeIngredient.quantityFraction ? {
                                    connect: {
                                        name: recipeIngredient.quantityFraction,
                                    },
                                } : undefined,
                                quantityMinWhole: recipeIngredient.quantityMinWhole,
                                quantityMinFraction: recipeIngredient.quantityMinFraction ? {
                                    connect: {
                                        name: recipeIngredient.quantityMinFraction,
                                    },
                                } : undefined,
                                quantityMaxWhole: recipeIngredient.quantityMaxWhole,
                                quantityMaxFraction: recipeIngredient.quantityMaxFraction ? {
                                    connect: {
                                        name: recipeIngredient.quantityMaxFraction,
                                    },
                                } : undefined,
                                unit: recipeIngredient.unit ? {
                                    connect: {
                                        name: recipeIngredient?.unit,
                                    },
                                } : undefined,
                                name: {
                                    connect: {
                                        name: recipeIngredient.name,
                                    },
                                },
                                alteration: recipeIngredient.alteration,
                                isOptional: recipeIngredient.isOptional,
                                substitutions: {
                                    connect: (recipeIngredient.substitutions).map((substitution) => {
                                        return {
                                            name: substitution,
                                        };
                                    }),
                                },
                            };
                        }),
                    },
                    steps: {
                        createMany: {
                            data: (stepsValidated as Prisma.RecipeStepCreateInput[]).map((recipeStep, index) => {
                                return {
                                    order: index,
                                    section: recipeStep.section,
                                    details: recipeStep.details,
                                };
                            }),
                        },
                    },
                    notes: {
                        createMany: {
                            data: (notesValidated as Prisma.RecipeNoteCreateInput[]).map((recipeNote, index) => {
                                return {
                                    order: index,
                                    section: recipeNote.section,
                                    details: recipeNote.details,
                                };
                            }),
                        },
                    },
                },
                include: {
                    servingUnit: true,
                    courseTypes: true,
                    cuisines: true,
                    dietaryRestrictions: true,
                    dishTypes: true,
                    ingredients: true,
                    steps: true,
                    notes: true,
                },
            });

            return res.status(201).json(recipe);

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return res.status(400).json({
                    code: error.code,
                    message: error.message,
                });
            } else {
                throw error;
            }
        }
    } else if (method === 'PUT') {
        // VALIDATION =========================================================
        idValidated = validateQueryParamUUID(res, id);
        if (idValidated === undefined) return;

        if (title) {
            titleValidated = validateQueryParamTitle(res, title);
            if (titleValidated === undefined) return;
        }

        if (slug) {
            slugValidated = validateQueryParamSlug(res, slug);
            if (slugValidated === undefined) return;
        }

        if (sourceName) {
            sourceNameValidated = validateQueryParamSourceName(res, sourceName);
            if (sourceNameValidated === undefined) return;
        }

        if (sourceURL) {
            sourceURLValidated = validateQueryParamSourceURL(res, sourceURL);
            if (sourceURLValidated === undefined) return;
        }

        if (prepTimeMin) {
            prepTimeMinValidated = validateQueryParamPrepTimeMin(res, prepTimeMin);
            if (prepTimeMinValidated === undefined) return;
        }

        if (cookTimeMin) {
            cookTimeMinValidated = validateQueryParamCookTimeMin(res, cookTimeMin);
            if (cookTimeMinValidated === undefined) return;
        }

        if (servingAmount) {
            servingAmountValidated = validateQueryParamServingAmount(res, servingAmount);
            if (servingAmountValidated === undefined) return;
        }

        if (servingUnit) {
            servingUnitValidated = validateQueryParamServingUnit(res, servingUnit);
            if (servingUnitValidated === undefined) return;
        }

        if (courseTypes) {
            courseTypesValidated = validateQueryParamCourseTypes(res, courseTypes);
            if (courseTypesValidated === undefined) return;
        }

        if (cuisines) {
            cuisinesValidated = validateQueryParamCuisines(res, cuisines);
            if (cuisinesValidated === undefined) return;
        }

        if (dietaryRestrictions) {
            dietaryRestrictionsValidated = validateQueryParamDietaryRestrictions(res, dietaryRestrictions);
            if (dietaryRestrictionsValidated === undefined) return;
        }

        if (dishTypes) {
            dishTypesValidated = validateQueryParamDishTypes(res, dishTypes);
            if (dishTypesValidated === undefined) return;
        }

        if (ingredients) {
            ingredientsValidated = validateQueryParamIngredients(res, ingredients) as RecipeIngredient[];
            if (ingredientsValidated === undefined) return;
        }

        if (steps) {
            stepsValidated = validateQueryParamSteps(res, steps);
            if (stepsValidated === undefined) return;
        }

        if (notes) {
            notesValidated = validateQueryParamNotes(res, notes);
            if (notesValidated === undefined) return;
        }

        // QUERY ==============================================================
        try {
            const recipe = await prisma.recipe.update({
                where: {
                    id: idValidated,
                },
                data: {
                    title: titleValidated,
                    slug: slugValidated,
                    sourceName: sourceNameValidated,
                    sourceURL: sourceURLValidated,
                    prepTimeMin: prepTimeMinValidated,
                    cookTimeMin: cookTimeMinValidated,
                    servingAmount: servingAmountValidated,
                    servingUnit: servingUnitValidated ? {
                        connect: {
                            name: servingUnitValidated,
                        },
                    } : undefined,
                    courseTypes: courseTypesValidated ? {
                        set: [],
                        connect: (courseTypesValidated).map((courseType) => {
                            return {
                                name: courseType,
                            };
                        }),
                    } : undefined,
                    cuisines: cuisinesValidated ? {
                        set: [],
                        connect: (cuisinesValidated).map((cuisine) => {
                            return {
                                name: cuisine,
                            };
                        }),
                    } : undefined,
                    dietaryRestrictions: dietaryRestrictionsValidated ? {
                        set: [],
                        connect: (dietaryRestrictionsValidated).map((dietaryRestriction) => {
                            return {
                                name: dietaryRestriction,
                            };
                        }),
                    } : undefined,
                    dishTypes: dishTypesValidated ? {
                        set: [],
                        connect: (dishTypesValidated).map((dishTypes) => {
                            return {
                                name: dishTypes,
                            };
                        }),
                    } : undefined,
                    ingredients: ingredientsValidated ? {
                        deleteMany: {
                            recipeId: idValidated,
                        },
                        create: (ingredientsValidated).map((recipeIngredient, index) => {
                            return {
                                order: index,
                                section: recipeIngredient.section,
                                quantityWhole: recipeIngredient.quantityWhole,
                                quantityFraction: recipeIngredient.quantityFraction ? {
                                    connect: {
                                        name: recipeIngredient.quantityFraction,
                                    },
                                } : undefined,
                                quantityMinWhole: recipeIngredient.quantityMinWhole,
                                quantityMinFraction: recipeIngredient.quantityMinFraction ? {
                                    connect: {
                                        name: recipeIngredient.quantityMinFraction,
                                    },
                                } : undefined,
                                quantityMaxWhole: recipeIngredient.quantityMaxWhole,
                                quantityMaxFraction: recipeIngredient.quantityMaxFraction ? {
                                    connect: {
                                        name: recipeIngredient.quantityMaxFraction,
                                    },
                                } : undefined,
                                unit: recipeIngredient.unit ? {
                                    connect: {
                                        name: recipeIngredient?.unit,
                                    },
                                } : undefined,
                                name: {
                                    connect: {
                                        name: recipeIngredient.name,
                                    },
                                },
                                alteration: recipeIngredient.alteration,
                                isOptional: recipeIngredient.isOptional,
                                substitutions: {
                                    connect: (recipeIngredient.substitutions).map((substitution) => {
                                        return {
                                            name: substitution,
                                        };
                                    }),
                                },
                            };
                        }),
                    } : undefined,
                    steps: stepsValidated ? {
                        deleteMany: {
                            recipeId: idValidated,
                        },
                        createMany: {
                            data: (stepsValidated as Prisma.RecipeStepCreateInput[]).map((recipeStep, index) => {
                                return {
                                    order: index,
                                    section: recipeStep.section,
                                    details: recipeStep.details,
                                };
                            }),
                        },
                    } : undefined,
                    notes: notesValidated ? {
                        deleteMany: {
                            recipeId: idValidated,
                        },
                        createMany: {
                            data: (notesValidated as Prisma.RecipeNoteCreateInput[]).map((recipeNote, index) => {
                                return {
                                    order: index,
                                    section: recipeNote.section,
                                    details: recipeNote.details,
                                };
                            }),
                        },
                    } : undefined,
                },
                include: {
                    servingUnit: true,
                    courseTypes: true,
                    cuisines: true,
                    dietaryRestrictions: true,
                    dishTypes: true,
                    ingredients: true,
                    steps: true,
                    notes: true,
                },
            });

            return res.status(201).json(recipe);

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return res.status(400).json({
                    code: error.code,
                    message: error.message,
                });
            } else {
                throw error;
            }
        }
    } else {
        const permittedMethods = ['DELETE', 'POST', 'PUT'];
        res.setHeader('Allow', permittedMethods);
        res.status(405).end(`Method \`${method}\` not allowed. Allowed methods: \`${permittedMethods.join('`, `')}\`.`);
    }
}
