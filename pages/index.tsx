import type { NextPage } from 'next';
import * as React from 'react';

import { getAllCategories, getRecipeCount } from '../utils/contentful';

import LoadingScreen from '../components/loading-screen/loading-screen';
import SearchCard from '../components/search-card/search-card';

type props = {
    [key: string]: any
}

const Home: NextPage = ({ categories, recipeCount }: props) => {
    const [recipes, setRecipes] = React.useState([]);

    // get all recipes on page load, and save it to localStorage
    React.useEffect(() => {
        async function getRecipes() {
            const response = await fetch(`${window.location.origin}/api/recipes`);

            if (response.status !== 200) {
                throw new Error('Error getting all recipes.');
            }

            const json = await response.json();
            setRecipes(json);
            localStorage.setItem('recipes', JSON.stringify(json));
        }

        const localRecipes = localStorage.getItem('recipes');
        let parsedRecipes = [];

        if (localRecipes) {
            parsedRecipes = JSON.parse(localRecipes);
        }

        if (!localRecipes || parsedRecipes.length !== recipeCount) {
            console.log('Your local recipe book is outdated! Fetching fresh recipes...');
            getRecipes();
        } else {
            setRecipes(parsedRecipes);
        }
    }, [recipeCount]);

    return (
        <div>
            <h1>Flatbread</h1>

            {recipes.length === 0
                ? <LoadingScreen recipeCount={recipeCount} />
                : <SearchCard categories={categories} />
            }
        </div>
    );
};

export default Home;

export async function getStaticProps() {
    const categories = await getAllCategories();
    const recipeCount = await getRecipeCount();

    return {
        props: {
            categories: categories,
            recipeCount: recipeCount,
        },
    };
}
