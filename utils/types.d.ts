import type { FormattedCategory } from './contentful';

export type FetchedCategories = {
    courseType: FormattedCategory[]
    cuisine: FormattedCategory[]
    dietaryRestriction: FormattedCategory[]
    dishType: FormattedCategory[]
}

export type FormattedRecipe = {
    title: string,
    slug: string,
    createdAt: string,
    source: FormattedRecipeSource
    image?: FormattedRecipeImage
    time: FormattedRecipeTime
    yield: FormattedRecipeYield
    courseTypes: string[]
    cuisines?: string[]
    dietaryRestrictions?: string[]
    dishTypes: string[]
    ingredients: string[]
    steps: string[]
    notes?: string[]
}

type FormattedRecipeImage = {
    alt?: string
    url?: string
}

type FormattedRecipeSource = {
    name: string
    url?: string
}

type FormattedRecipeTime = {
    cook: number
    prep: number
}

type FormattedRecipeYield = {
    amount: number
    unit: string
}

export type SearchQueryProps = {
    title: string
    courseTypes: string[]
    cuisines: string[]
    dietaryRestrictions: string[]
    dishTypes: string[]
}
