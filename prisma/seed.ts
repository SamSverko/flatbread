import { Prisma, PrismaClient } from '@prisma/client';
import { v4 } from 'uuid';

const prisma = new PrismaClient();

const recipeCategories: Prisma.RecipeCategoryCreateInput[] = [
    // COURSE TYPES
    { type: 'CourseType', name: 'Breakfast' },
    { type: 'CourseType', name: 'Brunch' },
    { type: 'CourseType', name: 'Dessert' },
    { type: 'CourseType', name: 'Dinner' },
    { type: 'CourseType', name: 'Homemade' },
    { type: 'CourseType', name: 'Lunch' },
    { type: 'CourseType', name: 'Side' },
    { type: 'CourseType', name: 'Snack' },
    // CUISINES
    { type: 'Cuisine', name: 'American' },
    { type: 'Cuisine', name: 'Asian' },
    { type: 'Cuisine', name: 'Belgian' },
    { type: 'Cuisine', name: 'Cajun' },
    { type: 'Cuisine', name: 'Canadian' },
    { type: 'Cuisine', name: 'Chinese' },
    { type: 'Cuisine', name: 'English' },
    { type: 'Cuisine', name: 'Filipino' },
    { type: 'Cuisine', name: 'French' },
    { type: 'Cuisine', name: 'German' },
    { type: 'Cuisine', name: 'Greek' },
    { type: 'Cuisine', name: 'Hawaiian' },
    { type: 'Cuisine', name: 'Indian' },
    { type: 'Cuisine', name: 'Irish' },
    { type: 'Cuisine', name: 'Italian' },
    { type: 'Cuisine', name: 'Japanese' },
    { type: 'Cuisine', name: 'Korean' },
    { type: 'Cuisine', name: 'Lebanese' },
    { type: 'Cuisine', name: 'Mediterranean' },
    { type: 'Cuisine', name: 'Mexican' },
    { type: 'Cuisine', name: 'Scottish' },
    { type: 'Cuisine', name: 'Syrian' },
    { type: 'Cuisine', name: 'Taiwanese' },
    { type: 'Cuisine', name: 'Thai' },
    { type: 'Cuisine', name: 'Tunisian' },
    { type: 'Cuisine', name: 'Turkish' },
    // DIETARY RESTRICTIONS
    { type: 'DietaryRestriction', name: 'Dairy-Free' },
    { type: 'DietaryRestriction', name: 'Gluten-Free' },
    { type: 'DietaryRestriction', name: 'Nut-Free' },
    { type: 'DietaryRestriction', name: 'Vegan' },
    { type: 'DietaryRestriction', name: 'Vegetarian' },
    // DISH TYPES
    { type: 'DishType', name: 'Bread' },
    { type: 'DishType', name: 'Cake' },
    { type: 'DishType', name: 'Confection' },
    { type: 'DishType', name: 'Cookie' },
    { type: 'DishType', name: 'Dip' },
    { type: 'DishType', name: 'Dough' },
    { type: 'DishType', name: 'Drink' },
    { type: 'DishType', name: 'Main' },
    { type: 'DishType', name: 'Meat' },
    { type: 'DishType', name: 'Muffin' },
    { type: 'DishType', name: 'Pasta' },
    { type: 'DishType', name: 'Pastry' },
    { type: 'DishType', name: 'Pie' },
    { type: 'DishType', name: 'Pizza' },
    { type: 'DishType', name: 'Potato' },
    { type: 'DishType', name: 'Salad' },
    { type: 'DishType', name: 'Sandwich' },
    { type: 'DishType', name: 'Sauce' },
    { type: 'DishType', name: 'Seafood' },
    { type: 'DishType', name: 'Soup' },
    { type: 'DishType', name: 'Stir Fry' },
    { type: 'DishType', name: 'Vegetable' },
    { type: 'DishType', name: 'Wrap' },
];

