import * as React from 'react';

import styles from './input-combobox.module.scss';

import type { FormattedCategory } from '../../utils/contentful';

type InputComboboxProps = {
    handleUpdate: (prop: string[]) => void
    id: string
    items: FormattedCategory[]
    label: string
    name: string
}

const InputCombobox = ({ handleUpdate, id, items, label, name }: InputComboboxProps) => {
    const ariaLiveRef = React.useRef(null);
    const inputRef = React.useRef(null);
    const listboxRef = React.useRef(null);

    const [selectedItems, setSelectedItems] = React.useState<Array<string>>([]);

    function inputOnBlurFocus(event: React.FocusEvent<HTMLInputElement, Element>, type: 'blur' | 'focus') {
        event.preventDefault();

        const inputElement = inputRef.current;
        const listboxElement = listboxRef.current;
        const ariaLiveElement = ariaLiveRef.current;

        if (!inputElement || !listboxElement || !ariaLiveElement) return;

        if (type === 'blur') {
            (inputElement as HTMLInputElement).setAttribute('aria-expanded', 'false');
            (listboxElement as HTMLUListElement).classList.remove(styles.show);
        } else if (type === 'focus') {
            (inputElement as HTMLInputElement).setAttribute('aria-expanded', 'true');
            (listboxElement as HTMLUListElement).classList.add(styles.show);

            updateAriaLive(`${label}, list box pop up, Menu pop-up combo box. ${items.length} options available`);
        }
    }

    function handleOnClick(event: React.MouseEvent<HTMLLIElement>) {
        const selectedElement = event.target as HTMLLIElement;
        const selectedId = selectedElement.getAttribute('data-id');

        if (selectedId) {
            toggleListItem(selectedElement, selectedId);
        }
    }

    function handleOnMouseEnter(event: React.MouseEvent<HTMLLIElement>) {
        (event.target as HTMLLIElement).classList.add(styles.active);
    }

    function handleOnMouseLeave(event: React.MouseEvent<HTMLLIElement>) {
        (event.target as HTMLLIElement).classList.remove(styles.active);
    }

    function handleKeydown(event: React.KeyboardEvent<HTMLInputElement>) {
        const listboxElement = listboxRef.current;

        if (!listboxElement) return;

        const items = Array.from((listboxElement as HTMLUListElement).children);
        const activeElementIndex = items.findIndex(element => element.classList.contains(styles.active));

        if (event.key === 'ArrowDown') {
            if (activeElementIndex === -1) {
                items[0].classList.add(styles.active);
                updateAriaLive(`${items[0].innerHTML}${items[0].getAttribute('aria-selected') === 'true' ? ', selected' : ''}`);
            } else if (activeElementIndex !== items.length - 1) {
                items[activeElementIndex].classList.remove(styles.active);
                items[activeElementIndex + 1].classList.add(styles.active);
                updateAriaLive(`${items[activeElementIndex + 1].innerHTML}${items[activeElementIndex + 1].getAttribute('aria-selected') === 'true' ? ', selected' : ''}`);
            }
        } else if (event.key === 'ArrowUp') {
            if (activeElementIndex > 0) {
                items[activeElementIndex].classList.remove(styles.active);
                items[activeElementIndex - 1].classList.add(styles.active);
                updateAriaLive(`${items[activeElementIndex - 1].innerHTML}${items[activeElementIndex - 1].getAttribute('aria-selected') === 'true' ? ', selected' : ''}`);
            }
        }

        if (event.key === 'Enter') {
            event.preventDefault(); // do not submit form when using 'Enter' key

            const activeElementIndex = items.findIndex(element => element.classList.contains(styles.active));
            const selectedId = items[activeElementIndex]?.getAttribute('data-id');

            if (selectedId) {
                toggleListItem(items[activeElementIndex] as HTMLLIElement, selectedId);
            }
        }
    }

    function toggleListItem(selectedElement: HTMLLIElement, listItemId: string) {
        // if item is not selected, add it
        if (selectedItems.indexOf(listItemId) === -1) {
            selectedElement.setAttribute('aria-selected', 'true');
            updateAriaLive(`${selectedElement.innerHTML}, selected`);

            const updatedSelectedItems = [...selectedItems, listItemId];
            setSelectedItems(updatedSelectedItems);
            handleUpdate(updatedSelectedItems);
            updateInputValue(updatedSelectedItems);
        } else {
            selectedElement.setAttribute('aria-selected', 'false');
            updateAriaLive(selectedElement.innerHTML);

            const updatedSelectedItems = [...selectedItems];
            updatedSelectedItems.splice(updatedSelectedItems.findIndex((item) => item === listItemId), 1);
            setSelectedItems(updatedSelectedItems);
            handleUpdate(updatedSelectedItems);
            updateInputValue(updatedSelectedItems);
        }
    }

    function updateInputValue(selectedItems: string[]) {
        const inputElement = inputRef.current;

        if (inputElement) {
            const input: HTMLInputElement = inputElement;

            if (selectedItems.length === 0) {
                input.placeholder = '';
            } else if (selectedItems.length === 1) {
                const listboxElement = listboxRef.current;

                if (!listboxElement) return;

                const selectedItemName = Array
                    .from((listboxElement as HTMLUListElement).children)
                    .find((element) => element.getAttribute('data-id') === selectedItems[0])?.innerHTML;

                if (selectedItemName) {
                    input.placeholder = selectedItemName;
                }
            } else {
                input.placeholder = `${selectedItems.length} selected`;
            }
        }
    }

    function updateAriaLive(string: string) {
        const ariaLiveElement = ariaLiveRef.current;

        if (ariaLiveElement) {
            (ariaLiveElement as HTMLDivElement).innerHTML = string;

            window.setTimeout(() => {
                (ariaLiveElement as HTMLDivElement).innerHTML = '';
            }, 250);
        }
    }

    return (
        <div className={styles.container}>
            <label htmlFor={id}>{label}</label>

            <div>
                <input
                    ref={inputRef}
                    aria-autocomplete='list'
                    aria-expanded='false'
                    aria-owns={`${id}-controls`}
                    id={id}
                    name={name}
                    onBlur={(event) => inputOnBlurFocus(event, 'blur')}
                    onFocus={(event) => inputOnBlurFocus(event, 'focus')}
                    onKeyDown={handleKeydown}
                    role='combobox'
                    type='text'
                />

                <ul ref={listboxRef} aria-label={label} id={`${id}-controls`} role='listbox'>
                    {items.map((item: FormattedCategory) => {
                        return (
                            <li
                                aria-selected='false'
                                data-id={item.id}
                                id={`${item.title}-option`}
                                key={item.title}
                                onClick={handleOnClick}
                                onMouseDown={(event) => event.preventDefault()}
                                onMouseEnter={handleOnMouseEnter}
                                onMouseLeave={handleOnMouseLeave}
                                role='option'
                            >{item.title}</li>
                        );
                    })}
                </ul>
            </div>

            <div
                ref={ariaLiveRef}
                aria-atomic='false'
                aria-live='assertive'
                aria-relevant='additions'
                className={styles['sr-only']}
                role='log'
            ></div>
        </div>
    );
};

export default InputCombobox;
