import * as React from 'react';
import { useRouter } from 'next/router';

import Card from '../../components/card';
import RecipeCard from '../../components/recipe-card';

import { LSKey } from '../../utils/functions';

import type { NextPage } from 'next';
import type { PlannedRecipe, RecipeFormatted } from '../../utils/types';

const RecipePage: NextPage = () => {
    const router = useRouter();
    const { slug } = router.query;

    // States
    const [isLoading, setIsLoading] = React.useState(true);
    const [isPlanned, setIsPlanned] = React.useState(false);
    const [isSaved, setIsSaved] = React.useState(false);
    const [recipe, setRecipe] = React.useState(null);

    // Effects
    React.useEffect(() => {
        if (!recipe) return;

        const localSavedRecipes = localStorage.getItem(LSKey.savedRecipes);
        const localPlannedRecipes = localStorage.getItem(LSKey.plannedRecipes);

        if (localSavedRecipes) {
            const isSaved = (
                JSON.parse(localSavedRecipes)
                    .findIndex((savedRecipe: RecipeFormatted) => savedRecipe.slug === (recipe as RecipeFormatted).slug) === -1) ? false : true;

            setIsSaved(isSaved);
        }

        if (localPlannedRecipes) {
            const isPlanned = (
                JSON.parse(localPlannedRecipes)
                    .findIndex((plannedRecipe: RecipeFormatted) => plannedRecipe.title === (recipe as PlannedRecipe).title) === -1) ? false : true;

            setIsPlanned(isPlanned);
        }
    }, [recipe]);

    React.useEffect(() => {
        if (slug) {
            fetch(`/api/recipes?condensed=true&slug=${slug}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        setRecipe(null);
                    } else {
                        setRecipe(data);
                    }
                    setIsLoading(false);
                });
        }
    }, [slug]);

    // Renderers
    if (isLoading) return <Card><h2>Fetching recipe...</h2></Card>;
    if (!recipe) return <Card><h2>No recipe found!</h2></Card>;

    return <RecipeCard isPlanned={isPlanned} isSaved={isSaved} recipe={recipe} />;
};

export default RecipePage;
