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
    const [noResults, setNoResults] = React.useState(false);

    // EVENT HANDLERS
    function handleInputBlur() {
        if (!listboxRef.current) return;
        
        // hide listbox
        (listboxRef.current as HTMLUListElement).classList.remove(styles.show);

        // remove all active classes
        removeAllActiveClasses();
    }

    function handleInputFocus() {
        if (!listboxRef.current) return;

        // display listbox
        (listboxRef.current as HTMLUListElement).classList.add(styles.show);
        updateAriaLive(`${label}, list box pop up, Menu pop-up combo box. ${items.length} options available`);
    }

    function handleInputInput(event: React.KeyboardEvent<HTMLInputElement>) {
        if (!listboxRef.current) return;

        const inputValue = (event.target as HTMLInputElement).value;
        const searchRegex = new RegExp(inputValue, 'i');

        // filter out items that do not match searchRegex
        const filteredItems = items.filter((item: FormattedCategory) => {
            return (item.title.search(searchRegex) !== -1);
        });

        const listItemElements = getListItemElements();
        if (!listItemElements) return;

        // loop through all list items
        listItemElements.forEach((element) => {
            // reset all hide classes
            element.classList.remove(styles.hide);

            // hide all list items that don't match id
            const id = element.getAttribute('data-id');
            if (id && !filteredItems.map((item) => item.id).includes(id)) {
                element.classList.add(styles.hide);
            }
        });

        // display 'No results found' if none found
        if (filteredItems.length === 0) {
            setNoResults(true);
        } else {
            setNoResults(false);
        }
    }

    function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        // save list of visible list item elements
        const listItemElements = getVisibleListItemElements();
        if (!listItemElements) return;

        let activeListitemIndex = getActiveListItemElementIndex(listItemElements);

        // determine next active list item element
        if (event.key === 'ArrowDown') {
            // if no list item is active, then set the first one to be active, otherwise increment by one (but contain to list length).
            if (activeListitemIndex === -1) {
                activeListitemIndex = 0;
            } else if (activeListitemIndex < listItemElements.length - 1) {
                activeListitemIndex++;
            }
        } else if (event.key === 'ArrowUp') {
            // if any item except the first one is active, reduce by one
            if (activeListitemIndex > 0) {
                activeListitemIndex--;
            }
        }

        // update next active list item element
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            toggleListItemElementActive(listItemElements[activeListitemIndex]);
        }

        if (event.key === 'Enter') {
            event.preventDefault(); // prevent form from submitting on 'Enter' key

            if (activeListitemIndex > -1) {
                toggleListitemElementSelect(listItemElements[activeListitemIndex]);
            }
        }
    }

    function handleListItemClick(event: React.MouseEvent<HTMLLIElement>) {
        toggleListitemElementSelect(event.target as HTMLLIElement);
    }

    function handleListItemMouseEnter(event: React.MouseEvent<HTMLLIElement>) {
        (event.target as HTMLLIElement).classList.add(styles.active);
    }

    function handleListItemMouseLeave(event: React.MouseEvent<HTMLLIElement>) {
        (event.target as HTMLLIElement).classList.remove(styles.active);
    }

    // HELPERS
    function getListItemElements() {
        if (!listboxRef.current) return;

        return Array.from((listboxRef.current as HTMLUListElement).children);
    }

    function getActiveListItemElementIndex(listItemElements: Element[]) {
        return listItemElements.findIndex(element => element.classList.contains(styles.active) && !element.classList.contains(styles.hide));
    }

    function getVisibleListItemElements() {
        if (!listboxRef.current) return;

        return Array.from((listboxRef.current as HTMLUListElement).children)
            .filter(element => !element.classList.contains(styles.hide));
    }

    function removeAllActiveClasses() {
        const listItemElements = getListItemElements();
        if (!listItemElements) return;

        listItemElements.forEach((element) => {
            element.classList.remove(styles.active);
        });
    }

    function toggleListItemElementActive(element: Element) {
        removeAllActiveClasses();
        element.classList.add(styles.active);
        updateAriaLive(`${element.innerHTML}${element.getAttribute('aria-selected') === 'true' ? ', selected' : ''}`);
    }

    function toggleListitemElementSelect(element: Element) {
        const listItemName = element.innerHTML.trim();
        const listItemId = element.getAttribute('data-id');

        if (!listItemId) return;
        if (!inputRef.current) return;

        // if item is already selected remove+unselect it || otherwise add+select it
        const updatedSelectedItems = [...selectedItems];
        if (selectedItems.includes(listItemId)) {
            updatedSelectedItems.splice(updatedSelectedItems.findIndex((item) => item === listItemId), 1);
            element.setAttribute('aria-selected', 'false');
            updateAriaLive(element.innerHTML);
        } else {
            updatedSelectedItems.push(listItemId);
            element.setAttribute('aria-selected', 'true');
            updateAriaLive(`${element.innerHTML}, selected`);
        }

        // update input element placeholder with selected values
        const inputElement = (inputRef.current as HTMLInputElement);
        if (updatedSelectedItems.length === 0) {
            inputElement.setAttribute('placeholder', '');
        }
        if (updatedSelectedItems.length === 1) {
            inputElement.setAttribute('placeholder', listItemName);
        } else if (updatedSelectedItems.length > 1) {
            inputElement.setAttribute('placeholder', `${updatedSelectedItems.length} items`);
        }

        setSelectedItems(updatedSelectedItems);
        handleUpdate(updatedSelectedItems);
    }

    function updateAriaLive(string: string) {
        if (!ariaLiveRef.current) return;

        const ariaLiveElement = ariaLiveRef.current as HTMLDivElement;

        (ariaLiveElement as HTMLDivElement).innerHTML = string;

        window.setTimeout(() => {
            (ariaLiveElement as HTMLDivElement).innerHTML = '';
        }, 250);
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
                    onBlur={handleInputBlur}
                    onFocus={handleInputFocus}
                    onInput={handleInputInput}
                    onKeyDown={handleInputKeyDown}
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
                                onClick={handleListItemClick}
                                onMouseDown={(event) => event.preventDefault()}
                                onMouseEnter={handleListItemMouseEnter}
                                onMouseLeave={handleListItemMouseLeave}
                                role='option'
                            >{item.title}</li>
                        );
                    })}

                    {noResults && 
                        <li id={`${id}-no-results`}>No results found</li>
                    }
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
