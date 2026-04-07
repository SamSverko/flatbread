import ReactMarkdown from "react-markdown";

import { type Recipe } from "../utils";
import { STYLE_SPACER } from "../constants";

type RecipeViewProps = {
    onBack: () => void;
    recipe: Recipe;
};

export default function RecipeView({ onBack, recipe }: RecipeViewProps) {
    return (
        <div>
            <h1>{recipe.title}</h1>
            <p>
                <strong>Source:</strong>{" "}
                {recipe.source.url ? (
                    <a
                        href={recipe.source.url}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        {recipe.source.name}
                    </a>
                ) : (
                    recipe.source.name
                )}
            </p>
            <hr />
            <ReactMarkdown>{recipe.content}</ReactMarkdown>
            <button
                onClick={onBack}
                style={{
                    bottom: `calc(${STYLE_SPACER} * 1)`,
                    left: "50%",
                    position: "fixed",
                    transform: "translateX(-50%)",
                }}
            >
                Back to all recipes
            </button>
        </div>
    );
}
