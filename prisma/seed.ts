import { Prisma, PrismaClient } from '@prisma/client';

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

const recipeIngredientUnits: Prisma.RecipeIngredientUnitCreateInput[] = [
    { name: 'cup', nameAbbr: 'c', namePlural: 'cups', namePluralAbbr: 'cs' },
    { name: 'gram', nameAbbr: 'g', namePlural: 'grams', namePluralAbbr: 'g' },
    { name: 'litre', nameAbbr: 'L', namePlural: 'litres', namePluralAbbr: 'L' },
    { name: 'millilitre', nameAbbr: 'mL', namePlural: 'millilitres', namePluralAbbr: 'mL' },
    { name: 'pound', nameAbbr: 'lb', namePlural: 'pounds', namePluralAbbr: 'lbs' },
    { name: 'tablespoon', nameAbbr: 'tbsp', namePlural: 'tablespoons', namePluralAbbr: 'tbsps' },
    { name: 'teaspoon', nameAbbr: 'tsp', namePlural: 'teaspoons', namePluralAbbr: 'tsps' },
];

const recipeIngredientAmount = {
    '⅒': { name: '⅒', value: 0.1 },
    '⅑': { name: '⅑', value: 0.111 },
    '⅛': { name: '⅛', value: 0.125 },
    '⅐': { name: '⅐', value: 0.143 },
    '⅙': { name: '⅙', value: 0.167 },
    '⅕': { name: '⅕', value: 0.2 },
    '¼': { name: '¼', value: 0.25 },
    '⅓': { name: '⅓', value: 0.333 },
    '⅜': { name: '⅜', value: 0.375 },
    '⅖': { name: '⅖', value: 0.4 },
    '½': { name: '½', value: 0.5 },
    '⅗': { name: '⅗', value: 0.6 },
    '⅝': { name: '⅝', value: 0.625 },
    '⅔': { name: '⅔', value: 0.667 },
    '¾': { name: '¾', value: 0.75 },
    '⅘': { name: '⅘', value: 0.8 },
    '⅚': { name: '⅚', value: 0.833 },
    '⅞': { name: '⅞', value: 0.875 },
};

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

