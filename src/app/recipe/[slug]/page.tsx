import { type Metadata } from "next";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

import { getAllRecipes, getRecipeBySlug } from "@/lib/api";
import { RecipeEdit, RecipeSource, ShareRecipe } from "@/components";
import { WEBSITE_TITLE } from "@/lib/constants";

type RecipeProps = {
    params: {
        slug: string;
    };
};

export async function generateMetadata({
    params,
}: RecipeProps): Promise<Metadata> {
    const recipe = getRecipeBySlug(params.slug);

    let title = `${WEBSITE_TITLE}`;

    if (recipe) {
        title += ` | Recipe: ${recipe.title}`;
    }

    return {
        title: title,
    };
}

export default async function Recipe({ params }: RecipeProps) {
    const recipe = getRecipeBySlug(params.slug);

    if (!recipe) {
        return notFound();
    }

    return (
        <article
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                padding: "16px",
            }}
        >
            <h1>{recipe.title}</h1>
            <div
                style={{
                    alignItems: "center",
                    display: "flex",
                    gap: "8px",
                    justifyContent: "space-between",
                }}
            >
                <span>
                    By <RecipeSource source={recipe.source} />
                </span>
                <div
                    style={{
                        alignItems: "center",
                        display: "flex",
                        gap: "8px",
                    }}
                >
                    <RecipeEdit slug={recipe.slug} />
                    <ShareRecipe slug={recipe.slug} title={recipe.title} />
                </div>
            </div>
            <Markdown>{recipe.content}</Markdown>
        </article>
    );
}

export async function generateStaticParams() {
    const recipes = getAllRecipes();

    return recipes.map((recipe) => ({
        slug: recipe.slug,
    }));
}
