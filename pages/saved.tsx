import * as React from 'react';

import PaginationCard from '../components/pagination-card';
import RecipeCard from '../components/recipe-card';
import ResultsCard from '../components/results-card';
import TitleCard from '../components/title-card';

import type { NextPage } from 'next';
import type { RecipeFormatted } from '../utils/types';

const Saved: NextPage = () => {
    // States
    const [currentPaginationPage, setCurrentPaginationPage] = React.useState(0);
    const [isSearching, setIsSearching] = React.useState(true);
    const [recipesPerPage] = React.useState(5);
    const [savedRecipes, setSavedRecipes] = React.useState([]);

    // Effects
    React.useEffect(() => {
        getSavedRecipes();
    }, []);

    // helpers
    function getSavedRecipes() {
        const savedRecipes = localStorage.getItem('saved-recipes');

        if (savedRecipes) {
            const savedRecipesArray = JSON.parse(savedRecipes);
            setSavedRecipes(savedRecipesArray);
            setCurrentPaginationPage(0);
            setIsSearching(false);
        }
    }

    return (
        <>
            <TitleCard text='Saved' />

            {isSearching && <TitleCard level={2} text='Fetching saved recipes...' />}

            {(!isSearching && savedRecipes) &&
                <ResultsCard
                    heading='Saved recipes'
                    hideClearButton
                    recipeCount={savedRecipes.length}
                />
            }

            {savedRecipes && 
                (savedRecipes as RecipeFormatted[])
                    .slice(currentPaginationPage * recipesPerPage, (currentPaginationPage * recipesPerPage) + recipesPerPage)
                    .map((recipe, index) => {
                        return <RecipeCard key={`key-recipe-${recipe.slug}-${index}`} onRemoveFromSaved={getSavedRecipes} recipe={recipe} />;
                    })
            }

            {savedRecipes.length > recipesPerPage &&
                <PaginationCard
                    currentPage={currentPaginationPage}
                    recipeCount={savedRecipes.length}
                    recipesPerPage={recipesPerPage}
                    setPaginationPage={setCurrentPaginationPage}
                />
            }
        </>
    );
};

export default Saved;
