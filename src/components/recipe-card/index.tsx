import Link from 'next/link';
import * as React from 'react';

import Card from '../card';
import Icon from '../icon';

import { LSKey } from '../../utils';

import bxBowlHot from '../../../public/icons/bx-bowl-hot.svg';
import bxCalendarCheck from '../../../public/icons/bx-calendar-check.svg';
import bxCalendarPlus from '../../../public/icons/bx-calendar-plus.svg';
import bxCollapseVertical from '../../../public/icons/bx-collapse-vertical.svg';
import bxExpandVertical from '../../../public/icons/bx-expand-vertical.svg';
import bxHeart from '../../../public/icons/bx-heart.svg';
import bxsHeart from '../../../public/icons/bxs-heart.svg';
import bxIdCard from '../../../public/icons/bx-id-card.svg';
import bxLink from '../../../public/icons/bx-link.svg';
import bxLinkExternal from '../../../public/icons/bx-link-external.svg';
import bxListPlus from '../../../public/icons/bx-list-plus.svg';
import bxTimeFive from '../../../public/icons/bx-time-five.svg';

import styles from './index.module.scss';

import type { Cuisine, RecipeNote, RecipeStep } from '@prisma/client';
import type {
    PlannedRecipe,
    RecipeFormatted,
    RecipeIngredientResponse,
    SavedIngredient,
} from '../../types';

type ComponentProps = {
    isPlanned: boolean;
    isSaved: boolean;
    onRemoveFromSaved?: () => void;
    recipe: RecipeFormatted;
}

