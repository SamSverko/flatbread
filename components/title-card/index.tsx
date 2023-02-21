import * as React from 'react';

import styles from './index.module.scss';

type ComponentProps = {
    level?: 1 | 2
    text: string
}

const TitleCard = ({ level = 1, text = 'Flatbread' }: ComponentProps) => {
    return (
        <section className={styles.container}>
            {level === 1 &&
                <h1>{text}</h1>
            }
            {level === 2 &&
                <h2>{text}</h2>
            }
        </section>
    );
};

export default TitleCard;
