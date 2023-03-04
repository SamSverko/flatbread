import * as React from 'react';

import Card from '../components/card';
import PaginationCard from '../components/pagination-card';
import RecipeCard from '../components/recipe-card';

import { LSKey } from '../utils';

import styles from '../styles/saved.module.scss';

import type { NextPage } from 'next';
import type { PlannedRecipe, RecipeFormatted } from '../types';

const Saved: NextPage = () => {
    // Refs
    const resultsParagraphRef = React.useRef(null);

    // States
    const [searchStatus, setSearchStatus] = React.useState<'pending' | 'searching' | 'complete'>('pending');
    const [currentPaginationPage, setCurrentPaginationPage] = React.useState(0);
    const [plannedRecipes, setPlannedRecipes] = React.useState([]);
    const [recipesPerPage] = React.useState(5);
    const [savedRecipes, setSavedRecipes] = React.useState([]);

    // Effects
    React.useEffect(() => {
        getSavedRecipes();

        const localPlannedMeals = localStorage.getItem(LSKey.plannedRecipes);

        if (localPlannedMeals) {
            setPlannedRecipes(JSON.parse(localPlannedMeals));
        }

        setSearchStatus('complete');
    }, []);

    React.useEffect(() => {
        if (resultsParagraphRef.current) {
            (resultsParagraphRef.current as HTMLParagraphElement).focus();
        }
    }, [currentPaginationPage, savedRecipes, searchStatus]);

    // Helpers
    function getSavedRecipes() {
        const savedRecipes = localStorage.getItem(LSKey.savedRecipes);

        if (savedRecipes) {
            setSearchStatus('searching');
            const savedRecipesArray = JSON.parse(savedRecipes);
            setSavedRecipes(savedRecipesArray);
            setCurrentPaginationPage(0);
            setSearchStatus('complete');
        }
    }

    // Renderers
    return (
        <>
            <Card>
                <h1>Saved recipes</h1>
            </Card>

            <Card hide={searchStatus !== 'searching'}>
                <h2>Fetching saved recipes...</h2>
            </Card>

            <Card hide={searchStatus !== 'complete'}>
                <h2>Saved recipes</h2>
                <p
                    className={styles['search-results-paragraph']}
                    ref={resultsParagraphRef}
                    tabIndex={-1}
                >
                    {savedRecipes.length} recipe{savedRecipes.length > 1 ? 's' : ''} found.
                </p>
            </Card>

            {savedRecipes && 
                (savedRecipes as RecipeFormatted[])
                    .slice(currentPaginationPage * recipesPerPage, (currentPaginationPage * recipesPerPage) + recipesPerPage)
                    .map((recipe, index) => {
                        const isPlanned = (plannedRecipes.findIndex((savedRecipe: PlannedRecipe) => savedRecipe.title === recipe.title) === -1) ? false : true;
                        const isSaved = (savedRecipes.findIndex((savedRecipe: RecipeFormatted) => savedRecipe.slug === recipe.slug) === -1) ? false : true;

                        return <RecipeCard
                            isPlanned={isPlanned}
                            isSaved={isSaved}
                            key={`key-recipe-${recipe.slug}-${index}`}
                            onRemoveFromSaved={getSavedRecipes}
                            recipe={recipe}
                        />;
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
