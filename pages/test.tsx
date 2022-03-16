import type { NextPage } from 'next';
import React from 'react';

import { configClient } from '../utils/contentful';

type fetchedRecipes = {
    [key: string]: any
}

const Home: NextPage = ({ recipes }: fetchedRecipes) => {
    console.log(recipes);

    return (
        <div>
            <h1>Flatbread</h1>
        </div>
    );
};

export default Home;

export async function getStaticProps() {
    let fetchedRecipes: any = {};

    try {
        const recipes = await configClient().getEntries({
            content_type: 'recipe',
        });

        fetchedRecipes = recipes;
    } catch(error) {
        throw new TypeError('Error: Get all recipes.');
    }

    const mappedRecipes = fetchedRecipes.items.map((recipe: any) => {
        // required fields
        const mappedRecipe: any = {
            title: recipe.fields.title,
            slug: recipe.fields.slug,
            source: {
                name: recipe.fields.sourceName,
            },
            time: {
                cook: recipe.fields.cookTime,
                prep: recipe.fields.prepTime,
            },
            yield: {
                amount: recipe.fields.yieldAmount,
                unit: (recipe.fields.yieldAmount === 1 ) ? recipe.fields.yieldUnit.fields.title : recipe.fields.yieldUnit.fields.titlePlural,
            },
            courseTypes: recipe.fields.courseTypes.map((courseType: any) => courseType.fields.title),
            cuisines: recipe.fields.cuisines.map((cuisine: any) => cuisine.fields.title),
            dishTypes: recipe.fields.dishTypes.map((dishType: any) => dishType.fields.title),
            ingredients: recipe.fields.ingredients,
            steps: recipe.fields.steps,
        };

        // optional fields
        if (recipe.fields.sourceUrl) {
            mappedRecipe.source.url = recipe.fields.sourceUrl;
        }

        if (recipe.fields.dietaryRestrictions) {
            mappedRecipe.dietaryRestriction = recipe.fields.dietaryRestrictions.map((dietaryRestriction: any) => dietaryRestriction.fields.title);
        }

        if (recipe.fields.notes) {
            mappedRecipe.notes = recipe.fields.notes;
        }

        return mappedRecipe;
    });

    return {
        props: {
            recipes: mappedRecipes,
        },
    };
}
