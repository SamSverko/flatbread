// import Link from 'next/link';
import * as React from 'react';

import IconBowlHot from '../../public/icons/bx-bowl-hot.svg';
import IconCalendarAlt from '../../public/icons/bx-calendar-check.svg';
import IconHeart from '../../public/icons/bx-heart.svg';
import IconIdCard from '../../public/icons/bx-id-card.svg';
import IconLink from '../../public/icons/bx-link.svg';
import IconLinkExternal from '../../public/icons/bx-link-external.svg';
import IconTimeFive from '../../public/icons/bx-time-five.svg';

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

    function handleIngredientClick(event: React.MouseEvent<HTMLInputElement>) {
        const target = event.target as HTMLInputElement;
        const label = target.nextElementSibling as HTMLLabelElement;
        if (target.checked && label) {
            label.className = styles.checked;
        } else {
            label.className = '';
        }
    }

    return (
        <section className={styles.container}>
            {/* controls */}
            <div className={styles.controls}>
                <button className='icon-only' disabled>
                    <IconHeart aria-label='Add to favourites' role='img' viewBox="0 0 24 24" />
                </button>
                <button className='icon-only' disabled>
                    <IconCalendarAlt aria-label='Add to meal prep' role='img' viewBox="0 0 24 24" />
                </button>
                <button className='icon-only' disabled>
                    <IconLink aria-label='Link recipe' role='img' viewBox="0 0 24 24" />
                </button>
            </div>

            <hr />

            {/* title */}
            <h2>
                <a className={styles['recipe-link']}>{recipe.title}</a>
            </h2>

            {/* source */}
            <div className={styles.source}>
                <IconIdCard aria-label='Recipe source' role='img' viewBox="0 0 24 24" />
                <a href={recipe.sourceURL ? recipe.sourceURL : undefined} rel='noreferrer' target='_blank'>
                    {recipe.sourceName}
                    {recipe.sourceURL && 
                        <IconLinkExternal aria-label='Open link in new tab' role='img' viewBox="0 0 24 24" />
                    }
                </a>
            </div>

            {/* time */}
            <div className={styles.source}>
                <IconTimeFive aria-label='Recipe time' role='img' viewBox="0 0 24 24" />
                {getFormattedTime()}
            </div>

            {/* yield */}
            <div className={styles.source}>
                <IconBowlHot aria-label='Recipe yield' role='img' viewBox="0 0 24 24" />
                {<span><b>{recipe.servingAmount} {recipe.servingUnit.namePlural}</b></span>}
            </div>

            <hr />

            {/* categories */}
            <details className={styles.categories}>
                <summary>Categories</summary>

                <div>
                    <p><b>Cuisines</b></p>
                    <ul>
                        {recipe.cuisines.map((cuisine, index) => {
                            return <li className='tag' key={`key-${recipe.slug}-cuisine-${index}`}>{cuisine.name}</li>;
                        })} 
                    </ul>
                </div>

                <div>
                    <p><b>Dish types</b></p>
                    <ul>
                        {recipe.dishTypes.map((dishType, index) => {
                            return <li className='tag' key={`key-${recipe.slug}-dish-type-${index}`}>{dishType.name}</li>;
                        })} 
                    </ul>
                </div>

                <div>
                    <p><b>Course types</b></p>
                    <ul>
                        {recipe.courseTypes.map((courseType, index) => {
                            return <li className='tag' key={`key-${recipe.slug}-course-type-${index}`}>{courseType.name}</li>;
                        })} 
                    </ul>
                </div>

                <div>
                    <p><b>Dietary restrictions</b></p>
                    <ul>
                        {recipe.dietaryRestrictions.map((dietaryRestriction, index) => {
                            return <li className='tag' key={`key-${recipe.slug}-course-type-${index}`}>{dietaryRestriction.name}</li>;
                        })} 
                    </ul>
                </div>
            </details>

            {/* ingredients */}
            <details className={styles.ingredients}>
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
            </details>
        </section>
    );
};

export default RecipeCard;
