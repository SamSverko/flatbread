import { Suspense } from "react";

import { getAllRecipes } from "@/lib/api";
import { TableOfRecipes } from "@/components";

export default function Index() {
    const allRecipes = getAllRecipes();

    return (
        <Suspense>
            <TableOfRecipes recipes={allRecipes} />
        </Suspense>
    );
}
