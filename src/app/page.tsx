import { Suspense } from "react";

import { getAllRecipes } from "@/lib/api";
import TableOfRecipes from "@/components/TableOfRecipes";

export default function Index() {
    const allRecipes = getAllRecipes();

    return (
        <Suspense>
            <TableOfRecipes recipes={allRecipes} />
        </Suspense>
    );
}
