import { getAllRecipes } from "@/lib/api";

export default function Index() {
    const allRecipes = getAllRecipes();

    return (
        <main>
            <h2>Recipes</h2>

            <ol>
                {allRecipes.map((recipe) => {
                    let sourceName = "";

                    if (recipe.source && recipe.source.name) {
                        sourceName = recipe.source.name;
                    }

                    return (
                        <li key={recipe.slug}>
                            <a href={`/recipe/${recipe.slug}`}>
                                <b>{recipe.title}</b>
                            </a>
                            {sourceName && (
                                <span>
                                    {" "}
                                    by{" "}
                                    {recipe.source?.url ? (
                                        <a
                                            href={recipe.source.url}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            {sourceName}
                                        </a>
                                    ) : (
                                        sourceName
                                    )}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </main>
    );
}
