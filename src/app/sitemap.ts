import { MetadataRoute } from "next";

import { getAllRecipes } from "@/lib/api";
import { WEBSITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
    const recipePages: MetadataRoute.Sitemap = getAllRecipes().map(
        (recipe) => ({
            changeFrequency: "monthly",
            lastModified: new Date(),
            priority: 1,
            url: `${WEBSITE_URL}/recipe/${recipe.slug}`,
        })
    );

    return [
        {
            changeFrequency: "weekly",
            lastModified: new Date(),
            priority: 1,
            url: WEBSITE_URL,
        },
        ...recipePages,
    ];
}
