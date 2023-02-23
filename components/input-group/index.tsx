import * as React from 'react';

import Category from '../category';
import Icon from '../icon';

import bxCheck from '../../public/icons/bx-check.svg';

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
    const listboxRef = React.useRef(null);

    // TO DO - pass selected categories to parent component
    const [selectedCategories, setSelectedCategories] = React.useState<Array<string>>([]);
    const [showList, setShowList] = React.useState(false);
    const [noResults, setNoResults] = React.useState(false);

    // Event listeners
    function handleCategoryRemoveOnClick(category: string) {
        if (!listboxRef.current) return;

        const listItems = getListItemElements();
        if (!listItems) return;

        const foundListItem = listItems.filter(listItem => listItem.innerText === category);

        removeSelectedCategory(category, foundListItem[0]);
    }

    function handleInputOnBlur() {
        setShowList(false);
    }

    function handleInputOnFocus() {
        setShowList(true);
    }

    function handleInputOnInput(event: React.KeyboardEvent<HTMLInputElement>) {
        if (!listboxRef.current) return;
        if (!categories) return;

        const inputValue = (event.target as HTMLInputElement).value;
        const searchRegex = new RegExp(inputValue, 'i');

        // filter out items that do not match searchRegex
        const filteredItems = categories.filter((item) => {
            return (item.search(searchRegex) !== -1);
        });

        const listItemElements = getListItemElements();
        if (!listItemElements) return;

        // loop through all list items
        listItemElements.forEach((element) => {
            // reset all hide classes
            element.classList.remove(styles.hide);

            // hide all list items that don't match category text
            const text = element.innerText;
            if (text && !filteredItems.map((item) => item).includes(text)) {
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

    function handleListItemClick(event: React.MouseEvent<HTMLLIElement>) {
        const element = (event.target as HTMLLIElement);
        const selectedCategory = element.innerText;
        const isSelected = selectedCategories.findIndex((category) => category === selectedCategory);

        if (isSelected === -1) {
            addSelectedCategory(selectedCategory, element);
        } else {
            removeSelectedCategory(selectedCategory, element);
        }
    }

    // Helpers
    function addSelectedCategory(category: string, listItem: HTMLLIElement) {
        setSelectedCategories(selectedCategories => [...selectedCategories, category]);
        listItem.setAttribute('aria-pressed', 'true');
    }

    function getListItemElements() {
        if (!listboxRef.current) return;

        return Array.from((listboxRef.current as HTMLUListElement).children) as HTMLLIElement[];
    }

    function removeSelectedCategory(category: string, listItem: HTMLLIElement) {
        setSelectedCategories(selectedCategories.filter(selectedCategory => selectedCategory !== category));
        listItem.setAttribute('aria-pressed', 'false');
    }

    return (
        <div className={styles.container}>
            <label htmlFor={id}>{label}</label>

            {!button && (
                <input
                    id={id}
                    onBlur={handleInputOnBlur}
                    onFocus={handleInputOnFocus}
                    onInput={handleInputOnInput}
                    name={name}
                    placeholder={placeholder}
                    type={type}
                />
            )}

            <div className={styles['found-categories-container']}>
                {categories && categories.length > 0 &&
                    <ul
                        aria-label={label}
                        className={`${(showList) ? styles.show : ''}`}
                        ref={listboxRef}
                        role='listbox'
                    >
                        {categories.map((category, index) => {
                            return (
                                <li
                                    aria-pressed={false}
                                    onClick={handleListItemClick}
                                    onMouseDown={(event) => event.preventDefault()}
                                    key={`key-found-category-${category}-${index}`}
                                >
                                    {category}
                                    <Icon ariaHidden={true} Icon={bxCheck} />
                                </li>
                            );
                        })}

                        {noResults && 
                            <li className={styles['none-found']}>No results found <Icon ariaHidden={true} Icon={bxCheck} /></li>
                        }
                    </ul>
                }
            </div>

            {button && 
                <div className={styles['with-button']}>
                    <input id={id} name={name} placeholder={placeholder} type={type} />
                    <button type='submit'>{button}</button>
                </div>
            }

            {selectedCategories.length > 0 &&
                <ul className={styles['selected-categories']}>
                    {selectedCategories.map((category, index) => {
                        return (
                            <li key={`key-selected-category-${category}-${index}`}>
                                <Category handleCategoryRemoveOnClick={handleCategoryRemoveOnClick} removable text={category} />
                            </li>
                        );
                    })}
                </ul>
            }
        </div>
    );
};

export default InputGroup;
