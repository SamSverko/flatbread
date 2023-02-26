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

export type SearchQueryProps = {
    title?: string;
    courseTypes?: string;
    cuisines?: string;
    dietaryRestrictions?: string;
    dishTypes?: string;
    random?: boolean;
}

export type SVGElement = React.FunctionComponent<React.SVGAttributes<SVGElement>>;
