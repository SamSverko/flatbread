import * as React from 'react';

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

    function handleButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
        setPaginationPage(parseInt((event.target as HTMLButtonElement).value));
    }

    function handlePreviousNextButton(type: 'previous' | 'next') {
        if (type === 'previous') {
            setPaginationPage(currentPage - 1);
        } else {
            setPaginationPage(currentPage + 1);
        }
    }

    return (
        <div>
            <h2>Pagination</h2>

            <ul>
                {currentPage !== 0 &&
                    <li>
                        <button
                            onClick={() => handlePreviousNextButton('previous')}
                            value='previous'
                        >Previous</button>
                    </li>
                }

                {[...Array(buttonCount)].map((_, index) => {
                    return <li key={index}>
                        <button
                            disabled={currentPage === index}
                            onClick={handleButtonClick}
                            value={index}
                        >{index}</button>
                    </li>;
                })}

                {currentPage !== (buttonCount - 1) &&
                    <li>
                        <button
                            onClick={() => handlePreviousNextButton('next')}
                            value='next'
                        >Next</button>
                    </li>
                }
            </ul> 
        </div>
    );
};

export default Pagination;
