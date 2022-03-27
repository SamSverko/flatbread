import { createClient, Entry, EntryCollection } from 'contentful';

import type { FetchedCategories, FormattedRecipe } from '../utils/types';

type ContentfulCategory = {
    readonly title: string
}

type ContentfulRecipe = {
    readonly cookTime: number
    readonly courseTypes: ReadonlyArray<Entry<ContentfulCategory>>
    readonly createdAt: string
    readonly cuisines?: ReadonlyArray<Entry<ContentfulCategory>>
    readonly dietaryRestrictions?: ReadonlyArray<Entry<ContentfulCategory>>
    readonly dishTypes: ReadonlyArray<Entry<ContentfulCategory>>
    readonly imageAltText?: string
    readonly imageUrl?: string
    readonly ingredients: ReadonlyArray<string>
    readonly notes?: ReadonlyArray<string>
    readonly prepTime: number
    readonly slug: string
    readonly sourceName: string
    readonly sourceUrl?: string
    readonly steps: ReadonlyArray<string>
    readonly title: string
    readonly yieldAmount: number
    readonly yieldUnit: Entry<ContentfulYieldUnit>
}

type ContentfulYieldUnit = {
    readonly title: string
    readonly titlePlural: string
}

type FormattedCategory = {
    id: string,
    title: string,
}

type RecipeQuery = {
    content_type: string
    'fields.title[match]': string
    limit: number
    order: string
    'fields.courseTypes.sys.id[in]'?: string
    'fields.cuisines.sys.id[in]'?: string
    'fields.dishTypes.sys.id[in]'?: string
    'fields.dietaryRestrictions.sys.id[in]'?: string
}

type RecipeQueryProps = {
    courseTypes: string,
    cuisines: string,
    dietaryRestrictions: string,
    dishTypes: string,
    title: string,
}

const categories = [
    'courseType' as const,
    'cuisine' as const,
    'dietaryRestriction' as const,
    'dishType' as const,
];

// these `format` functions reduce the return object size by over 40%!
function formatCategory(category: Entry<ContentfulCategory>) {
    const formattedCategory: FormattedCategory = {
        id: category.sys.id,
        title: category.fields.title,
    };

    return formattedCategory;
}

function formatRecipe(recipe: ContentfulRecipe) {
    // required fields
    const formattedRecipe: FormattedRecipe = {
        title: recipe.title,
        slug: recipe.slug,
        createdAt: recipe.createdAt,
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
        courseTypes: recipe.courseTypes.map((courseType: Entry<ContentfulCategory>) => courseType.fields.title).sort(),
        dishTypes: recipe.dishTypes.map((dishType: Entry<ContentfulCategory>) => dishType.fields.title).sort(),
        ingredients: [...recipe.ingredients],
        steps: [...recipe.steps],
    };

    // optional fields
    if (recipe.cuisines) {
        formattedRecipe.cuisines = recipe.cuisines.map((cuisine: Entry<ContentfulCategory>) => cuisine.fields.title).sort();
    }

    if (recipe.dietaryRestrictions) {
        formattedRecipe.dietaryRestrictions = recipe.dietaryRestrictions.map((dietaryRestriction: Entry<ContentfulCategory>) => dietaryRestriction.fields.title).sort();
    }

    if (recipe.sourceUrl) {
        formattedRecipe.source.url = recipe.sourceUrl;
    }

    if (recipe.imageUrl) {
        formattedRecipe.image = {
            url: recipe.imageUrl,
        };
    }

    if (recipe.imageAltText) {
        if (formattedRecipe.image) {
            formattedRecipe.image.alt = recipe.imageAltText;
        } else {
            formattedRecipe.image = {
                alt: recipe.imageAltText,
            };
        }
    }

    if (recipe.notes) {
        formattedRecipe.notes = [...recipe.notes];
    }

    return formattedRecipe;
}

export function configClient() {
    return createClient({
        space: process.env.CONTENTFUL_SPACE_ID || '',
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
    });
}

export async function getAllCategories() {
    const fetchedCategories: FetchedCategories = {
        courseType: [],
        cuisine: [],
        dietaryRestriction: [],
        dishType: [],
    };

    await Promise.all(categories.map(async (category) => {
        try {
            const response: EntryCollection<ContentfulCategory> = await configClient().getEntries({
                content_type: category,
                limit: 1000,
                order: 'fields.title',
            });

            fetchedCategories[category] = response.items.map((item) => formatCategory(item));
        } catch(error) {
            throw new Error((error as Error).message);
        }
    }));

    return fetchedCategories;
}

export async function getRecipeCount() {
    try {
        const fetchedRecipes: EntryCollection<ContentfulRecipe> = await configClient().getEntries({
            content_type: 'recipe',
        });

        return fetchedRecipes.total;
    } catch(error) {
        throw new Error((error as Error).message);
    }
}

export async function getRandomRecipe() {
    try {
        const fetchedRecipes: EntryCollection<ContentfulRecipe> = await configClient().getEntries({
            content_type: 'recipe',
            limit: 1000,
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
}: RecipeQueryProps) {
    const query: RecipeQuery = {
        content_type: 'recipe',
        'fields.title[match]': title,
        limit: 1000,
        order: '-fields.createdAt',
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
        const fetchedRecipes: EntryCollection<ContentfulRecipe> = await configClient().getEntries(query);

        return fetchedRecipes.items.map((recipe) => formatRecipe(recipe.fields));
    } catch(error) {
        throw new Error((error as Error).message);
    }
}

export async function getRecipeBySlug(slug: string) {
    try {
        const fetchedRecipe: EntryCollection<ContentfulRecipe> = await configClient().getEntries({
            content_type: 'recipe',
            'fields.slug': slug,
        });

        return formatRecipe(fetchedRecipe.items[0].fields);
    } catch(error) {
        throw new Error((error as Error).message);
    }
}
