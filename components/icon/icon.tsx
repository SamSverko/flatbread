import * as React from 'react';

import styles from './icon.module.scss';

type IconProps = {
    ariaLabel: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Icon: any
}

const Icon = ({ ariaLabel, Icon }: IconProps) => {
    return (
        <Icon
            aria-label={ariaLabel}
            className={styles.svg}
            role='img'
            viewBox='0 0 24 24'
        />
    );
};

export default Icon;
