import * as React from 'react';

type SearchResultsProps = {
    recipeCount: number
}

const SearchResultsCard = ({ recipeCount }: SearchResultsProps) => {
    return (
        <div>
            <h2>Search results</h2>
            <p>{recipeCount} {recipeCount === 1 ? 'recipe' : 'recipes'} found.</p>

            <hr />
        </div>
    );
};

export default SearchResultsCard;
