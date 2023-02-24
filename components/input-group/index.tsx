import * as React from 'react';

import Category from '../category';
import Icon from '../icon';

import bxCheck from '../../public/icons/bx-check.svg';

import styles from './index.module.scss';

type ComponentProps = {
    button?: string
    categories?: string[]
    focusSearchInput?: number
    id: string
    label: string
    onEnterSubmit?: () => void
    name: string
    placeholder?: string
    setCategory?: React.Dispatch<React.SetStateAction<string[]>>
    type: 'search' | 'submit' | 'text'
}

const InputGroup = ({
    button,
    categories,
    focusSearchInput,
    id,
    label,
    onEnterSubmit,
    name,
    placeholder,
    setCategory,
    type = 'text',
}: ComponentProps) => {
    // Refs
    const inputTitleRef = React.useRef(null);
    const listboxRef = React.useRef(null);

    // States
    const [selectedCategories, setSelectedCategories] = React.useState<Array<string>>([]);
    const [showList, setShowList] = React.useState(false);
    const [noResults, setNoResults] = React.useState(false);

    // Effects
    React.useEffect(() => {
        if (focusSearchInput) {
            if (inputTitleRef.current) (inputTitleRef.current as HTMLInputElement).focus();
        }
    }, [focusSearchInput]);

    // Event listeners
    function handleCategoryRemoveOnClick(category: string) {
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
        if (!categories) return;

        if (categories && !showList) {
            setShowList(true);
        }

        const inputValue = (event.target as HTMLInputElement).value;
        const searchRegex = new RegExp(inputValue, 'i');

        // filter out items that do not match searchRegex
        const filteredItems = categories.filter((item) => (item.search(searchRegex) !== -1));

        const listItemElements = getListItemElements();
        if (!listItemElements) return;

        // loop through all list items
        listItemElements.forEach((element) => {
            // reset all hide classes
            element.classList.remove(styles.hide);

            // hide all list items that don't match category text
            const text = element.innerText;
            if (text && !filteredItems.map((item) => item).includes(text)) {
                if (!element.classList.contains(styles['none-found'])) {
                    element.classList.add(styles.hide);
                }
            }
        });

        // display 'No results found' if none found
        if (filteredItems.length === 0) {
            setNoResults(true);
        } else {
            setNoResults(false);
        }
    }

    function handleInputOnKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'ArrowDown' && categories && showList && !noResults) {
            event.preventDefault();
            const listItemElements = getListItemElements();
            if (!listItemElements) return;
            const visibleListItemElements = listItemElements.filter((listItem) => !listItem.classList.contains(styles.hide));
            visibleListItemElements[0].focus();
        } else if (event.key === 'ArrowDown' && categories && !showList) {
            setShowList(true);
        } else if (event.key === 'Escape' && categories) {
            setShowList(false);
        } else if (event.key === 'Enter') {
            event.preventDefault();
            if (onEnterSubmit) onEnterSubmit();
        }
    }

    function handleListItemOnBlur() {
        setShowList(false);
    }

    function handleListItemOnClick(event: React.MouseEvent<HTMLLIElement>) {
        const element = (event.target as HTMLLIElement);
        const selectedCategory = element.innerText;
        const isSelected = selectedCategories.findIndex((category) => category === selectedCategory);

        if (isSelected === -1) {
            addSelectedCategory(selectedCategory, element);
        } else {
            removeSelectedCategory(selectedCategory, element);
        }
    }

    function handleListItemOnFocus() {
        setShowList(true);
    }

    function handleListItemOnKeyDown(event: React.KeyboardEvent<HTMLLIElement>) {
        const listItemElements = getListItemElements();
        if (!listItemElements) return;

        const visibleListItemElements = listItemElements.filter((listItem) => !listItem.classList.contains(styles.hide));
        const currentListItem = document.activeElement as HTMLLIElement;
        const currentItemIndex = visibleListItemElements.findIndex((listItem) => listItem.innerText === currentListItem.innerText);

        if (event.key === 'Escape' || (event.key === 'ArrowUp' && currentItemIndex === 0)) {
            event.preventDefault();
            if (inputTitleRef.current) (inputTitleRef.current as HTMLInputElement).focus();
            setShowList(false);
        } else if (event.key === 'ArrowDown' && currentItemIndex < visibleListItemElements.length - 1) {
            event.preventDefault();
            visibleListItemElements[currentItemIndex + 1].focus();
        } else if (event.key === 'ArrowUp' && currentItemIndex >= 0) {
            event.preventDefault();
            visibleListItemElements[currentItemIndex - 1].focus();
        } else if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            if (currentListItem.getAttribute('aria-pressed') === 'true') {
                removeSelectedCategory(currentListItem.innerText, currentListItem);
            } else {
                addSelectedCategory(currentListItem.innerText, currentListItem);
            }
        }
    }

    // Helpers
    function addSelectedCategory(category: string, listItem: HTMLLIElement) {
        setSelectedCategories(selectedCategories => [...selectedCategories, category]);
        if (setCategory) setCategory(selectedCategories => [...selectedCategories, category]);
        listItem.setAttribute('aria-pressed', 'true');
    }

    function getListItemElements() {
        if (!listboxRef.current) return;

        return Array.from((listboxRef.current as HTMLUListElement).children) as HTMLLIElement[];
    }

    function removeSelectedCategory(category: string, listItem: HTMLLIElement) {
        setSelectedCategories(selectedCategories.filter(selectedCategory => selectedCategory !== category));
        if (setCategory) setCategory(selectedCategories.filter(selectedCategory => selectedCategory !== category));
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
                    onKeyDown={handleInputOnKeyDown}
                    name={name}
                    placeholder={placeholder}
                    ref={inputTitleRef}
                    type={type}
                />
            )}

            <div className={styles['found-categories-container']}>
                {categories &&
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
                                    onBlur={handleListItemOnBlur}
                                    onClick={handleListItemOnClick}
                                    onFocus={handleListItemOnFocus}
                                    onKeyDown={handleListItemOnKeyDown}
                                    onMouseDown={(event) => event.preventDefault()}
                                    key={`key-found-category-${category}-${index}`}
                                    tabIndex={-1}
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
