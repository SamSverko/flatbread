import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { Recipe, RecipeFrontMatter } from "@/lib/types";

const recipesDirectory = join(process.cwd(), "recipes");

function isValidFrontMatter(data: any): data is RecipeFrontMatter {
    if (typeof data !== "object" || data === null) return false;
    if (typeof data.title !== "string") return false;
    if (typeof data.source !== "object" || data.source === null) return false;
    if (typeof data.source.name !== "string") return false;
    if (data.source.url !== undefined && typeof data.source.url !== "string")
        return false;
    return true;
}

export function getAllRecipes(): Recipe[] {
    const slugs = getRecipeSlugs();
    const recipes = slugs
        .map(getRecipeBySlug)
        .filter((r): r is Recipe => r !== null)
        .sort((a, b) => a.title.localeCompare(b.title)); // ascending order
    return recipes;
}

export function getRecipeBySlug(slug: string): Recipe | null {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(recipesDirectory, `${realSlug}.md`);

    let fileContents: string;
    try {
        fileContents = fs.readFileSync(fullPath, "utf8");
    } catch {
        return null;
    }

    const { content, data } = matter(fileContents);

    if (!isValidFrontMatter(data)) return null;

    return { content, slug: realSlug, ...data };
}

export function getRecipeSlugs(): string[] {
    return fs
        .readdirSync(recipesDirectory)
        .filter((slug) => slug !== "_TEMPLATE.md");
}
