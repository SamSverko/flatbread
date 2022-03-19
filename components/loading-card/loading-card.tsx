import * as React from 'react';

type LoadingCardProps = {
    recipeCount: number
}

const LoadingCard = ({ recipeCount }: LoadingCardProps) => {
    return (
        <div>
            <h2>Fetching all <b>{recipeCount}</b> recipes <em>just for you</em>!</h2>

            <hr />
        </div>
    );
};

export default LoadingCard;
