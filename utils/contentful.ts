import { createClient } from 'contentful';

type recipeQuery = {
    courseTypes: string,
    cuisines: string,
    dietaryRestrictions: string,
    dishTypes: string,
    title: string,
}

export const categories = ['courseType', 'cuisine', 'dietaryRestriction', 'dishType'];

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
            const response: any = await configClient().getEntries({
                content_type: category,
            });

            fetchedCategories[category] = response.items.map((item: any) => {
                return {
                    id: item.sys.id,
                    title: item.fields.title,
                };
            });
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

        return randomRecipe;
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

        return fetchedRecipes;
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

        return fetchedRecipe;
    } catch(error) {
        throw new Error((error as Error).message);
    }
}
