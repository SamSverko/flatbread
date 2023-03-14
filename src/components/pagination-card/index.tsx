import * as React from 'react';

import Card from '../card';
import InputGroup from '../input-group';

import styles from './index.module.scss';

type ComponentProps = {
    currentPage: number;
    recipeCount: number;
    recipesPerPage: number;
    setPaginationPage: (prop: number) => void;
}

export const PaginationCard = ({
    currentPage,
    recipeCount,
    recipesPerPage, 
    setPaginationPage,
}: ComponentProps) => {
    // States
    const [buttonCount] = React.useState(Math.ceil(recipeCount / recipesPerPage));
    const [inputValue, setInputValue] = React.useState((currentPage + 1).toString());

    // Event listeners
    function handleFormOnSubmit(event: React.FormEvent) {
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

    // Renderers
    return (
        <Card>
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

            <form onSubmit={handleFormOnSubmit}>
                <InputGroup
                    button={<input type='submit' value='Go' />}
                    input={<input
                        id='input-jump-to-page'
                        inputMode='numeric'
                        max={buttonCount}
                        min={1}
                        name='jump-to-page'
                        onChange={handleInputChange}
                        type='number'
                        value={inputValue}
                    />}
                    label={<label htmlFor='input-jump-to-page'>Jump to page</label>}
                />
            </form>
        </Card>
    );
};

export default PaginationCard;
