import * as React from 'react';

import styles from './index.module.scss';

type ComponentProps = {
    clearSearchResults?: () => void;
    heading?: string;
    hideClearButton?: boolean;
    recipeCount: number;
}

const ResultsCard = ({
    clearSearchResults,
    heading = 'Search results',
    hideClearButton,
    recipeCount,
}: ComponentProps) => {
    // Refs
    const resultsParagraphRef = React.useRef(null);

    // Effects
    React.useEffect(() => {
        if (resultsParagraphRef.current) {
            (resultsParagraphRef.current as HTMLParagraphElement).focus();
        }
    });

    // Renderers
    return (
        <section className={styles.container}>
            <h2>{heading}</h2>

            <p ref={resultsParagraphRef} tabIndex={-1}>
                {recipeCount} recipe{recipeCount > 1 ? 's' : ''} found.
            </p>

            {!hideClearButton &&
                <div>
                    <button onClick={clearSearchResults}>Clear search results</button>
                </div>
            }
        </section>
    );
};

export default ResultsCard;
