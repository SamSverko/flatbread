import Ajv from "ajv";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

import { Recipe } from "@/lib/types";

const recipesDirectory = join(process.cwd(), "recipes");

export function getAllRecipes(): Recipe[] {
    const slugs = getRecipeSlugs();
    const recipes = slugs
        .map((slug) => getRecipeBySlug(slug))
        .filter((recipe): recipe is Recipe => recipe !== null)
        .sort((recipe1, recipe2) => (recipe1.title > recipe2.title ? 1 : -1)); // ascending order
    return recipes;
}

export function getRecipeBySlug(slug: string) {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(recipesDirectory, `${realSlug}.md`);
    let fileContents;
    try {
        fileContents = fs.readFileSync(fullPath, "utf8");
    } catch {
        return null;
    }
    const { content, data } = matter(fileContents);

    const ajv = new Ajv();

    /**
     * Make sure stays in sync with type `RecipeFrontMatter`
     */
    const frontMatterSchema = {
        additionalProperties: false,
        properties: {
            source: {
                additionalProperties: false,
                properties: {
                    name: {
                        type: "string",
                    },
                    url: {
                        type: "string",
                    },
                },
                type: "object",
            },
            title: {
                type: "string",
            },
        },
        required: ["title"],
        type: "object",
    };

    const validate = ajv.compile(frontMatterSchema);
    const valid = validate(data);

    if (!valid) return null;

    return { content, slug: realSlug, ...data } as Recipe;
}

export function getRecipeSlugs() {
    return fs
        .readdirSync(recipesDirectory)
        .filter((slug) => slug !== "_TEMPLATE.md");
}
