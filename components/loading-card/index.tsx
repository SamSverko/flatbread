import * as React from 'react';

import styles from './index.module.scss';

type ComponentProps = {
    recipeCount: number
}

const LoadingCard = ({ recipeCount }: ComponentProps) => {
    return (
        <section className={styles.container}>
            <h2>Fetching all <b>{recipeCount}</b> recipes <em>just for you</em>!</h2>
        </section>
    );
};

export default LoadingCard;
