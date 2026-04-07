import ReactMarkdown from "react-markdown";

import { type Recipe } from "../utils";
import { STYLE_SPACER } from "../constants";
import { useEffect } from "react";

type RecipeViewProps = {
    onBack: () => void;
    recipe: Recipe;
};

export default function RecipeView({ onBack, recipe }: RecipeViewProps) {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, [recipe.slug]);

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
                    background: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid #ddd",
                    borderRadius: "100px",
                    boxShadow: "0 -2px 10px rgba(0,0,0,0.08)",
                    bottom: `env(safe-area-inset-bottom, calc(${STYLE_SPACER} * 1))`,
                    fontSize: "1rem",
                    left: 0,
                    padding: "14px 16px",
                    margin: `0 calc(${STYLE_SPACER} * 2)`,
                    position: "fixed",
                    right: 0,
                }}
            >
                Back to all recipes
            </button>
        </div>
    );
}
