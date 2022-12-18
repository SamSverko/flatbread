import { Prisma, PrismaClient } from '@prisma/client';
import { v4 } from 'uuid';

interface RecipeToSeed {
    title: string;
    sourceName: string;
    sourceUrl?: string;
    prepTimeMin: number;
    cookTimeMin: number;
    servingAmount: number;
    servingUnit: {
        name: string;
        namePlural: string;
    };
    courseTypes: {
        name: string;
    }[];
    cuisines: {
        name: string;
    }[];
    dietaryRestrictions: {
        name: string;
    }[];
    dishTypes: {
        name: string;
    }[];
    ingredients: {
        order: number;
        section?: string;
        quantityWhole: number;
        quantityFraction: {
            name: string;
            value: number;
        };
        unit: {
            name: string,
            nameAbbr: string,
            namePlural: string,
        };
        name: {
            name: string,
            namePlural: string,
        };
        alteration?: string;
        isOptional: boolean;
        substitutions: {
            name: string;
            namePlural: string;
        }[];
    }[];
    steps: {
        order: number;
        section?: string;
        details: string;
    }[];
    notes: {
        order: number;
        section?: string;
        details: string;
    }[];
}

const prisma = new PrismaClient();

const recipeServingUnits: Prisma.RecipeServingUnitCreateInput[] = [
    { name: 'bun', namePlural: 'buns' },
    { name: 'cake', namePlural: 'cakes' },
    { name: 'cookie', namePlural: 'cookies' },
    { name: 'cup', namePlural: 'cups' },
    { name: 'dumpling', namePlural: 'dumplings' },
    { name: 'fritter', namePlural: 'fritters' },
    { name: 'loaf', namePlural: 'loaves' },
    { name: 'mini pudding', namePlural: 'mini puddings' },
    { name: 'muffin', namePlural: 'muffins' },
    { name: 'pastry', namePlural: 'pastries' },
    { name: 'pie', namePlural: 'pies' },
    { name: 'pizza', namePlural: 'pizzas' },
    { name: 'scone', namePlural: 'scones' },
    { name: 'serving', namePlural: 'servings' },
    { name: 'square', namePlural: 'squares' },
    { name: 'tortilla', namePlural: 'tortillas' },
];

const recipeCourseTypes: Prisma.RecipeCourseTypeCreateInput[] = [
    { name: 'breakfast' },
    { name: 'breakfast' },
    { name: 'brunch' },
    { name: 'dessert' },
    { name: 'dinner' },
    { name: 'homemade' },
    { name: 'lunch' },
    { name: 'side' },
    { name: 'snack' },
];

const recipeCuisines: Prisma.RecipeCuisineCreateInput[] = [
    { name: 'american' },
    { name: 'asian' },
    { name: 'belgian' },
    { name: 'cajun' },
    { name: 'canadian' },
    { name: 'chinese' },
    { name: 'english' },
    { name: 'filipino' },
    { name: 'french' },
    { name: 'german' },
    { name: 'greek' },
    { name: 'hawaiian' },
    { name: 'indian' },
    { name: 'irish' },
    { name: 'italian' },
    { name: 'japanese' },
    { name: 'korean' },
    { name: 'lebanese' },
    { name: 'mediterranean' },
    { name: 'mexican' },
    { name: 'scottish' },
    { name: 'syrian' },
    { name: 'taiwanese' },
    { name: 'thai' },
    { name: 'tunisian' },
    { name: 'turkish' },
];

const recipeDietaryRestrictions: Prisma.RecipeDietaryRestrictionCreateInput[] = [
    { name: 'dairy-free' },
    { name: 'gluten-free' },
    { name: 'nut-free' },
    { name: 'vegan' },
    { name: 'vegetarian' },
];

const recipeDishTypes: Prisma.RecipeDishTypeCreateInput[] = [
    { name: 'bread' },
    { name: 'cake' },
    { name: 'confection' },
    { name: 'cookie' },
    { name: 'dip' },
    { name: 'dough' },
    { name: 'drink' },
    { name: 'main' },
    { name: 'meat' },
    { name: 'muffin' },
    { name: 'pasta' },
    { name: 'pastry' },
    { name: 'pie' },
    { name: 'pizza' },
    { name: 'potato' },
    { name: 'salad' },
    { name: 'sandwich' },
    { name: 'sauce' },
    { name: 'seafood' },
    { name: 'soup' },
    { name: 'stir Fry' },
    { name: 'vegetable' },
    { name: 'wrap' },
];

