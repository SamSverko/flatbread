import * as React from 'react';

import InputGroup from '../input-group';

import styles from './index.module.scss';

import type { SearchQueryProps } from '../../utils/types';

type IndexProps = {
    courseTypes: string[]
    cuisines: string[]
    dietaryRestrictions: string[]
    dishTypes: string[]
    handleSearchSubmit: (searchQuery: SearchQueryProps) => void
}

export const SearchCard = ({
    courseTypes,
    cuisines,
    dietaryRestrictions,
    dishTypes,
    handleSearchSubmit,
}: IndexProps) => {
    function handleFormSubmit(event: React.FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const title = formData.get('title')?.toString();

        if (title) {
            handleSearchSubmit({
                title: title,
            });
        }
    }

    return (
        <section className={styles.container}>
            <h2>Search for recipes</h2>

            <form onSubmit={handleFormSubmit}>
                <InputGroup id='input-title' label='Title' name='title' type='search' />

                <details onClick={(event) => { event.preventDefault(); }}>
                    <summary>Advanced options (coming soon)</summary>

                    <div className={styles['advanced-options-content']}>
                        <InputGroup id='input-course-types' label='Course types' name='course-types' type='text' />
                    </div>
                </details>

                <div className={styles['submit-container']}>
                    <input name='submit-search' type='submit' value='Search' />
                    <input className='secondary' disabled name='submit-random' type='submit' value='Random' />
                </div>
            </form>
        </section>
    );
};

export default SearchCard;
