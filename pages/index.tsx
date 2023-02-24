import * as React from 'react';

import RecipeCard from '../components/recipe-card';
import SearchCard from '../components/search-card';
import SearchResultsCard from '../components/search-results-card';
import TitleCard from '../components/title-card';

import { prisma } from '../prisma/db';
import { getCategoryFormat } from '../prisma/utils';

import type { NextPage } from 'next';
import type { RecipeFormatted, SearchQueryProps } from '../utils/types';

type IndexProps = {
    courseTypes: string[]
    cuisines: string[]
    dietaryRestrictions: string[]
    dishTypes: string[]
}

const Index: NextPage<IndexProps> = ({
    courseTypes,
    cuisines,
    dietaryRestrictions,
    dishTypes,
}: IndexProps) => {
    // States
    const [isSearching, setIsSearching] = React.useState(false);
    const [searchPerformed, setSearchPerformed] = React.useState(false);
    const [recipes, setRecipes] = React.useState([]);

    // Event listeners
    function handleSearchSubmit(searchQuery: SearchQueryProps) {
        setIsSearching(true);

        let queryString = `/api/recipes?title=${searchQuery.title ? searchQuery.title : ''}`;
        if (searchQuery.courseTypes) queryString += `&courseTypes=${searchQuery.courseTypes}`;
        if (searchQuery.cuisines) queryString += `&cuisines=${searchQuery.cuisines}`;
        if (searchQuery.dietaryRestrictions) queryString += `&dietaryRestrictions=${searchQuery.dietaryRestrictions}`;
        if (searchQuery.dishTypes) queryString += `&dishTypes=${searchQuery.dishTypes}`;

        console.log(queryString);

        fetch(queryString)
            .then((response) => response.json())
            .then((data) => {
                setRecipes(data);
                setIsSearching(false);
                setSearchPerformed(true);
            });
    }

    // Renderers
    return (
        <>
            <TitleCard text='Search' />

            <SearchCard
                handleSearchSubmit={handleSearchSubmit}
                courseTypes={courseTypes}
                cuisines={cuisines}
                dietaryRestrictions={dietaryRestrictions}
                dishTypes={dishTypes}
            />

            {isSearching && <TitleCard level={2} text='Fetching recipes...' />}
            {(!isSearching && searchPerformed && recipes) && <SearchResultsCard recipeCount={recipes.length} />}
            {recipes && 
                (recipes as RecipeFormatted[]).map((recipe, index) => {
                    return <RecipeCard key={`key-recipe-${recipe.slug}-${index}`} recipe={recipe} />;
                })
            }
        </>
    );
};

export default Index;

export async function getStaticProps() {
    const courseTypes = await prisma.courseType.findMany({
        select: getCategoryFormat(true),
        orderBy: {
            name: 'asc',
        },
    });

    const cuisines = await prisma.cuisine.findMany({
        select: getCategoryFormat(true),
        orderBy: {
            name: 'asc',
        },
    });

    const dietaryRestrictions = await prisma.dietaryRestriction.findMany({
        select: getCategoryFormat(true),
        orderBy: {
            name: 'asc',
        },
    });

    const dishTypes = await prisma.dishType.findMany({
        select: getCategoryFormat(true),
        orderBy: {
            name: 'asc',
        },
    });

    return {
        props: {
            courseTypes: courseTypes.map(courseType => courseType.name),
            dietaryRestrictions: dietaryRestrictions.map(dietaryRestriction => dietaryRestriction.name),
            cuisines: cuisines.map(cuisine => cuisine.name),
            dishTypes: dishTypes.map(dishType => dishType.name),
        },
    };
}
