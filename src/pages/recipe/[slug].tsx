import * as React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import Card from '../../components/card';
import RecipeCard from '../../components/recipe-card';

import { LSKey } from '../../utils';

import type { NextPage } from 'next';
import type { PlannedRecipe, RecipeFormatted } from '../../types';

const RecipePage: NextPage = () => {
    // Hooks
    const { data: session } = useSession();
    const router = useRouter();

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
        if (router.query.slug) {
            fetch(`/api/recipes?condensed=true&slug=${router.query.slug}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.error) {
                        setRecipe(null);
                    } else {
                        setRecipe(data);
                    }
                    setIsLoading(false);
                });
        }
    }, [router.query.slug]);

    // Renderers
    if (isLoading) return <Card><h2>Fetching recipe...</h2></Card>;
    if (!recipe) return <Card><h2>No recipe found!</h2></Card>;

    return <RecipeCard
        adminViewer={(session) ? true : false}
        isPlanned={isPlanned}
        isSaved={isSaved}
        recipe={recipe}
    />;
};

export default RecipePage;
