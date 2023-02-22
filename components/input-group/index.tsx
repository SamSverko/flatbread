import * as React from 'react';

import Category from '../category';

import styles from './index.module.scss';

type ComponentProps = {
    button?: string
    categories?: string[]
    id: string
    label: string
    name: string
    placeholder?: string
    type: 'search' | 'submit' | 'text'
}

const InputGroup = ({
    button,
    categories,
    id,
    label,
    name,
    placeholder,
    type = 'text',
}: ComponentProps) => {
    return (
        <div className={styles.container}>
            <label htmlFor={id}>{label}</label>
            {!button && <input id={id} name={name} placeholder={placeholder} type={type} />}

            {button && 
                <div className={styles['with-button']}>
                    <input id={id} name={name} placeholder={placeholder} type={type} />
                    <button type='submit'>{button}</button>
                </div>
            }

            {categories &&
                <ul>
                    {categories.map((category, index) => {
                        return (
                            <li key={`key-category-${category}-${index}`}>
                                <Category removable text={category} />
                            </li>
                        );
                    })}
                </ul>
            }
        </div>
    );
};

export default InputGroup;
