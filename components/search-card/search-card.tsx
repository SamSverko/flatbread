import * as React from 'react';

import styles from './search-card.module.scss';

import InputCombobox from '../input-combobox/input-combobox';

import type { FetchedCategories, SearchQueryProps } from '../../utils/types';

type SearchCardProps = {
    categories: FetchedCategories
    handleRandomSubmit: () => void
    handleSearchSubmit: (searchQuery: SearchQueryProps) => void
}

export const SearchCard = ({ categories, handleRandomSubmit, handleSearchSubmit }: SearchCardProps) => {
    const inputTitleRef = React.useRef(null);

    // advanced search
    const [searchCourseTypes, setSearchCourseTypes] = React.useState<Array<string>>([]);
    const [searchCuisines, setSearchCuisines] = React.useState<Array<string>>([]);
    const [searchDietaryRestrictions, setSearchDietaryRestrictions] = React.useState<Array<string>>([]);
    const [searchDishTypes, setSearchDishTypes] = React.useState<Array<string>>([]);

    // EVENT HANDLERS
    function handleFormSubmit(event: React.FormEvent) {
        event.preventDefault();
    }

    function handleCategoryUpdate(categories: string[], type: 'course-types' | 'cuisines' | 'dietary-restrictions' | 'dish-types') {
        if (type === 'course-types') {
            setSearchCourseTypes(categories);
        } else if (type === 'cuisines') {
            setSearchCuisines(categories);
        } else if (type === 'dietary-restrictions') {
            setSearchDietaryRestrictions(categories);
        } else if (type === 'dish-types') {
            setSearchDishTypes(categories);
        }
    }

    function handleSearchClick() {
        if (!inputTitleRef.current) return;

        const titleQuery = (inputTitleRef.current as HTMLInputElement).value;

        handleSearchSubmit({
            title: titleQuery,
            courseTypes: searchCourseTypes,
            cuisines: searchCuisines,
            dietaryRestrictions: searchDietaryRestrictions,
            dishTypes: searchDishTypes,
        });
    }

    return (
        <section className={styles.container}>
            <h2>Search for recipes</h2>

            <form className={styles['search-form']} onSubmit={handleFormSubmit}>
                <div className={styles['input-group']}>
                    <label htmlFor='recipe-title'>Title</label>
                    <input ref={inputTitleRef} id='recipe-title' enterKeyHint='search' name='title' type='search' />
                </div>

                <details>
                    <summary>Advanced options</summary>

                    <div className={styles['details-content']}>
                        <h3>Filter by categories</h3>

                        <div className={styles['input-group']}>
                            <p>By default, all recipe categories are&nbsp;selected.</p>
                            <p>To refine your search results, select only the categories&nbsp;needed.</p>
                        </div>

                        <div className={styles['input-group']}>
                            <InputCombobox
                                handleUpdate={(categories) => handleCategoryUpdate(categories, 'course-types')}
                                id='recipe-course-types'
                                items={categories.courseType}
                                label='Course types'
                                name='course-types'
                            />
                        </div>

                        <div className={styles['input-group']}>
                            <InputCombobox
                                handleUpdate={(categories) => handleCategoryUpdate(categories, 'cuisines')}
                                id='recipe-cuisines'
                                items={categories.cuisine}
                                label='Cuisines'
                                name='cuisines'
                            />
                        </div>

                        <div className={styles['input-group']}>
                            <InputCombobox
                                handleUpdate={(categories) => handleCategoryUpdate(categories, 'dietary-restrictions')}
                                id='recipe-dietary-restrictions'
                                items={categories.dietaryRestriction}
                                label='Dietary Restrictions'
                                name='dietary-restrictions'
                            />
                        </div>

                        <div className={styles['input-group']}>
                            <InputCombobox
                                handleUpdate={(categories) => handleCategoryUpdate(categories, 'dish-types')}
                                id='recipe-dish-types'
                                items={categories.dishType}
                                label='Dish Types'
                                name='dish-types'
                            />
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
        </section>
    );
};

export default SearchCard;
