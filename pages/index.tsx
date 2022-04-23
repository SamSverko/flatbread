import { useRouter } from 'next/router';
import * as React from 'react';

import { getAllCategories, getRecipeCount } from '../utils/contentful';

import LoadingCard from '../components/loading-card/loading-card';
import PaginationCard from '../components/pagination-card/pagination-card';
import RecipeCard from '../components/recipe-card/recipe-card';
import SearchCard from '../components/search-card/search-card';
import SearchResultsCard from '../components/search-results-card/search-results-card';

import type { NextPage } from 'next';
import type { FetchedCategories, FormattedRecipe, SearchQueryProps } from '../utils/types';

type IndexProps = {
    categories: FetchedCategories
    recipeCount: number
}

const Index: NextPage<IndexProps> = ({ categories, recipeCount }: IndexProps) => {
    const router = useRouter();

    // recipes
    const [recipes, setRecipes] = React.useState([]);
    const [searchPerformed, setSearchedPerformed] = React.useState(false);
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

        setPaginationPage(0);

        if (recipe && recipes.length > 0) {
            const matchedRecipe = recipes.find((recipeItem: FormattedRecipe) => recipeItem.slug === recipe);
            if (matchedRecipe) {
                setSearchedPerformed(true);
                setSearchedRecipes([matchedRecipe]);
            }
        }
    }, [recipes, router]);

    function handleRandomSubmit() {
        setPaginationPage(0);
        setSearchedPerformed(true);
        setSearchedRecipes([recipes[Math.floor(Math.random() * recipes.length)]]);
    }

    function handleSearchSubmit(searchQuery: SearchQueryProps) {
        const matchedRecipes = recipes.filter((recipe: FormattedRecipe) => {
            const titleRegex = new RegExp(searchQuery.title, 'i');
            const titleSearch = recipe.title.search(titleRegex);
            if (titleSearch > -1) {
                return recipe.title;
            }
        });

        setPaginationPage(0);
        setSearchedPerformed(true);
        setSearchedRecipes(matchedRecipes);
    }

    return (
        <>
            <h1>Flatbread</h1>

            {recipes.length === 0
                ? <LoadingCard recipeCount={recipeCount} />
                : <SearchCard
                    categories={categories}
                    handleRandomSubmit={handleRandomSubmit}
                    handleSearchSubmit={handleSearchSubmit}
                />
            }

            {searchPerformed && recipes.length > 0 &&
                <>
                    <SearchResultsCard recipeCount={searchedRecipes.length} />

                    {searchedRecipes
                        .slice(currentPaginationPage * recipesPerPage, (currentPaginationPage * recipesPerPage) + recipesPerPage)
                        .map((recipe: FormattedRecipe) => {
                            return <RecipeCard key={`${recipe.slug}-${new Date().getSeconds()}`} recipe={recipe} />;
                        })}

                    {searchedRecipes.length >= recipesPerPage &&
                        <PaginationCard
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
