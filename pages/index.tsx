import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';

import Recipes from '../components/recipes';

const Home: NextPage = () => {
    const [formError, setFormError] = useState('');
    const [hasAllRecipes, setHasAllRecipes] = useState(false);
    const [randomRecipeIndex, setRandomRecipeIndex] = useState(-1);
    const [recipes, setRecipes] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [status, setStatus] = useState('pending');

    // react
    useEffect(() => {
        if (recipes[randomRecipeIndex]) {
            setStatus('random');
        }
    }, [randomRecipeIndex, recipes]);

    // event listeners
    function handleChangeSearch(event: React.ChangeEvent) {
        const inputValue = (event.target as HTMLInputElement).value.trim();
        setSearchValue(inputValue);

        if (inputValue.length > 2) {
            setFormError('');
        }
    }

    async function handleSubmitGetAllRecipes(event: React.FormEvent) {
        event.preventDefault();

        if (hasAllRecipes) {
            setFormError('You are already viewing all recipes');
            return;
        }

        const results = await getRecipes('');

        if (results) {
            setHasAllRecipes(true);
            setStatus('show');
        } else {
            setStatus('not found');
        }
    }

    async function handleSubmitRandom(event: React.FormEvent) {
        event.preventDefault();

        if (hasAllRecipes) {
            setRandomRecipeIndex(Math.floor(Math.random() * recipes.length));
            return;
        }

        const results = await getRecipes('');

        if (results) {
            setHasAllRecipes(true);
            setRandomRecipeIndex(Math.floor(Math.random() * recipes.length));
        } else {
            setStatus('not found');
        }
    }

    async function handleSubmitSearch(event: React.FormEvent) {
        event.preventDefault();

        if (searchValue.length <= 2) {
            setFormError('Search term must be longer than two characters');
            return;
        } else {
            setFormError('');
        }

        if (hasAllRecipes) {
            console.log('LOCAL SEARCH');
            return;
        }

        const results = await getRecipes(searchValue);

        if (results) {
            setStatus('show');
        } else {
            setStatus('not found');
        }
    }

    // helpers
    async function getRecipes(query: string) {
        setStatus('searching');

        const response = await fetch(`http://localhost:3000/api/search?query=${encodeURIComponent(query)}`);
        const json = await response.json();

        if (json.total === 0) {
            setRecipes([]);
            return false;
        } else {
            setRecipes(json.items);
            return true;
        }
    }

    function showResults() {
        if (status === 'pending') {
            return <p>It all starts with a simple search.</p>;
        } else if (status === 'searching') {
            return <p>Searching database...</p>;
        } else if (status === 'not found') {
            return <p>No recipes found :(</p>;
        } else if (status === 'show') {
            return <Recipes recipes={recipes} />;
        } else if (status === 'random') {
            return <Recipes recipes={[recipes[randomRecipeIndex]]} />;
        }
    }

    return (
        <div>
            <h1>Flatbread</h1>

            <hr />

            <form onSubmit={handleSubmitSearch}>
                <label htmlFor='recipe'>Recipe title</label>
                <br />
                <input id='recipe' name='search' onChange={handleChangeSearch} type='search' />
                <br />
                <input type='submit' value='Search' />
            </form>

            <form onSubmit={handleSubmitGetAllRecipes}>
                <input disabled={hasAllRecipes} type='submit' value='Get all recipes' />
            </form>

            <form onSubmit={handleSubmitRandom}>
                <input type='submit' value='Get a random recipe' />
            </form>

            <p style={{ visibility: formError.length > 0 ? 'visible' : 'hidden' }}>
                {formError}.
            </p>

            <hr />

            <h2>Recipes</h2>

            {showResults()}
        </div>
    );
};

export default Home;