async function seedDB() {
    const seedRecipeCategory = await prisma.$transaction(
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

    const seedRecipeServingUnit = await prisma.$transaction(
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

    const seedRecipeIngredientUnits = await prisma.$transaction(
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

    const seedRecipeIngredientNames = await prisma.$transaction(
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
        // ingredients
        // ⅒ ⅑ ⅛ ⅐ ⅙ ⅕ ¼ ⅓ ⅜ ⅖ ½ ⅗ ⅝ ⅔ ¾ ⅘ ⅚ ⅞
        ingredients: [
            { order: 1, section: '1st Layer', amount: recipeIngredientAmount['¼'].name, amountValue: recipeIngredientAmount['¼'].value },
        ],
        methods: [
            { type: 'Step', order: 1, section: '1st Layer', details: 'Melt chocolate chips and butter over low heat, cool slightly. Add remaining ingredients and mix well. Press into 8-inch greased pan.' },
            { type: 'Step', order: 2, section: '2nd Layer', details: '2nd Layer: Mix well and spread over 1st Layer.' },
            { type: 'Step', order: 3, section: '3rd Layer', details: 'Melt chocolate chips and butter. Spread over 2nd Layer and swirl.' },
            { type: 'Step', order: 4, details: 'Cool in fridge, then cut in squares, and store in fridge.' },
        ],
    };

    const seedNanaimoBarsRecipe = await prisma.recipe.upsert({
        where: {
            title_sourceName: {
                title: recipeNanaimoBars.title,
                sourceName: recipeNanaimoBars.sourceName,
            },
        },
        update: {
            title: recipeNanaimoBars.sourceName,
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
            ingredients: {
                create: [
                    {
                        order: 1,
                        section: '2nd Layer',
                        amount: '⅔',
                        amountValue: 0.667,
                        unit: {
                            connectOrCreate: {
                                where: {
                                    name: 'cup',
                                },
                                create: {
                                    name: 'cup',
                                    nameAbbr: 'c',
                                    namePlural: 'cups',
                                    namePluralAbbr: 'cs',
                                },
                            },
                        },
                        name: {
                            connectOrCreate: {
                                where: {
                                    name: 'unsalted butter',
                                },
                                create: {
                                    name: 'unsalted butter',
                                    namePlural: 'unsalted butter',
                                },
                            },
                        },
                        isOptional: false,
                    } as Prisma.RecipeIngredientCreateInput,
                ],
            },
            methods: {
                create: recipeNanaimoBars.methods as Prisma.RecipeMethodCreateInput[],
            },
        },
        create: {
            title: recipeNanaimoBars.sourceName,
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
            ingredients: {
                create: [
                    {
                        order: 1,
                        section: '2nd Layer',
                        amount: '⅔',
                        amountValue: 0.667,
                        unit: {
                            connectOrCreate: {
                                where: {
                                    name: 'cup',
                                },
                                create: {
                                    name: 'cup',
                                    nameAbbr: 'c',
                                    namePlural: 'cups',
                                    namePluralAbbr: 'cs',
                                },
                            },
                        },
                        name: {
                            connectOrCreate: {
                                where: {
                                    name: 'unsalted butter',
                                },
                                create: {
                                    name: 'unsalted butter',
                                    namePlural: 'unsalted butter',
                                },
                            },
                        },
                        isOptional: false,
                    } as Prisma.RecipeIngredientCreateInput,
                ],
            },
            methods: {
                create: recipeNanaimoBars.methods as Prisma.RecipeMethodCreateInput[],
            },
        },
        include: {
            servingUnit: true,
            categories: true,
            ingredients: true,
            methods: true,
        },
    });

    // const seedNanaimoBarsRecipe = await prisma.recipe.create({
    //     data: {
    //         title: recipeNanaimoBars.title,
    //         sourceName: recipeNanaimoBars.sourceName,
    //         prepTimeMin: recipeNanaimoBars.prepTimeMin,
    //         cookTimeMin: recipeNanaimoBars.cookTimeMin,
    //         servingAmount: recipeNanaimoBars.servingAmount,
    //         servingUnit: {
    //             connectOrCreate: {
    //                 where: {
    //                     name: recipeNanaimoBars.servingUnit.name,
    //                 },
    //                 create: {
    //                     name: recipeNanaimoBars.servingUnit.name,
    //                     namePlural: recipeNanaimoBars.servingUnit.namePlural,
    //                 }
    //             }
    //         },
    //         categories: {
    //             connectOrCreate: (recipeNanaimoBars.categories as Prisma.RecipeCategoryCreateInput[]).map((recipeCategory) => {
    //                 return {
    //                     where: {
    //                         name: recipeCategory.name,
    //                     },
    //                     create: {
    //                         name: recipeCategory.name,
    //                         type: recipeCategory.type,
    //                     }
    //                 };
    //             }),
    //         },
    //         ingredients: {
    //             create: [
    //                 {
    //                     order: 1,
    //                     section: '1st Layer',
    //                     amount: '¼',
    //                     amountValue: 0.25,
    //                     unit: {
    //                         connectOrCreate: {
    //                             where: {
    //                                 name: 'cup',
    //                             },
    //                             create: {
    //                                 name: 'cup',
    //                                 nameAbbr: 'c',
    //                                 namePlural: 'cups',
    //                                 namePluralAbbr: 'cs',
    //                             },
    //                         },
    //                     },
    //                     name: {
    //                         connectOrCreate: {
    //                             where: {
    //                                 name: 'unsalted butter',
    //                             },
    //                             create: {
    //                                 name: 'unsalted butter',
    //                                 namePlural: 'unsalted butter',
    //                             },
    //                         },
    //                     },
    //                     isOptional: false,
    //                 } as Prisma.RecipeIngredientCreateInput,
    //             ],
    //         },
    //         methods: {
    //             create: recipeNanaimoBars.methods as Prisma.RecipeMethodCreateInput[],
    //         }
    //         // methods: {
    //         //     create: (recipeNanaimoBars.methods as Prisma.RecipeMethodCreateInput[]).map((recipeMethod) => {
    //         //         return {
    //         //             where: {
    //         //                 details: recipeMethod.details,
    //         //             },
    //         //             create: {
    //         //                 type: recipeMethod.type,
    //         //                 order: recipeMethod.order,
    //         //                 section: recipeMethod.section,
    //         //                 details: recipeMethod.details,
    //         //             }
    //         //         };
    //         //     }),
    //         // },
    //     },
    //     include: {
    //         servingUnit: true,
    //         categories: true,
    //         ingredients: true,
    //         methods: true,
    //     },
    // });

    console.log('seedRecipeCategory:', seedRecipeCategory);
    console.log('seedRecipeServingUnit:', seedRecipeServingUnit);
    console.log('seedRecipeIngredientUnits:', seedRecipeIngredientUnits);
    console.log('seedRecipeIngredientNames:', seedRecipeIngredientNames);
    console.log('seedNanaimoBarsRecipe:', seedNanaimoBarsRecipe);
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
