import * as React from 'react';

import styles from './search-results-card.module.scss';

type SearchResultsProps = {
    recipeCount: number
}

const SearchResultsCard = ({ recipeCount }: SearchResultsProps) => {
    const resultsParagraphRef = React.useRef(null);

    React.useEffect(() => {
        if (resultsParagraphRef.current) {
            (resultsParagraphRef.current as HTMLParagraphElement).focus();
        }
    });

    return (
        <div className={styles.container}>
            <h2>Search results</h2>
            <p ref={resultsParagraphRef} tabIndex={-1}>
                {recipeCount} {recipeCount === 1 ? 'recipe' : 'recipes'} found
            </p>
        </div>
    );
};

export default SearchResultsCard;
