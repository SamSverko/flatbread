export type Category = {
    id?: number | undefined,
    createdAt?: Date | undefined,
    name?: string | undefined,
    recipes?: Recipe[] | undefined,
    _count?: Prisma.CourseTypeCountOutputType | undefined,
}

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
