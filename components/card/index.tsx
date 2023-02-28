import * as React from 'react';

import styles from './index.module.scss';

type ComponentProps = {
    children: JSX.Element | JSX.Element[];
    hide?: boolean;
}

const Card = ({ children, hide }: ComponentProps) => {
    if (hide) return <></>;

    return (
        <section className={styles.container}>
            {children}
        </section>
    );
};

export default Card;
