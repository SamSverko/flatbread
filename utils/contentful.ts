import { createClient } from 'contentful';

type recipeQuery = {
    courseTypes: string,
    cuisines: string,
    dietaryRestrictions: string,
    dishTypes: string,
    title: string,
}

const categories = ['courseType', 'cuisine', 'dietaryRestriction', 'dishType'];

// these `format` functions reduce the return object size by over 40%!
function formatCategory(category: any) {
    return {
        id: category.sys.id,
        title: category.fields.title,
    };
}

function formatRecipe(recipe: any) {
    // required fields
    const mappedRecipe: any = {
        title: recipe.title,
        slug: recipe.slug,
        source: {
            name: recipe.sourceName,
        },
        time: {
            cook: recipe.cookTime,
            prep: recipe.prepTime,
        },
        yield: {
            amount: recipe.yieldAmount,
            unit: (recipe.yieldAmount === 1 ) ? recipe.yieldUnit.fields.title : recipe.yieldUnit.fields.titlePlural,
        },
        courseTypes: recipe.courseTypes.map((courseType: any) => courseType.fields.title),
        cuisines: recipe.cuisines.map((cuisine: any) => cuisine.fields.title),
        dishTypes: recipe.dishTypes.map((dishType: any) => dishType.fields.title),
        ingredients: recipe.ingredients,
        steps: recipe.steps,
    };

    // optional fields
    if (recipe.sourceUrl) {
        mappedRecipe.source.url = recipe.sourceUrl;
    }

    if (recipe.dietaryRestrictions) {
        mappedRecipe.dietaryRestriction = recipe.dietaryRestrictions.map((dietaryRestriction: any) => dietaryRestriction.fields.title);
    }

    if (recipe.notes) {
        mappedRecipe.notes = recipe.notes;
    }

    return mappedRecipe;
}

export function configClient() {
    return createClient({
        space: process.env.CONTENTFUL_SPACE_ID!,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
    });
}

export async function getAllCategories() {
    const fetchedCategories: any = {};

    await Promise.all(categories.map(async (category) => {
        try {
            const response = await configClient().getEntries({
                content_type: category,
            });

            fetchedCategories[category] = response.items.map((item) => formatCategory(item));
        } catch(error) {
            throw new Error((error as Error).message);
        }
    }));

    return fetchedCategories;
}

export async function getRandomRecipe() {
    try {
        const fetchedRecipes = await configClient().getEntries({
            content_type: 'recipe',
        });

        const randomRecipe = fetchedRecipes.items[Math.floor(Math.random() * fetchedRecipes.items.length)];

        return formatRecipe(randomRecipe.fields);
    } catch(error) {
        throw new Error((error as Error).message);
    }
}

export async function getRecipesByQuery({
    courseTypes,
    cuisines,
    dietaryRestrictions,
    dishTypes,
    title,
}: recipeQuery) {
    const query: any = {
        content_type: 'recipe',
        'fields.title[match]': title,
    };

    if (courseTypes) {
        query['fields.courseTypes.sys.id[in]'] = courseTypes;
    }

    if (cuisines) {
        query['fields.cuisines.sys.id[in]'] = cuisines;
    }

    if (dietaryRestrictions) {
        query['fields.dietaryRestrictions.sys.id[in]'] = dietaryRestrictions;
    }

    if (dishTypes) {
        query['fields.dishTypes.sys.id[in]'] = dishTypes;
    }

    try {
        const fetchedRecipes = await configClient().getEntries(query);

        return fetchedRecipes.items.map((recipe) => formatRecipe(recipe.fields));
    } catch(error) {
        throw new Error((error as Error).message);
    }
}

export async function getRecipeBySlug(slug: string) {
    try {
        const fetchedRecipe = await configClient().getEntries({
            content_type: 'recipe',
            'fields.slug': slug,
        });

        return formatRecipe(fetchedRecipe.items[0].fields);
    } catch(error) {
        throw new Error((error as Error).message);
    }
}
