import * as React from 'react';

import InputGroup from '../input-group';

import styles from './index.module.scss';

type ComponentProps = {
    currentPage: number
    recipeCount: number
    recipesPerPage: number
    setPaginationPage: (prop: number) => void
}

export const PaginationCard = ({
    currentPage,
    recipeCount,
    recipesPerPage, 
    setPaginationPage,
}: ComponentProps) => {
    const [buttonCount] = React.useState(Math.ceil(recipeCount / recipesPerPage));

    function handleFormSubmit(event: React.FormEvent) {
        event.preventDefault();

        const formElement = (event.target as HTMLFormElement);
        const formData = new FormData(formElement);
        const formDataValue = formData.get('jump-to-page');

        if (formDataValue) {
            setPaginationPage(parseInt(formDataValue.toString()) - 1);
        }

        
    }

    function handlePreviousNextButton(type: 'previous' | 'next') {
        if (type === 'previous') {
            setPaginationPage(currentPage - 1);
        } else {
            setPaginationPage(currentPage + 1);
        }
    }

    return (
        <section className={styles.container}>
            <h2>Search results pagination</h2>

            <div className={styles['buttons-container']}>
                <button
                    disabled={currentPage === 0}
                    onClick={() => handlePreviousNextButton('previous')}
                    value='previous'
                >Previous</button>

                <button
                    disabled={currentPage === (buttonCount - 1)}
                    onClick={() => handlePreviousNextButton('next')}
                    value='next'
                >Next</button>
            </div>

            <hr />

            <form onSubmit={handleFormSubmit}>
                <InputGroup
                    button='Go'
                    label='Jump to page'
                    max={buttonCount}
                    min={1}
                    name='jump-to-page'
                    id='id-jump-to-page'
                    type='number'
                />
            </form>
        </section>
    );
};

export default PaginationCard;
