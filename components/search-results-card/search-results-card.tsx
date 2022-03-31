import * as React from 'react';


import styles from './search-results-card.module.scss';

type SearchResultsProps = {
    recipeCount: number
}

const SearchResultsCard = ({ recipeCount }: SearchResultsProps) => {
    return (
        <div className={styles.container}>
            <h2>Search results</h2>
            <p>{recipeCount} {recipeCount === 1 ? 'recipe' : 'recipes'} found</p>
        </div>
    );
};

export default SearchResultsCard;
