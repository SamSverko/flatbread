import { Prisma, PrismaClient } from '@prisma/client';
import { v4 } from 'uuid';

import type { RecipeToSeed } from './types';

const prisma = new PrismaClient();

const servingUnits: Prisma.ServingUnitCreateInput[] = [
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

const courseTypes: Prisma.CourseTypeCreateInput[] = [
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

const cuisines: Prisma.CuisineCreateInput[] = [
    { name: 'American' },
    { name: 'Asian' },
    { name: 'Belgian' },
    { name: 'Cajun' },
    { name: 'Canadian' },
    { name: 'Chinese' },
    { name: 'English' },
    { name: 'Filipino' },
    { name: 'French' },
    { name: 'German' },
    { name: 'Greek' },
    { name: 'Hawaiian' },
    { name: 'Indian' },
    { name: 'Irish' },
    { name: 'Italian' },
    { name: 'Japanese' },
    { name: 'Korean' },
    { name: 'Lebanese' },
    { name: 'Mediterranean' },
    { name: 'Mexican' },
    { name: 'Scottish' },
    { name: 'Syrian' },
    { name: 'Taiwanese' },
    { name: 'Thai' },
    { name: 'Tunisian' },
    { name: 'Turkish' },
];

const dietaryRestrictions: Prisma.DietaryRestrictionCreateInput[] = [
    { name: 'dairy-free' },
    { name: 'gluten-free' },
    { name: 'nut-free' },
    { name: 'vegan' },
    { name: 'vegetarian' },
];

const dishTypes: Prisma.DishTypeCreateInput[] = [
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

const quantityFractions: Prisma.QuantityFractionCreateInput[] = [
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

const ingredientUnits: Prisma.IngredientUnitCreateInput[] = [
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
- https://www.flatbread.app/?recipe=tabbouleh
*/
const ingredients: Prisma.IngredientCreateInput[] = [
    { name: 'all-purpose flour', namePlural: 'all-purpose flour' },
    { name: 'almonds', namePlural: 'almonds' },
    { name: 'apple cider vinegar', namePlural: 'apple cider vinegar' },
    { name: 'boneless skinless chicken breast', namePlural: 'boneless skinless chicken breasts' },
    { name: 'broad egg noodles', namePlural: 'broad egg noodles' },
    { name: 'butter', namePlural: 'butter' },
    { name: 'carrot', namePlural: 'carrots' },
    { name: 'celery rib', namePlural: 'celery ribs' },
    { name: 'custard powder', namePlural: 'custard powder' },
    { name: 'egg', namePlural: 'eggs' },
    { name: 'eggplant', namePlural: 'eggplants' },
    { name: 'extra-virgin olive oil', namePlural: 'extra-virgin olive oil' },
    { name: 'fresh basil', namePlural: 'fresh basil' },
    { name: 'fresh parsley', namePlural: 'fresh parsley' },
    { name: 'fresh thyme', namePlural: 'fresh thyme' },
    { name: 'frozen peas', namePlural: 'frozen-peas' },
    { name: 'garlic clove', namePlural: 'garlic cloves' },
    { name: 'garlic powder', namePlural: 'garlic powder' },
    { name: 'graham cracker crumbs', namePlural: 'graham cracker crumbs' },
    { name: 'green pepper', namePlural: 'green peppers' },
    { name: 'icing sugar', namePlural: 'icing sugar' },
    { name: 'lemon juice', namePlural: 'lemon juice' },
    { name: 'milk', namePlural: 'milk' },
    { name: 'nuts', namePlural: 'nuts' },
    { name: 'olive oil', namePlural: 'olive oil' },
    { name: 'onion', namePlural: 'onions' },
    { name: 'oregano', namePlural: 'oregano' },
    { name: 'parsley', namePlural: 'parsley' },
    { name: 'pepper', namePlural: 'pepper' },
    { name: 'pitted ripe olives', namePlural: 'pitted ripe olives' },
    { name: 'salt', namePlural: 'salt' },
    { name: 'semi-sweet chocolate chips', namePlural: 'semi-sweet chocolate chips' },
    { name: 'sodium-reduced chicken broth', namePlural: 'sodium-reduced chicken broth' },
    { name: 'sumac', namePlural: 'sumac' },
    { name: 'sweetened shredded coconut', namePlural: 'sweetened shredded coconut' },
    { name: 'tomato', namePlural: 'tomatoes' },
    { name: 'tomato paste', namePlural: 'tomato paste' },
    { name: 'unsalted butter', namePlural: 'unsalted butter' },
    { name: 'vanilla extract', namePlural: 'vanilla extract' },
    { name: 'whipping cream (35%)', namePlural: 'whipping cream (35%)' },
    { name: 'yellow pepper', namePlural: 'yellow peppers' },
    { name: 'zucchini', namePlural: 'zucchini' },
];

const recipeNanaimoBars: RecipeToSeed = {
    title: 'Nanaimo Bars',
    slug: 'nanaimo-bars',
    sourceName: 'Mary-Ann Derocher',
    prepTimeMin: 30,
    cookTimeMin: 10,
    servingAmount: 25,
    servingUnit: 'square',
    courseTypes: ['dessert', 'snack'],
    cuisines: ['Canadian'],
    dietaryRestrictions: ['vegetarian'],
    dishTypes: ['confection'],
    ingredients: [ // ⅒ ⅑ ⅛ ⅐ ⅙ ⅕ ¼ ⅓ ⅜ ⅖ ½ ⅗ ⅝ ⅔ ¾ ⅘ ⅚ ⅞
        {
            section: '1st Layer',
            quantityFraction: '¼',
            unit: 'cup',
            name: 'unsalted butter',
            isOptional: false,
            substitutions: [],
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
validateRecipe(recipeNanaimoBars);

const recipeChickenNoodleSoup: RecipeToSeed = {
    title: 'Thick and Creamy Chicken Noodle Soup',
    slug: 'thick-and-creamy-chicken-noodle-soup',
    sourceName: 'Canadian Living',
    sourceUrl: 'https://www.canadianliving.com/food/lunch-and-dinner/recipe/thick-and-creamy-chicken-noodle-soup',
    prepTimeMin: 30,
    cookTimeMin: 30,
    servingAmount: 4,
    servingUnit: 'serving',
    courseTypes: ['dinner', 'lunch'],
    cuisines: ['Canadian'],
    dietaryRestrictions: ['nut-free'],
    dishTypes: ['soup'],
    ingredients: [ // ⅒ ⅑ ⅛ ⅐ ⅙ ⅕ ¼ ⅓ ⅜ ⅖ ½ ⅗ ⅝ ⅔ ¾ ⅘ ⅚ ⅞
        {
            quantityWhole: 2,
            unit: 'teaspoon',
            name: 'olive oil',
            isOptional: false,
            substitutions: ['extra-virgin olive oil'],
        },
        {
            quantityWhole: 1,
            name: 'onion',
            alteration: 'diced',
            isOptional: false,
            substitutions: [],
        },
        {
            quantityWhole: 1,
            name: 'carrot',
            alteration: 'halved lengthwise and thinly sliced crosswise',
            isOptional: false,
            substitutions: [],
        },
        {
            quantityWhole: 1,
            name: 'celery rib',
            alteration: 'chopped',
            isOptional: false,
            substitutions: [],
        },
        {
            quantityWhole: 1,
            name: 'garlic clove',
            alteration: 'minced',
            isOptional: false,
            substitutions: [],
        },
        {
            quantityWhole: 1,
            unit: 'teaspoon',
            name: 'fresh thyme',
            alteration: 'chopped',
            isOptional: false,
            substitutions: [],
        },
        {
            quantityFraction: '¼',
            unit: 'teaspoon',
            name: 'salt',
            isOptional: false,
            substitutions: [],
        },
        {
            quantityFraction: '¼',
            unit: 'teaspoon',
            name: 'pepper',
            isOptional: false,
            substitutions: [],
        },
        {
            quantityWhole: 900,
            unit: 'millilitre',
            name: 'sodium-reduced chicken broth',
            isOptional: false,
            substitutions: [],
        },
        {
            quantityWhole: 2,
            name: 'boneless skinless chicken breast',
            isOptional: false,
            substitutions: [],
        },
        {
            quantityWhole: 2,
            unit: 'cup',
            name: 'broad egg noodles',
            isOptional: false,
            substitutions: [],
        },
        {
            quantityFraction: '¼',
            unit: 'cup',
            name: 'whipping cream (35%)',
            isOptional: false,
            substitutions: [],
        },
        {
            quantityWhole: 3,
            unit: 'tablespoon',
            name: 'all-purpose flour',
            isOptional: false,
            substitutions: [],
        },
        {
            quantityWhole: 1,
            unit: 'cup',
            name: 'frozen peas',
            isOptional: false,
            substitutions: [],
        },
        {
            quantityWhole: 3,
            unit: 'tablespoon',
            name: 'fresh parsley',
            alteration: 'chopped',
            isOptional: false,
            substitutions: [],
        },
    ],
    steps: [
        { details: 'In Dutch oven or large heavy-bottomed saucepan, heat oil over medium heat; cook onion, carrot, celery, garlic, thyme, salt and pepper, stirring occasionally, until softened, about 8 minutes.' },
        { details: 'Add broth and chicken; bring to boil. Reduce heat, cover and simmer for 2 minutes. Stir in noodles; cover and simmer until chicken is no longer pink inside and noodles are al dente, about 9 minutes.' },
        { details: 'Remove chicken breasts to cutting board. Using 2 forks, shred into bite-size pieces.' },
        { details: 'In small bowl, whisk together cream, flour and 1 cup water until smooth. Whisk into soup; bring to boil. Reduce heat and simmer until slightly thickened, about 2 minutes. Stir in chicken and peas; simmer for 1 minute. Stir in parsley.' },
    ],
    notes: [
        { details: 'Read the package instructions when buying the egg noodles. You\'ll want noodles that take about 12 minutes to cook so that they\'re done at the same time as the chicken.' },
    ],
};
validateRecipe(recipeChickenNoodleSoup);

function logCompletedSeed(tableName: string) {
    console.log(`🌱 table: ${tableName}`);
}

function validateRecipe(recipe: RecipeToSeed) {
    const slugRegex = new RegExp(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/);

    if (!slugRegex.test(recipe.slug)) {
        throw `Recipe '${recipe.title}' slug format is invalid.`;
    }
}

async function seedDB() {
    // CourseType
    await prisma.$transaction(
        courseTypes.map(courseType => {
            const recipeCourseType = {
                name: courseType.name,
            };

            return prisma.courseType.upsert({
                where: {
                    name: recipeCourseType.name,
                },
                update: recipeCourseType,
                create: recipeCourseType,
            });
        }),
    );
    logCompletedSeed('CourseType');

    // Cuisine
    await prisma.$transaction(
        cuisines.map(cuisine => {
            const recipeCuisine = {
                name: cuisine.name,
            };

            return prisma.cuisine.upsert({
                where: {
                    name: recipeCuisine.name,
                },
                update: recipeCuisine,
                create: recipeCuisine,
            });
        }),
    );
    logCompletedSeed('Cuisine');

    // DietaryRestriction
    await prisma.$transaction(
        dietaryRestrictions.map(dietaryRestriction => {
            const recipeDietaryRestriction = {
                name: dietaryRestriction.name,
            };

            return prisma.dietaryRestriction.upsert({
                where: {
                    name: recipeDietaryRestriction.name,
                },
                update: recipeDietaryRestriction,
                create: recipeDietaryRestriction,
            });
        }),
    );
    logCompletedSeed('DietaryRestriction');

    // DishType
    await prisma.$transaction(
        dishTypes.map(dishType => {
            const recipeDishType = {
                name: dishType.name,
            };

            return prisma.dishType.upsert({
                where: {
                    name: recipeDishType.name,
                },
                update: recipeDishType,
                create: recipeDishType,
            });
        }),
    );
    logCompletedSeed('DishType');

    // ServingUnit
    await prisma.$transaction(
        servingUnits.map(servingUnit => {
            const recipeServingUnit = {
                name: servingUnit.name,
                namePlural: servingUnit.namePlural,
            };

            return prisma.servingUnit.upsert({
                where: {
                    name: servingUnit.name,
                },
                update: recipeServingUnit,
                create: recipeServingUnit,
            });
        }),
    );
    logCompletedSeed('ServingUnit');

    // QuantityFraction
    await prisma.$transaction(
        quantityFractions.map(ingredientQuantityFraction => {
            const recipeIngredientQuantityFraction = {
                name: ingredientQuantityFraction.name,
                value: ingredientQuantityFraction.value,
            };

            return prisma.quantityFraction.upsert({
                where: {
                    name: ingredientQuantityFraction.name,
                },
                update: recipeIngredientQuantityFraction,
                create: recipeIngredientQuantityFraction,
            });
        }),
    );
    logCompletedSeed('QuantityFraction');

    // IngredientUnit
    await prisma.$transaction(
        ingredientUnits.map(ingredientUnit => {
            const recipeIngredientUnit = {
                name: ingredientUnit.name,
                nameAbbr: ingredientUnit.nameAbbr,
                namePlural: ingredientUnit.namePlural,
            };

            return prisma.ingredientUnit.upsert({
                where: {
                    name: ingredientUnit.name,
                },
                update: recipeIngredientUnit,
                create: recipeIngredientUnit,
            });
        }),
    );
    logCompletedSeed('IngredientUnit');

    // Ingredient
    await prisma.$transaction(
        ingredients.map(ingredientName => {
            const recipeIngredient = {
                name: ingredientName.name,
                namePlural: ingredientName.namePlural,
            };

            return prisma.ingredient.upsert({
                where: {
                    name: ingredientName.name,
                },
                update: recipeIngredient,
                create: recipeIngredient,
            });
        }),
    );
    logCompletedSeed('Ingredient');

    // Recipe 
    const doesRecipeNanaimoBarsExist = await prisma.recipe.findUnique({
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

    const nanaimoBarsRecipeId: string = (doesRecipeNanaimoBarsExist) ? doesRecipeNanaimoBarsExist.id : v4();

    await prisma.recipe.upsert({
        where: {
            id: nanaimoBarsRecipeId,
        },
        update: {},
        create: {
            title: recipeNanaimoBars.title,
            slug: recipeNanaimoBars.slug,
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
    logCompletedSeed(`Recipe - ${recipeNanaimoBars.title}`);

    const doesRecipeChickenNoodleSoup = await prisma.recipe.findUnique({
        where: {
            recipe_identifier: {
                title: recipeChickenNoodleSoup.title,
                sourceName: recipeChickenNoodleSoup.sourceName,
            },
        },
        select: {
            id: true,
        },
    });

    const recipeChickenNoodleSoupId: string = (doesRecipeChickenNoodleSoup) ? doesRecipeChickenNoodleSoup.id : v4();

    await prisma.recipe.upsert({
        where: {
            id: recipeChickenNoodleSoupId,
        },
        update: {},
        create: {
            title: recipeChickenNoodleSoup.title,
            slug: recipeChickenNoodleSoup.slug,
            sourceName: recipeChickenNoodleSoup.sourceName,
            sourceURL: recipeChickenNoodleSoup.sourceUrl,
            prepTimeMin: recipeChickenNoodleSoup.prepTimeMin,
            cookTimeMin: recipeChickenNoodleSoup.cookTimeMin,
            servingAmount: recipeChickenNoodleSoup.servingAmount,
            servingUnit: {
                connect: {
                    name: recipeChickenNoodleSoup.servingUnit,
                },
            },
            courseTypes: {
                connect: (recipeChickenNoodleSoup.courseTypes).map((courseType) => {
                    return {
                        name: courseType,
                    };
                }),
            },
            cuisines: {
                connect: (recipeChickenNoodleSoup.cuisines).map((cuisine) => {
                    return {
                        name: cuisine,
                    };
                }),
            },
            dietaryRestrictions: {
                connect: (recipeChickenNoodleSoup.dietaryRestrictions).map((dietaryRestriction) => {
                    return {
                        name: dietaryRestriction,
                    };
                }),
            },
            dishTypes: {
                connect: (recipeChickenNoodleSoup.dishTypes).map((dishType) => {
                    return {
                        name: dishType,
                    };
                }),
            },
            ingredients: {
                create: (recipeChickenNoodleSoup.ingredients).map((recipeIngredient, index) => {
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
                    data: (recipeChickenNoodleSoup.steps as Prisma.RecipeStepCreateInput[]).map((recipeStep, index) => {
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
                    data: (recipeChickenNoodleSoup.notes as Prisma.RecipeNoteCreateInput[]).map((recipeNote, index) => {
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
    logCompletedSeed(`Recipe - ${recipeChickenNoodleSoup.title}`);
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
