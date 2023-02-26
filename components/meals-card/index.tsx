import * as React from 'react';

import Icon from '../icon';

import bxDownArrowAlt from '../../public/icons/bx-down-arrow-alt.svg';
import bxTrash from '../../public/icons/bx-trash.svg';
import bxUpArrowAlt from '../../public/icons/bx-up-arrow-alt.svg';

import styles from './index.module.scss';

import type { PlannedRecipe } from '../../utils/types';
import Link from 'next/link';

type ComponentProps = {
    plannedRecipes: PlannedRecipe[];
    removeAllPlannedRecipes: () => void;
    updatePlannedRecipes: (updatedPlannedRecipes: PlannedRecipe[]) => void;
}

const MealsCard = ({
    plannedRecipes,
    removeAllPlannedRecipes,
    updatePlannedRecipes,
}: ComponentProps) => {
    // Event listeners
    function handleInputOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const checkbox = event.target as HTMLInputElement;
        const recipeTitle = (checkbox.nextSibling as HTMLLabelElement).innerText;

        const localPlannedRecipes = localStorage.getItem('planned-recipes');
        if (localPlannedRecipes) {
            const localPlannedRecipeArray: PlannedRecipe[] = JSON.parse(localPlannedRecipes);
            const currentRecipeIndex = localPlannedRecipeArray.findIndex(plannedRecipe => plannedRecipe.title === recipeTitle);
            localPlannedRecipeArray[currentRecipeIndex].isComplete = checkbox.checked;
            updatePlannedRecipes(localPlannedRecipeArray);
        }

    }

    function handleRemoveOnClick(event: React.MouseEvent<HTMLButtonElement>) {
        const target = event.target as HTMLButtonElement;
        const currentRecipeTitle = target.getAttribute('data-title');

        const localPlannedRecipes = localStorage.getItem('planned-recipes');
        if (localPlannedRecipes && currentRecipeTitle) {
            const localPlannedRecipeArray: PlannedRecipe[] = JSON.parse(localPlannedRecipes);
            const currentRecipeIndex = localPlannedRecipeArray.findIndex(plannedRecipe => plannedRecipe.title === currentRecipeTitle);
            localPlannedRecipeArray.splice(currentRecipeIndex, 1);
            updatePlannedRecipes(localPlannedRecipeArray);
        }
    }

    return (
        <section className={styles.container}>
            <div className={styles['heading-container']}>
                <h2>Meals ({plannedRecipes.length})</h2>
                <button
                    aria-label='Remove all meals from plan'
                    className='icon-only'
                    onClick={removeAllPlannedRecipes}
                >
                    <Icon ariaHidden={true} Icon={bxTrash} />
                </button>
            </div>

            <ul>
                {plannedRecipes.map((plannedRecipe, index) => {
                    const plannedRecipeId = `planned-recipe-${(plannedRecipe.title).replaceAll(' ', '-')}`;

                    return <li key={`${plannedRecipeId}-${index}`}>
                        <div className={styles.left}>
                            <input checked={plannedRecipe.isComplete} id={plannedRecipeId} onChange={handleInputOnChange} type='checkbox' />
                            <label className='no-styles' htmlFor={plannedRecipeId}>
                                {plannedRecipe.url &&
                                    <Link href={plannedRecipe.url}>
                                        <a>{plannedRecipe.title}</a>
                                    </Link>
                                }
                                {!plannedRecipe.url && 
                                    plannedRecipe.title
                                }
                            </label>
                        </div>
                        <div className={styles.right}>
                            <button disabled={index === 0} aria-label='Move up in list by one' className='icon-only'>
                                <Icon ariaHidden={true} Icon={bxUpArrowAlt} />
                            </button>
                            <button disabled={index === plannedRecipes.length - 1} aria-label='Move down in list by one' className='icon-only'>
                                <Icon ariaHidden={true} Icon={bxDownArrowAlt} />
                            </button>
                            <button
                                aria-label='Remove from list'
                                data-title={plannedRecipe.title}
                                className='icon-only'
                                onClick={handleRemoveOnClick}
                            >
                                <Icon ariaHidden={true} Icon={bxTrash} />
                            </button>
                        </div>
                    </li>;
                })}
            </ul>
        </section>
    );
};

export default MealsCard;
