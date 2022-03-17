import Image from 'next/image';
import Link from 'next/link';

type recipeCardProps = {
    recipe: any
}

const RecipeCard = ({ recipe }: recipeCardProps) => {
    return (
        <div>
            {/* title */}
            <h3>{recipe.title}</h3>

            {/* source */}
            {recipe.source.url
                ? <Link href={recipe.source.url}><a rel='noreferrer' target='_blank'>{recipe.source.name}</a></Link>
                : <p>{recipe.source.name}</p>
            }

            {/* image */}
            {recipe.image && recipe.image.alt && recipe.image.url &&
                <Image
                    alt={recipe.image.alt}
                    height={100}
                    src={`/api/image-proxy?url=${encodeURIComponent(recipe.image.url)}`}
                    width={100}
                />
            }

            {/* time */}
            <p>🕓 <b>{(recipe.time.prep + recipe.time.cook)} mins</b> ({recipe.time.prep} mins prep + {recipe.time.cook} mins cook)</p>

            {/* yield */}
            <p>🍴 <b>{recipe.yield.amount} {recipe.yield.unit}</b></p>

            {/* categories */}
            <details>
                <summary>Categories</summary>

                <p>Cuisines</p>
                <ul>
                    {recipe.cuisines.map((cuisine: any, index: number) => {
                        return <li key={index}>{cuisine}</li>;
                    })}
                </ul>

                <p>Dish types</p>
                <ul>
                    {recipe.dishTypes.map((dishType: any, index: number) => {
                        return <li key={index}>{dishType}</li>;
                    })}
                </ul>

                <p>Course types</p>
                <ul>
                    {recipe.courseTypes.map((courseType: any, index: number) => {
                        return <li key={index}>{courseType}</li>;
                    })}
                </ul>                

                {recipe.dietaryRestrictions &&
                    <>
                        <p>Dietary Restrictions</p>
                        <ul>
                            {recipe.dietaryRestrictions.map((dietaryRestriction: any, index: number) => {
                                return <li key={index}>{dietaryRestriction}</li>;
                            })}
                        </ul>
                    </>
                }
            </details>

            {/* ingredients */}
            <details>
                <summary>Ingredients</summary>

                <ul>
                    {recipe.ingredients.map((ingredient: any, index: number) => {
                        return <li key={index}>{ingredient}</li>;
                    })}
                </ul>
            </details>

            {/* steps */}
            <details>
                <summary>Steps</summary>

                <ul>
                    {recipe.steps.map((step: any, index: number) => {
                        return <li key={index}>{step}</li>;
                    })}
                </ul>
            </details>

            {/* notes */}
            {recipe.notes &&
                <details>
                    <summary>Notes</summary>

                    <ul>
                        {recipe.notes.map((note: any, index: number) => {
                            return <li key={index}>{note}</li>;
                        })}
                    </ul>
                </details>
            }

            <hr />
        </div>
    );
};

export default RecipeCard;
