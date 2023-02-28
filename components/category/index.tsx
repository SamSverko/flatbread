import * as React from 'react';

import Icon from '../icon';

import IconX from '../../public/icons/bx-x.svg';

import styles from './index.module.scss';

type ComponentProps = {
    handleCategoryRemoveOnClick: (category: string) => void
    removable?: boolean
    text: string
}

const Category = ({ handleCategoryRemoveOnClick, removable, text }: ComponentProps) => {
    // Event listeners
    function handleOnClick() {
        handleCategoryRemoveOnClick(text);
    }

    // Renderers
    return (
        <div className={styles.container}>
            <span>{text}</span>
            {removable && 
                <button aria-label='Close' onClick={handleOnClick}>
                    <Icon ariaHidden={true} Icon={IconX} />
                </button>
            }
        </div>
    );
};

export default Category;
