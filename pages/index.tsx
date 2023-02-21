import * as React from 'react';

// import RecipeCard from '../components/recipe-card';
import SearchCard from '../components/search-card';
import TitleCard from '../components/title-card';

import { prisma } from '../prisma/db';
import { getCategoryFormat } from '../prisma/utils';

import type { NextPage } from 'next';
import type { SearchQueryProps } from '../utils/types';

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
    const [recipes, setRecipes] = React.useState([]);

    // Event listeners
    function handleSearchSubmit(searchQuery: SearchQueryProps) {
        if (searchQuery.title) {
            fetch(`/api/recipes?title=${searchQuery.title}`)
                .then((response) => response.json())
                .then((data) => {
                    setRecipes(data);
                });
        }
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

            <TitleCard level={2} text='Fetching recipes...' />
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

    const dietaryRestrictions = await prisma.dishType.findMany({
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
