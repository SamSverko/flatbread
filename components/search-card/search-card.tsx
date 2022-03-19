import * as React from 'react';

import type { FetchedCategories, SearchQueryProps } from '../../utils/types';

type SearchCardProps = {
    categories: FetchedCategories
    handleRandomSubmit: () => void
    handleSearchSubmit: (prop: SearchQueryProps) => void
}

export const SearchCard = ({ categories, handleRandomSubmit, handleSearchSubmit }: SearchCardProps) => {
    console.log(categories);

    const inputTitleRef = React.useRef(null);

    function onRandomSubmit(event: React.FormEvent) {
        event.preventDefault();

        handleRandomSubmit();
    }

    function onSearchSubmit(event: React.FormEvent) {
        event.preventDefault();

        let titleQuery = '';
        if (inputTitleRef.current) {
            titleQuery = (inputTitleRef.current as HTMLInputElement).value;
        }

        handleSearchSubmit({
            title: titleQuery,
        });
    }

    return (
        <div>
            <h2>Search for recipes</h2>

            <form onSubmit={onSearchSubmit}>
                <label htmlFor='recipe-title'>Title</label>
                <br />
                <input ref={inputTitleRef} id='recipe-title' name='title' type='search' />

                <details>
                    <summary>Advanced options</summary>

                    <h3>Filter by categories</h3>

                    <p>By default, all recipe categories are selected.</p>
                    <p>To refine your search results, select only the categories needed.</p>

                    <div>
                        <label htmlFor='recipe-course-types'>Course types</label>
                        <br />
                        <input id='recipe-course-types' name='course-types' type='text' />
                    </div>

                    <div>
                        <label htmlFor='recipe-cuisines'>Cuisines</label>
                        <br />
                        <input id='recipe-cuisines' name='cuisines' type='text' />
                    </div>

                    <div>
                        <label htmlFor='recipe-dietary-restrictions'>Dietary Restrictions</label>
                        <br />
                        <input id='recipe-dietary-restrictions' name='dietary-restrictions' type='text' />
                    </div>

                    <div>
                        <label htmlFor='recipe-dish-types'>Dish Types</label>
                        <br />
                        <input id='recipe-dish-types' name='dish-types' type='text' />
                    </div>
                </details>

                <input type='submit' value='Search' />
            </form>

            <form onSubmit={onRandomSubmit}>
                <span>or</span>
                <input type='submit' value='Get a random recipe' />
            </form>

            <hr />
        </div>
    );
};

export default SearchCard;
