import type { NextPage } from 'next';
import * as React from 'react';

import { getAllCategories, getRecipeCount } from '../utils/contentful';

import LoadingScreen from '../components/loading-screen/loading-screen';
import SearchCard from '../components/search-card/search-card';

type pageProps = {
    [key: string]: any
}

const Home: NextPage = ({ categories, recipeCount }: pageProps) => {
    console.log(categories);

    const [recipes, setRecipes] = React.useState([]);

    // get all recipes on page load, and save it to localStorage
    React.useEffect(() => {
        async function getRecipes() {
            console.log('Fetching new recipes!');
            const response = await fetch(`${window.location.origin}/api/recipes`);

            if (response.status !== 200) {
                throw new Error('Error getting all recipes.');
            }

            const json = await response.json();
            setRecipes(json);
            localStorage.setItem('recipes', JSON.stringify(json));
        }

        const localRecipeCount = localStorage.getItem('recipeCount');
        const localRecipes = localStorage.getItem('recipes');

        if (!localRecipeCount || parseInt(localRecipeCount) !== recipeCount || !localRecipes) {
            console.log('Stale local data detected. Saving fresh data....');
            localStorage.setItem('recipeCount', recipeCount);
            getRecipes();
        } else {
            setRecipes(JSON.parse(localStorage.getItem('recipes')!));
        }
    }, [recipeCount]);

    return (
        <div>
            <h1>Flatbread</h1>

            {recipes.length === 0
                ? <LoadingScreen recipeCount={recipeCount} />
                : <SearchCard />
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
