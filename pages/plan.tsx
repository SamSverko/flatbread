import * as React from 'react';

import TitleCard from '../components/title-card';
import MealsCard from '../components/meals-card';

import type { NextPage } from 'next';
import type { PlannedRecipe } from '../utils/types';

const Plan: NextPage = () => {
    // States
    const [plannedRecipes, setPlannedRecipes] = React.useState<Array<PlannedRecipe>>([]);

    // Effects
    React.useEffect(() => {
        const localPlannedMeals = localStorage.getItem('planned-recipes');

        if (localPlannedMeals) {
            setPlannedRecipes(JSON.parse(localPlannedMeals));
        }
    }, []);

    // Helpers
    function updatePlannedRecipes(updatedPlannedRecipes: PlannedRecipe[]) {
        localStorage.setItem('planned-recipes', JSON.stringify(updatedPlannedRecipes));
        setPlannedRecipes(updatedPlannedRecipes);
    }

    function removeAllPlannedRecipes() {
        localStorage.setItem('planned-recipes', JSON.stringify([]));
        setPlannedRecipes([]);
    }

    return (
        <>
            <TitleCard text='Meal plan' />
            <MealsCard
                plannedRecipes={plannedRecipes}
                removeAllPlannedRecipes={removeAllPlannedRecipes}
                updatePlannedRecipes={updatePlannedRecipes}
            />
        </>
    );
};

export default Plan;
