import * as React from 'react';
import { useRouter } from 'next/router';

import Card from '../../components/card';
import RecipeCard from '../../components/recipe-card';

import type { NextPage } from 'next';

const RecipePage: NextPage = () => {
    const router = useRouter();
    const { slug } = router.query;

    // States
    const [recipe, setRecipe] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

    // Effects
    React.useEffect(() => {
        if (slug) {
            fetch(`/api/recipes?condensed=true&slug=${slug}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        setRecipe(null);
                    } else {
                        setRecipe(data);
                    }
                    setIsLoading(false);
                });
        }
    }, [slug]);

    // Renderers
    if (isLoading) return <Card><h2>Fetching recipe...</h2></Card>;
    if (!recipe) return <Card><h2>No recipe found!</h2></Card>;

    return <RecipeCard recipe={recipe} />;
};

export default RecipePage;
