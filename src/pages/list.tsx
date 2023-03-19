import * as React from 'react';
import { v4 } from 'uuid';

import Card from '../components/card';
import Icon from '../components/icon';
import InputGroup from '../components/input-group';

import { prisma } from '../prisma/db';
import { getQuantityFractionFormat } from '../prisma/utils';
import { LSKey } from '../utils';

import bxDownArrowAlt from '../../public/icons/bx-down-arrow-alt.svg';
import bxTrash from '../../public/icons/bx-trash.svg';
import bxUpArrowAlt from '../../public/icons/bx-up-arrow-alt.svg';

import styles from '../styles/list.module.scss';

import type { NextPage } from 'next';
import type { SavedIngredient } from '../types';

type ListProps = {
    quantityFractions: QuantityFraction[];
}

type QuantityFraction = {
    name: string;
    value: number;
}

const List: NextPage<ListProps> = ({ quantityFractions }: ListProps) => {
    // States
    const [listItems, setListItems] = React.useState<Array<SavedIngredient>>([]);
    const [searchStatus, setSearchStatus] = React.useState<'pending' | 'searching' | 'complete'>('searching');

    // Effects
    React.useEffect(() => {
        const localListItems = localStorage.getItem(LSKey.shoppingList);

        if (localListItems) {
            setListItems(JSON.parse(localListItems));
        }

        setSearchStatus('complete');
    }, []);

    // Event listeners
    function handleCheckboxOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const checkbox = event.target as HTMLInputElement;
        const ingredientName = checkbox.getAttribute('data-name');

        if (!ingredientName) return;

        const localListItems = localStorage.getItem(LSKey.shoppingList);
        if (localListItems) {
            const localListArray: SavedIngredient[] = JSON.parse(localListItems);
            const currentListItemIndex = localListArray.findIndex(listItem => listItem.name.name === ingredientName);

            localListArray[currentListItemIndex].isComplete = checkbox.checked;
            updateShoppingList(localListArray);
        }
    }

    function handleFormOnSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;

        const formElement = (event.target as HTMLFormElement);
        const formData = new FormData(formElement);
        
        const formDataName = formData.get('name');
        const nameValidated = (formDataName) ? formDataName.toString() : '';

        const formDataQuantity = formData.get('quantity');
        const quantityValidated = (formDataQuantity) ? Number(formDataQuantity.toString()) : 0;

        if (nameValidated.length > 0 && quantityValidated >= 0) {
            const itemToAdd: SavedIngredient = {
                id: v4(),
                isComplete: false,
                name: {
                    name: nameValidated,
                    namePlural: nameValidated,
                },
                quantity: quantityValidated,
            };

            const localListItems = localStorage.getItem(LSKey.shoppingList);

            if (!localListItems) {
                localStorage.setItem(LSKey.shoppingList, `[${JSON.stringify(itemToAdd)}]`);
                updateShoppingList([itemToAdd]);
            } else {
                const localListArray: SavedIngredient[] = JSON.parse(localListItems);
                localListArray.push(itemToAdd);

                localStorage.setItem(LSKey.shoppingList, JSON.stringify(localListArray));
                updateShoppingList(localListArray);
            }
        }
    }

    function handleOrderOnClick(event: React.MouseEvent<HTMLButtonElement>, movement: 'down' | 'up') {
        const target = event.target as HTMLButtonElement;
        const ingredientId = target.getAttribute('data-id');

        if (!ingredientId) return;

        const localListItems = localStorage.getItem(LSKey.shoppingList);
        if (localListItems) {
            const localListArray: SavedIngredient[] = JSON.parse(localListItems);
            const currentListItemIndex = localListArray.findIndex(listItem => listItem.id === ingredientId);

            if (movement === 'up' && currentListItemIndex > 0) {
                const currentPlannedRecipe = localListArray.splice(currentListItemIndex, 1);
                localListArray.splice(currentListItemIndex - 1, 0, currentPlannedRecipe[0]);
            } else if (movement === 'down' && localListArray.length - 1) {
                const currentPlannedRecipe = localListArray.splice(currentListItemIndex, 1);
                localListArray.splice(currentListItemIndex + 1, 0, currentPlannedRecipe[0]);
            }

            updateShoppingList(localListArray);
        }
    }

    function handleRemoveOnClick(event: React.MouseEvent<HTMLButtonElement>) {
        const target = event.target as HTMLButtonElement;
        const ingredientId = target.getAttribute('data-id');

        if (!ingredientId) return;

        const localListItems = localStorage.getItem(LSKey.shoppingList);

        if (localListItems) {
            const localListArray: SavedIngredient[] = JSON.parse(localListItems);
            const currentListItemIndex = localListArray.findIndex(listItem => listItem.id === ingredientId);
            localListArray.splice(currentListItemIndex, 1);

            updateShoppingList(localListArray);
        }
    }

    // Helpers
    // thank you - https://gist.github.com/sampotts/6a281c70ae4356512021f12869ea3d38
    function getClosestFraction(value: number) {
        // returns closest item, rounded up
        return quantityFractions.reduce((previous, current) => {
            if (Math.abs(current.value - value) <= Math.abs(previous.value - value)) {
                return current.value >= value ? current : previous;
            }

            return previous;
        });
    }

    function removeAllPlannedRecipes() {
        localStorage.setItem(LSKey.shoppingList, JSON.stringify([]));
        setListItems([]);
    }

    function updateShoppingList(updatedShoppingList: SavedIngredient[]) {
        localStorage.setItem(LSKey.shoppingList, JSON.stringify(updatedShoppingList));
        setListItems(updatedShoppingList);
    }

    // Renderers
    function renderLabelContents(listItem: SavedIngredient) {
        const quantityRemainder = Number((listItem.quantity % 1).toFixed(3));
        const quantity = listItem.quantity - quantityRemainder;

        let quantityFraction = '';
        if (quantityRemainder > 0) {
            quantityFraction = getClosestFraction(quantityRemainder).name;
        }

        const name = (quantity > 1) ? listItem.name.namePlural : listItem.name.name;

        let unit = '';
        if (listItem.unit) {
            unit = (quantity > 1 || (quantity === 1) && quantityRemainder > 0) ? listItem.unit.namePlural : listItem.unit.name;
        }

        return <>{(quantity === 0) ? '' : quantity}{quantityFraction} {unit} <b>{name}</b></>;
    }

    return (
        <>
            <Card>
                <h1>Shopping list</h1>
            </Card>

            <Card hide={searchStatus !== 'searching'}>
                <h2>Fetching shopping list items...</h2>
            </Card>

            <Card hide={searchStatus !== 'complete'}>
                <>
                    <div className={styles['list-heading']}>
                        <h2>Items ({listItems.length})</h2>
                        <button
                            aria-label='Remove all planned recipes from list'
                            className={`icon-only ${(listItems.length === 0) ? styles.hidden : ''}`}
                            onClick={removeAllPlannedRecipes}
                        >
                            <Icon ariaHidden={true} Icon={bxTrash} />
                        </button>
                    </div>

                    {listItems.length > 0 &&
                        <ul className={styles.list}>
                            {listItems.map((listItem, index) => {
                                return <li key={listItem.id}>
                                    <div className={styles.left}>
                                        <input
                                            checked={listItem.isComplete}
                                            data-name={listItem.name.name}
                                            id={listItem.id}
                                            onChange={handleCheckboxOnChange}
                                            type='checkbox'
                                        />
                                        <label className='no-styles' htmlFor={listItem.id}>
                                            {renderLabelContents(listItem)}
                                        </label>
                                    </div>
                                    <div className={styles.right}>
                                        <button
                                            aria-label='Move up in list by one'
                                            className='icon-only'
                                            data-id={listItem.id}
                                            disabled={index === 0}
                                            onClick={(event) => handleOrderOnClick(event, 'up')}
                                        >
                                            <Icon ariaHidden={true} Icon={bxUpArrowAlt} />
                                        </button>
                                        <button
                                            aria-label='Move down in list by one'
                                            className='icon-only'
                                            data-id={listItem.id}
                                            disabled={index === listItems.length - 1}
                                            onClick={(event) => handleOrderOnClick(event, 'down')}
                                        >
                                            <Icon ariaHidden={true} Icon={bxDownArrowAlt} />
                                        </button>
                                        <button
                                            aria-label='Remove from list'
                                            className='icon-only'
                                            data-id={listItem.id}
                                            onClick={handleRemoveOnClick}
                                        >
                                            <Icon ariaHidden={true} Icon={bxTrash} />
                                        </button>
                                    </div>
                                </li>;
                            })}
                        </ul>
                    }
                </>
            </Card>

            <Card>
                <h2>Add to shopping list</h2>

                <form className={styles.form} onSubmit={handleFormOnSubmit}>
                    <InputGroup
                        input={<input defaultValue={0} id='add-to-shopping-list-quantity' inputMode='numeric' min={0} name='quantity' required type='number' />}
                        label={<label htmlFor='add-to-shopping-list-quantity'>Amount</label>}
                    />
                    <InputGroup
                        button={<input name='submit' type='submit' value='Add' />}
                        input={<input id='add-to-shopping-list-name' name='name' required type='text' />}
                        label={<label htmlFor='add-to-shopping-list-name'>Name</label>}
                    />
                </form>
            </Card>
        </>
    );
};

export default List;

export async function getStaticProps() {
    const quantityFractions = await prisma.quantityFraction.findMany({
        select: getQuantityFractionFormat(true),
        orderBy: {
            name: 'asc',
        },
    });

    return {
        props: {
            quantityFractions: quantityFractions.map((quantityFraction) => {
                return {
                    name: quantityFraction.name,
                    value: (quantityFraction.value) ? Number(quantityFraction.value.toFixed(3)) : 0,
                };
            }),
        },
    };
}
