import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';

import { getAllCategories, getRecipeCount } from '../utils/contentful';

import LoadingCard from '../components/loading-card/loading-card';
import Pagination from '../components/pagination/pagination';
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
    const router = useRouter();

    // recipes
    const [recipes, setRecipes] = React.useState([]);
    const [searchedRecipes, setSearchedRecipes] = React.useState([]);

    // pagination
    const [currentPaginationPage, setPaginationPage] = React.useState(0);
    const [recipesPerPage] = React.useState(10);

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

    // render recipe if `recipe` param is present in URL
    React.useEffect(() => {
        const { recipe } = router.query;

        if (recipe && recipes.length > 0) {
            const matchedRecipe = recipes.find((recipeItem: any) => recipeItem.slug === recipe);
            if (matchedRecipe) {
                setSearchedRecipes([matchedRecipe]);
            }
        }
    }, [recipes, router]);

    function handleRandomSubmit() {
        setPaginationPage(0);
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

        setPaginationPage(0);
        setSearchedRecipes(matchedRecipes);
    }

    return (
        <>
            <h1>Flatbread</h1>

            {recipes.length === 0
                ? <LoadingCard recipeCount={recipeCount} />
                : <SearchCard categories={categories} handleRandomSubmit={handleRandomSubmit} handleSearchSubmit={handleSearchSubmit} />
            }
            {searchedRecipes.length > 0 && recipes.length > 0 &&
                <>
                    <SearchResultsCard recipeCount={searchedRecipes.length} />

                    {searchedRecipes.slice(currentPaginationPage * recipesPerPage, (currentPaginationPage * recipesPerPage) + recipesPerPage).map((recipe: any, index: number) => {
                        return <RecipeCard key={index} recipe={recipe} />;
                    })}

                    {searchedRecipes.length >= recipesPerPage &&
                        <Pagination
                            currentPage={currentPaginationPage}
                            recipeCount={searchedRecipes.length}
                            recipesPerPage={recipesPerPage}
                            setPaginationPage={setPaginationPage}
                        />
                    }
                </>
            }
        </>
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
