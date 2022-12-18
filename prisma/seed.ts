import { Prisma, PrismaClient } from '@prisma/client';
import { v4 } from 'uuid';

interface RecipeToSeed {
    title: string;
    sourceName: string;
    sourceUrl?: string;
    prepTimeMin: number;
    cookTimeMin: number;
    servingAmount: number;
    servingUnit: string;
    courseTypes: string[];
    cuisines: string[];
    dietaryRestrictions: string[];
    dishTypes: string[];
    ingredients: {
        section?: string;
        quantityWhole?: number;
        quantityFraction?: string;
        quantityMinWhole?: number;
        quantityMinFraction?: string;
        quantityMaxWhole?: number;
        quantityMaxFraction?: string;
        unit?: string;
        name: string;
        alteration?: string;
        isOptional: boolean;
        substitutions: string[];
    }[];
    steps: {
        section?: string;
        details: string;
    }[];
    notes: {
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
    { name: 'stir fry' },
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
    { name: 'nuts', namePlural: 'nuts' },
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

const recipeNanaimoBars: RecipeToSeed = {
    title: 'Nanaimo Bars',
    sourceName: 'Mary-Ann Derocher',
    prepTimeMin: 30,
    cookTimeMin: 10,
    servingAmount: 25,
    servingUnit: 'square',
    courseTypes: ['dessert', 'snack'],
    cuisines: ['canadian'],
    dietaryRestrictions: ['vegetarian'],
    dishTypes: ['confection'],
    ingredients: [ // ⅒ ⅑ ⅛ ⅐ ⅙ ⅕ ¼ ⅓ ⅜ ⅖ ½ ⅗ ⅝ ⅔ ¾ ⅘ ⅚ ⅞
        {
            section: '1st Layer',
            quantityFraction: '¼',
            unit: 'cup',
            name: 'unsalted butter',
            isOptional: false,
            substitutions: ['butter'],
        },
        {
            section: '1st Layer',
            quantityFraction: '⅔',
            unit: 'cup',
            name: 'semi-sweet chocolate chips',
            isOptional: false,
            substitutions: [],
        },
        {
            section: '1st Layer',
            quantityWhole: 1,
            unit: 'teaspoon',
            name: 'vanilla extract',
            isOptional: false,
            substitutions: [],
        },
        {
            section: '1st Layer',
            quantityWhole: 1,
            name: 'egg',
            isOptional: false,
            substitutions: [],
        },
        {
            section: '1st Layer',
            quantityFraction: '¼',
            unit: 'teaspoon',
            name: 'salt',
            isOptional: false,
            substitutions: [],
        },
        {
            section: '1st Layer',
            quantityWhole: 1,
            unit: 'cup',
            name: 'sweetened shredded coconut',
            isOptional: false,
            substitutions: [],
        },
        {
            section: '1st Layer',
            quantityWhole: 2,
            unit: 'cup',
            name: 'graham cracker crumbs',
            isOptional: false,
            substitutions: [],
        },
        {
            section: '1st Layer',
            quantityWhole: 1,
            unit: 'cup',
            name: 'nuts',
            alteration: 'chopped',
            isOptional: true,
            substitutions: [],
        },
        {
            section: '2nd Layer',
            quantityWhole: 3,
            unit: 'tablespoon',
            name: 'unsalted butter',
            alteration: 'softened',
            isOptional: false,
            substitutions: [],
        },
        {
            section: '2nd Layer',
            quantityWhole: 1,
            unit: 'cup',
            name: 'icing sugar',
            isOptional: false,
            substitutions: [],
        },
        {
            section: '2nd Layer',
            quantityWhole: 3,
            unit: 'tablespoon',
            name: 'custard powder',
            isOptional: false,
            substitutions: [],
        },
        {
            section: '2nd Layer',
            quantityFraction: '½',
            unit: 'teaspoon',
            name: 'vanilla extract',
            isOptional: false,
            substitutions: [],
        },
        {
            section: '2nd Layer',
            quantityMinWhole: 2,
            quantityMaxWhole: 3,
            unit: 'tablespoon',
            name: 'milk',
            isOptional: false,
            substitutions: [],
        },
        {
            section: '3nd Layer',
            quantityFraction: '⅔',
            unit: 'cup',
            name: 'semi-sweet chocolate chips',
            isOptional: false,
            substitutions: [],
        },
        {
            section: '3rd Layer',
            quantityMinWhole: 2,
            quantityMaxWhole: 3,
            unit: 'tablespoon',
            name: 'milk',
            isOptional: false,
            substitutions: [],
        },
    ],
    steps: [
        { section: '1st Layer', details: 'Melt chocolate chips and butter over low heat, cool slightly. Add remaining ingredients and mix well. Press into 8-inch greased pan.' },
        { section: '2nd Layer', details: '2nd Layer: Mix well and spread over 1st Layer.' },
        { section: '3rd Layer', details: 'Melt chocolate chips and butter. Spread over 2nd Layer and swirl.' },
        { details: 'Cool in fridge, then cut in squares, and store in fridge.' },
    ],
    notes: [
        { details: 'Squares should last a week in the fridge. Always keep refrigerated.' },
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
        update: {},
        create: {
            title: recipeNanaimoBars.title,
            sourceName: recipeNanaimoBars.sourceName,
            sourceURL: recipeNanaimoBars.sourceUrl,
            prepTimeMin: recipeNanaimoBars.prepTimeMin,
            cookTimeMin: recipeNanaimoBars.cookTimeMin,
            servingAmount: recipeNanaimoBars.servingAmount,
            servingUnit: {
                connect: {
                    name: recipeNanaimoBars.servingUnit,
                },
            },
            courseTypes: {
                connect: (recipeNanaimoBars.courseTypes).map((courseType) => {
                    return {
                        name: courseType,
                    };
                }),
            },
            cuisines: {
                connect: (recipeNanaimoBars.cuisines).map((cuisine) => {
                    return {
                        name: cuisine,
                    };
                }),
            },
            dietaryRestrictions: {
                connect: (recipeNanaimoBars.dietaryRestrictions).map((dietaryRestriction) => {
                    return {
                        name: dietaryRestriction,
                    };
                }),
            },
            dishTypes: {
                connect: (recipeNanaimoBars.dishTypes).map((dishType) => {
                    return {
                        name: dishType,
                    };
                }),
            },
            ingredients: {
                create: (recipeNanaimoBars.ingredients).map((recipeIngredient, index) => {
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
                    data: (recipeNanaimoBars.steps as Prisma.RecipeStepCreateInput[]).map((recipeStep, index) => {
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
                    data: (recipeNanaimoBars.notes as Prisma.RecipeNoteCreateInput[]).map((recipeNote, index) => {
                        return {
                            order: index,
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
