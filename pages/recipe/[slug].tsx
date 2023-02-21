import * as React from 'react';
import { useRouter } from 'next/router';

import RecipeCard from '../../components/recipe-card';
import TitleCard from '../../components/title-card';

import type { NextPage } from 'next';

const RecipePage: NextPage = () => {
    const router = useRouter();
    const { slug } = router.query;

    const [recipe, setRecipe] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

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

    if (isLoading) return <TitleCard text='Fetching recipe...' />;
    if (!recipe) return <TitleCard text='No recipe found!' />;

    return <RecipeCard recipe={recipe} />;
};

export default RecipePage;
