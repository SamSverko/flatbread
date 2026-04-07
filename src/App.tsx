import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { getAllRecipes, getRecipeBySlug, type Recipe } from "./utils";
import EditLink from "./components/EditLink";
import ShareButton from "./components/ShareButton";
import SearchBar from "./components/SearchBar";
import HighlightedText from "./components/HighlightedText";
import { STYLE_SPACER } from "./constants";

function getInitialRecipe(): Recipe | null {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("recipe");
    if (slug) {
        return getRecipeBySlug(slug);
    }
    return null;
}

function App() {
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
                <div>
                    <h1>{selectedRecipe.title}</h1>
                    <p>
                        <strong>Source:</strong> {selectedRecipe.source.name}
                        {selectedRecipe.source.url && (
                            <a
                                href={selectedRecipe.source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ marginLeft: "0.5rem" }}
                            >
                                🔗
                            </a>
                        )}
                    </p>
                    <hr />
                    <ReactMarkdown>{selectedRecipe.content}</ReactMarkdown>
                    <button
                        onClick={backToTable}
                        style={{
                            position: "fixed",
                            bottom: `calc(${STYLE_SPACER} * 1)`,
                            left: `calc(${STYLE_SPACER} * 1)`,
                        }}
                    >
                        Back to all recipes
                    </button>
                </div>
            ) : (
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        tableLayout: "auto",
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ textAlign: "left" }}>Name</th>
                            <th style={{ textAlign: "left" }}>Source</th>
                            <th style={{ textAlign: "center" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRecipes.map((recipe) => (
                            <tr
                                key={recipe.slug}
                                style={{ borderBottom: "1px solid #ddd" }}
                            >
                                <td>
                                    <button
                                        onClick={() => viewRecipe(recipe)}
                                        style={{ textAlign: "left" }}
                                    >
                                        <HighlightedText
                                            searchTerm={searchTerm}
                                            text={recipe.title}
                                        />
                                    </button>
                                </td>
                                <td>
                                    {recipe.source.url ? (
                                        <a
                                            href={recipe.source.url}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            <HighlightedText
                                                searchTerm={searchTerm}
                                                text={recipe.source.name}
                                            />
                                        </a>
                                    ) : (
                                        <HighlightedText
                                            searchTerm={searchTerm}
                                            text={recipe.source.name}
                                        />
                                    )}
                                </td>
                                <td>
                                    <div
                                        style={{
                                            alignItems: "center",
                                            display: "flex",
                                            gap: "8px",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <EditLink slug={recipe.slug} />
                                        <ShareButton
                                            slug={recipe.slug}
                                            title={recipe.title}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <SearchBar onChange={setSearchTerm} value={searchTerm} />
        </div>
    );
}

export default App;
