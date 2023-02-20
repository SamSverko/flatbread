import Link from 'next/link';
import * as React from 'react';

import Icon from '../icon';

import bxBowlHot from '../../public/icons/bx-bowl-hot.svg';
import bxCalendarCheck from '../../public/icons/bx-calendar-check.svg';
import bxExpandVertical from '../../public/icons/bx-expand-vertical.svg';
import bxHeart from '../../public/icons/bx-heart.svg';
import bxIdCard from '../../public/icons/bx-id-card.svg';
import bxLink from '../../public/icons/bx-link.svg';
import bxLinkExternal from '../../public/icons/bx-link-external.svg';
import bxTimeFive from '../../public/icons/bx-time-five.svg';

import styles from './index.module.scss';

import type {
    CourseType,
    Cuisine,
    DietaryRestriction,
    DishType,
    Prisma,
    Recipe,
    RecipeNote,
    RecipeStep,
    ServingUnit,
} from '@prisma/client';

type RecipeIngredientResponse = Prisma.RecipeIngredientGetPayload<{ select: { [K in keyof Required<Prisma.RecipeIngredientSelect>]: true } }>

interface RecipeFormatted extends Recipe {
    servingUnit: ServingUnit;
    courseTypes: CourseType[];
    cuisines: Cuisine[];
    dietaryRestrictions: DietaryRestriction[];
    dishTypes: DishType[];
    ingredients: RecipeIngredientResponse[];
    steps: RecipeStep[];
    notes: RecipeNote[];
}

type ComponentProps = {
    recipe: RecipeFormatted
}

const RecipeCard = ({ recipe }: ComponentProps) => {
    // Event listeners
    function handleIngredientClick(event: React.MouseEvent<HTMLInputElement>) {
        const target = event.target as HTMLInputElement;
        const label = target.nextElementSibling as HTMLLabelElement;
        if (target.checked && label) {
            label.className = styles.checked;
        } else {
            label.className = '';
        }
    }

    // Helpers
    function getFormattedTime() {
        const totalTime = getTimeString(recipe.prepTimeMin + recipe.cookTimeMin);
        const prepTime = getTimeString(recipe.prepTimeMin);
        const cookTime = getTimeString(recipe.cookTimeMin);

        return (<span><b>{totalTime}</b> ({prepTime} prep + {cookTime} cook)</span>);
    }

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

    function getIngredientString(ingredient: RecipeIngredientResponse, id: string) {
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

        const unit = (ingredient.unit) ? (quantityValue <= 1 ? ingredient.unit.name : ingredient.unit.namePlural) : '';
        const name = (quantityValue <= 1) ? ingredient.name.name : ingredient.name.namePlural;
        const alteration = (ingredient.alteration) ? `, ${ingredient.alteration}` : '';
        const optional = (ingredient.isOptional) ? ' (optional)' : '';
        const substitutions = (ingredient.substitutions.length > 0)
            ? ` (substitutions: ${ingredient.substitutions.map((substitution) => substitution.name).join(', ')})`
            : '';

        return <label htmlFor={id}><b>{quantity} {unit} {name}</b><em>{alteration}</em>{optional}{substitutions}</label>;
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
            <details className={styles.categories}>
                <summary>Categories</summary>

                <div className={styles['details-content']}>
                    {renderCategory('Cuisines', recipe.cuisines)}
                    {renderCategory('Dish types', recipe.dishTypes)}
                    {renderCategory('Course types', recipe.courseTypes)}
                    {renderCategory('Dietary restrictions', recipe.dietaryRestrictions)}
                </div>
            </details>
        );
    }

    function renderTitle() {
        return (
            <h2 className={styles.title}>
                <Link href={`/recipe/${recipe.slug}`}>
                    <a>{recipe.title}</a>
                </Link>
            </h2>
        );
    }

    function renderControls() {
        return (
            <div className={styles.controls}>
                <div>
                    <button className='icon-only' disabled>
                        <Icon aria-label='Add to favourites' Icon={bxHeart} />
                    </button>
                    <button className='icon-only' disabled>
                        <Icon aria-label='Add to meal prep' Icon={bxCalendarCheck} />
                    </button>
                    <button className='icon-only' disabled>
                        <Icon aria-label='Copy recipe link to clipboard' Icon={bxLink} />
                    </button>
                </div>
                <div>
                    <button className='icon-only' disabled>
                        <Icon aria-label='Expand recipe details' Icon={bxExpandVertical} />                        
                    </button>
                </div>
            </div>
        );
    }

    function renderTopInfo(type: 'source' | 'time' | 'yield', InfoIcon: JSX.Element) {
        return (
            <div className={styles['top-info']}>
                <div className={styles['icon-container']}>
                    {InfoIcon}
                </div>
                {type === 'source' &&
                    <a href={recipe.sourceURL ? recipe.sourceURL : undefined} rel='noreferrer' target='_blank'>
                        {recipe.sourceName}
                        {recipe.sourceURL && 
                            <Icon aria-label='Open link in new tab' Icon={bxLinkExternal} />
                        }
                    </a>
                }
                {type === 'time' &&
                    getFormattedTime()
                }
                {type === 'yield' &&
                    <span><b>{recipe.servingAmount} {recipe.servingUnit.namePlural}</b></span>
                }
            </div>
        );
    }

    return (
        <section className={styles.container}>
            {renderControls()}

            <hr />

            {renderTitle()}
            {renderTopInfo('source', <Icon aria-label='Recipe source' Icon={bxIdCard} />)}
            {renderTopInfo('time', <Icon aria-label='Recipe time' Icon={bxTimeFive} />)}
            {renderTopInfo('yield', <Icon aria-label='Recipe time' Icon={bxBowlHot} />)}

            <hr />

            {renderCategories()}            

            {/* ingredients */}
            {/* <details className={styles.ingredients}>
                <summary>Ingredients</summary>

                <ul>
                    {recipe.ingredients.map((ingredient, index) => {
                        const ingredientId = `${recipe.slug}-ingredient-${index}`;

                        return (
                            <li key={`key-${ingredientId}`}>
                                <input id={ingredientId} onClick={handleIngredientClick} type='checkbox' />
                                {getIngredientString(ingredient, ingredientId)}
                            </li>
                        );
                    })} 
                </ul>
            </details> */}
        </section>
    );
};

export default RecipeCard;
