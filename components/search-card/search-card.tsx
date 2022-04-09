import * as React from 'react';

import type { FetchedCategories, SearchQueryProps } from '../../utils/types';

import styles from './search-card.module.scss';

type SearchCardProps = {
    categories: FetchedCategories
    handleRandomSubmit: () => void
    handleSearchSubmit: (prop: SearchQueryProps) => void
}

export const SearchCard = ({ categories, handleRandomSubmit, handleSearchSubmit }: SearchCardProps) => {
    console.log(categories);

    const inputTitleRef = React.useRef(null);

    function handleFormSubmit(event: React.FormEvent) {
        event.preventDefault();
    }

    function handleSearchClick() {
        let titleQuery = '';
        if (inputTitleRef.current) {
            titleQuery = (inputTitleRef.current as HTMLInputElement).value;
        }

        handleSearchSubmit({
            title: titleQuery,
        });
    }

    return (
        <div className={styles.container}>
            <h2>Search for recipes</h2>

            <form className={styles['search-form']} onSubmit={handleFormSubmit}>
                <div className={styles['input-group']}>
                    <label htmlFor='recipe-title'>Title</label>
                    <input ref={inputTitleRef} id='recipe-title' name='title' type='search' />
                </div>

                <details aria-disabled={true} tabIndex={-1}>
                    <summary onClick={(event: React.MouseEvent<HTMLInputElement>) => event.preventDefault() }>Advanced options (coming soon)</summary>

                    <div className={styles['details-content']}>
                        <h3>Filter by categories</h3>

                        <div className={styles['input-group']}>
                            <p>By default, all recipe categories are&nbsp;selected.</p>
                            <p>To refine your search results, select only the categories&nbsp;needed.</p>
                        </div>

                        <div className={styles['input-group']}>
                            <label htmlFor='recipe-course-types'>Course types</label>
                            <input id='recipe-course-types' name='course-types' type='text' />
                        </div>

                        <div className={styles['input-group']}>
                            <label htmlFor='recipe-cuisines'>Cuisines</label>
                            <input id='recipe-cuisines' name='cuisines' type='text' />
                        </div>

                        <div className={styles['input-group']}>
                            <label htmlFor='recipe-dietary-restrictions'>Dietary Restrictions</label>
                            <input id='recipe-dietary-restrictions' name='dietary-restrictions' type='text' />
                        </div>

                        <div className={styles['input-group']}>
                            <label htmlFor='recipe-dish-types'>Dish Types</label>
                            <input id='recipe-dish-types' name='dish-types' type='text' />
                        </div>
                    </div>
                </details>

                <div className={styles['submit-group']}>
                    <input name='search-recipes' onClick={handleSearchClick} type='submit' value='Search' />
                    <div className={styles['random-container']}>
                        <span>or</span>
                        <input className='text' name='get-random-recipe' onClick={handleRandomSubmit} type='submit' value='Get a random recipe' />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SearchCard;
