import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

import { Recipe } from "@/lib/types";

const recipesDirectory = join(process.cwd(), "recipes");

export function getAllRecipes(): Recipe[] {
    const slugs = getRecipeSlugs();
    const recipes = slugs
        .map((slug) => getRecipeBySlug(slug))
        .sort((recipe1, recipe2) => (recipe1.title > recipe2.title ? 1 : -1)); // ascending order
    return recipes;
}

export function getRecipeBySlug(slug: string) {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(recipesDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { content, data } = matter(fileContents);

    return { content, slug: realSlug, ...data } as Recipe;
}

export function getRecipeSlugs() {
    return fs.readdirSync(recipesDirectory);
}
