import { getAllRecipes } from "@/lib/api";
import { RecipeEdit, RecipeSource } from "@/components";

export default function Index() {
    const allRecipes = getAllRecipes();

    return (
        <main>
            <h2>All recipes</h2>

            <table>
                <thead>
                    <tr>
                        <th align="left" scope="col">
                            Name
                        </th>
                        <th align="left" scope="col">
                            Source
                        </th>
                        <th align="center" scope="col">
                            Edit
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {allRecipes.map((recipe) => (
                        <tr key={recipe.slug}>
                            <th align="left" scope="row">
                                <a href={`/recipe/${recipe.slug}`}>
                                    <b>{recipe.title}</b>
                                </a>
                            </th>
                            <td align="left">
                                <RecipeSource source={recipe.source} />
                            </td>
                            <td align="center">
                                <RecipeEdit slug={recipe.slug} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}