const RecipeCard = ({
    isPlanned = false,
    isSaved = false,
    onRemoveFromSaved,
    recipe,
}: ComponentProps) => {
    // States
    const [isCategoriesExpanded, setIsCategoriesExpanded] = React.useState(false);
    const [isCopiedSelected, setIsCopiedSelected] = React.useState(false);
    const [isExpandSelected, setIsExpandSelected] = React.useState(false);
    const [isPlannedState, setIsPlannedState] = React.useState(isPlanned);
    const [isIngredientsExpanded, setIsIngredientsExpanded] = React.useState(false);
    const [isNotesExpanded, setIsNotesExpanded] = React.useState(false);
    const [isSavedState, setIsSavedState] = React.useState(isSaved);
    const [isStepsExpanded, setIsStepsExpanded] = React.useState(false);

    // Effects
    React.useEffect(() => {
        if (!isCategoriesExpanded && !isIngredientsExpanded && !isNotesExpanded && !isStepsExpanded) {
            setIsExpandSelected(false);
        } else if (isCategoriesExpanded && isIngredientsExpanded && isNotesExpanded && isStepsExpanded) {
            setIsExpandSelected(true);
        }
    }, [isCategoriesExpanded, isIngredientsExpanded, isNotesExpanded, isStepsExpanded]);

    // Event listeners
    function handleAddIngredientOnClick(event: React.MouseEvent<HTMLButtonElement>, ingredient: RecipeIngredientResponse) {
        const target = event.target;
        if ((target as HTMLButtonElement).getAttribute('aria-pressed') === 'true') return;

        const shoppingList = localStorage.getItem(LSKey.shoppingList);
        
        let quantity = 0;
        if (ingredient.quantityMaxWhole) {
            quantity += ingredient.quantityMaxWhole;
        }
        if (ingredient.quantityMaxFraction) {
            quantity += Number(Number(ingredient.quantityMaxFraction.value).toFixed(3));
        }
        if (ingredient.quantityWhole) {
            quantity += ingredient.quantityWhole;
        }
        if (ingredient.quantityFraction) {
            quantity += Number(Number(ingredient.quantityFraction.value).toFixed(3));
        }
        
        const ingredientToAdd: SavedIngredient = {
            id: ingredient.id.toString(),
            isComplete: false,
            name: {
                name: ingredient.name.name,
                namePlural: ingredient.name.namePlural,
            },
            quantity: quantity,
        };

        if (ingredient.unit) {
            ingredientToAdd.unit = {
                name: ingredient.unit.name,
                nameAbbr: ingredient.unit.nameAbbr,
                namePlural: ingredient.unit.namePlural,
            };
        }

        if (!shoppingList) {
            localStorage.setItem(LSKey.shoppingList, `[${JSON.stringify(ingredientToAdd)}]`);
        } else {
            const shoppingListArray: SavedIngredient[] = JSON.parse(shoppingList);
            const ingredientToAddIndex = shoppingListArray.findIndex(listItem => listItem.id === ingredientToAdd.id);
            
            if (ingredientToAddIndex === -1) {
                shoppingListArray.push(ingredientToAdd);
            } else {
                const newQuantity = shoppingListArray[ingredientToAddIndex].quantity + ingredientToAdd.quantity;

                shoppingListArray[ingredientToAddIndex].quantity = Number(newQuantity.toFixed(3));
                shoppingListArray[ingredientToAddIndex].isComplete = false;
            }

            localStorage.setItem(LSKey.shoppingList, JSON.stringify(shoppingListArray));
        }

        if (!target) return;

        (target as HTMLButtonElement).setAttribute('aria-pressed', 'true');
        window.setTimeout(() => (target as HTMLButtonElement).setAttribute('aria-pressed', 'false'), 500);
    }

    async function handleCopyLinkOnClick() {
        try {
            await navigator.clipboard.writeText(`${window.location.origin}/recipe/${recipe.slug}`);
            setIsCopiedSelected(true);
            window.setTimeout(() => setIsCopiedSelected(false), 2000);
        } catch (error) {
            console.error('Failed to copy recipe link to clipboard: ', error);
        }
    }

    function handleExpandAllOnClick() {
        const updateExpandedValue = (isExpandSelected) ? false : true;
        setIsExpandSelected(updateExpandedValue);

        setIsCategoriesExpanded(updateExpandedValue);
        setIsIngredientsExpanded(updateExpandedValue);
        setIsNotesExpanded(updateExpandedValue);
        setIsStepsExpanded(updateExpandedValue);
    }

    function handlePlanRecipeOnClick() {
        const plannedRecipes = localStorage.getItem(LSKey.plannedRecipes);
        const currentRecipe: PlannedRecipe = {
            id: recipe.id.toString(),
            title: recipe.title,
            isComplete: false,
            url: `${window.location.origin}/recipe/${recipe.slug}`,
        };

        if (!plannedRecipes) {
            localStorage.setItem(LSKey.plannedRecipes, `[${JSON.stringify(currentRecipe)}]`);
            setIsPlannedState(true);
        } else {
            const plannedRecipesArray = JSON.parse(plannedRecipes);
            const plannedRecipeIndex = plannedRecipesArray.findIndex((plannedRecipe: PlannedRecipe) => plannedRecipe.id === recipe.id);

            if (plannedRecipeIndex === -1) {
                plannedRecipesArray.push(currentRecipe);
                localStorage.setItem(LSKey.plannedRecipes, JSON.stringify(plannedRecipesArray));
                setIsPlannedState(true);
            } else {
                plannedRecipesArray.splice(plannedRecipeIndex, 1);
                localStorage.setItem(LSKey.plannedRecipes, JSON.stringify(plannedRecipesArray));
                setIsPlannedState(false);
            }
        }
    }

    function handleSummaryOnClick(event: React.MouseEvent<HTMLLIElement>) {
        event.preventDefault();
        if (!event.target) return;

        const elementText = (event.target as HTMLElement).innerText;

        if (elementText === 'Categories') {
            setIsCategoriesExpanded(isCategoriesExpanded => (isCategoriesExpanded) ? false : true);
        } else if (elementText === 'Ingredients') {
            setIsIngredientsExpanded(isIngredientsExpanded => (isIngredientsExpanded) ? false : true);
        } else if (elementText === 'Steps') {
            setIsStepsExpanded(isStepsExpanded => (isStepsExpanded) ? false : true);
        } else if (elementText === 'Notes') {
            setIsNotesExpanded(isNotesExpanded => (isNotesExpanded) ? false : true);
        }
    }

    function handleSaveRecipeOnClick() {
        const savedRecipes = localStorage.getItem(LSKey.savedRecipes);

        if (!savedRecipes) {
            localStorage.setItem(LSKey.savedRecipes, `[${JSON.stringify(recipe)}]`);
            setIsSavedState(true);
        } else {
            const savedRecipesArray = JSON.parse(savedRecipes);
            const savedRecipeIndex = savedRecipesArray.findIndex((savedRecipe: RecipeFormatted) => savedRecipe.slug === recipe.slug);

            if (savedRecipeIndex === -1) {
                savedRecipesArray.push(recipe);
                localStorage.setItem(LSKey.savedRecipes, JSON.stringify(savedRecipesArray));
                setIsSavedState(true);
            } else {
                savedRecipesArray.splice(savedRecipeIndex, 1);
                localStorage.setItem(LSKey.savedRecipes, JSON.stringify(savedRecipesArray));
                setIsSavedState(false);
                if (onRemoveFromSaved) onRemoveFromSaved();
            }
        }
    }

    // Renderers
    function renderCategories() {
        function renderCategory(category: string, categories: Cuisine[]) {
            const id = category.toLowerCase().replaceAll(' ', '-');

            return (
                <div>
                    <p><b>{category}</b></p>
                    <ul>
                        {categories.map((category, index) => {
                            return <li key={`key-${recipe.slug}-${id}-${index}`}>{category.name}</li>;
                        })} 
                    </ul>
                </div>
            );
        }

        return (
            <details className={styles.categories} open={isCategoriesExpanded}>
                <summary onClick={handleSummaryOnClick}>Categories</summary>

                <div className={styles['details-content']}>
                    {renderCategory('Cuisines', recipe.cuisines)}
                    {renderCategory('Dish types', recipe.dishTypes)}
                    {renderCategory('Course types', recipe.courseTypes)}
                    {renderCategory('Dietary restrictions', recipe.dietaryRestrictions)}
                </div>

                <hr />
            </details>
        );
    }

    function renderControls() {
        return (
            <div className={styles.controls}>
                <div>
                    <button
                        aria-pressed={isSavedState}
                        className='icon-only'
                        onClick={handleSaveRecipeOnClick}
                    >
                        {!isSavedState &&
                            <Icon ariaLabel='Add to saved recipes' Icon={bxHeart} />                        
                        }
                        {isSavedState &&
                            <Icon ariaLabel='Remove to saved recipes' Icon={bxsHeart} />                        
                        }
                    </button>
                    <button
                        aria-pressed={isPlannedState}
                        className='icon-only'
                        onClick={handlePlanRecipeOnClick}
                    >
                        {!isPlannedState &&
                            <Icon ariaLabel='Add to meal plan' Icon={bxCalendarPlus} />
                        }
                        {isPlannedState &&
                            <Icon ariaLabel='Remove to meal plan' Icon={bxCalendarCheck} />
                        }
                    </button>
                    <button
                        aria-pressed={isCopiedSelected}
                        className='icon-only'
                        onClick={handleCopyLinkOnClick}
                    >
                        <Icon ariaLabel='Copy recipe link to clipboard' Icon={bxLink} />
                    </button>
                </div>
                <div>
                    <button
                        aria-pressed={isExpandSelected}
                        className='icon-only'
                        onClick={handleExpandAllOnClick}
                    >
                        {!isExpandSelected &&
                            <Icon ariaLabel='Expand all recipe sections' Icon={bxExpandVertical} />
                        }
                        {isExpandSelected &&
                            <Icon ariaLabel='Collapse all recipe sections' Icon={bxCollapseVertical} />
                        }
                    </button>
                </div>
            </div>
        );
    }

    function renderIngredients() {
        let currentSection: null | string = null;
        const formattedIngredients: (RecipeIngredientResponse | string)[] = [];

        recipe.ingredients.map((ingredient) => {
            if (ingredient.section && ingredient.section !== currentSection) {
                formattedIngredients.push(ingredient.section);
                currentSection = ingredient.section;
            }
            formattedIngredients.push(ingredient);
        });

        function parseIngredient(ingredient: RecipeIngredientResponse) {
            let quantity = '';
            let quantityValue = 0;
    
            if (ingredient.quantityWhole) {
                quantity += ingredient.quantityWhole;
                quantityValue += ingredient.quantityWhole;
            }
    
            if (ingredient.quantityFraction) {
                quantity += ingredient.quantityFraction.name;
                quantityValue += Number(ingredient.quantityFraction.value);
            }
    
            if (ingredient.quantityMinWhole) {
                quantity += ingredient.quantityMinWhole;
                quantityValue += ingredient.quantityMinWhole;
            }
    
            if (ingredient.quantityMinFraction) {
                quantity += ingredient.quantityMinFraction.name;
                quantityValue += Number(ingredient.quantityMinFraction.value);
            }
    
            if (ingredient.quantityMaxWhole || ingredient.quantityMaxFraction) {
                quantity += '-';
            }
    
            if (ingredient.quantityMaxWhole) {
                quantity += ingredient.quantityMaxWhole;
                quantityValue += ingredient.quantityMaxWhole;
            }
    
            if (ingredient.quantityMaxFraction) {
                quantity += ingredient.quantityMaxFraction.name;
                quantityValue += Number(ingredient.quantityMaxFraction.value);
            }

            if (ingredient.quantityMinFraction && ingredient.quantityMaxFraction) {
                quantityValue -= Number(ingredient.quantityMinFraction.value);
            }

            if (ingredient.quantityMinWhole && ingredient.quantityMaxWhole) {
                quantityValue -= ingredient.quantityMinWhole;
            }
    
            const unit = (ingredient.unit) ? (quantityValue <= 1 ? ingredient.unit.name : ingredient.unit.namePlural) : '';
            const name = (quantityValue <= 1) ? ingredient.name.name : ingredient.name.namePlural;
            const alteration = (ingredient.alteration) ? `, ${ingredient.alteration}` : '';
            const optional = (ingredient.isOptional) ? ' (optional)' : '';
            const substitutions = (ingredient.substitutions.length > 0)
                ? ` (substitutions: ${ingredient.substitutions.map((substitution) => substitution.name).join(', ')})`
                : '';
    
            return {
                alteration: alteration,
                name: name,
                optional: optional,
                quantity: quantity,
                quantityValue: quantityValue,
                substitutions: substitutions,
                unit: unit,
            };
        }

        return (
            <details className={styles.ingredients} open={isIngredientsExpanded}>
                <summary onClick={handleSummaryOnClick}>Ingredients</summary>

                <div className={styles['add-all-container']}>
                    <span>Add all</span>
                    <button className='icon-only' disabled>
                        <Icon ariaLabel='Add all ingredients to shopping list' Icon={bxListPlus} />
                    </button>
                </div>

                <ul>
                    {formattedIngredients.map((ingredient, index) => {
                        const ingredientId = `${recipe.slug}-ingredient-${index}`;

                        if (typeof ingredient === 'string') {
                            return <li className={styles.header} key={`key-${ingredientId}`}><b>{ingredient}</b></li>;
                        } else {
                            const parsedIngredient = parseIngredient(ingredient);
                            return (
                                <li key={`key-${ingredientId}`}>
                                    <div className={styles['details']}>
                                        <input id={ingredientId} type='checkbox' />
                                        <label className='no-styles' htmlFor={ingredientId}>
                                            {parsedIngredient.quantity} {parsedIngredient.unit} <b>{parsedIngredient.name}</b>
                                            <em>{parsedIngredient.alteration}</em>{parsedIngredient.optional}{parsedIngredient.substitutions}
                                        </label>
                                    </div>
                                    <button
                                        aria-pressed={false}
                                        className='icon-only'
                                        onClick={(event) => handleAddIngredientOnClick(event, ingredient)}
                                    >
                                        <Icon ariaLabel='Add ingredient to shopping list' Icon={bxListPlus} />
                                    </button>
                                </li>
                            );
                        }
                    })} 
                </ul>

                <hr />
            </details>
        );
    }

    function renderNotes() {
        let currentSection: null | string = null;
        const formattedNotes: (RecipeNote | string)[] = [];

        recipe.notes.map((note) => {
            if (note.section && note.section !== currentSection) {
                formattedNotes.push(note.section);
                currentSection = note.section;
            }
            formattedNotes.push(note);
        });

        return (
            <details className={styles.notes} open={isNotesExpanded}>
                <summary onClick={handleSummaryOnClick}>Notes</summary>

                <ul>
                    {formattedNotes.map((note, index) => {
                        const noteId = `${recipe.slug}-note-${index}`;

                        if (typeof note === 'string') {
                            return <li className={styles.header} key={`key-${noteId}`}><b>{note}</b></li>;
                        } else {
                            return <li key={`key-${noteId}`}>{note.details}</li>;
                        }
                    })} 
                </ul>
            </details>
        );
    }

    function renderSteps() {
        let currentSection: null | string = null;
        const formattedSteps: (RecipeStep | string)[] = [];

        recipe.steps.map((step) => {
            if (step.section && step.section !== currentSection) {
                formattedSteps.push(step.section);
                currentSection = step.section;
            }
            formattedSteps.push(step);
        });

        return (
            <details className={styles.steps} open={isStepsExpanded}>
                <summary onClick={handleSummaryOnClick}>Steps</summary>

                <ul>
                    {formattedSteps.map((step, index) => {
                        const stepId = `${recipe.slug}-step-${index}`;

                        if (typeof step === 'string') {
                            return <li className={styles.header} key={`key-${stepId}`}><b>{step}</b></li>;
                        } else {
                            return (
                                <li key={`key-${stepId}`}>
                                    <input id={stepId} type='checkbox' />
                                    <label className='no-styles' htmlFor={stepId}>{step.details}</label>
                                </li>
                            );
                        }
                    })} 
                </ul>

                <hr />
            </details>
        );
    }

    function renderTitle() {
        return (
            <h2 className={styles.title}>
                <Link href={`/recipe/${recipe.slug}`}>
                    {recipe.title}
                </Link>
            </h2>
        );
    }

    function renderTopInfo(type: 'source' | 'time' | 'yield', InfoIcon: JSX.Element) {
        function getTimeString(totalMinutes: number) {
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
    
            if (hours === 0) {
                return `${minutes} min`;
            } else if (minutes === 0) {
                return `${hours} hr`;
            } else {
                return `${hours} hr ${minutes} min`;
            }
        }

        function renderFormattedTime() {
            const totalTime = getTimeString(recipe.prepTimeMin + recipe.cookTimeMin);
            const prepTime = getTimeString(recipe.prepTimeMin);
            const cookTime = getTimeString(recipe.cookTimeMin);
    
            return (<span><b>{totalTime}</b> ({prepTime} prep + {cookTime} cook)</span>);
        }

        return (
            <div className={styles['top-info']}>
                <div className={styles['icon-container']}>
                    {InfoIcon}
                </div>
                {type === 'source' &&
                    <a href={recipe.sourceURL ? recipe.sourceURL : undefined} rel='noreferrer' target='_blank'>
                        {recipe.sourceName}
                        {recipe.sourceURL && 
                            <Icon ariaLabel='Open link in new tab' Icon={bxLinkExternal} />
                        }
                    </a>
                }
                {type === 'time' &&
                    renderFormattedTime()
                }
                {type === 'yield' &&
                    <span><b>{recipe.servingAmount} {recipe.servingUnit.namePlural}</b></span>
                }
            </div>
        );
    }

    return (
        <Card>
            {renderControls()}

            <hr />

            {renderTitle()}
            {renderTopInfo('source', <Icon ariaLabel='Recipe source' Icon={bxIdCard} />)}
            {renderTopInfo('time', <Icon ariaLabel='Recipe time' Icon={bxTimeFive} />)}
            {renderTopInfo('yield', <Icon ariaLabel='Recipe time' Icon={bxBowlHot} />)}

            <hr />

            {renderCategories()}
            {renderIngredients()}
            {renderSteps()}
            {renderNotes()}
        </Card>
    );
};

export default RecipeCard;
