export interface RecipeToSeed {
    title: string;
    slug: string;
    sourceName: string;
    sourceURL?: string;
    prepTimeMin: number;
    cookTimeMin: number;
    servingAmount: number;
    servingUnit: string;
    courseTypes: string[];
    cuisines: string[];
    dietaryRestrictions: string[];
    dishTypes: string[];
    ingredients: RecipeIngredient[];
    steps: {
        section?: string;
        details: string;
    }[];
    notes: {
        section?: string;
        details: string;
    }[];
}

export interface RecipeIngredient {
    id?: string;
    section?: string;
    quantityWhole?: number;
    quantityFraction?: string;
    quantityMinWhole?: number;
    quantityMinFraction?: string;
    quantityMaxWhole?: number;
    quantityMaxFraction?: string;
    unit?: string;
    name: string;
    alteration?: string;
    isOptional: boolean;
    substitutions: string[];
}
