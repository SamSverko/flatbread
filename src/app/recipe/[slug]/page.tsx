import { notFound } from "next/navigation";

import { getAllRecipes, getRecipeBySlug } from "@/lib/api";
import { RecipeEdit, RecipeSource } from "@/components";
import { markdownToHtml } from "@/lib/utils";

type Params = {
    params: {
        slug: string;
    };
};

export default async function Recipe({ params }: Params) {
    const recipe = getRecipeBySlug(params.slug);

    if (!recipe) {
        return notFound();
    }

    const content = await markdownToHtml(recipe.content || "");

    return (
        <article>
            <h1>{recipe.title}</h1>
            <p>
                By <RecipeSource source={recipe.source} /> (
                <RecipeEdit slug={recipe.slug} />)
            </p>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
    );
}

export async function generateStaticParams() {
    const recipes = getAllRecipes();

    return recipes.map((recipe) => ({
        slug: recipe.slug,
    }));
}
