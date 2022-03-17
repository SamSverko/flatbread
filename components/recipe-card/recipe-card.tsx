import Image from 'next/image';
import Link from 'next/link';

type recipeCardProps = {
    recipe: any
}

const RecipeCard = ({ recipe }: recipeCardProps) => {
    return (
        <div>
            {/* title */}
            <div>
                <Link href={`/?recipe=${recipe.slug}`}>
                    <a><b>{recipe.title}</b></a>
                </Link>
            </div>

            {/* source */}
            <div>
                {recipe.source.url
                    ? <Link href={recipe.source.url}><a rel='noreferrer' target='_blank'>{recipe.source.name}</a></Link>
                    : <p>{recipe.source.name}</p>
                }
            </div>

            {/* image */}
            <div>
                {recipe.image && recipe.image.alt && recipe.image.url &&
                    <Image
                        alt={recipe.image.alt}
                        height={100}
                        src={`/api/image-proxy?url=${encodeURIComponent(recipe.image.url)}`}
                        width={100}
                    />
                }
            </div>

            {/* time */}
            <div>
                <p>🕓 <b>{(recipe.time.prep + recipe.time.cook)} mins</b> ({recipe.time.prep} mins prep + {recipe.time.cook} mins cook)</p>
            </div>

            {/* yield */}
            <div>
                <p>🍴 <b>{recipe.yield.amount} {recipe.yield.unit}</b></p>
            </div>

            {/* categories */}
            <details>
                <summary><b>Categories</b></summary>

                <p><b>Cuisines</b></p>
                <ul>
                    {recipe.cuisines.map((cuisine: any, index: number) => {
                        return <li key={index}>{cuisine}</li>;
                    })}
                </ul>

                <p><b>Dish types</b></p>
                <ul>
                    {recipe.dishTypes.map((dishType: any, index: number) => {
                        return <li key={index}>{dishType}</li>;
                    })}
                </ul>

                <p><b>Course types</b></p>
                <ul>
                    {recipe.courseTypes.map((courseType: any, index: number) => {
                        return <li key={index}>{courseType}</li>;
                    })}
                </ul>                

                {recipe.dietaryRestrictions &&
                    <>
                        <p><b>Dietary Restrictions</b></p>
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
                <summary><b>Ingredients</b></summary>

                <ul>
                    {recipe.ingredients.map((ingredient: any, index: number) => {
                        return <li key={index}>{ingredient}</li>;
                    })}
                </ul>
            </details>

            {/* steps */}
            <details>
                <summary><b>Steps</b></summary>

                <ol>
                    {recipe.steps.map((step: any, index: number) => {
                        return <li key={index}>{step}</li>;
                    })}
                </ol>
            </details>

            {/* notes */}
            {recipe.notes &&
                <details>
                    <summary><b>Notes</b></summary>

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
