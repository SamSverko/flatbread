import type { NextPage } from 'next';
import React from 'react';

import { getAllCategories } from '../utils/contentful';

// import Recipes from '../components/recipes';

type fetchedCategories = {
    [key: string]: any
}

const Home: NextPage = ({ categories }: fetchedCategories) => {
    console.log(categories);
    // useState - rendering logic
    // const [status, setStatus] = useState('pending');

    // useState - form
    // const [formError, setFormError] = useState('');
    // const [searchValue, setSearchValue] = useState('');
    
    // useState - recipes
    // const [localSearchRecipes, setLocalSearchRecipes] = useState([]);
    // const [randomRecipeIndex, setRandomRecipeIndex] = useState(-1);
    // const [recipes, setRecipes] = useState([]);

    // useEffect - get random recipe
    // useEffect(() => {
    //     if (recipes[randomRecipeIndex]) {
    //         setStatus('random');
    //     }
    // }, [randomRecipeIndex, recipes]);

    // event listeners
    // function handleChangeSearch(event: React.ChangeEvent) {
    //     const inputValue = (event.target as HTMLInputElement).value.trim();
    //     setSearchValue(inputValue);

    //     if (inputValue.length > 2) {
    //         setFormError('');
    //     }
    // }

    // async function handleSubmitRandom(event: React.FormEvent) {
    //     event.preventDefault();

    //     setRandomRecipeIndex(Math.floor(Math.random() * recipes.length));
    // }

    // async function handleSubmitSearch(event: React.FormEvent) {
    //     event.preventDefault();

    //     if (searchValue.length <= 2) {
    //         setFormError('Search term must be longer than two characters');
    //         return;
    //     } else {
    //         setFormError('');
    //     }

    //     localSearch(searchValue);
    // }

    // helpers
    // function localSearch(query: string) {
    //     const matchedRecipes = recipes.filter((recipe: any) => {
    //         const regex = new RegExp(query, 'i');
    //         const search = recipe.fields.title.search(regex);
    //         if (search > -1) {
    //             return recipe.fields.title;
    //         }
    //     });

    //     setLocalSearchRecipes(matchedRecipes);
    //     setStatus('search');
    // }

    // function showResults() {
    //     if (status === 'pending') {
    //         return <p>It all starts with a simple search.</p>;
    //     } else if (status === 'searching') {
    //         return <p>Searching database...</p>;
    //     } else if (status === 'not found') {
    //         return <p>No recipes found :(</p>;
    //     } else if (status === 'show') {
    //         return <Recipes recipes={recipes} />;
    //     } else if (status === 'random') {
    //         return <Recipes recipes={[recipes[randomRecipeIndex]]} />;
    //     } else if (status === 'search') {
    //         return <Recipes recipes={localSearchRecipes} />;
    //     }
    // }

    return (
        <div>
            <h1>Flatbread</h1>

            {/* <hr />

            <form onSubmit={handleSubmitSearch}>
                <label htmlFor='recipe'>Recipe title</label>
                <br />
                <input id='recipe' name='search' onChange={handleChangeSearch} type='search' />
                <br />
                <input type='submit' value='Search' />
            </form>

            <form onSubmit={handleSubmitRandom}>
                <input type='submit' value='Get a random recipe' />
            </form>

            <p style={{ visibility: formError.length > 0 ? 'visible' : 'hidden' }}>
                {formError}.
            </p>

            <hr />

            <h2>Recipes</h2>

            <p>↉, ⅒, ⅑, ⅛, ⅐, ⅙, ⅕, ¼, ⅓, ⅜, ⅖, ½, ⅗, ⅝, ⅔, ¾, ⅘, ⅚, ⅞ | ° cup onion, sliced</p> */}

            {/* {showResults()} */}
        </div>
    );
};

export default Home;

export async function getStaticProps() {
    const categories = await getAllCategories();

    return {
        props: {
            categories: categories,
        },
    };
}
