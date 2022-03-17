import type { NextPage } from 'next';
import * as React from 'react';

import { getAllCategories, getRecipeCount } from '../utils/contentful';

import LoadingCard from '../components/loading-card/loading-card';
import RecipeCard from '../components/recipe-card/recipe-card';
import SearchCard from '../components/search-card/search-card';
import SearchResultsCard from '../components/search-results-card/search-results-card';

type searchQueryProps = {
    title: string
}

type indexProps = {
    [key: string]: any
}

const Index: NextPage = ({ categories, recipeCount }: indexProps) => {
    const [recipes, setRecipes] = React.useState([]);
    const [searchedRecipes, setSearchedRecipes] = React.useState([]);

    // get all recipes on page load, and save it to localStorage
    // TODO - set a TTL for the localStorage or a button to fetch new data: https://www.sohamkamani.com/blog/javascript-localstorage-with-ttl-expiry/
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

    function handleRandomSubmit() {
        setSearchedRecipes([recipes[Math.floor(Math.random() * recipes.length)]]);
    }

    function handleSearchSubmit(searchQuery: searchQueryProps) {
        const matchedRecipes = recipes.filter((recipe: any) => {
            const titleRegex = new RegExp(searchQuery.title, 'i');
            const titleSearch = recipe.title.search(titleRegex);
            if (titleSearch > -1) {
                return recipe.title;
            }
        });

        setSearchedRecipes(matchedRecipes);
    }

    return (
        <div>
            <h1>Flatbread</h1>

            {recipes.length === 0
                ? <LoadingCard recipeCount={recipeCount} />
                : <SearchCard categories={categories} handleRandomSubmit={handleRandomSubmit} handleSearchSubmit={handleSearchSubmit} />
            }
            {searchedRecipes.length > 0 && recipes.length > 0 &&
                <>
                    <SearchResultsCard numberOfRecipes={searchedRecipes.length} />

                    {searchedRecipes.map((recipe: any, index: number) => {
                        return <RecipeCard key={index} recipe={recipe} />;
                    })}
                </>
            }
        </div>
    );
};

export default Index;

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
