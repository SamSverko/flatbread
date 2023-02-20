import * as React from 'react';

import styles from './index.module.scss';

type ComponentProps = {
    recipeCount?: number
}

const LoadingCard = ({ recipeCount = 1 }: ComponentProps) => {
    return (
        <section className={styles.container}>
            <h2>Fetching recipe{recipeCount > 1 ? 's' : ''}!</h2>
        </section>
    );
};

export default LoadingCard;