const recipeServingUnits: Prisma.RecipeServingUnitCreateInput[] = [
    { name: 'Bun', namePlural: 'Buns' },
    { name: 'Cake', namePlural: 'Cakes' },
    { name: 'Cookie', namePlural: 'Cookies' },
    { name: 'Cup', namePlural: 'Cups' },
    { name: 'Dumpling', namePlural: 'Dumplings' },
    { name: 'Fritter', namePlural: 'Fritters' },
    { name: 'Loaf', namePlural: 'Loaves' },
    { name: 'Mini Pudding', namePlural: 'Mini Puddings' },
    { name: 'Muffin', namePlural: 'Muffins' },
    { name: 'Pastry', namePlural: 'Pastries' },
    { name: 'Pie', namePlural: 'Pies' },
    { name: 'Pizza', namePlural: 'Pizzas' },
    { name: 'Scone', namePlural: 'Scones' },
    { name: 'Serving', namePlural: 'Servings' },
    { name: 'Square', namePlural: 'Squares' },
    { name: 'Tortilla', namePlural: 'Tortillas' },
];

const recipeIngredientAmounts: Prisma.RecipeIngredientAmountCreateInput[] = [
    { name: '⅒', value: new Prisma.Decimal(0.1) },
    { name: '⅑', value: new Prisma.Decimal(0.111) },
    { name: '⅛', value: new Prisma.Decimal(0.125) },
    { name: '⅐', value: new Prisma.Decimal(0.143) },
    { name: '⅙', value: new Prisma.Decimal(0.167) },
    { name: '⅕', value: new Prisma.Decimal(0.2) },
    { name: '¼', value: new Prisma.Decimal(0.25) },
    { name: '⅓', value: new Prisma.Decimal(0.333) },
    { name: '⅜', value: new Prisma.Decimal(0.375) },
    { name: '⅖', value: new Prisma.Decimal(0.4) },
    { name: '½', value: new Prisma.Decimal(0.5) },
    { name: '⅗', value: new Prisma.Decimal(0.6) },
    { name: '⅝', value: new Prisma.Decimal(0.625) },
    { name: '⅔', value: new Prisma.Decimal(0.667) },
    { name: '¾', value: new Prisma.Decimal(0.75) },
    { name: '⅘', value: new Prisma.Decimal(0.8) },
    { name: '⅚', value: new Prisma.Decimal(0.833) },
    { name: '⅞', value: new Prisma.Decimal(0.875) },
];

