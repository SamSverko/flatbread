import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';

import { getAllCategories, getRecipeCount } from '../utils/contentful';
import { formatPageTitle } from '../utils/functions';

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

    // page title
    const [pageTitle, setPageTitle] = React.useState('');

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
                setPageTitle((matchedRecipe as FormattedRecipe).title);
            }
        }
    }, [recipes, router]);

    // EVENT LISTENERS
    function handleRandomSubmit() {
        const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];

        setPageTitle((randomRecipe as FormattedRecipe).title);
        setPaginationPage(0);
        setSearchedPerformed(true);
        setSearchedRecipes([randomRecipe]);
    }

    function handleSearchSubmit(searchQuery: SearchQueryProps) {
        const matchedRecipes = recipes.filter((recipe: FormattedRecipe) => {
            const titleRegex = new RegExp(searchQuery.title, 'i');
            const titleSearch = recipe.title.search(titleRegex);

            // simple search - match title, ignore categories
            const titleMatch = (titleSearch > -1);

            // advanced search - check if any category matches any search category || otherwise default to `true` to revert to simple search
            const courseTypeMatch = (searchQuery.courseTypes.length > 0)
                ? recipe.courseTypes.findIndex((courseType) => searchQuery.courseTypes.includes(courseType)) > -1
                : true;

            // this breakdown is needed for optional recipe categories
            let cuisineMatch = true;
            if (!recipe.cuisines && searchQuery.cuisines.length > 0) {
                cuisineMatch = false;
            } else if (recipe.cuisines && searchQuery.cuisines.length > 0) {
                cuisineMatch = recipe.cuisines.findIndex((cuisine) => searchQuery.cuisines.includes(cuisine)) > -1;
            }

            let dietaryRestrictionMatch = true;
            if (!recipe.dietaryRestrictions && searchQuery.dietaryRestrictions.length > 0) {
                dietaryRestrictionMatch = false;
            } else if (recipe.dietaryRestrictions && searchQuery.dietaryRestrictions.length > 0) {
                dietaryRestrictionMatch = recipe.dietaryRestrictions.findIndex((dietaryRestriction) => searchQuery.dietaryRestrictions.includes(dietaryRestriction)) > -1;
            }

            const dishTypeMatch = (searchQuery.dishTypes.length > 0)
                ? recipe.dishTypes.findIndex((dishType) => searchQuery.dishTypes.includes(dishType)) > -1
                : true;

            // return recipe when all items are matched
            if (titleMatch && courseTypeMatch && cuisineMatch && dietaryRestrictionMatch && dishTypeMatch) {
                return recipe;
            }
        });

        setPageTitle('');
        setPaginationPage(0);
        setSearchedPerformed(true);
        setSearchedRecipes(matchedRecipes);
    }

    return (
        <>
            {pageTitle &&
                <Head>
                    <title>{formatPageTitle(`Recipe: ${pageTitle}`)}</title>
                </Head>
            }

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
