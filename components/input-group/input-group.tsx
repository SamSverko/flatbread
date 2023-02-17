import * as React from 'react';

import styles from './input-group.module.scss';

type InputGroupProps = {
    id: string
    label: string
    name: string
    placeholder?: string
    type: 'search' | 'submit' | 'text'
}

const InputGroup = ({ id, label, name, placeholder, type = 'text' }: InputGroupProps) => {
    return (
        <div className={styles.container}>
            <label htmlFor={id}>{label}</label>
            <input id={id} name={name} placeholder={placeholder} type={type} />
        </div>
    );
};

export default InputGroup;
