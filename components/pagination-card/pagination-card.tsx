import * as React from 'react';

import styles from './pagination-card.module.scss';

type PaginationProps = {
    currentPage: number
    recipeCount: number
    recipesPerPage: number
    setPaginationPage: (prop: number) => void
}

export const Pagination = ({
    currentPage,
    recipeCount,
    recipesPerPage, 
    setPaginationPage,
}: PaginationProps) => {
    const buttonCount = Math.ceil(recipeCount / recipesPerPage);

    const [inputValue, setInputValue] = React.useState((currentPage + 1).toString());

    function handleFormSubmit(event: React.FormEvent) {
        event.preventDefault();

        setPaginationPage(parseInt(inputValue) - 1);
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = (event.target as HTMLInputElement).value;

        setInputValue(value);
    }

    function handlePreviousNextButton(type: 'previous' | 'next') {
        if (type === 'previous') {
            setPaginationPage(currentPage - 1);
        } else {
            setPaginationPage(currentPage + 1);
        }
    }

    return (
        <div className={styles.container}>
            <h2>Search results pages</h2>

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
                <label htmlFor='jump-to-page'>Jump to</label>
                <input max={buttonCount} min={1} name='pagination-page' onChange={handleInputChange} type='number' value={inputValue} />
                <input name='jump-to-page' type='submit' value='Go' />
            </form>
        </div>
    );
};

export default Pagination;
