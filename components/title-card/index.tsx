import * as React from 'react';

import styles from './index.module.scss';

type ComponentProps = {
    heading: string
}

const TitleCard = ({ heading }: ComponentProps) => {
    return (
        <section className={styles.container}>
            <h1>{heading}</h1>
        </section>
    );
};

export default TitleCard;
