export interface RecipeToSeed {
    title: string;
    slug: string;
    sourceName: string;
    sourceURL?: string;
    prepTimeMins: number;
    cookTimeMins: number;
    servingAmount: number;
    servingUnit: string;
    courseTypes: string[];
    cuisines: string[];
    dietaryRestrictions: string[];
    dishTypes: string[];
    ingredients: RecipeIngredient[];
    steps: RecipeStepNote[];
    notes: RecipeStepNote[];
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

export interface RecipeStepNote {
    id?: string;
    section?: string;
    details: string;
}
