import Link from 'next/link';
import * as React from 'react';

import type { FormattedRecipe } from '../../utils/types';

import BowlHotIcon from '../../public/icons/bxs-bowl-hot.svg';
import ExternalLinkIcon from '../../public/icons/bx-link-external.svg';
import TimeFiveIcon from '../../public/icons/bxs-time-five.svg';

import styles from './recipe-card.module.scss';

type RecipeCardProps = {
    recipe: FormattedRecipe
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
    const [doesImageExist, setDoesImageExist] = React.useState(false);

    React.useEffect(() => {
        if (recipe.image && recipe.image.alt && recipe.image.url) {
            checkIfImageExists(recipe.image.url, (exists) => {
                if (exists) {
                    setDoesImageExist(true);
                }
            });
        }
    }, []);

    const checkIfImageExists = (url: string, callback: (exists: boolean) => void) => {
        const img = new Image();
        img.src = url;
      
        if (img.complete) {
            callback(true);
        } else {
            img.onload = () => {
                callback(true);
            };
      
            img.onerror = () => {
                callback(false);
            };
        }
    };

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
        <div className={styles.container}>
            <div className={styles['title-source-container']}>
                {/* title */}
                <div>
                    <Link href={`/?recipe=${recipe.slug}`}>
                        <a className={styles['recipe-link']}>{recipe.title}</a>
                    </Link>
                </div>

                {/* source */}
                {recipe.source.url
                    ? <div>
                        <Link href={recipe.source.url}>
                            <a className={styles['source-link']} rel='noreferrer' target='_blank'>
                                {recipe.source.name}
                                <ExternalLinkIcon alt='external link' role='img' viewBox='0 0 24 24' />
                            </a>
                        </Link>
                    </div>
                    : <p className={styles['source-name']}>{recipe.source.name}</p>
                }
            </div>

            {/* image */}
            <div className={styles['image-container']}>
                {doesImageExist && recipe?.image?.url
                    ? <div
                        className={styles['image']}
                        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${recipe.image.url})` }}
                    ></div>
                    : <hr />
                }
            </div>

            <div className={styles['info-container']}>
                {/* time */}
                <div className={styles['time-yield-container']}>
                    <div>
                        <TimeFiveIcon aria-hidden='true' role='img' viewBox='0 0 24 24' />
                    </div>
                    <p>{(recipe.time.prep + recipe.time.cook)} mins <span>({recipe.time.prep} mins prep + {recipe.time.cook} mins cook)</span></p>
                </div>

                {/* yield */}
                <div className={styles['time-yield-container']}>
                    <div>
                        <BowlHotIcon aria-hidden='true' role='img' viewBox='0 0 24 24' />
                    </div>
                    <p>{recipe.yield.amount} {recipe.yield.unit}</p>
                </div>

                <hr />

                {/* categories */}
                <details className={styles['categories-container']}>
                    <summary>Categories</summary>

                    <div>
                        {recipe.cuisines &&
                            <div>
                                <p>Cuisines</p>
                                <ul>
                                    {recipe.cuisines.map((cuisine: string, index: number) => {
                                        return <li key={index}>{cuisine}</li>;
                                    })}
                                </ul>
                            </div>
                        }

                        <div>
                            <p>Dish types</p>
                            <ul>
                                {recipe.dishTypes.map((dishType: string, index: number) => {
                                    return <li key={index}>{dishType}</li>;
                                })}
                            </ul>
                        </div>

                        <div>
                            <p>Course types</p>
                            <ul>
                                {recipe.courseTypes.map((courseType: string, index: number) => {
                                    return <li key={index}>{courseType}</li>;
                                })}
                            </ul> 
                        </div>               

                        {recipe.dietaryRestrictions &&
                            <div>
                                <p>Dietary Restrictions</p>
                                <ul>
                                    {recipe.dietaryRestrictions.map((dietaryRestriction: string, index: number) => {
                                        return <li key={index}>{dietaryRestriction}</li>;
                                    })}
                                </ul>
                            </div>
                        }
                    </div>                    
                </details>

                {/* ingredients */}
                <details className={styles['ingredients-steps-notes-container']}>
                    <summary>Ingredients</summary>

                    <ul>
                        {recipe.ingredients.map((ingredient: string, index: number) => {
                            const inputId = `${recipe.slug}-ingredient-${index}`;
 
                            return <li key={index}>
                                <input id={inputId} onClick={handleIngredientClick} type='checkbox' />
                                <label htmlFor={inputId}>{ingredient}</label>
                            </li>;
                        })}
                    </ul>
                </details>

                {/* steps */}
                <details className={styles['ingredients-steps-notes-container']}>
                    <summary>Steps</summary>

                    <ol>
                        {recipe.steps.map((step: string, index: number) => {
                            const inputId = `${recipe.slug}-step-${index}`;

                            return <li key={index}>
                                <input id={inputId} onClick={handleIngredientClick} type='checkbox' />
                                <label htmlFor={inputId}>{step}</label>
                            </li>;
                        })}
                    </ol>
                </details>

                {/* notes */}
                {recipe.notes &&
                    <details className={styles['ingredients-steps-notes-container']}>
                        <summary>Notes</summary>

                        <ul>
                            {recipe.notes.map((note: string, index: number) => {
                                return <li key={index}>{note}</li>;
                            })}
                        </ul>
                    </details>
                }
            </div>
        </div>
    );
};

export default RecipeCard;
