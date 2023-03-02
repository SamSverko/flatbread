import Link from 'next/link';
import * as React from 'react';

import Card from '../components/card';
import Icon from '../components/icon';
import InputGroup2 from '../components/input-group-2';

import { LSKey } from '../utils/functions';

import bxDownArrowAlt from '../public/icons/bx-down-arrow-alt.svg';
import bxTrash from '../public/icons/bx-trash.svg';
import bxUpArrowAlt from '../public/icons/bx-up-arrow-alt.svg';

import styles from '../styles/plan.module.scss';

import type { NextPage } from 'next';
import type { PlannedRecipe } from '../utils/types';

const Plan: NextPage = () => {
    // States
    const [plannedRecipes, setPlannedRecipes] = React.useState<Array<PlannedRecipe>>([]);
    const [searchStatus, setSearchStatus] = React.useState<'pending' | 'searching' | 'complete'>('searching');

    // Effects
    React.useEffect(() => {
        const localPlannedMeals = localStorage.getItem(LSKey.plannedRecipes);

        if (localPlannedMeals) {
            setPlannedRecipes(JSON.parse(localPlannedMeals));
        }

        setSearchStatus('complete');
    }, []);

    // Event listeners
    function handleFormOnSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;

        const formElement = (event.target as HTMLFormElement);
        const formData = new FormData(formElement);
        
        const formDataTitle = formData.get('title');
        const titleValidated = (formDataTitle) ? formDataTitle.toString() : '';

        if (titleValidated.length > 0) {
            const recipeToAdd: PlannedRecipe = {
                isComplete: false,
                title: titleValidated,
            };

            const plannedRecipes = localStorage.getItem(LSKey.plannedRecipes);

            if (!plannedRecipes) {
                localStorage.setItem(LSKey.plannedRecipes, `[${JSON.stringify(recipeToAdd)}]`);
                updatePlannedRecipes([recipeToAdd]);
            } else {
                const plannedRecipesArray = JSON.parse(plannedRecipes);
                plannedRecipesArray.push(recipeToAdd);
                localStorage.setItem(LSKey.plannedRecipes, JSON.stringify(plannedRecipesArray));
                updatePlannedRecipes(plannedRecipesArray);
            }
        }
    }

    function handleInputOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const checkbox = event.target as HTMLInputElement;
        const recipeTitle = (checkbox.nextSibling as HTMLLabelElement).innerText;

        const localPlannedRecipes = localStorage.getItem(LSKey.plannedRecipes);
        if (localPlannedRecipes) {
            const localPlannedRecipeArray: PlannedRecipe[] = JSON.parse(localPlannedRecipes);
            const currentRecipeIndex = localPlannedRecipeArray.findIndex(plannedRecipe => plannedRecipe.title === recipeTitle);
            localPlannedRecipeArray[currentRecipeIndex].isComplete = checkbox.checked;

            updatePlannedRecipes(localPlannedRecipeArray);
        }
    }

    function handleOrderOnClick(event: React.MouseEvent<HTMLButtonElement>, movement: 'down' | 'up') {
        const target = event.target as HTMLButtonElement;
        const currentRecipeTitle = target.getAttribute('data-title');

        const localPlannedRecipes = localStorage.getItem(LSKey.plannedRecipes);
        if (localPlannedRecipes && currentRecipeTitle) {
            const localPlannedRecipeArray: PlannedRecipe[] = JSON.parse(localPlannedRecipes);
            const currentRecipeIndex = localPlannedRecipeArray.findIndex(plannedRecipe => plannedRecipe.title === currentRecipeTitle);

            if (movement === 'up' && currentRecipeIndex > 0) {
                const currentPlannedRecipe = localPlannedRecipeArray.splice(currentRecipeIndex, 1);
                localPlannedRecipeArray.splice(currentRecipeIndex - 1, 0, currentPlannedRecipe[0]);
            } else if (movement === 'down' && localPlannedRecipeArray.length - 1) {
                const currentPlannedRecipe = localPlannedRecipeArray.splice(currentRecipeIndex, 1);
                localPlannedRecipeArray.splice(currentRecipeIndex + 1, 0, currentPlannedRecipe[0]);
            }

            updatePlannedRecipes(localPlannedRecipeArray);
        }
    }

    function handleRemoveOnClick(event: React.MouseEvent<HTMLButtonElement>) {
        const target = event.target as HTMLButtonElement;
        const currentRecipeTitle = target.getAttribute('data-title');

        const localPlannedRecipes = localStorage.getItem(LSKey.plannedRecipes);
        if (localPlannedRecipes && currentRecipeTitle) {
            const localPlannedRecipeArray: PlannedRecipe[] = JSON.parse(localPlannedRecipes);
            const currentRecipeIndex = localPlannedRecipeArray.findIndex(plannedRecipe => plannedRecipe.title === currentRecipeTitle);
            localPlannedRecipeArray.splice(currentRecipeIndex, 1);

            updatePlannedRecipes(localPlannedRecipeArray);
        }
    }

    // Helpers
    function updatePlannedRecipes(updatedPlannedRecipes: PlannedRecipe[]) {
        localStorage.setItem(LSKey.plannedRecipes, JSON.stringify(updatedPlannedRecipes));
        setPlannedRecipes(updatedPlannedRecipes);
    }

    function removeAllPlannedRecipes() {
        localStorage.setItem(LSKey.plannedRecipes, JSON.stringify([]));
        setPlannedRecipes([]);
    }

    // Renderers
    return (
        <>
            <Card>
                <h1>Meal plan</h1>
            </Card>

            <Card hide={searchStatus !== 'searching'}>
                <h2>Fetching planned recipes...</h2>
            </Card>

            <Card hide={searchStatus !== 'complete'}>
                <>
                    <div className={styles['list-heading']}>
                        <h2>Meals ({plannedRecipes.length})</h2>
                        <button
                            aria-label='Remove all planned recipes from list'
                            className={`icon-only ${(plannedRecipes.length === 0) ? styles.hidden : ''}`}
                            onClick={removeAllPlannedRecipes}
                        >
                            <Icon ariaHidden={true} Icon={bxTrash} />
                        </button>
                    </div>

                    {plannedRecipes.length > 0 &&
                        <ul className={styles.list}>
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
                                        <button
                                            aria-label='Move up in list by one'
                                            className='icon-only'
                                            data-title={plannedRecipe.title}
                                            disabled={index === 0}
                                            onClick={(event) => handleOrderOnClick(event, 'up')}
                                        >
                                            <Icon ariaHidden={true} Icon={bxUpArrowAlt} />
                                        </button>
                                        <button
                                            aria-label='Move down in list by one'
                                            className='icon-only'
                                            data-title={plannedRecipe.title}
                                            disabled={index === plannedRecipes.length - 1}
                                            onClick={(event) => handleOrderOnClick(event, 'down')}
                                        >
                                            <Icon ariaHidden={true} Icon={bxDownArrowAlt} />
                                        </button>
                                        <button
                                            aria-label='Remove from list'
                                            className='icon-only'
                                            data-title={plannedRecipe.title}
                                            onClick={handleRemoveOnClick}
                                        >
                                            <Icon ariaHidden={true} Icon={bxTrash} />
                                        </button>
                                    </div>
                                </li>;
                            })}
                        </ul>
                    }
                </>
            </Card>

            <Card>
                <h2>Add to meal plan</h2>

                <form onSubmit={handleFormOnSubmit}>
                    <InputGroup2
                        button={<input name='submit' type='submit' value='Add' />}
                        input={<input id='input-add-to-meal-plan' name='title' type='text' />}
                        label={<label htmlFor='input-add-to-meal-plan'>Item</label>}
                    />
                </form>
            </Card>
        </>
    );
};

export default Plan;
