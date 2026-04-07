import { useState } from "react";

import { getAllRecipes, getRecipeBySlug, type Recipe } from "./utils";
import SearchBar from "./components/SearchBar";
import RecipeView from "./components/RecipeView";
import RecipesTable from "./components/RecipesTable";

function getInitialRecipe(): Recipe | null {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("recipe");
    if (slug) {
        return getRecipeBySlug(slug);
    }
    return null;
}

export default function App() {
    const allRecipes = getAllRecipes();
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(
        getInitialRecipe(),
    );

    const [searchTerm, setSearchTerm] = useState("");

    const filteredRecipes = allRecipes.filter((recipe) => {
        const term = searchTerm.toLowerCase();
        return (
            recipe.title.toLowerCase().includes(term) ||
            recipe.source.name.toLowerCase().includes(term)
        );
    });

    const viewRecipe = (recipe: Recipe) => {
        const url = new URL(window.location.href);
        url.searchParams.set("recipe", recipe.slug);
        window.history.pushState({}, "", url);
        setSelectedRecipe(recipe);
    };

    const backToTable = () => {
        const url = new URL(window.location.href);
        url.searchParams.delete("recipe");
        window.history.pushState({}, "", url);
        setSelectedRecipe(null);
    };

    return (
        <div style={{ position: "relative" }}>
            {selectedRecipe ? (
                <RecipeView onBack={backToTable} recipe={selectedRecipe} />
            ) : (
                <RecipesTable
                    onViewRecipe={viewRecipe}
                    recipes={filteredRecipes}
                    searchTerm={searchTerm}
                />
            )}
            <SearchBar onChange={setSearchTerm} value={searchTerm} />
        </div>
    );
}
