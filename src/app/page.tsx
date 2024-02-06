import { getAllRecipes } from "@/lib/api";

export default function Index() {
    const allRecipes = getAllRecipes();

    return (
        <main>
            <h2>Recipes</h2>

            <ol>
                {allRecipes.map((recipe) => (
                    <li key={recipe.slug}>
                        <a href={`/recipe/${recipe.slug}`}>
                            <b>{recipe.title}</b>
                        </a>
                        {recipe?.source && (
                            <span>
                                {" "}
                                by{" "}
                                <a
                                    href={recipe?.source?.url}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    {recipe.source?.name}
                                </a>
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </main>
    );
}
