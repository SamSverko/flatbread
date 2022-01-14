import React from 'react';
import Link from 'next/link';

const Recipes = ({ recipes }: any) => {
    // console.log(recipes);

    return (
        <ol>
            {recipes
                .sort((a: any, b: any) => {
                    const titleA = a.fields.title.toUpperCase();
                    const titleB = b.fields.title.toUpperCase();
                    if (titleA < titleB) {
                        return -1;
                    }
                    if (titleA > titleB) {
                        return 1;
                    }
                    return 0;
                })
                .map((recipe: any, index: number) => {
                    return (
                        <li key={index}>
                            <details>
                                {/* title */}
                                <summary><b>{recipe.fields.title}</b></summary>
                                <Link href={`/recipe/${recipe.fields.slug}`}>
                                    <a><b>View Recipe</b></a>
                                </Link>
                                <ul>
                                    {/* courseTypes */}
                                    <li>
                                        <b>Course Types: </b>
                                        <ul>
                                            {recipe.fields.courseTypes
                                                .sort((a: any, b: any) => {
                                                    const titleA = a.fields.title.toUpperCase();
                                                    const titleB = b.fields.title.toUpperCase();
                                                    if (titleA < titleB) {
                                                        return -1;
                                                    }
                                                    if (titleA > titleB) {
                                                        return 1;
                                                    }
                                                    return 0;
                                                })
                                                .map((courseType: any, index: number) => {
                                                    return (
                                                        <li key={index}>{courseType.fields.title}</li>
                                                    );
                                                })}
                                        </ul>
                                    </li>
                                    {/* cuisines */}
                                    <li>
                                        <b>Cuisines: </b>
                                        <ul>
                                            {recipe.fields.cuisines
                                                .sort((a: any, b: any) => {
                                                    const titleA = a.fields.title.toUpperCase();
                                                    const titleB = b.fields.title.toUpperCase();
                                                    if (titleA < titleB) {
                                                        return -1;
                                                    }
                                                    if (titleA > titleB) {
                                                        return 1;
                                                    }
                                                    return 0;
                                                })
                                                .map((cuisine: any, index: number) => {
                                                    return (
                                                        <li key={index}>{cuisine.fields.title}</li>
                                                    );
                                                })}
                                        </ul>
                                    </li>
                                    {/* dietaryRestrictions */}
                                    {Object.prototype.hasOwnProperty.call(recipe.fields, 'dietaryRestrictions') && 
                                        <li>
                                            <b>Dietary Restrictions: </b>
                                            <ul>
                                                {recipe.fields?.dietaryRestrictions
                                                    .sort((a: any, b: any) => {
                                                        const titleA = a.fields.title.toUpperCase();
                                                        const titleB = b.fields.title.toUpperCase();
                                                        if (titleA < titleB) {
                                                            return -1;
                                                        }
                                                        if (titleA > titleB) {
                                                            return 1;
                                                        }
                                                        return 0;
                                                    })
                                                    .map((dietaryRestriction: any, index: number) => {
                                                        return (
                                                            <li key={index}>{dietaryRestriction.fields.title}</li>
                                                        );
                                                    })}
                                            </ul>
                                        </li>
                                    }
                                    {/* dishTypes */}
                                    <li>
                                        <b>Dish Types: </b>
                                        <ul>
                                            {recipe.fields.dishTypes
                                                .sort((a: any, b: any) => {
                                                    const titleA = a.fields.title.toUpperCase();
                                                    const titleB = b.fields.title.toUpperCase();
                                                    if (titleA < titleB) {
                                                        return -1;
                                                    }
                                                    if (titleA > titleB) {
                                                        return 1;
                                                    }
                                                    return 0;
                                                })
                                                .map((dishType: any, index: number) => {
                                                    return (
                                                        <li key={index}>{dishType.fields.title}</li>
                                                    );
                                                })}
                                        </ul>
                                    </li>
                                    {/* sourceName & sourceUrl */}
                                    <li>
                                        <b>Source: </b>
                                        {recipe.fields.sourceUrl && <a href={recipe.fields.sourceUrl} rel='noreferrer' target='_blank'>{recipe.fields.sourceName}</a>}
                                        {!recipe.fields.sourceUrl && `${recipe.fields.sourceName}`}
                                    </li>
                                    {/* prepTime & cookTime */}
                                    <li>
                                        <b>Total Time: </b> {recipe.fields.prepTime + recipe.fields.cookTime} mins
                                        <ul>
                                            <li><b>Prep: </b>{recipe.fields.prepTime} mins</li>
                                            <li><b>Cook: </b>{recipe.fields.cookTime} mins</li>
                                        </ul>
                                    </li>
                                    {/* yieldAmount & yieldUnit */}
                                    <li>
                                        <b>Yield: </b>{recipe.fields.yieldAmount} {(recipe.fields.yieldAmount > 1) ? recipe.fields.yieldUnit.fields.titlePlural : recipe.fields.yieldUnit.fields.title}
                                    </li>
                                    {/* ingredients */}
                                    <li>
                                        <b>Ingredients: </b>
                                        <ul>
                                            {recipe.fields.ingredients.map((ingredient: any, index: number) => {
                                                return (
                                                    <li key={index}>{ingredient}</li>
                                                );
                                            })}
                                        </ul>
                                    </li>
                                    {/* steps */}
                                    <li>
                                        <b>Steps: </b>
                                        <ul>
                                            {recipe.fields.steps.map((step: any, index: number) => {
                                                return (
                                                    <li key={index}>{step}</li>
                                                );
                                            })}
                                        </ul>
                                    </li>
                                    {/* notes */}
                                    {Object.prototype.hasOwnProperty.call(recipe.fields, 'notes') && 
                                        <li>
                                            <b>Notes: </b>
                                            <ul>
                                                {recipe.fields?.notes?.map((note: any, index: number) => {
                                                    return (
                                                        <li key={index}>{note}</li>
                                                    );
                                                })}
                                            </ul>
                                        </li>
                                    }
                                </ul>
                            </details>
                        </li>
                    );
                })}
        </ol>
    );
};

export default Recipes;
