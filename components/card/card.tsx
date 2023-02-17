import * as React from 'react';

import styles from './card.module.scss';

type CardProps = {
    children: React.ReactNode
}

const Card = ({ children }: CardProps) => {
    return (
        <section className={styles.container}>
            {children}
        </section>
    );
};

export default Card;
