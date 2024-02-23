import { Suspense } from "react";

import { getAllRecipes } from "@/lib/api";
import { RecipeTable } from "@/components";

export default function Index() {
    const allRecipes = getAllRecipes();

    return (
        <Suspense>
            <RecipeTable recipes={allRecipes} />
        </Suspense>
    );
}
