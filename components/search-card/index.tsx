import * as React from 'react';

import InputGroup from '../input-group';

import styles from './index.module.scss';

import type { SearchQueryProps } from '../../utils/types';

type IndexProps = {
    courseTypes: string[]
    cuisines: string[]
    dietaryRestrictions: string[]
    dishTypes: string[]
    focusSearchInput?: number
    handleSearchSubmit: (searchQuery: SearchQueryProps) => void
}

export const SearchCard = ({
    courseTypes,
    cuisines,
    dietaryRestrictions,
    dishTypes,
    focusSearchInput,
    handleSearchSubmit,
}: IndexProps) => {
    // Refs
    const formRef = React.useRef(null);

    // States
    const [selectedCourseTypes, setSelectedCourseTypes] = React.useState<Array<string>>([]);
    const [selectedCuisines, setSelectedCuisines] = React.useState<Array<string>>([]);
    const [selectedDietaryRestrictions, setSelectedDietaryRestrictions] = React.useState<Array<string>>([]);
    const [selectedDishTypes, setSelectedDishTypes] = React.useState<Array<string>>([]);

    // Event listeners
    function handleFormSubmit(event?: React.FormEvent) {
        if (event) event.preventDefault();
        if (!formRef.current) return;

        let submitterName = 'submit-search';

        if (event?.nativeEvent) {
            const submitterElement = (event?.nativeEvent as SubmitEvent).submitter?.name;

            if (submitterElement) {
                submitterName = submitterElement;
            }
        }

        const formElement = (formRef.current as HTMLFormElement);
        const formData = new FormData(formElement);
        const formDataTitle = formData.get('title');

        const titleValidated = (formDataTitle) ? formDataTitle.toString() : undefined;
        const courseTypesValidated = (selectedCourseTypes) ? selectedCourseTypes.join(',') : undefined;
        const cuisinesValidated = (selectedCuisines) ? selectedCuisines.join(',') : undefined;
        const dietaryRestrictionsValidated = (selectedDietaryRestrictions) ? selectedDietaryRestrictions.join(',') : undefined;
        const dishTypesValidated = (selectedDishTypes) ? selectedDishTypes.join(',') : undefined;

        handleSearchSubmit({
            title: titleValidated,
            courseTypes: courseTypesValidated,
            cuisines: cuisinesValidated,
            dietaryRestrictions: dietaryRestrictionsValidated,
            dishTypes: dishTypesValidated,
            random: (submitterName === 'submit-random') ? true : false,
        });
    }

    return (
        <section className={styles.container}>
            <h2>Search for recipes</h2>

            <form onSubmit={handleFormSubmit} ref={formRef}>
                <InputGroup
                    focusSearchInput={focusSearchInput}
                    id='input-title'
                    label='Title'
                    onEnterSubmit={handleFormSubmit}
                    name='title'
                    type='search'
                />

                <p>All recipes will be returned by&nbsp;default.</p>
                <p>To refine your search results, select only the categories needed using the <b>Advanced options</b>&nbsp;below.</p>

                <details>
                    <summary>Advanced options</summary>

                    <div className={styles['advanced-options-content']}>
                        <InputGroup
                            categories={courseTypes}
                            id='input-course-types'
                            label='Course types'
                            name='course-types'
                            setCategory={setSelectedCourseTypes}
                            type='text'
                        />
                        <InputGroup
                            categories={cuisines}
                            id='input-cuisines'
                            label='Cuisines'
                            name='cuisines'
                            setCategory={setSelectedCuisines}
                            type='text'
                        />
                        <InputGroup
                            categories={dietaryRestrictions}
                            id='input-dietary-restrictions'
                            label='Dietary restrictions'
                            name='dietary-restrictions'
                            setCategory={setSelectedDietaryRestrictions}
                            type='text'
                        />
                        <InputGroup
                            categories={dishTypes}
                            id='input-dish-types'
                            label='Dish types'
                            name='dish-types'
                            setCategory={setSelectedDishTypes}
                            type='text'
                        />
                    </div>
                </details>

                <div className={styles['submit-container']}>
                    <input name='submit-search' type='submit' value='Search' />
                    <input className='secondary' name='submit-random' type='submit' value='Random' />
                </div>
            </form>
        </section>
    );
};

export default SearchCard;
