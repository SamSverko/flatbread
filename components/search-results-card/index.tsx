import * as React from 'react';

import styles from './index.module.scss';

type ComponentProps = {
    recipeCount: number
}

const SearchResultsCard = ({ recipeCount }: ComponentProps) => {
    const resultsParagraphRef = React.useRef(null);

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
        </section>
    );
};

export default SearchResultsCard;
