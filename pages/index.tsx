import { PrismaClient } from '@prisma/client';
import * as React from 'react';
import { getCategoryFormat } from '../prisma/utils';
import Card from '../components/card/card';
import RecipeCard from '../components/recipe-card/recipe-card';
import SearchCard from '../components/search-card/search-card';

import type { NextPage } from 'next';

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
    // REFS ===================================================================
    const [recipes, setRecipes] = React.useState([]);

    // STATES =================================================================
    // EFFECTS ================================================================
    React.useEffect(() => {
        fetch('/api/recipes?title=chicken&condensed=true')
            .then((response) => response.json())
            .then((data) => {
                setRecipes(data);
            });
    }, []);

    console.log(courseTypes, cuisines, dietaryRestrictions, dishTypes);

    // EVENT LISTENERS ========================================================
    

    // RENDER =================================================================
    return (
        <>
            <Card>
                <h1>Flatbread</h1>
            </Card>

            <SearchCard />

            <Card>
                <h2>Search results</h2>
                <p>24 recipes found.</p>
            </Card>

            {recipes.length > 0 &&
                <RecipeCard recipe={recipes[0]} />
            }
        </>
    );
};

export default Index;

export async function getStaticProps() {
    const prisma = new PrismaClient();

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