const recipeIngredientQuantityFractions: Prisma.RecipeIngredientQuantityFractionCreateInput[] = [
    { name: '0', value: 0 },
    { name: '⅒', value: 0.1 },
    { name: '⅑', value: 0.111 },
    { name: '⅛', value: 0.125 },
    { name: '⅐', value: 0.143 },
    { name: '⅙', value: 0.167 },
    { name: '⅕', value: 0.2 },
    { name: '¼', value: 0.25 },
    { name: '⅓', value: 0.333 },
    { name: '⅜', value: 0.375 },
    { name: '⅖', value: 0.4 },
    { name: '½', value: 0.5 },
    { name: '⅗', value: 0.6 },
    { name: '⅝', value: 0.625 },
    { name: '⅔', value: 0.667 },
    { name: '¾', value: 0.75 },
    { name: '⅘', value: 0.8 },
    { name: '⅚', value: 0.833 },
    { name: '⅞', value: 0.875 },
];

const recipeIngredientUnits: Prisma.RecipeIngredientUnitCreateInput[] = [
    { name: 'cup', nameAbbr: 'c', namePlural: 'cups' },
    { name: 'gram', nameAbbr: 'g', namePlural: 'grams' },
    { name: 'litre', nameAbbr: 'L', namePlural: 'litres' },
    { name: 'millilitre', nameAbbr: 'mL', namePlural: 'millilitres' },
    { name: 'pound', nameAbbr: 'lb', namePlural: 'pounds' },
    { name: 'tablespoon', nameAbbr: 'tbsp', namePlural: 'tablespoons' },
    { name: 'teaspoon', nameAbbr: 'tsp', namePlural: 'teaspoons' },
];

/* recipes used:
- https://www.flatbread.app/?recipe=nanaimo-bars
- https://www.flatbread.app/?recipe=thick-and-creamy-chicken-noodle-soup
- https://www.flatbread.app/?recipe=marcella-hazans-tomato-sauce
- https://www.flatbread.app/?recipe=slow-cooker-ratatouille
*/
const recipeIngredientNames: Prisma.RecipeIngredientNameCreateInput[] = [
    { name: '(900 mL package) sodium-reduced chicken broth', namePlural: '(900 mL package) sodium-reduced chicken broth' },
    { name: '(175 mL can) pitted ripe olives', namePlural: '(175 mL can) pitted ripe olives' },
    { name: '(175 mL can) tomato paste', namePlural: '(175 mL can) tomato paste' },
    { name: 'all-purpose flour', namePlural: 'all-purpose flour' },
    { name: 'almonds', namePlural: 'almonds' },
    { name: 'boneless skinless chicken breast', namePlural: 'boneless skinless chicken breasts' },
    { name: 'broad egg noodles', namePlural: 'broad egg noodles' },
    { name: 'butter', namePlural: 'butter' },
    { name: 'carrot', namePlural: 'carrots' },
    { name: 'celery rib', namePlural: 'celery ribs' },
    { name: 'custard powder', namePlural: 'custard powder' },
    { name: 'egg', namePlural: 'eggs' },
    { name: 'eggplant', namePlural: 'eggplants' },
    { name: 'fresh basil', namePlural: 'fresh basil' },
    { name: 'fresh parsley', namePlural: 'fresh parsley' },
    { name: 'fresh thyme', namePlural: 'fresh thyme' },
    { name: 'frozen peas', namePlural: 'frozen-peas' },
    { name: 'garlic clove', namePlural: 'garlic cloves' },
    { name: 'graham cracker crumbs', namePlural: 'graham cracker crumbs' },
    { name: 'green pepper', namePlural: 'green peppers' },
    { name: 'icing sugar', namePlural: 'icing sugar' },
    { name: 'milk', namePlural: 'milk' },
    { name: 'olive oil', namePlural: 'olive oil' },
    { name: 'onion', namePlural: 'onions' },
    { name: 'pepper', namePlural: 'pepper' },
    { name: 'salt', namePlural: 'salt' },
    { name: 'semi-sweet chocolate chips', namePlural: 'semi-sweet chocolate chips' },
    { name: 'sweetened shredded coconut', namePlural: 'sweetened shredded coconut' },
    { name: 'tomato', namePlural: 'tomatoes' },
    { name: 'unsalted butter', namePlural: 'unsalted butter' },
    { name: 'vanilla extract', namePlural: 'vanilla extract' },
    { name: 'whipping cream (35%)', namePlural: 'whipping cream (35%)' },
    { name: 'yellow pepper', namePlural: 'yellow peppers' },
    { name: 'zucchini', namePlural: 'zucchini' },
];

