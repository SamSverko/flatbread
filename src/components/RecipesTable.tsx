import { STYLE_SPACER } from "../constants";
import { type Recipe } from "../utils";
import EditLink from "./EditLink";
import HighlightedText from "./HighlightedText";
import ShareButton from "./ShareButton";

type RecipesTableProps = {
    onViewRecipe: (recipe: Recipe) => void;
    recipes: Recipe[];
    searchTerm: string;
};

export default function RecipesTable({
    onViewRecipe,
    recipes,
    searchTerm,
}: RecipesTableProps) {
    return (
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
                {recipes.map((recipe) => (
                    <tr
                        key={recipe.slug}
                        style={{ borderBottom: "1px solid #ddd" }}
                    >
                        <td>
                            <button
                                onClick={() => onViewRecipe(recipe)}
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
                                    flexDirection: "column",
                                    gap: `calc(${STYLE_SPACER} * 1)`,
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
    );
}