const recipeIngredientUnits: Prisma.RecipeIngredientUnitCreateInput[] = [
    { name: 'cup', nameAbbr: 'c', namePlural: 'cups', namePluralAbbr: 'cs' },
    { name: 'gram', nameAbbr: 'g', namePlural: 'grams', namePluralAbbr: 'g' },
    { name: 'litre', nameAbbr: 'L', namePlural: 'litres', namePluralAbbr: 'L' },
    { name: 'millilitre', nameAbbr: 'mL', namePlural: 'millilitres', namePluralAbbr: 'mL' },
    { name: 'pound', nameAbbr: 'lb', namePlural: 'pounds', namePluralAbbr: 'lbs' },
    { name: 'tablespoon', nameAbbr: 'tbsp', namePlural: 'tablespoons', namePluralAbbr: 'tbsps' },
    { name: 'teaspoon', nameAbbr: 'tsp', namePlural: 'teaspoons', namePluralAbbr: 'tsps' },
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
const recipeNanaimoBars = {
    title: 'Nanaimo Bars',
    sourceName: 'Mary-Ann Derocher',
    prepTimeMin: 30,
    cookTimeMin: 10,
    servingAmount: 25,
    servingUnit: {
        name: 'square',
        namePlural: 'squares',
    },
    categories: [
        { type: 'CourseType', name: 'Dessert' },
        { type: 'CourseType', name: 'Snack' },
        { type: 'Cuisine', name: 'Canadian' },
        { type: 'DietaryRestriction', name: 'Vegetarian' },
        { type: 'DishType', name: 'Confection' },
    ],
    ingredients: [ // ⅒ ⅑ ⅛ ⅐ ⅙ ⅕ ¼ ⅓ ⅜ ⅖ ½ ⅗ ⅝ ⅔ ¾ ⅘ ⅚ ⅞
        { order: 1, section: '1st Layer', amount: '¼', amountValue: 0.25 },
    ],
    methods: [
        { type: 'Step', order: 1, section: '1st Layer', details: 'Melt chocolate chips and butter over low heat, cool slightly. Add remaining ingredients and mix well. Press into 8-inch greased pan.' },
        { type: 'Step', order: 2, section: '2nd Layer', details: '2nd Layer: Mix well and spread over 1st Layer.' },
        { type: 'Step', order: 3, section: '3rd Layer', details: 'Melt chocolate chips and butter. Spread over 2nd Layer and swirl.' },
        { type: 'Step', order: 4, details: 'Cool in fridge, then cut in squares, and store in fridge.' },
    ],
};

async function seedDB() {
    // seedRecipeCategory
    await prisma.$transaction(
        recipeCategories.map(category =>
            prisma.recipeCategory.upsert({
                where: {
                    name: category.name,
                },
                update: {},
                create: {
                    type: category.type,
                    name: category.name,
                },
            }),
        ),
    );

    // seedRecipeServingUnit
    await prisma.$transaction(
        recipeServingUnits.map(servingUnit =>
            prisma.recipeServingUnit.upsert({
                where: {
                    name: servingUnit.name,
                },
                update: {},
                create: {
                    name: servingUnit.name,
                    namePlural: servingUnit.namePlural,
                },
            }),
        ),
    );

    // seedRecipeIngredientAmount
    await prisma.$transaction(
        recipeIngredientAmounts.map(ingredientAmount =>
            prisma.recipeIngredientAmount.upsert({
                where: {
                    name: ingredientAmount.name,
                },
                update: {},
                create: {
                    name: ingredientAmount.name,
                    value: ingredientAmount.value,
                },
            }),
        ),
    );

    // seedRecipeIngredientUnit
    await prisma.$transaction(
        recipeIngredientUnits.map(ingredientUnit =>
            prisma.recipeIngredientUnit.upsert({
                where: {
                    name: ingredientUnit.name,
                },
                update: {},
                create: {
                    name: ingredientUnit.name,
                    nameAbbr: ingredientUnit.nameAbbr,
                    namePlural: ingredientUnit.namePlural,
                    namePluralAbbr: ingredientUnit.namePluralAbbr,
                },
            }),
        ),
    );

    // seedRecipeIngredientName
    await prisma.$transaction(
        recipeIngredientNames.map(ingredientName =>
            prisma.recipeIngredientName.upsert({
                where: {
                    name: ingredientName.name,
                },
                update: {},
                create: {
                    name: ingredientName.name,
                    namePlural: ingredientName.namePlural,
                },
            }),
        ),
    );

    // seedNanaimoBarsRecipe
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

    const nanaimoBarsRecipeId = (DoesRecipeNanaimoBarsExist) ? DoesRecipeNanaimoBarsExist.id : v4();

    const seedNanaimoBarsRecipe = await prisma.recipe.upsert({
        where: {
            id: nanaimoBarsRecipeId,
        },
        update: {
            title: recipeNanaimoBars.title,
            sourceName: recipeNanaimoBars.sourceName,
            prepTimeMin: recipeNanaimoBars.prepTimeMin,
            cookTimeMin: recipeNanaimoBars.cookTimeMin,
            servingAmount: recipeNanaimoBars.servingAmount,
            servingUnit: {
                connectOrCreate: {
                    where: {
                        name: recipeNanaimoBars.servingUnit.name,
                    },
                    create: {
                        name: recipeNanaimoBars.servingUnit.name,
                        namePlural: recipeNanaimoBars.servingUnit.namePlural,
                    },
                },
            },
            categories: {
                connectOrCreate: (recipeNanaimoBars.categories as Prisma.RecipeCategoryCreateInput[]).map((recipeCategory) => {
                    return {
                        where: {
                            name: recipeCategory.name,
                        },
                        create: {
                            name: recipeCategory.name,
                            type: recipeCategory.type,
                        },
                    };
                }),
            },
            // ingredients & methods - can't get due to no unique identifier at this stage
            // methods: {
            //     create: recipeNanaimoBars.methods as Prisma.RecipeMethodCreateInput[],
            // },
            methods: {
                connectOrCreate: (recipeNanaimoBars.methods as Prisma.RecipeMethodCreateInput[]).map((recipeMethod) => {
                    return {
                        where: {
                            recipe_method_identifier: {
                                order: recipeMethod.order,
                                recipeId: nanaimoBarsRecipeId,
                            },
                        },
                        create: {
                            type: recipeMethod.type,
                            order: recipeMethod.order,
                            section: recipeMethod.section,
                            details: recipeMethod.details,
                        },
                    };
                }),
            },
        },
        create: {
            title: recipeNanaimoBars.title,
            sourceName: recipeNanaimoBars.sourceName,
            prepTimeMin: recipeNanaimoBars.prepTimeMin,
            cookTimeMin: recipeNanaimoBars.cookTimeMin,
            servingAmount: recipeNanaimoBars.servingAmount,
            servingUnit: {
                connectOrCreate: {
                    where: {
                        name: recipeNanaimoBars.servingUnit.name,
                    },
                    create: {
                        name: recipeNanaimoBars.servingUnit.name,
                        namePlural: recipeNanaimoBars.servingUnit.namePlural,
                    },
                },
            },
            categories: {
                connectOrCreate: (recipeNanaimoBars.categories as Prisma.RecipeCategoryCreateInput[]).map((recipeCategory) => {
                    return {
                        where: {
                            name: recipeCategory.name,
                        },
                        create: {
                            name: recipeCategory.name,
                            type: recipeCategory.type,
                        },
                    };
                }),
            },
            // ingredients & methods - can't get due to no unique identifier at this stage
            // methods: {
            //     create: recipeNanaimoBars.methods as Prisma.RecipeMethodCreateInput[],
            // },
            methods: {
                connectOrCreate: (recipeNanaimoBars.methods as Prisma.RecipeMethodCreateInput[]).map((recipeMethod) => {
                    return {
                        where: {
                            recipe_method_identifier: {
                                order: recipeMethod.order,
                                recipeId: nanaimoBarsRecipeId,
                            },
                        },
                        create: {
                            type: recipeMethod.type,
                            order: recipeMethod.order,
                            section: recipeMethod.section,
                            details: recipeMethod.details,
                        },
                    };
                }),
            },
        },
        include: {
            servingUnit: true,
            categories: true,
        },
    });

    // seedNanaimoBarRecipe Methods
    // await prisma.$transaction(
    //     (recipeNanaimoBars.methods as Prisma.RecipeMethodCreateInput[]).map(recipeMethod => {
    //         const data = {
    //             type: recipeMethod.type,
    //             order: recipeMethod.order,
    //             section: recipeMethod.section,
    //             details: recipeMethod.details,
    //             recipeId: seedNanaimoBarsRecipe.id,
    //         };

    //         return prisma.recipeMethod.upsert({
    //             where: {
    //                 recipe_method_identifier: {
    //                     order: data.order,
    //                     recipeId: data.recipeId,
    //                 },
    //             },
    //             update: data,
    //             create: data,
    //         });
    //     }),
    // );

    // console.log(seedNanaimoBarsRecipe.id);

    // console.log('seedRecipeCategory:', seedRecipeCategory);
    // console.log('seedRecipeServingUnit:', seedRecipeServingUnit);
    // console.log('seedRecipeIngredientAmount:', seedRecipeIngredientAmount);
    // console.log('seedRecipeIngredientUnit:', seedRecipeIngredientUnit);
    // console.log('seedRecipeIngredientName:', seedRecipeIngredientName);
    // console.log('seedNanaimoBarsRecipe:', seedNanaimoBarsRecipe);
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