// https://www.flatbread.app/?recipe=nanaimo-bars
const recipeNanaimoBars: RecipeToSeed = {
    title: 'Nanaimo Bars',
    sourceName: 'Mary-Ann Derocher',
    prepTimeMin: 30,
    cookTimeMin: 10,
    servingAmount: 25,
    servingUnit: {
        name: 'square',
        namePlural: 'squares',
    },
    courseTypes: [
        { name: 'dessert' },
        { name: 'snack' },
    ],
    cuisines: [
        { name: 'canadian' },
    ],
    dietaryRestrictions: [
        { name: 'vegetarian' },
    ],
    dishTypes: [
        { name: 'confection' },
    ],
    ingredients: [ // ⅒ ⅑ ⅛ ⅐ ⅙ ⅕ ¼ ⅓ ⅜ ⅖ ½ ⅗ ⅝ ⅔ ¾ ⅘ ⅚ ⅞
        {
            order: 1,
            section: '1st Layer',
            quantityWhole: 0,
            quantityFraction: {
                name: '¼',
                value: 0.25,
            },
            unit: {
                name: 'cup',
                nameAbbr: 'c',
                namePlural: 'cups',
            },
            name: {
                name: 'unsalted butter',
                namePlural: 'unsalted butter',
            },
            isOptional: false,
            substitutions: [
                { name: 'butter', namePlural: 'butter' },
            ],
        },
        {
            order: 2,
            section: '1st Layer',
            quantityWhole: 0,
            quantityFraction: {
                name: '⅔',
                value: 0.667,
            },
            unit: {
                name: 'cup',
                nameAbbr: 'c',
                namePlural: 'cups',
            },
            name: {
                name: 'semi-sweet chocolate chips',
                namePlural: 'semi-sweet chocolate chips',
            },
            isOptional: false,
            substitutions: [],
        },
    ],
    steps: [
        { order: 1, section: '1st Layer', details: 'AAAMelt chocolate chips and butter over low heat, cool slightly. Add remaining ingredients and mix well. Press into 8-inch greased pan.' },
        { order: 2, section: '2nd Layer', details: '2nd Layer: Mix well and spread over 1st Layer.' },
        { order: 3, section: '3rd Layer', details: 'Melt chocolate chips and butter. Spread over 2nd Layer and swirl.' },
        { order: 4, details: 'Cool in fridge, then cut in squares, and store in fridge.' },
    ],
    notes: [
        { order: 1, details: 'Squares should last a week in the fridge. Always keep refrigerated.' },
    ],
};

function logCompletedSeed(tableName: string) {
    console.log(`🌱 table: ${tableName}`);
}

