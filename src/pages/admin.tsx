import { getServerSession } from 'next-auth/next';
import * as React from 'react';
import { v4 } from 'uuid';

import Card from '../components/card';
import EditDataDialog from '../components/edit-data-dialog';
import Icon from '../components/icon';
import InputGroup from '../components/input-group';

import authOptions from './api/auth/[...nextauth]';
import { prisma } from '../prisma/db';
import { getCategoryFormat, getIngredientFormat, getIngredientUnitFormat, getQuantityFractionFormat, getServingUnitFormat } from '../prisma/utils';

import bxDownArrowAlt from '../../public/icons/bx-down-arrow-alt.svg';
import bxRuler from '../../public/icons/bx-ruler.svg';
import bxTrash from '../../public/icons/bx-trash.svg';
import bxUpArrowAlt from '../../public/icons/bx-up-arrow-alt.svg';
import bxsEditAlt from '../../public/icons/bxs-edit-alt.svg';

import styles from '../styles/admin.module.scss';

import type { CourseType, Cuisine, DietaryRestriction, DishType, Ingredient, IngredientUnit, QuantityFraction, ServingUnit } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import type { RecipeIngredient, RecipeStepNote } from '../prisma/types';

type AdminProps = {
    courseTypes: CourseType[];
    cuisines: Cuisine[];
    dietaryRestrictions: DietaryRestriction[];
    dishTypes: DishType[];
    ingredients: Ingredient[];
    ingredientUnits: IngredientUnit[];
    quantityFractions: QuantityFraction[];
    servingUnits: ServingUnit[];
}

