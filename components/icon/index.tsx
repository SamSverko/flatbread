import * as React from 'react';

import styles from './index.module.scss';

import type { SVGElement } from '../../utils/types';

type ComponentProps = {
    ariaHidden?: boolean;
    ariaLabel?: string;
    Icon: SVGElement;
}

const Icon = ({ ariaHidden = false, ariaLabel, Icon }: ComponentProps) => {
    if (!ariaHidden && !ariaLabel) {
        console.warn('Icon issue: An icon is missing both the `aria-hidden` and `aria-label` attributes. Fix: provide at least one.');
    }

    // Renderers
    return (
        <Icon
            aria-hidden={(ariaHidden) ? 'true' : undefined}
            aria-label={ariaLabel}
            className={styles.svg}
            role='img'
            viewBox='0 0 24 24'
        />
    );
};

export default Icon;
