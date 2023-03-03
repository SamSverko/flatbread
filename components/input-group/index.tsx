import * as React from 'react';

import styles from './index.module.scss';

type ComponentProps = {
    button?: JSX.Element;
    input: JSX.Element;
    label: JSX.Element;
}

const InputGroup = ({
    button,
    input,
    label,
}: ComponentProps) => {
    // Renderers
    return (
        <div className={styles.container}>
            {label}
            <div className={styles['input-container']}>
                {input}
                {button}
            </div>
        </div>
    );
};

export default InputGroup;
