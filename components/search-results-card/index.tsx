import * as React from 'react';

import styles from './index.module.scss';

type ComponentProps = {
    clearSearchResults?: () => void
    recipeCount: number
}

const SearchResultsCard = ({ clearSearchResults, recipeCount }: ComponentProps) => {
    // Refs
    const resultsParagraphRef = React.useRef(null);

    // Effects
    React.useEffect(() => {
        if (resultsParagraphRef.current) {
            (resultsParagraphRef.current as HTMLParagraphElement).focus();
        }
    });

    return (
        <section className={styles.container}>
            <h2>Search results</h2>

            <p ref={resultsParagraphRef} tabIndex={-1}>
                {recipeCount} recipe{recipeCount > 1 ? 's' : ''} found.
            </p>

            <div>
                <button onClick={clearSearchResults}>Clear search results</button>
            </div>
        </section>
    );
};

export default SearchResultsCard;
