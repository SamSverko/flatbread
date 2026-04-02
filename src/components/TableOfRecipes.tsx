"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
    HighlightedText,
    RecipeEdit,
    RecipeSource,
    ShareRecipe,
} from "@/components";
import { Recipe } from "@/lib/types";
import { useEffect, useState } from "react";

type RecipeTableProps = {
    recipes: Recipe[];
};

export default function TableOfRecipes({ recipes }: RecipeTableProps) {
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get("searchTerm");

    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);

    useEffect(() => {
        const newFilteredRecipes = searchTerm
            ? recipes.filter(
                  (recipe) =>
                      recipe.title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                      (recipe.source?.name &&
                          recipe.source.name
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())),
              )
            : recipes;

        setFilteredRecipes(newFilteredRecipes);
    }, [recipes, searchTerm]);

    return (
        <table>
            <thead>
                <tr>
                    <th align="left">Name</th>
                    <th align="left">Source</th>
                    <th align="center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredRecipes.map((recipe) => (
                    <tr key={recipe.slug}>
                        <td align="left">
                            <Link href={`/recipe/${recipe.slug}`}>
                                <HighlightedText
                                    searchTerm={searchTerm}
                                    text={recipe.title}
                                />
                            </Link>
                        </td>
                        <td align="left">
                            <RecipeSource
                                searchTerm={searchTerm}
                                source={recipe.source}
                            />
                        </td>
                        <td align="center">
                            <div
                                style={{
                                    alignItems: "center",
                                    display: "flex",
                                    gap: "8px",
                                    justifyContent: "center",
                                }}
                            >
                                <RecipeEdit slug={recipe.slug} />
                                <ShareRecipe
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
