import { getAllRecipes } from "@/lib/api";

export default function Index() {
    const allRecipes = getAllRecipes();

    return (
        <main>
            <h2>Recipes</h2>

            <ul>
                {allRecipes.map((recipe) => (
                    <li key={recipe.slug}>
                        <a href={`/recipe/${recipe.slug}`}>{recipe.title}</a>
                    </li>
                ))}
            </ul>
        </main>
    );
}