async function seedDB() {
    // RecipeCourseType
    await prisma.$transaction(
        recipeCourseTypes.map(courseType => {
            const recipeCourseType = {
                name: courseType.name,
            };

            return prisma.recipeCourseType.upsert({
                where: {
                    name: recipeCourseType.name,
                },
                update: recipeCourseType,
                create: recipeCourseType,
            });
        }),
    );
    logCompletedSeed('RecipeCourseType');

    // RecipeCuisine
    await prisma.$transaction(
        recipeCuisines.map(cuisine => {
            const recipeCuisine = {
                name: cuisine.name,
            };

            return prisma.recipeCuisine.upsert({
                where: {
                    name: recipeCuisine.name,
                },
                update: recipeCuisine,
                create: recipeCuisine,
            });
        }),
    );
    logCompletedSeed('RecipeCuisine');

    // RecipeDietaryRestriction
    await prisma.$transaction(
        recipeDietaryRestrictions.map(dietaryRestriction => {
            const recipeDietaryRestriction = {
                name: dietaryRestriction.name,
            };

            return prisma.recipeDietaryRestriction.upsert({
                where: {
                    name: recipeDietaryRestriction.name,
                },
                update: recipeDietaryRestriction,
                create: recipeDietaryRestriction,
            });
        }),
    );
    logCompletedSeed('RecipeDietaryRestriction');

    // RecipeDishType
    await prisma.$transaction(
        recipeDishTypes.map(dishType => {
            const recipeDishType = {
                name: dishType.name,
            };

            return prisma.recipeDishType.upsert({
                where: {
                    name: recipeDishType.name,
                },
                update: recipeDishType,
                create: recipeDishType,
            });
        }),
    );
    logCompletedSeed('RecipeDishType');

    // RecipeServingUnit
    await prisma.$transaction(
        recipeServingUnits.map(servingUnit => {
            const recipeServingUnit = {
                name: servingUnit.name,
                namePlural: servingUnit.namePlural,
            };

            return prisma.recipeServingUnit.upsert({
                where: {
                    name: servingUnit.name,
                },
                update: recipeServingUnit,
                create: recipeServingUnit,
            });
        }),
    );
    logCompletedSeed('RecipeServingUnit');

    // RecipeIngredientQuantityFraction
    await prisma.$transaction(
        recipeIngredientQuantityFractions.map(ingredientQuantityFraction => {
            const recipeIngredientQuantityFraction = {
                name: ingredientQuantityFraction.name,
                value: ingredientQuantityFraction.value,
            };

            return prisma.recipeIngredientQuantityFraction.upsert({
                where: {
                    name: ingredientQuantityFraction.name,
                },
                update: recipeIngredientQuantityFraction,
                create: recipeIngredientQuantityFraction,
            });
        }),
    );
    logCompletedSeed('RecipeIngredientQuantityFraction');

    // RecipeIngredientUnit
    await prisma.$transaction(
        recipeIngredientUnits.map(ingredientUnit => {
            const recipeIngredientUnit = {
                name: ingredientUnit.name,
                nameAbbr: ingredientUnit.nameAbbr,
                namePlural: ingredientUnit.namePlural,
            };

            return prisma.recipeIngredientUnit.upsert({
                where: {
                    name: ingredientUnit.name,
                },
                update: recipeIngredientUnit,
                create: recipeIngredientUnit,
            });
        }),
    );
    logCompletedSeed('RecipeIngredientUnit');

    // RecipeIngredientName
    await prisma.$transaction(
        recipeIngredientNames.map(ingredientName => {
            const recipeIngredient = {
                name: ingredientName.name,
                namePlural: ingredientName.namePlural,
            };

            return prisma.recipeIngredientName.upsert({
                where: {
                    name: ingredientName.name,
                },
                update: recipeIngredient,
                create: recipeIngredient,
            });
        }),
    );
    logCompletedSeed('RecipeIngredientName');

    // Recipe - https://www.flatbread.app/?recipe=nanaimo-bars
    const DoesRecipeNanaimoBarsExist = await prisma.recipe.findUnique({
        where: {
            recipe_identifier: {
                title: recipeNanaimoBars.title,
                sourceName: recipeNanaimoBars.sourceName,
            },
        },
        select: {
            id: true,
        },
    });

    const nanaimoBarsRecipeId: string = (DoesRecipeNanaimoBarsExist) ? DoesRecipeNanaimoBarsExist.id : v4();

    await prisma.recipe.upsert({
        where: {
            id: nanaimoBarsRecipeId,
        },
        update: {
            title: recipeNanaimoBars.title,
            sourceName: recipeNanaimoBars.sourceName,
            sourceURL: recipeNanaimoBars.sourceUrl,
            prepTimeMin: recipeNanaimoBars.prepTimeMin,
            cookTimeMin: recipeNanaimoBars.cookTimeMin,
            servingAmount: recipeNanaimoBars.servingAmount,
            servingUnit: {
                connect: {
                    name: recipeNanaimoBars.servingUnit.name,
                },
            },
        },
        create: {
            title: recipeNanaimoBars.title,
            sourceName: recipeNanaimoBars.sourceName,
            sourceURL: recipeNanaimoBars.sourceUrl,
            prepTimeMin: recipeNanaimoBars.prepTimeMin,
            cookTimeMin: recipeNanaimoBars.cookTimeMin,
            servingAmount: recipeNanaimoBars.servingAmount,
            servingUnit: {
                connect: {
                    name: recipeNanaimoBars.servingUnit.name,
                },
            },
            courseTypes: {
                connect: (recipeNanaimoBars.courseTypes as Prisma.RecipeCourseTypeCreateInput[]).map((courseType) => {
                    return {
                        name: courseType.name,
                    };
                }),
            },
            cuisines: {
                connect: (recipeNanaimoBars.cuisines as Prisma.RecipeCuisineCreateInput[]).map((cuisine) => {
                    return {
                        name: cuisine.name,
                    };
                }),
            },
            dietaryRestrictions: {
                connect: (recipeNanaimoBars.dietaryRestrictions as Prisma.RecipeCuisineCreateInput[]).map((dietaryRestriction) => {
                    return {
                        name: dietaryRestriction.name,
                    };
                }),
            },
            dishTypes: {
                connect: (recipeNanaimoBars.dishTypes as Prisma.RecipeCuisineCreateInput[]).map((dishType) => {
                    return {
                        name: dishType.name,
                    };
                }),
            },
            ingredients: { // SHOULD BE UPSERT??
                connectOrCreate: (recipeNanaimoBars.ingredients).map((recipeIngredient, index) => {
                    return {
                        where: {
                            recipe_ingredient_identifier: {
                                order: index,
                                recipeId: nanaimoBarsRecipeId,
                            },
                        },
                        create: {
                            order: index,
                            section: recipeIngredient.section,
                            quantityWhole: recipeIngredient.quantityWhole,
                            quantityFraction:  {
                                connectOrCreate: { // SHOULD BE CONNECT
                                    where: {
                                        name: recipeIngredient.quantityFraction.name,
                                    },
                                    create: {
                                        name: recipeIngredient.quantityFraction.name,
                                        value: recipeIngredient.quantityFraction.value,
                                    },
                                },
                            },
                            unit: {
                                connectOrCreate: { // SHOULD BE CONNECT
                                    where: {
                                        name: recipeIngredient.unit.name,
                                    },
                                    create: {
                                        name: recipeIngredient.unit.name,
                                        nameAbbr: recipeIngredient.unit.nameAbbr,
                                        namePlural: recipeIngredient.unit.namePlural,
                                    },
                                },
                            },
                            name: {
                                connectOrCreate: { // SHOULD BE CONNECT
                                    where: {
                                        name: recipeIngredient.name.name,
                                    },
                                    create: {
                                        name: recipeIngredient.name.name,
                                        namePlural: recipeIngredient.name.namePlural,
                                    },
                                },
                            },
                            alteration: recipeIngredient.alteration,
                            isOptional: recipeIngredient.isOptional,
                            substitutions: { // SHOULD BE CONNECT
                                connectOrCreate: (recipeIngredient.substitutions).map((substitution) => {
                                    return {
                                        where: {
                                            name: substitution.name,
                                        },
                                        create: {
                                            name: substitution.name,
                                            namePlural: substitution.namePlural,
                                        },
                                    };
                                }),
                            },
                        },
                    };
                }),
            },
            steps: {
                createMany: {
                    data: (recipeNanaimoBars.steps as Prisma.RecipeStepCreateInput[]).map((recipeStep) => {
                        return {
                            order: recipeStep.order,
                            section: recipeStep.section,
                            details: recipeStep.details,
                        };
                    }),
                },
            },
            notes: {
                createMany: {
                    data: (recipeNanaimoBars.notes as Prisma.RecipeNoteCreateInput[]).map((recipeNote) => {
                        return {
                            order: recipeNote.order,
                            section: recipeNote.section,
                            details: recipeNote.details,
                        };
                    }),
                },
            },
        },
    });
    logCompletedSeed('Recipe');
}

seedDB()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });
