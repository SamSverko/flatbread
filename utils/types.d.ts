import type {
    CourseType,
    Cuisine,
    DietaryRestriction,
    DishType,
    Prisma,
    Recipe,
    RecipeNote,
    RecipeStep,
    ServingUnit,
} from '@prisma/client';

export type PlannedRecipe = {
    title: string;
    isComplete: boolean;
    url?: string;
}

export interface RecipeFormatted extends Recipe {
    servingUnit: ServingUnit;
    courseTypes: CourseType[];
    cuisines: Cuisine[];
    dietaryRestrictions: DietaryRestriction[];
    dishTypes: DishType[];
    ingredients: RecipeIngredientResponse[];
    steps: RecipeStep[];
    notes: RecipeNote[];
}

export type RecipeIngredientResponse = Prisma.RecipeIngredientGetPayload<{ select: { [K in keyof Required<Prisma.RecipeIngredientSelect>]: true } }>

export type Route = {
    path: string;
    title: string;
    icon: SVGElement;
}

export type SavedIngredient = {
    isComplete: boolean;
    name: {
        name: string;
        namePlural: string;
    }
    quantity: number;
    unit?: {
        name: ingredient.unit.name;
        nameAbbr: ingredient.unit.nameAbbr;
        namePlural: ingredient.unit.namePlural;
    }
}

export type SVGElement = React.FunctionComponent<React.SVGAttributes<SVGElement>>;
