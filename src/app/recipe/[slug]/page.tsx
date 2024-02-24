import { Box, Typography } from "@mui/material";
import { notFound } from "next/navigation";

import { getAllRecipes, getRecipeBySlug } from "@/lib/api";
import {
    RecipeEdit,
    RecipeSource,
    ShareRecipe,
    MarkdownHTML,
} from "@/components";

type RecipeProps = {
    params: {
        slug: string;
    };
};

export default async function Recipe({ params }: RecipeProps) {
    const recipe = getRecipeBySlug(params.slug);

    if (!recipe) {
        return notFound();
    }

    return (
        <Box
            component="article"
            display="flex"
            flexDirection="column"
            gap={2}
            padding={2}
        >
            <Typography component="h1" variant="h5">
                {recipe.title}
            </Typography>
            <Box
                alignItems="center"
                display="flex"
                gap={1}
                justifyContent="space-between"
            >
                <Typography component="span" variant="body2">
                    By <RecipeSource source={recipe.source} />
                </Typography>
                <Box alignItems="center" display="flex" gap={1}>
                    <RecipeEdit slug={recipe.slug} />
                    <ShareRecipe slug={recipe.slug} title={recipe.title} />
                </Box>
            </Box>
            <MarkdownHTML markdown={recipe.content} />
        </Box>
    );
}

export async function generateStaticParams() {
    const recipes = getAllRecipes();

    return recipes.map((recipe) => ({
        slug: recipe.slug,
    }));
}