const Admin: NextPage<AdminProps> = ({
    courseTypes,
    cuisines,
    dietaryRestrictions,
    dishTypes,
    ingredients,
    ingredientUnits,
    quantityFractions,
    servingUnits,
}: AdminProps) => {
    // Refs
    const editCategoryButtonRef = React.useRef(null);
    const editFractionsButtonRef = React.useRef(null);
    const editIngredientsButtonRef = React.useRef(null);
    const editIngredientUnitsButtonRef = React.useRef(null);
    const editServingsButtonRef = React.useRef(null);

    // States
    const [formFeedback, setFormFeedback] = React.useState('');
    const [showDialog, setShowDialog] = React.useState(false);
    const [editType, setEditType] = React.useState<'categories' | 'ingredients' | 'ingredient units' | 'quantity fractions' | 'serving units' | ''>('');
    const [localCourseTypes, setLocalCourseTypes] = React.useState(courseTypes);
    const [localCuisines, setLocalCuisines] = React.useState(cuisines);
    const [localDietaryRestrictions, setLocalDietaryRestrictions] = React.useState(dietaryRestrictions);
    const [localDishTypes, setLocalDishTypes] = React.useState(dishTypes);
    const [localIngredients, setLocalIngredients] = React.useState(ingredients);
    const [localIngredientUnits, setLocalIngredientUnits] = React.useState(ingredientUnits);
    const [localQuantityFractions, setLocalQuantityFractions] = React.useState(quantityFractions);
    const [localServingUnits, setLocalServingUnits] = React.useState(servingUnits);
    const [quantityTypeIsSingle, setQuantityTypeIsSingle] = React.useState(true);
    const [recipeIngredients, setRecipeIngredients] = React.useState<Array<RecipeIngredient>>([]);
    const [recipeSteps, setRecipeSteps] = React.useState<Array<RecipeStepNote>>([]);
    const [recipeNotes, setRecipeNotes] = React.useState<Array<RecipeStepNote>>([]);

    // Event listeners
    function handleEditCategoryOnClick() {
        setEditType('categories');
        setShowDialog(true);
    }

    function handleEditServingUnitOnClick() {
        setEditType('serving units');
        setShowDialog(true);
    }

    function handleFormOnSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;

        setFormFeedback('');
        const formElement = (event.target as HTMLFormElement);
        const formData = new FormData(formElement);

        const formDataTitle = formData.get('title');
        const titleValidated = (formDataTitle) ? formDataTitle.toString().trim() : undefined;
        if (!titleValidated) {
            return setFormFeedback('Form error: Title value must be a string.');
        }

        const formDataSlug = formData.get('slug');
        const slugValidated = (formDataSlug) ? formDataSlug.toString().trim() : undefined;
        if (!slugValidated) {
            return setFormFeedback('Form error: Slug value must be a string (no spaces allowed, separate words with hyphens).');
        }

        const formDataSourceName = formData.get('source-name');
        const sourceNameValidated = (formDataSourceName) ? formDataSourceName.toString().trim() : undefined;
        if (!sourceNameValidated) {
            return setFormFeedback('Form error: Source name value must be a string.');
        }

        const formDataURL = formData.get('source-url');
        const sourceURLValidated = (formDataURL) ? formDataURL.toString().trim() : undefined;

        const formDataPrepTimeHours = formData.get('prep-time-hours');
        const prepTimeHoursValidated = (formDataPrepTimeHours) ? parseInt(formDataPrepTimeHours as string) : 0;
        if (isNaN(prepTimeHoursValidated) || prepTimeHoursValidated < 0) {
            return setFormFeedback('Form error: Prep time hours value must be a positive whole number.');
        }
        const formDataPrepTimeMins = formData.get('prep-time-mins');
        const prepTimeMinsValidated = (formDataPrepTimeMins) ? parseInt(formDataPrepTimeMins as string) : 0;
        if (isNaN(prepTimeMinsValidated) || prepTimeMinsValidated < 0) {
            return setFormFeedback('Form error: Prep time minutes value must be a positive whole number.');
        }
        const prepTimeValidated = ((prepTimeHoursValidated * 60) + prepTimeMinsValidated).toString();

        const formDataCookTimeHours = formData.get('cook-time-hours');
        const cookTimeHoursValidated = (formDataCookTimeHours) ? parseInt(formDataCookTimeHours as string) : 0;
        if (isNaN(cookTimeHoursValidated) || cookTimeHoursValidated < 0) {
            return setFormFeedback('Form error: Cook time hours value must be a positive whole number.');
        }
        const formDataCookTimeMins = formData.get('cook-time-mins');
        const cookTimeMinsValidated = (formDataCookTimeMins) ? parseInt(formDataCookTimeMins as string) : 0;
        if (isNaN(cookTimeMinsValidated) || cookTimeMinsValidated < 0) {
            return setFormFeedback('Form error: Cook time minutes value must be a positive whole number.');
        }
        const cookTimeValidated = ((cookTimeHoursValidated * 60) + cookTimeMinsValidated).toString();

        const formDataServingAmount = formData.get('serving-amount');
        const servingAmountValidated = (formDataServingAmount) ? formDataServingAmount as string : undefined;
        if (!servingAmountValidated) {
            return setFormFeedback('Form error: Serving amount value must be a positive whole number.');
        }

        const formDataServingUnit = formData.get('serving-unit');
        const servingUnitValidated = (localServingUnits.map(servingUnit => servingUnit.name).includes(formDataServingUnit as string)) ? formDataServingUnit as string : undefined;
        if (!servingUnitValidated) {
            return setFormFeedback('Form error: Serving unit value must be an existing serving unit.');
        }

        const formDataCourseTypes = formData.getAll('course-types');
        const courseTypesFlat = localCourseTypes.map((category) => category.name);
        formDataCourseTypes.forEach((selectedCategory) => {
            if (!courseTypesFlat.includes(selectedCategory as string)) {
                return setFormFeedback('Form error: \'Course type\' values must be from the list provided.');
            }
        });
        const courseTypesValidated = (formDataCourseTypes.length > 0) ? formDataCourseTypes.join(',') : undefined;
        if (!courseTypesValidated) {
            return setFormFeedback('Form error: Course types must have at least one selection.');
        }

        const formDataCuisines = formData.getAll('cuisines');
        const cuisinesFlat = localCuisines.map((category) => category.name);
        formDataCuisines.forEach((selectedCategory) => {
            if (!cuisinesFlat.includes(selectedCategory as string)) {
                return setFormFeedback('Form error: \'Cuisine\' values must be from the list provided.');
            }
        });
        const cuisinesValidated = (formDataCuisines.length > 0) ? formDataCuisines.join(',') : undefined;
        if (!cuisinesValidated) {
            return setFormFeedback('Form error: \'Cuisines\' must have at least one selection.');
        }

        const formDataDietaryRestrictions = formData.getAll('dietary-restrictions');
        const dietaryRestrictionsFlat = localDietaryRestrictions.map((category) => category.name);
        formDataDietaryRestrictions.forEach((selectedCategory) => {
            if (!dietaryRestrictionsFlat.includes(selectedCategory as string)) {
                return setFormFeedback('Form error: \'Dietary restriction\' values must be from the list provided.');
            }
        });
        const dietaryRestrictionsValidated = (formDataDietaryRestrictions.length > 0) ? formDataDietaryRestrictions.join(',') : undefined;

        const formDataDishTypes = formData.getAll('dish-types');
        const dishTypesFlat = localDishTypes.map((category) => category.name);
        formDataDishTypes.forEach((selectedCategory) => {
            if (!dishTypesFlat.includes(selectedCategory as string)) {
                return setFormFeedback('Form error: \'Dish type\' values must be from the list provided.');
            }
        });
        const dishTypesValidated = (formDataDishTypes.length > 0) ? formDataDishTypes.join(',') : undefined;
        if (!dishTypesValidated) {
            return setFormFeedback('Form error: \'Dish types\' must have at least one selection.');
        }

        if (recipeIngredients.length === 0) {
            return setFormFeedback('Form error: There must be at least one \'Ingredient\' provided.');
        }

        if (recipeSteps.length === 0) {
            return setFormFeedback('Form error: There must be at least one \'Step\' provided.');
        }

        const recipeFormBody: { [key: string]: string } = {
            title: titleValidated,
            slug: slugValidated,
            sourceName: sourceNameValidated,
            prepTimeMins: prepTimeValidated,
            cookTimeMins: cookTimeValidated,
            servingAmount: servingAmountValidated,
            servingUnit: servingUnitValidated,
            courseTypes: courseTypesValidated,
            cuisines: cuisinesValidated,
            dishTypes: dishTypesValidated,
            ingredients: JSON.stringify(recipeIngredients),
            steps: JSON.stringify(recipeSteps),
        };

        if (sourceURLValidated) recipeFormBody.sourceURL = sourceURLValidated;
        if (dietaryRestrictionsValidated) recipeFormBody.dietaryRestrictions = dietaryRestrictionsValidated;
        if (recipeNotes.length > 0) recipeFormBody.notes = JSON.stringify(recipeNotes);

        let formBody: unknown[] | string = [];
        for (const property in recipeFormBody) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(recipeFormBody[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        try {
            fetch('/api/recipe', {
                body: formBody,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                method: 'POST',
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        setFormFeedback(`Form error: ${data.error}`);
                        return;
                    }

                    if (data.code) {
                        setFormFeedback(`Form error: ${data.code}: ${data.message}`);
                        return;
                    }

                    console.log(data);
                    setFormFeedback('Form success: New \'recipe\' created.');
                });
        } catch (error) {
            setFormFeedback('Form error: Please try again.');
        }
    }

    function handleOnClickEditIngredients() {
        setEditType('ingredients');
        setShowDialog(true);
    }

    function handleOnClickEditIngredientUnits() {
        setEditType('ingredient units');
        setShowDialog(true);
    }

    function handleOnClickEditQuantityFractions() {
        setEditType('quantity fractions');
        setShowDialog(true);
    }

    function handleOnClickToggleQuantityType() {
        setQuantityTypeIsSingle(quantityTypeIsSingle => !quantityTypeIsSingle);
    }

    function handleOnSubmitAddIngredient(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;

        setFormFeedback('');
        const formElement = (event.target as HTMLFormElement);
        const formData = new FormData(formElement);

        const formDataName = formData.get('ingredient-name');
        const nameValidated = (formDataName) ? formDataName.toString().trim() : undefined;
        if (!nameValidated) {
            return setFormFeedback('Form error: \'Name\' value must be a string.');
        }

        const formDataIsOptional = formData.get('ingredient-is-optional');
        const isOptionalValidated = (formDataIsOptional) ? true : false;

        const formDataSubstitutions = formData.getAll('ingredient-substitutions');
        const ingredientsFlat = localIngredients.map((ingredient) => ingredient.name);
        formDataSubstitutions.forEach((selectedSubstitute) => {
            if (!ingredientsFlat.includes(selectedSubstitute as string)) {
                return setFormFeedback('Form error: \'Substitution\' values must be from the list provided.');
            }
        });
        const substitutionsValidated = formDataSubstitutions as string[];

        const ingredientToAdd: RecipeIngredient = {
            id: v4(),
            name: nameValidated,
            isOptional: isOptionalValidated,
            substitutions: substitutionsValidated,
        };

        const formDataSection = formData.get('ingredient-section');
        const sectionValidated = (formDataSection) ? formDataSection.toString().trim() : undefined;
        if (sectionValidated) {
            ingredientToAdd.section = sectionValidated;
        }

        const formDataQuantityWhole = formData.get('ingredient-quantity-whole');
        const quantityWholeValidated = (formDataQuantityWhole) ? parseInt(formDataQuantityWhole as string) : undefined;
        if (quantityWholeValidated && !isNaN(quantityWholeValidated)) {
            ingredientToAdd.quantityWhole = quantityWholeValidated;
        }

        const formDataQuantityFraction = formData.get('ingredient-quantity-fraction');
        const quantityFractionValidated = (localQuantityFractions.map(quantityFraction => quantityFraction.name).includes(formDataQuantityFraction as string)) ? formDataQuantityFraction?.toString() : undefined;
        if (quantityFractionValidated) {
            ingredientToAdd.quantityFraction = quantityFractionValidated;
        }

        const formDataQuantityMinWhole = formData.get('ingredient-quantity-min-whole');
        const quantityMinWholeValidated = (formDataQuantityMinWhole) ? parseInt(formDataQuantityMinWhole as string) : undefined;
        if (quantityMinWholeValidated && !isNaN(quantityMinWholeValidated)) {
            ingredientToAdd.quantityMinWhole = quantityMinWholeValidated;
        }

        const formDataQuantityMinFraction = formData.get('ingredient-quantity-min-fraction');
        const quantityMinFractionValidated = (localQuantityFractions.map(quantityFraction => quantityFraction.name).includes(formDataQuantityMinFraction as string)) ? formDataQuantityMinFraction?.toString() : undefined;
        if (quantityMinFractionValidated) {
            ingredientToAdd.quantityMinFraction = quantityMinFractionValidated;
        }

        const formDataQuantityMaxWhole = formData.get('ingredient-quantity-max-whole');
        const quantityMaxWholeValidated = (formDataQuantityMaxWhole) ? parseInt(formDataQuantityMaxWhole as string) : undefined;
        if (quantityMaxWholeValidated && !isNaN(quantityMaxWholeValidated)) {
            ingredientToAdd.quantityMaxWhole = quantityMaxWholeValidated;
        }

        const formDataQuantityMaxFraction = formData.get('ingredient-quantity-max-fraction');
        const quantityMaxFractionValidated = (localQuantityFractions.map(quantityFraction => quantityFraction.name).includes(formDataQuantityMaxFraction as string)) ? formDataQuantityMaxFraction?.toString() : undefined;
        if (quantityMaxFractionValidated) {
            ingredientToAdd.quantityMaxFraction = quantityMaxFractionValidated;
        }

        const formDataUnit = formData.get('ingredient-unit');
        const unitValidated = (localIngredientUnits.map(ingredientUnit => ingredientUnit.name).includes(formDataUnit as string)) ? formDataUnit?.toString() : undefined;
        if (unitValidated) {
            ingredientToAdd.unit = unitValidated;
        }

        const formDataAlteration = formData.get('ingredient-alteration');
        const alterationValidated = (formDataAlteration) ? formDataAlteration.toString().trim() : undefined;
        if (alterationValidated) {
            ingredientToAdd.alteration = alterationValidated;
        }

        setRecipeIngredients(recipeIngredients => [...recipeIngredients, ingredientToAdd]);
    }

    function handleOnSubmitAddNote(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;

        setFormFeedback('');
        const formElement = (event.target as HTMLFormElement);
        const formData = new FormData(formElement);

        const formDataDetails = formData.get('note-details');
        const detailsValidated = (formDataDetails) ? formDataDetails.toString().trim() : undefined;
        if (!detailsValidated) {
            return setFormFeedback('Form error: \'Details\' value must be a string.');
        }

        const noteToAdd: RecipeStepNote = {
            id: v4(),
            details: detailsValidated,
        };

        const formDataSection = formData.get('note-section');
        const sectionValidated = (formDataSection) ? formDataSection.toString().trim() : undefined;
        if (sectionValidated) {
            noteToAdd.section = sectionValidated;
        }

        setRecipeNotes(recipeNotes => [...recipeNotes, noteToAdd]);
    }

    function handleOnSubmitAddStep(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;

        setFormFeedback('');
        const formElement = (event.target as HTMLFormElement);
        const formData = new FormData(formElement);

        const formDataDetails = formData.get('step-details');
        const detailsValidated = (formDataDetails) ? formDataDetails.toString().trim() : undefined;
        if (!detailsValidated) {
            return setFormFeedback('Form error: \'Details\' value must be a string.');
        }

        const stepToAdd: RecipeStepNote = {
            id: v4(),
            details: detailsValidated,
        };

        const formDataSection = formData.get('step-section');
        const sectionValidated = (formDataSection) ? formDataSection.toString().trim() : undefined;
        if (sectionValidated) {
            stepToAdd.section = sectionValidated;
        }

        setRecipeSteps(recipeSteps => [...recipeSteps, stepToAdd]);
    }

    function onClickOrderIngredient(event: React.MouseEvent<HTMLButtonElement>, movement: 'down' | 'up') {
        const target = event.target as HTMLButtonElement;
        const ingredientId = target.getAttribute('data-id');

        if (!ingredientId) return;

        const localRecipeIngredients: RecipeIngredient[] = [...recipeIngredients];
        const currentItemIndex = localRecipeIngredients.findIndex(item => item.id === ingredientId);

        if (movement === 'up' && currentItemIndex > 0) {
            const currentRecipeIngredient = localRecipeIngredients.splice(currentItemIndex, 1);
            localRecipeIngredients.splice(currentItemIndex - 1, 0, currentRecipeIngredient[0]);
        } else if (movement === 'down' && localRecipeIngredients.length - 1) {
            const currentRecipeIngredient = localRecipeIngredients.splice(currentItemIndex, 1);
            localRecipeIngredients.splice(currentItemIndex + 1, 0, currentRecipeIngredient[0]);
        }

        setRecipeIngredients(localRecipeIngredients);
    }

    function onClickOrderNote(event: React.MouseEvent<HTMLButtonElement>, movement: 'down' | 'up') {
        const target = event.target as HTMLButtonElement;
        const noteId = target.getAttribute('data-id');

        if (!noteId) return;

        const localRecipeNotes: RecipeStepNote[] = [...recipeNotes];
        const currentItemIndex = localRecipeNotes.findIndex(item => item.id === noteId);

        if (movement === 'up' && currentItemIndex > 0) {
            const currentRecipeNote = localRecipeNotes.splice(currentItemIndex, 1);
            localRecipeNotes.splice(currentItemIndex - 1, 0, currentRecipeNote[0]);
        } else if (movement === 'down' && localRecipeNotes.length - 1) {
            const currentRecipeNote = localRecipeNotes.splice(currentItemIndex, 1);
            localRecipeNotes.splice(currentItemIndex + 1, 0, currentRecipeNote[0]);
        }

        setRecipeNotes(localRecipeNotes);
    }

    function onClickOrderStep(event: React.MouseEvent<HTMLButtonElement>, movement: 'down' | 'up') {
        const target = event.target as HTMLButtonElement;
        const stepId = target.getAttribute('data-id');

        if (!stepId) return;

        const localRecipeSteps: RecipeStepNote[] = [...recipeSteps];
        const currentItemIndex = localRecipeSteps.findIndex(item => item.id === stepId);

        if (movement === 'up' && currentItemIndex > 0) {
            const currentRecipeStep = localRecipeSteps.splice(currentItemIndex, 1);
            localRecipeSteps.splice(currentItemIndex - 1, 0, currentRecipeStep[0]);
        } else if (movement === 'down' && localRecipeSteps.length - 1) {
            const currentRecipeStep = localRecipeSteps.splice(currentItemIndex, 1);
            localRecipeSteps.splice(currentItemIndex + 1, 0, currentRecipeStep[0]);
        }

        setRecipeSteps(localRecipeSteps);
    }

    function onClickRemoveIngredient(event: React.MouseEvent<HTMLButtonElement>) {
        const target = event.target as HTMLButtonElement;
        const ingredientId = target.getAttribute('data-id');

        if (!ingredientId) return;

        setRecipeIngredients(recipeIngredients.filter(ingredient => ingredient.id !== ingredientId));
    }

    function onClickRemoveNote(event: React.MouseEvent<HTMLButtonElement>) {
        const target = event.target as HTMLButtonElement;
        const noteId = target.getAttribute('data-id');

        if (!noteId) return;

        setRecipeNotes(recipeNotes.filter(note => note.id !== noteId));
    }

    function onClickRemoveStep(event: React.MouseEvent<HTMLButtonElement>) {
        const target = event.target as HTMLButtonElement;
        const stepId = target.getAttribute('data-id');

        if (!stepId) return;

        setRecipeSteps(recipeSteps.filter(step => step.id !== stepId));
    }

    // Helpers
    function closeDialog(editType: string) {
        setShowDialog(false);

        if (editType === 'categories') {
            const button = editCategoryButtonRef.current;
            if (button) (button as HTMLButtonElement).focus();
        } else if (editType === 'serving units') {
            const button = editServingsButtonRef.current;
            if (button) (button as HTMLButtonElement).focus();
        }
    }

    function dataChange(editType: string) {
        if (editType === 'categories') {
            fetch('/api/categories?orderBy=asc&orderByField=name')
                .then((response) => response.json())
                .then((data) => {
                    if (!data.error) {
                        setLocalCourseTypes(data.courseTypes);
                        setLocalCuisines(data.cuisines);
                        setLocalDietaryRestrictions(data.dietaryRestrictions);
                        setLocalDishTypes(data.dishTypes);
                    }
                });
        } else if (editType === 'ingredients') {
            fetch('/api/ingredients?orderBy=asc&orderByField=name')
                .then((response) => response.json())
                .then((data) => {
                    if (!data.error) {
                        setLocalIngredients(data);
                    }
                });
        } else if (editType === 'ingredient units') {
            fetch('/api/ingredient-units?orderBy=asc&orderByField=name')
                .then((response) => response.json())
                .then((data) => {
                    if (!data.error) {
                        setLocalIngredientUnits(data);
                    }
                });
        } else if (editType === 'quantity fractions') {
            fetch('/api/quantity-fractions?orderBy=asc&orderByField=value')
                .then((response) => response.json())
                .then((data) => {
                    if (!data.error) {
                        setLocalQuantityFractions(data);
                    }
                });
        } else if (editType === 'serving units') {
            fetch('/api/serving-units?orderBy=asc&orderByField=name')
                .then((response) => response.json())
                .then((data) => {
                    if (!data.error) {
                        setLocalServingUnits(data);
                    }
                });
        }
    }

    // Renderers
    function renderIngredients() {
        function parseIngredient(ingredient: RecipeIngredient) {
            let quantity = '';
            // let quantityValue = 0;

            if (ingredient.quantityWhole) {
                quantity += ingredient.quantityWhole;
                // quantityValue += ingredient.quantityWhole;
            }

            if (ingredient.quantityFraction) {
                quantity += ingredient.quantityFraction;
                // quantityValue += Number(ingredient.quantityFraction.value);
            }

            if (ingredient.quantityMinWhole) {
                quantity += ingredient.quantityMinWhole;
                // quantityValue += ingredient.quantityMinWhole;
            }

            if (ingredient.quantityMinFraction) {
                quantity += ingredient.quantityMinFraction;
                // quantityValue += Number(ingredient.quantityMinFraction.value);
            }

            if (ingredient.quantityMaxWhole || ingredient.quantityMaxFraction) {
                quantity += '-';
            }

            if (ingredient.quantityMaxWhole) {
                quantity += ingredient.quantityMaxWhole;
                // quantityValue += ingredient.quantityMaxWhole;
            }

            if (ingredient.quantityMaxFraction) {
                quantity += ingredient.quantityMaxFraction;
                // quantityValue += Number(ingredient.quantityMaxFraction.value);
            }

            // if (ingredient.quantityMinFraction && ingredient.quantityMaxFraction) {
            //     quantityValue -= Number(ingredient.quantityMinFraction.value);
            // }

            // if (ingredient.quantityMinWhole && ingredient.quantityMaxWhole) {
            //     quantityValue -= ingredient.quantityMinWhole;
            // }

            // const unit = (ingredient.unit) ? (quantityValue <= 1 ? ingredient.unit.name : ingredient.unit.namePlural) : '';
            // const name = (quantityValue <= 1) ? ingredient.name.name : ingredient.name.namePlural;
            const alteration = (ingredient.alteration) ? `, ${ingredient.alteration}` : '';
            const optional = (ingredient.isOptional) ? ' (optional)' : '';
            const section = (ingredient.section) ? `[${ingredient.section}] ` : '';
            const substitutions = (ingredient.substitutions.length > 0)
                ? ` (substitutions: ${ingredient.substitutions.join(', ')})`
                : '';

            return {
                alteration: alteration,
                id: ingredient.id,
                name: ingredient.name,
                optional: optional,
                quantity: quantity,
                // quantityValue: quantityValue,
                section: section,
                substitutions: substitutions,
                unit: ingredient.unit,
            };
        }

        return (
            <ul className={styles.list}>
                {recipeIngredients.map((ingredient, index) => {
                    const parsedIngredient = parseIngredient(ingredient);

                    return (
                        <li key={parsedIngredient.id}>
                            <div className={styles.left}>
                                <b>{parsedIngredient.section}</b>{parsedIngredient.quantity} {parsedIngredient.unit} <b>{parsedIngredient.name}</b>
                                <em>{parsedIngredient.alteration}</em>{parsedIngredient.optional}{parsedIngredient.substitutions}
                            </div>
                            <div className={styles.right}>
                                <button
                                    aria-label='Move up in list by one'
                                    className='icon-only'
                                    data-id={ingredient.id}
                                    disabled={index === 0}
                                    onClick={(event) => onClickOrderIngredient(event, 'up')}
                                >
                                    <Icon ariaHidden={true} Icon={bxUpArrowAlt} />
                                </button>
                                <button
                                    aria-label='Move down in list by one'
                                    className='icon-only'
                                    data-id={ingredient.id}
                                    disabled={index === recipeIngredients.length - 1}
                                    onClick={(event) => onClickOrderIngredient(event, 'down')}
                                >
                                    <Icon ariaHidden={true} Icon={bxDownArrowAlt} />
                                </button>
                                <button
                                    aria-label='Remove from list'
                                    className='icon-only'
                                    data-id={ingredient.id}
                                    onClick={onClickRemoveIngredient}
                                >
                                    <Icon ariaHidden={true} Icon={bxTrash} />
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    }

    return (
        <>
            <Card>
                <h2>Admin</h2>
            </Card>

            <Card>
                <form className={styles.form} id='add-recipe' onSubmit={handleFormOnSubmit}>
                    <h2>Add new recipe</h2>

                    <p>All fields marked with an asterisk (<b>*</b>) are required.</p>

                    {/* title ============================================= */}
                    <InputGroup
                        input={<input aria-required='true' id='title' name='title' required type='text' />}
                        label={<label htmlFor='title'>Title *</label>}
                    />

                    {/* slug ============================================== */}
                    <InputGroup
                        input={<input aria-required='true' id='slug' name='slug' required type='text' />}
                        label={<label htmlFor='slug'>Slug *</label>}
                    />

                    {/* sourceName ======================================== */}
                    <InputGroup
                        input={<input aria-required='true' id='source-name' name='source-name' required type='text' />}
                        label={<label htmlFor='source-name'>Source name *</label>}
                    />

                    {/* sourceURL ========================================= */}
                    <InputGroup
                        input={<input id='source-url' inputMode='url' name='source-url' type='url' />}
                        label={<label htmlFor='source-url'>Source URL</label>}
                    />

                    {/* prepTimeMins ====================================== */}
                    <p><b>Prep time</b></p>

                    <div className={styles['inline-time-inputs']}>
                        <InputGroup
                            input={<input aria-required='true' defaultValue={0} id='prep-time-hours' inputMode='numeric' max={99} min={0} name='prep-time-hours' step={1} type='number' />}
                            label={<label htmlFor='prep-time-hours'>Hours *</label>}
                        />

                        <InputGroup
                            input={<input aria-required='true' defaultValue={30} id='prep-time-mins' inputMode='numeric' max={59} min={0} name='prep-time-mins' step={1} type='number' />}
                            label={<label htmlFor='prep-time-mins'>Minutes *</label>}
                        />
                    </div>

                    {/* cookTimeMins ====================================== */}
                    <p><b>Cook time</b></p>

                    <div className={styles['inline-time-inputs']}>
                        <InputGroup
                            input={<input aria-required='true' defaultValue={0} id='cook-time-hours' inputMode='numeric' max={99} min={0} name='cook-time-hours' step={1} type='number' />}
                            label={<label htmlFor='cook-time-hours'>Hours *</label>}
                        />

                        <InputGroup
                            input={<input aria-required='true' defaultValue={30} id='cook-time-mins' inputMode='numeric' max={59} min={0} name='cook-time-mins' step={1} type='number' />}
                            label={<label htmlFor='cook-time-mins'>Minutes *</label>}
                        />
                    </div>

                    <div className={styles['section-heading']}>
                        <p><b>Serving</b></p>
                        <button aria-label='Edit serving units' className='icon-only' onClick={handleEditServingUnitOnClick} ref={editServingsButtonRef} type='button'>
                            <Icon ariaHidden={true} Icon={bxsEditAlt} />
                        </button>
                    </div>

                    {/* servingAmount ===================================== */}
                    {/* servingUnit ======================================= */}
                    <div className={styles['inline-serving-inputs']}>
                        <InputGroup
                            input={<input aria-required='true' defaultValue={4} id='serving-amount' inputMode='numeric' max={999} min={1} name='serving-amount' step={1} type='number' />}
                            label={<label htmlFor='serving-amount'>Amount *</label>}
                        />

                        <InputGroup
                            input={<select aria-required='true' id='serving-unit' name='serving-unit' required>
                                <option value=''>-- Select a serving unit --</option>
                                {localServingUnits.map((servingUnit) => {
                                    return <option key={`serving-unit-${servingUnit.name}`} value={servingUnit.name}>
                                        {servingUnit.name}
                                    </option>;
                                })}
                            </select>}
                            label={<label htmlFor='serving-unit'>Unit *</label>}
                        />
                    </div>

                    <div className={styles['section-heading']}>
                        <p><b>Categories</b></p>
                        <button aria-label='Edit categories' className='icon-only' onClick={handleEditCategoryOnClick} ref={editCategoryButtonRef} type='button'>
                            <Icon ariaHidden={true} Icon={bxsEditAlt} />
                        </button>
                    </div>

                    {/* courseTypes ======================================= */}
                    <InputGroup
                        input={<select aria-required='true' id='course-types' multiple name='course-types' required>
                            {localCourseTypes.map((courseType) => {
                                return <option key={`course-types-${courseType.name}`} value={courseType.name}>
                                    {courseType.name}
                                </option>;
                            })}
                        </select>}
                        label={<label htmlFor='course-types'>Course types *</label>}
                    />

                    {/* cuisines ========================================== */}
                    <InputGroup
                        input={<select aria-required='true' id='cuisines' multiple name='cuisines' required>
                            {localCuisines.map((cuisine) => {
                                return <option key={`cuisines-${cuisine.name}`} value={cuisine.name}>
                                    {cuisine.name}
                                </option>;
                            })}
                        </select>}
                        label={<label htmlFor='cuisines'>Cuisines *</label>}
                    />

                    {/* dietaryRestrictions =============================== */}
                    <InputGroup
                        input={<select id='dietary-restrictions' multiple name='dietary-restrictions'>
                            {localDietaryRestrictions.map((dietaryRestriction) => {
                                return <option key={`dietary-restrictions-${dietaryRestriction.name}`} value={dietaryRestriction.name}>
                                    {dietaryRestriction.name}
                                </option>;
                            })}
                        </select>}
                        label={<label htmlFor='dietary-restrictions'>Dietary restrictions</label>}
                    />

                    {/* dishTypes ========================================= */}
                    <InputGroup
                        input={<select aria-required='true' id='dish-types' multiple name='dish-types' required>
                            {localDishTypes.map((dishType) => {
                                return <option key={`dish-types-${dishType.name}`} value={dishType.name}>
                                    {dishType.name}
                                </option>;
                            })}
                        </select>}
                        label={<label htmlFor='dish-types'>Dish types *</label>}
                    />
                </form>

                {/* ingredients =========================================== */}
                <details className={styles.details}>
                    <summary>Add ingredients</summary>

                    <form className={styles.form} id='add-ingredient' onSubmit={handleOnSubmitAddIngredient}>
                        {/* ingredient / section ============================== */}
                        <InputGroup
                            input={<input id='ingredient-section' name='ingredient-section' type='text' />}
                            label={<label htmlFor='ingredient-section'>Section</label>}
                        />

                        <div className={styles['section-heading']}>
                            <p><b>Quantity {(quantityTypeIsSingle) ? '(single)' : '(range)'}</b></p>
                            <div>
                                <button aria-label='Toggle between range and single value quantity' aria-pressed={(quantityTypeIsSingle) ? false : true} className='icon-only' onClick={handleOnClickToggleQuantityType} type='button'>
                                    <Icon ariaHidden={true} Icon={bxRuler} />
                                </button>
                                <button aria-label='Edit quantity fractions' className='icon-only' onClick={handleOnClickEditQuantityFractions} ref={editFractionsButtonRef} type='button'>
                                    <Icon ariaHidden={true} Icon={bxsEditAlt} />
                                </button>
                            </div>
                        </div>

                        {/* ingredient / quantityWhole ======================== */}
                        {/* ingredient / quantityFraction ===================== */}
                        {quantityTypeIsSingle &&
                            <div className={styles['inline-quantity-inputs']}>
                                <InputGroup
                                    input={<input defaultValue={0} id='ingredient-quantity-whole' inputMode='numeric' max={999} min={0} name='ingredient-quantity-whole' step={1} type='number' />}
                                    label={<label htmlFor='ingredient-quantity-whole'>Whole</label>}
                                />

                                <InputGroup
                                    input={<select aria-required='true' id='ingredient-quantity-fraction' name='ingredient-quantity-fraction'>
                                        <option value=''>-- Select a fraction --</option>
                                        {localQuantityFractions.map((quantityFraction) => {
                                            return <option key={`ingredient-quantity-fraction-${quantityFraction.id}`} value={quantityFraction.name}>
                                                {quantityFraction.name}
                                            </option>;
                                        })}
                                    </select>}
                                    label={<label htmlFor='ingredient-quantity-fraction'>Fraction</label>}
                                />
                            </div>
                        }

                        {/* ingredient / quantityMinWhole ===================== */}
                        {/* ingredient / quantityMinFraction ================== */}
                        {/* ingredient / quantityMaxWhole ===================== */}
                        {/* ingredient / quantityMaxFraction ================== */}
                        {!quantityTypeIsSingle &&
                            <>
                                <p><b>Minimum</b></p>

                                <div className={styles['inline-quantity-inputs']}>
                                    <InputGroup
                                        input={<input defaultValue={0} id='ingredient-quantity-min-whole' inputMode='numeric' max={999} min={0} name='ingredient-quantity-min-whole' step={1} type='number' />}
                                        label={<label htmlFor='ingredient-quantity-min-whole'>Whole</label>}
                                    />

                                    <InputGroup
                                        input={<select aria-required='true' id='ingredient-quantity-min-fraction' name='ingredient-quantity-min-fraction'>
                                            <option value=''>-- Select a fraction --</option>
                                            {localQuantityFractions.map((quantityFraction) => {
                                                return <option key={`ingredient-quantity-min-fraction-${quantityFraction.id}`} value={quantityFraction.name}>
                                                    {quantityFraction.name}
                                                </option>;
                                            })}
                                        </select>}
                                        label={<label htmlFor='ingredient-quantity-min-fraction'>Fraction</label>}
                                    />
                                </div>

                                <p><b>Maximum</b></p>

                                <div className={styles['inline-quantity-inputs']}>
                                    <InputGroup
                                        input={<input defaultValue={0} id='ingredient-quantity-max-whole' inputMode='numeric' max={999} min={0} name='ingredient-quantity-max-whole' step={1} type='number' />}
                                        label={<label htmlFor='ingredient-quantity-max-whole'>Whole</label>}
                                    />

                                    <InputGroup
                                        input={<select aria-required='true' id='ingredient-quantity-max-fraction' name='ingredient-quantity-max-fraction'>
                                            <option value=''>-- Select a fraction --</option>
                                            {localQuantityFractions.map((quantityFraction) => {
                                                return <option key={`ingredient-quantity-max-fraction-${quantityFraction.id}`} value={quantityFraction.name}>
                                                    {quantityFraction.name}
                                                </option>;
                                            })}
                                        </select>}
                                        label={<label htmlFor='ingredient-quantity-max-fraction'>Fraction</label>}
                                    />
                                </div>
                            </>
                        }

                        <div className={styles['section-heading']}>
                            <p><b>Unit</b></p>
                            <button aria-label='Edit ingredient units' className='icon-only' onClick={handleOnClickEditIngredientUnits} ref={editIngredientUnitsButtonRef} type='button'>
                                <Icon ariaHidden={true} Icon={bxsEditAlt} />
                            </button>
                        </div>

                        {/* ingredient / unit ================================= */}
                        <InputGroup
                            input={<select aria-required='true' id='ingredient-unit' name='ingredient-unit'>
                                <option value=''>-- Select a unit --</option>
                                {localIngredientUnits.map((ingredientUnit) => {
                                    return <option key={`ingredient-unit-${ingredientUnit.name}`} value={ingredientUnit.name}>
                                        {ingredientUnit.name}
                                    </option>;
                                })}
                            </select>}
                            label={<label htmlFor='ingredient-unit'>Unit</label>}
                        />

                        <div className={styles['section-heading']}>
                            <p><b>Name</b></p>
                            <button aria-label='Edit ingredient names' className='icon-only' onClick={handleOnClickEditIngredients} ref={editIngredientsButtonRef} type='button'>
                                <Icon ariaHidden={true} Icon={bxsEditAlt} />
                            </button>
                        </div>

                        {/* ingredient / name ================================= */}
                        <InputGroup
                            input={<select aria-required='true' id='ingredient-name' name='ingredient-name' required>
                                <option value=''>-- Select an ingredient --</option>
                                {localIngredients.map((ingredient) => {
                                    return <option key={`ingredient-unit-${ingredient.name}`} value={ingredient.name}>
                                        {ingredient.name}
                                    </option>;
                                })}
                            </select>}
                            label={<label htmlFor='ingredient-name'>Name *</label>}
                        />

                        {/* ingredient / alteration =========================== */}
                        <InputGroup
                            input={<input id='ingredient-alteration' name='ingredient-alteration' type='text' />}
                            label={<label htmlFor='ingredient-alteration'>Alteration</label>}
                        />

                        {/* ingredient / isOptional =========================== */}
                        <div className={styles['checkbox']}>
                            <input id='ingredient-is-optional' name='ingredient-is-optional' type='checkbox' />
                            <label className='no-styles' htmlFor='ingredient-is-optional'>Optional</label>
                        </div>

                        {/* ingredient / substitutions ======================== */}
                        <InputGroup
                            input={<select id='ingredient-substitutions' multiple name='ingredient-substitutions'>
                                {localIngredients.map((ingredient) => {
                                    return <option key={`ingredient-substitutions-${ingredient.name}`} value={ingredient.name}>
                                        {ingredient.name}
                                    </option>;
                                })}
                            </select>}
                            label={<label htmlFor='ingredient-substitutions'>Substitutions</label>}
                        />

                        <div className={styles['section-submit-alt']}>
                            <div>
                                <input form='add-ingredient' type='submit' value='Add ingredient' />
                            </div>
                        </div>
                    </form>
                </details>

                <>
                    {recipeIngredients.length > 0 &&
                        <div>
                            <p><b>Ingredients</b></p>
                            {renderIngredients()}
                        </div>
                    }
                </>

                <hr />

                {/* steps ================================================= */}
                <details className={styles.details}>
                    <summary>Add steps</summary>

                    <form className={styles.form} id='add-step' onSubmit={handleOnSubmitAddStep}>
                        {/* step / section ================================ */}
                        <InputGroup
                            input={<input id='step-section' name='step-section' type='text' />}
                            label={<label htmlFor='step-section'>Section</label>}
                        />

                        {/* step / details ================================ */}
                        <InputGroup
                            input={<input id='step-details' name='step-details' required type='text' />}
                            label={<label htmlFor='step-details'>Details</label>}
                        />

                        <div className={styles['section-submit-alt']}>
                            <div>
                                <input form='add-step' type='submit' value='Add step' />
                            </div>
                        </div>
                    </form>
                </details>

                <>
                    {recipeSteps.length > 0 &&
                        <div>
                            <p><b>Steps</b></p>
                            <ul className={styles.list}>
                                {recipeSteps.map((step, index) => {
                                    function renderSection(section: string) {
                                        return <b>[{section}]{' '}</b>;
                                    }

                                    return (
                                        <li key={step.id}>
                                            <div className={styles.left}>
                                                {step.section ? renderSection(step.section) : ''}{step.details}
                                            </div>
                                            <div className={styles.right}>
                                                <button
                                                    aria-label='Move up in list by one'
                                                    className='icon-only'
                                                    data-id={step.id}
                                                    disabled={index === 0}
                                                    onClick={(event) => onClickOrderStep(event, 'up')}
                                                >
                                                    <Icon ariaHidden={true} Icon={bxUpArrowAlt} />
                                                </button>
                                                <button
                                                    aria-label='Move down in list by one'
                                                    className='icon-only'
                                                    data-id={step.id}
                                                    disabled={index === recipeSteps.length - 1}
                                                    onClick={(event) => onClickOrderStep(event, 'down')}
                                                >
                                                    <Icon ariaHidden={true} Icon={bxDownArrowAlt} />
                                                </button>
                                                <button
                                                    aria-label='Remove from list'
                                                    className='icon-only'
                                                    data-id={step.id}
                                                    onClick={onClickRemoveStep}
                                                >
                                                    <Icon ariaHidden={true} Icon={bxTrash} />
                                                </button>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    }
                </>

                <hr />

                {/* notes ================================================= */}
                <details className={styles.details}>
                    <summary>Add notes</summary>

                    <form className={styles.form} id='add-note' onSubmit={handleOnSubmitAddNote}>
                        {/* note / section ================================ */}
                        <InputGroup
                            input={<input id='note-section' name='note-section' type='text' />}
                            label={<label htmlFor='note-section'>Section</label>}
                        />

                        {/* note / details ================================ */}
                        <InputGroup
                            input={<input id='note-details' name='note-details' required type='text' />}
                            label={<label htmlFor='note-details'>Details</label>}
                        />

                        <div className={styles['section-submit-alt']}>
                            <div>
                                <input form='add-note' type='submit' value='Add note' />
                            </div>
                        </div>
                    </form>
                </details>

                <>
                    {recipeNotes.length > 0 &&
                        <div>
                            <p><b>Notes</b></p>
                            <ul className={styles.list}>
                                {recipeNotes.map((note, index) => {
                                    function renderSection(section: string) {
                                        return <b>[{section}]{' '}</b>;
                                    }

                                    return (
                                        <li key={note.id}>
                                            <div className={styles.left}>
                                                {note.section ? renderSection(note.section) : ''}{note.details}
                                            </div>
                                            <div className={styles.right}>
                                                <button
                                                    aria-label='Move up in list by one'
                                                    className='icon-only'
                                                    data-id={note.id}
                                                    disabled={index === 0}
                                                    onClick={(event) => onClickOrderNote(event, 'up')}
                                                >
                                                    <Icon ariaHidden={true} Icon={bxUpArrowAlt} />
                                                </button>
                                                <button
                                                    aria-label='Move down in list by one'
                                                    className='icon-only'
                                                    data-id={note.id}
                                                    disabled={index === recipeNotes.length - 1}
                                                    onClick={(event) => onClickOrderNote(event, 'down')}
                                                >
                                                    <Icon ariaHidden={true} Icon={bxDownArrowAlt} />
                                                </button>
                                                <button
                                                    aria-label='Remove from list'
                                                    className='icon-only'
                                                    data-id={note.id}
                                                    onClick={onClickRemoveNote}
                                                >
                                                    <Icon ariaHidden={true} Icon={bxTrash} />
                                                </button>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    }
                </>

                <hr />

                <div className={styles['section-submit']}>
                    <div>
                        <input form='add-recipe' type='submit' value='Add new recipe' />
                    </div>

                    {formFeedback.length > 0 &&
                        <p aria-live='assertive'>{formFeedback}</p>
                    }
                </div>
            </Card>

            {showDialog &&
                <EditDataDialog
                    closeDialog={closeDialog}
                    courseTypes={localCourseTypes}
                    cuisines={localCuisines}
                    dataChange={dataChange}
                    dietaryRestrictions={localDietaryRestrictions}
                    dishTypes={localDishTypes}
                    editType={editType}
                    ingredients={localIngredients}
                    ingredientUnits={localIngredientUnits}
                    quantityFractions={localQuantityFractions}
                    servingUnits={localServingUnits}
                />
            }
        </>
    );
};

export default Admin;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const courseTypes = await prisma.courseType.findMany({
        select: getCategoryFormat(false),
        orderBy: {
            name: 'asc',
        },
    });

    const cuisines = await prisma.cuisine.findMany({
        select: getCategoryFormat(false),
        orderBy: {
            name: 'asc',
        },
    });

    const dietaryRestrictions = await prisma.dietaryRestriction.findMany({
        select: getCategoryFormat(false),
        orderBy: {
            name: 'asc',
        },
    });

    const dishTypes = await prisma.dishType.findMany({
        select: getCategoryFormat(false),
        orderBy: {
            name: 'asc',
        },
    });

    const ingredients = await prisma.ingredient.findMany({
        select: getIngredientFormat(false),
        orderBy: {
            name: 'asc',
        },
    });

    const ingredientUnits = await prisma.ingredientUnit.findMany({
        select: getIngredientUnitFormat(false),
        orderBy: {
            name: 'asc',
        },
    });

    const quantityFractions = await prisma.quantityFraction.findMany({
        select: getQuantityFractionFormat(false),
        orderBy: {
            value: 'asc',
        },
    });

    const servingUnits = await prisma.servingUnit.findMany({
        select: getServingUnitFormat(false),
        orderBy: {
            name: 'asc',
        },
    });

    return {
        props: {
            courseTypes: courseTypes.map(category => {
                return {
                    id: category.id,
                    name: category.name,
                };
            }),
            dietaryRestrictions: dietaryRestrictions.map(category => {
                return {
                    id: category.id,
                    name: category.name,
                };
            }),
            cuisines: cuisines.map(category => {
                return {
                    id: category.id,
                    name: category.name,
                };
            }),
            dishTypes: dishTypes.map(category => {
                return {
                    id: category.id,
                    name: category.name,
                };
            }),
            ingredients: (ingredients as Ingredient[]).map(ingredient => {
                return {
                    id: ingredient.id,
                    name: ingredient.name,
                    namePlural: ingredient.namePlural,
                };
            }),
            ingredientUnits: (ingredientUnits as IngredientUnit[]).map(ingredientUnits => {
                return {
                    id: ingredientUnits.id,
                    name: ingredientUnits.name,
                    nameAbbr: ingredientUnits.nameAbbr,
                    namePlural: ingredientUnits.namePlural,
                };
            }),
            quantityFractions: (quantityFractions as QuantityFraction[]).map(quantityFraction => {
                return {
                    id: quantityFraction.id,
                    name: quantityFraction.name,
                    value: Number(quantityFraction.value.toFixed(3)),
                };
            }),
            servingUnits: (servingUnits as ServingUnit[]).map(servingUnit => {
                return {
                    id: servingUnit.id,
                    name: servingUnit.name,
                    namePlural: servingUnit.namePlural,
                };
            }),
            session: session,
        },
    };
};
