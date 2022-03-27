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
                    : <p>{recipe.source.name}</p>
                }
            </div>

            {/* image */}
            {doesImageExist && recipe?.image?.url
                ? <div
                    className={styles['image-container']}
                    style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${recipe.image.url})` }}
                ></div>
                : <hr className={styles['image-divider']} />
            }

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
                <details>
                    <summary><b>Categories</b></summary>

                    {recipe.cuisines &&
                        <>
                            <p><b>Cuisines</b></p>
                            <ul>
                                {recipe.cuisines.map((cuisine: string, index: number) => {
                                    return <li key={index}>{cuisine}</li>;
                                })}
                            </ul>
                        </>
                    }

                    <p><b>Dish types</b></p>
                    <ul>
                        {recipe.dishTypes.map((dishType: string, index: number) => {
                            return <li key={index}>{dishType}</li>;
                        })}
                    </ul>

                    <p><b>Course types</b></p>
                    <ul>
                        {recipe.courseTypes.map((courseType: string, index: number) => {
                            return <li key={index}>{courseType}</li>;
                        })}
                    </ul>                

                    {recipe.dietaryRestrictions &&
                        <>
                            <p><b>Dietary Restrictions</b></p>
                            <ul>
                                {recipe.dietaryRestrictions.map((dietaryRestriction: string, index: number) => {
                                    return <li key={index}>{dietaryRestriction}</li>;
                                })}
                            </ul>
                        </>
                    }
                </details>

                {/* ingredients */}
                <details>
                    <summary><b>Ingredients</b></summary>

                    <ul>
                        {recipe.ingredients.map((ingredient: string, index: number) => {
                            return <li key={index}>{ingredient}</li>;
                        })}
                    </ul>
                </details>

                {/* steps */}
                <details>
                    <summary><b>Steps</b></summary>

                    <ol>
                        {recipe.steps.map((step: string, index: number) => {
                            return <li key={index}>{step}</li>;
                        })}
                    </ol>
                </details>

                {/* notes */}
                {recipe.notes &&
                    <details>
                        <summary><b>Notes</b></summary>

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
