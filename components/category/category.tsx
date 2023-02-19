import * as React from 'react';

import Icon from '../icon/icon';

import IconX from '../../public/icons/bx-x.svg';

import styles from './category.module.scss';

type CategoryProps = {
    removable?: boolean
    text: string
}

const Category = ({ removable, text }: CategoryProps) => {
    return (
        <div className={styles.container}>
            <span>{text}</span>
            {removable && 
                <button aria-label='Close'>
                    <Icon ariaHidden={true} Icon={IconX} />
                </button>
            }
        </div>
    );
};

export default Category;
