import * as React from 'react';

import styles from './loading-card.module.scss';

type LoadingCardProps = {
    recipeCount: number
}

const LoadingCard = ({ recipeCount }: LoadingCardProps) => {
    return (
        <div className={styles.container}>
            <h2>Fetching all <b>{recipeCount}</b> recipes <em>just for you</em>!</h2>
        </div>
    );
};

export default LoadingCard;
