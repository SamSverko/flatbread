import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth/next';
import * as React from 'react';
import { v4 } from 'uuid';

import AlertDialog from '../components/alert-dialog';
import Card from '../components/card';
import EditDataDialog from '../components/edit-data-dialog';
import Icon from '../components/icon';
import InputGroup from '../components/input-group';

import authOptions from './api/auth/[...nextauth]';
import { slugChars } from '../utils';
import { prisma } from '../prisma/db';
import {
    alterationMaxCharLength,
    cookTimeMinsMaxValue,
    detailsMaxCharLength,
    prepTimeMinsMaxValue,
    quantityWholeMaxValue,
    sectionMaxCharLength,
    servingAmountMaxValue,
    slugMaxCharLength,
    sourceNameMaxCharLength,
    sourceURLMaxCharLength,
    titleMaxCharLength,
} from '../prisma/utils';

import bxDownArrowAlt from '../../public/icons/bx-down-arrow-alt.svg';
import bxRefresh from '../../public/icons/bx-refresh.svg';
import bxRuler from '../../public/icons/bx-ruler.svg';
import bxTrash from '../../public/icons/bx-trash.svg';
import bxUpArrowAlt from '../../public/icons/bx-up-arrow-alt.svg';
import bxsEditAlt from '../../public/icons/bxs-edit-alt.svg';

import styles from '../styles/admin.module.scss';

import type {
    CourseType,
    Cuisine,
    DietaryRestriction,
    DishType,
    Ingredient,
    IngredientUnit,
    QuantityFraction,
    ServingUnit,
} from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import type { RecipeIngredient, RecipeStepNote } from '../prisma/types';
import type { RecipeFormatted } from '../types';

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
    // Hooks
    const router = useRouter();

    // Refs
    const editCategoryButtonRef = React.useRef(null);
    const editFractionsButtonRef = React.useRef(null);
    const editIngredientsButtonRef = React.useRef(null);
    const editIngredientUnitsButtonRef = React.useRef(null);
    const editServingsButtonRef = React.useRef(null);
    const formFeedbackRef = React.useRef(null);

    // States
    const [editRecipeId, setEditRecipeId] = React.useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = React.useState(false);

    const [formTitle, setFormTitle] = React.useState('');
    const [formSlug, setFormSlug] = React.useState('');
    const [formSourceName, setFormSourceName] = React.useState('');
    const [formSourceURL, setFormSourceURL] = React.useState('');
    const [formPrepTimeHours, setFormPrepTimeHours] = React.useState<number | string>('');
    const [formPrepTimeMins, setFormPrepTimeMins] = React.useState<number | string>(30);
    const [formCookTimeHours, setFormCookTimeHours] = React.useState<number | string>('');
    const [formCookTimeMins, setFormCookTimeMins] = React.useState<number | string>(30);
    const [formServingAmount, setFormServingAmount] = React.useState<number | string>(4);
    const [formServingUnit, setFormServingUnit] = React.useState('serving');
    const [formCourseTypes, setFormCourseTypes] = React.useState<Array<string>>([]);
    const [formCuisines, setFormCuisines] = React.useState<Array<string>>([]);
    const [formDietaryRestrictions, setFormDietaryRestrictions] = React.useState<Array<string>>([]);
    const [formDishTypes, setFormDishTypes] = React.useState<Array<string>>([]);
    const [formRecipeIngredients, setFormRecipeIngredients] = React.useState<Array<RecipeIngredient>>([]);
    const [formRecipeSteps, setFormRecipeSteps] = React.useState<Array<RecipeStepNote>>([]);
    const [formRecipeNotes, setFormRecipeNotes] = React.useState<Array<RecipeStepNote>>([]);

    const [formStepSection, setFormStepSection] = React.useState('');
    const [formStepDetails, setFormStepDetails] = React.useState('');
    const [formNoteSection, setFormNoteSection] = React.useState('');
    const [formNoteDetails, setFormNoteDetails] = React.useState('');

    const [formIngredientSection, setFormIngredientSection] = React.useState('');
    const [formIngredientQuantityWhole, setFormIngredientQuantityWhole] = React.useState<number | string>('');
    const [formIngredientQuantityFraction, setFormIngredientQuantityFraction] = React.useState('');
    const [formIngredientQuantityMinWhole, setFormIngredientQuantityMinWhole] = React.useState('');
    const [formIngredientQuantityMinFraction, setFormIngredientQuantityMinFraction] = React.useState('');
    const [formIngredientQuantityMaxWhole, setFormIngredientQuantityMaxWhole] = React.useState('');
    const [formIngredientQuantityMaxFraction, setFormIngredientQuantityMaxFraction] = React.useState('');
    const [formIngredientUnit, setFormIngredientUnit] = React.useState('');
    const [formIngredientName, setFormIngredientName] = React.useState('');
    const [formIngredientAlteration, setFormIngredientAlteration] = React.useState('');
    const [formIngredientIsOptional, setFormIngredientIsOptional] = React.useState(false);
    const [formIngredientSubstitutions, setFormIngredientSubstitutions] = React.useState<Array<string>>([]);

    const [formSubmitValue, setFormSubmitValue] = React.useState('Add new recipe');
    const [formFeedback, setFormFeedback] = React.useState('');

    const [showDialog, setShowDialog] = React.useState(false);
    const [showAlert, setShowAlert] = React.useState(false);
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

    // Effects
    React.useEffect(() => {
        if (router.query.id) {
            setIsLoading(true);
            fetch(`/api/recipes?condensed=true&id=${router.query.id}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        console.error(data.error);
                        setIsLoading(false);
                    } else {
                        parseRecipeDataForInputs(data);
                        setIsLoading(false);
                    }
                });
        }
    }, []);

    React.useEffect(() => {
        if (router.query.setFormFeedback) {
            setFormTitle('');
            setFormSlug('');
            setFormSourceName('');
            setFormSourceURL('');
            setFormPrepTimeHours('');
            setFormPrepTimeMins(30);
            setFormCookTimeHours('');
            setFormCookTimeMins(30);
            setFormServingAmount(4);
            setFormServingUnit('serving');
            setFormCourseTypes([]);
            setFormCuisines([]);
            setFormDietaryRestrictions([]);
            setFormDishTypes([]);
            setFormRecipeIngredients([]);
            setFormRecipeNotes([]);
            setFormRecipeSteps([]);

            setEditRecipeId(undefined);
            setFormSubmitValue('Add new recipe');
            setFormFeedback(router.query.setFormFeedback.toString());

            const formFeedbackElement = formFeedbackRef.current;
            if (formFeedbackElement) (formFeedbackElement as HTMLElement).focus();
        }
    }, [router.query.setFormFeedback]);

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

        const titleValidated = (formTitle) ? formTitle.toString().trim() : undefined;
        if (!titleValidated) {
            return setFormFeedback('Form error: Title value must be a string.');
        }

        const slugValidated = (formSlug) ? formSlug.toString().trim() : undefined;
        if (!slugValidated) {
            return setFormFeedback('Form error: Slug value must be a string (no spaces allowed, separate words with hyphens).');
        }
        const slugRegEx = /^[a-z0-9]+(?:-[a-z0-9]+)*$/g; // importing this from another file causes it to fail sometimes?
        const slugTest = slugRegEx.test(slugValidated);
        if (!slugTest) {
            return setFormFeedback('Form error: Slug value must be a string (no spaces allowed, separate words with hyphens).');
        }

        const sourceNameValidated = (formSourceName) ? formSourceName.toString().trim() : undefined;
        if (!sourceNameValidated) {
            return setFormFeedback('Form error: Source name value must be a string.');
        }

        const sourceURLValidated = (formSourceURL) ? formSourceURL.toString().trim() : undefined;

        const prepTimeHoursValidated = (typeof formPrepTimeHours === 'number') ? formPrepTimeHours : 0;
        if (isNaN(prepTimeHoursValidated) || prepTimeHoursValidated < 0) {
            return setFormFeedback('Form error: Prep time hours value must be a positive whole number.');
        }
        const prepTimeMinsValidated = (typeof formPrepTimeMins === 'number') ? formPrepTimeMins : 0;
        if (isNaN(prepTimeMinsValidated) || prepTimeMinsValidated < 0) {
            return setFormFeedback('Form error: Prep time minutes value must be a positive whole number.');
        }
        const prepTimeValidated = ((prepTimeHoursValidated * 60) + prepTimeMinsValidated).toString();

        const cookTimeHoursValidated = (typeof formCookTimeHours === 'number') ? formCookTimeHours : 0;
        if (isNaN(cookTimeHoursValidated) || cookTimeHoursValidated < 0) {
            return setFormFeedback('Form error: Cook time hours value must be a positive whole number.');
        }
        const cookTimeMinsValidated = (typeof formCookTimeMins === 'number') ? formCookTimeMins : 0;
        if (isNaN(cookTimeMinsValidated) || cookTimeMinsValidated < 0) {
            return setFormFeedback('Form error: Cook time minutes value must be a positive whole number.');
        }
        const cookTimeValidated = ((cookTimeHoursValidated * 60) + cookTimeMinsValidated).toString();

        const servingAmountValidated = (formServingAmount) ? formServingAmount.toString() : undefined;
        if (!servingAmountValidated) {
            return setFormFeedback('Form error: Serving amount value must be a positive whole number.');
        }

        const servingUnitValidated = (localServingUnits.map(servingUnit => servingUnit.name).includes(formServingUnit)) ? formServingUnit : undefined;
        if (!servingUnitValidated) {
            return setFormFeedback('Form error: Serving unit value must be an existing serving unit.');
        }

        const courseTypesFlat = localCourseTypes.map((category) => category.name);
        formCourseTypes.forEach((selectedCategory) => {
            if (!courseTypesFlat.includes(selectedCategory)) {
                return setFormFeedback('Form error: \'Course type\' values must be from the list provided.');
            }
        });
        const courseTypesValidated = (formCourseTypes.length > 0) ? formCourseTypes.join(',') : undefined;
        if (!courseTypesValidated) {
            return setFormFeedback('Form error: Course types must have at least one selection.');
        }

        const cuisinesFlat = localCuisines.map((category) => category.name);
        formCuisines.forEach((selectedCategory) => {
            if (!cuisinesFlat.includes(selectedCategory)) {
                return setFormFeedback('Form error: \'Cuisine\' values must be from the list provided.');
            }
        });
        const cuisinesValidated = (formCuisines.length > 0) ? formCuisines.join(',') : undefined;
        if (!cuisinesValidated) {
            return setFormFeedback('Form error: \'Cuisines\' must have at least one selection.');
        }

        const dietaryRestrictionsFlat = localDietaryRestrictions.map((category) => category.name);
        formDietaryRestrictions.forEach((selectedCategory) => {
            if (!dietaryRestrictionsFlat.includes(selectedCategory)) {
                return setFormFeedback('Form error: \'Dietary restriction\' values must be from the list provided.');
            }
        });
        const dietaryRestrictionsValidated = (formDietaryRestrictions.length > 0) ? formDietaryRestrictions.join(',') : undefined;

        const dishTypesFlat = localDishTypes.map((category) => category.name);
        formDishTypes.forEach((selectedCategory) => {
            if (!dishTypesFlat.includes(selectedCategory)) {
                return setFormFeedback('Form error: \'Dish type\' values must be from the list provided.');
            }
        });
        const dishTypesValidated = (formDishTypes.length > 0) ? formDishTypes.join(',') : undefined;
        if (!dishTypesValidated) {
            return setFormFeedback('Form error: \'Dish types\' must have at least one selection.');
        }

        if (formRecipeIngredients.length === 0) {
            return setFormFeedback('Form error: There must be at least one \'Ingredient\' provided.');
        }

        if (formRecipeSteps.length === 0) {
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
            ingredients: JSON.stringify(formRecipeIngredients),
            steps: JSON.stringify(formRecipeSteps),
        };

        if (sourceURLValidated) recipeFormBody.sourceURL = sourceURLValidated;
        if (dietaryRestrictionsValidated) recipeFormBody.dietaryRestrictions = dietaryRestrictionsValidated;
        if (formRecipeNotes.length > 0) recipeFormBody.notes = JSON.stringify(formRecipeNotes);

        let formBody: unknown[] | string = [];
        for (const property in recipeFormBody) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(recipeFormBody[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        try {
            setIsLoading(true);
            setFormFeedback(`${(editRecipeId) ? 'Updating recipe' : 'Adding new recipe'}...`);

            fetch(`/api/recipe${(editRecipeId) ? `?id=${editRecipeId}` : ''}`, {
                body: formBody,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                method: (editRecipeId) ? 'PUT' : 'POST',
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        setIsLoading(false);
                        setFormFeedback(`Form error: ${data.error}`);
                        return;
                    }

                    if (data.code) {
                        setIsLoading(false);
                        setFormFeedback(`Form error: ${data.code}: ${data.message}`);
                        return;
                    }

                    setIsLoading(false);
                    setFormFeedback(`Form success: ${(editRecipeId) ? 'Recipe updated' : 'New recipe added'}!`);
                });
        } catch (error) {
            setIsLoading(false);
            setFormFeedback('Form error: Please try again.');
        }
    }

    function handleOnClickDeleteRecipe() {
        setShowAlert(true);
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

    function handleOnBlurTitle(event: React.FocusEvent<HTMLInputElement>) {
        const target = event.target;
        if (!target) return;
        const value = (target as HTMLInputElement).value;

        const valueForSlugArray = value.toLowerCase().replaceAll(' ', '-').split('');
        const valueForSlug = valueForSlugArray.filter(character => slugChars.includes(character)).join('');

        setFormSlug(valueForSlug);
    }

    function handleOnSubmitAddIngredient(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;

        setFormFeedback('');

        const nameValidated = (formIngredientName) ? formIngredientName.toString().trim() : undefined;
        if (!nameValidated) {
            return setFormFeedback('Form error: \'Name\' value must be a string.');
        }

        const isOptionalValidated = (formIngredientIsOptional) ? true : false;

        const ingredientsFlat = localIngredients.map((ingredient) => ingredient.name);
        formIngredientSubstitutions.forEach((selectedSubstitute) => {
            if (!ingredientsFlat.includes(selectedSubstitute as string)) {
                return setFormFeedback('Form error: \'Substitution\' values must be from the list provided.');
            }
        });
        const substitutionsValidated = formIngredientSubstitutions as string[];

        const ingredientToAdd: RecipeIngredient = {
            id: v4(),
            name: nameValidated,
            isOptional: isOptionalValidated,
            substitutions: substitutionsValidated,
        };

        const sectionValidated = (formIngredientSection) ? formIngredientSection.toString().trim() : undefined;
        if (sectionValidated) {
            ingredientToAdd.section = sectionValidated;
        }

        const quantityWholeValidated = (formIngredientQuantityWhole) ? parseInt(formIngredientQuantityWhole as string) : undefined;
        if (quantityWholeValidated && !isNaN(quantityWholeValidated)) {
            ingredientToAdd.quantityWhole = quantityWholeValidated;
        }

        const quantityFractionValidated = (localQuantityFractions.map(quantityFraction => quantityFraction.name).includes(formIngredientQuantityFraction as string)) ? formIngredientQuantityFraction?.toString() : undefined;
        if (quantityFractionValidated) {
            ingredientToAdd.quantityFraction = quantityFractionValidated;
        }

        const quantityMinWholeValidated = (formIngredientQuantityMinWhole) ? parseInt(formIngredientQuantityMinWhole as string) : undefined;
        if (quantityMinWholeValidated && !isNaN(quantityMinWholeValidated)) {
            ingredientToAdd.quantityMinWhole = quantityMinWholeValidated;
        }

        const quantityMinFractionValidated = (localQuantityFractions.map(quantityFraction => quantityFraction.name).includes(formIngredientQuantityMinFraction as string)) ? formIngredientQuantityMinFraction?.toString() : undefined;
        if (quantityMinFractionValidated) {
            ingredientToAdd.quantityMinFraction = quantityMinFractionValidated;
        }

        const quantityMaxWholeValidated = (formIngredientQuantityMaxWhole) ? parseInt(formIngredientQuantityMaxWhole as string) : undefined;
        if (quantityMaxWholeValidated && !isNaN(quantityMaxWholeValidated)) {
            ingredientToAdd.quantityMaxWhole = quantityMaxWholeValidated;
        }

        const quantityMaxFractionValidated = (localQuantityFractions.map(quantityFraction => quantityFraction.name).includes(formIngredientQuantityMaxFraction as string)) ? formIngredientQuantityMaxFraction?.toString() : undefined;
        if (quantityMaxFractionValidated) {
            ingredientToAdd.quantityMaxFraction = quantityMaxFractionValidated;
        }

        const unitValidated = (localIngredientUnits.map(ingredientUnit => ingredientUnit.name).includes(formIngredientUnit as string)) ? formIngredientUnit?.toString() : undefined;
        if (unitValidated) {
            ingredientToAdd.unit = unitValidated;
        }

        const alterationValidated = (formIngredientAlteration) ? formIngredientAlteration.toString().trim() : undefined;
        if (alterationValidated) {
            ingredientToAdd.alteration = alterationValidated;
        }

        setFormRecipeIngredients(formRecipeIngredients => [...formRecipeIngredients, ingredientToAdd]);
        setFormIngredientQuantityWhole('');
        setFormIngredientQuantityFraction('');
        setFormIngredientQuantityMinWhole('');
        setFormIngredientQuantityMinFraction('');
        setFormIngredientQuantityMaxWhole('');
        setFormIngredientQuantityMaxFraction('');
        setFormIngredientUnit('');
        setFormIngredientName('');
        setFormIngredientAlteration('');
        setFormIngredientIsOptional(false);
        setFormIngredientSubstitutions([]);
    }

    function handleOnSubmitAddNote(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;

        setFormFeedback('');

        const detailsValidated = (formNoteDetails) ? formNoteDetails.toString().trim() : undefined;
        if (!detailsValidated) {
            return setFormFeedback('Form error: \'Details\' value must be a string.');
        }

        const noteToAdd: RecipeStepNote = {
            id: v4(),
            details: detailsValidated,
        };

        const sectionValidated = (formNoteSection) ? formNoteSection.toString().trim() : undefined;
        if (sectionValidated) {
            noteToAdd.section = sectionValidated;
        }

        setFormRecipeNotes(formRecipeNotes => [...formRecipeNotes, noteToAdd]);
        setFormNoteDetails('');
    }

    function handleOnSubmitAddStep(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;

        setFormFeedback('');

        const detailsValidated = (formStepDetails) ? formStepDetails.toString().trim() : undefined;
        if (!detailsValidated) {
            return setFormFeedback('Form error: \'Details\' value must be a string.');
        }

        const stepToAdd: RecipeStepNote = {
            id: v4(),
            details: detailsValidated,
        };

        const sectionValidated = (formStepSection) ? formStepSection.toString().trim() : undefined;
        if (sectionValidated) {
            stepToAdd.section = sectionValidated;
        }

        setFormRecipeSteps(formRecipeSteps => [...formRecipeSteps, stepToAdd]);
        setFormStepDetails('');
    }

    function onClickOrderIngredient(event: React.MouseEvent<HTMLButtonElement>, movement: 'down' | 'up') {
        const target = event.target as HTMLButtonElement;
        const ingredientId = target.getAttribute('data-id');

        if (!ingredientId) return;

        const localRecipeIngredients: RecipeIngredient[] = [...formRecipeIngredients];
        const currentItemIndex = localRecipeIngredients.findIndex(item => item.id === ingredientId);

        if (movement === 'up' && currentItemIndex > 0) {
            const currentRecipeIngredient = localRecipeIngredients.splice(currentItemIndex, 1);
            localRecipeIngredients.splice(currentItemIndex - 1, 0, currentRecipeIngredient[0]);
        } else if (movement === 'down' && localRecipeIngredients.length - 1) {
            const currentRecipeIngredient = localRecipeIngredients.splice(currentItemIndex, 1);
            localRecipeIngredients.splice(currentItemIndex + 1, 0, currentRecipeIngredient[0]);
        }

        setFormRecipeIngredients(localRecipeIngredients);
    }

    function onClickOrderNote(event: React.MouseEvent<HTMLButtonElement>, movement: 'down' | 'up') {
        const target = event.target as HTMLButtonElement;
        const noteId = target.getAttribute('data-id');

        if (!noteId) return;

        const localRecipeNotes: RecipeStepNote[] = [...formRecipeNotes];
        const currentItemIndex = localRecipeNotes.findIndex(item => item.id === noteId);

        if (movement === 'up' && currentItemIndex > 0) {
            const currentRecipeNote = localRecipeNotes.splice(currentItemIndex, 1);
            localRecipeNotes.splice(currentItemIndex - 1, 0, currentRecipeNote[0]);
        } else if (movement === 'down' && localRecipeNotes.length - 1) {
            const currentRecipeNote = localRecipeNotes.splice(currentItemIndex, 1);
            localRecipeNotes.splice(currentItemIndex + 1, 0, currentRecipeNote[0]);
        }

        setFormRecipeNotes(localRecipeNotes);
    }

    function onClickOrderStep(event: React.MouseEvent<HTMLButtonElement>, movement: 'down' | 'up') {
        const target = event.target as HTMLButtonElement;
        const stepId = target.getAttribute('data-id');

        if (!stepId) return;

        const localRecipeSteps: RecipeStepNote[] = [...formRecipeSteps];
        const currentItemIndex = localRecipeSteps.findIndex(item => item.id === stepId);

        if (movement === 'up' && currentItemIndex > 0) {
            const currentRecipeStep = localRecipeSteps.splice(currentItemIndex, 1);
            localRecipeSteps.splice(currentItemIndex - 1, 0, currentRecipeStep[0]);
        } else if (movement === 'down' && localRecipeSteps.length - 1) {
            const currentRecipeStep = localRecipeSteps.splice(currentItemIndex, 1);
            localRecipeSteps.splice(currentItemIndex + 1, 0, currentRecipeStep[0]);
        }

        setFormRecipeSteps(localRecipeSteps);
    }

    function onClickRemoveIngredient(event: React.MouseEvent<HTMLButtonElement>) {
        const target = event.target as HTMLButtonElement;
        const ingredientId = target.getAttribute('data-id');

        if (!ingredientId) return;

        setFormRecipeIngredients(formRecipeIngredients.filter(ingredient => ingredient.id !== ingredientId));
    }

    function onClickRemoveNote(event: React.MouseEvent<HTMLButtonElement>) {
        const target = event.target as HTMLButtonElement;
        const noteId = target.getAttribute('data-id');

        if (!noteId) return;

        setFormRecipeNotes(formRecipeNotes.filter(note => note.id !== noteId));
    }

    function onClickRemoveStep(event: React.MouseEvent<HTMLButtonElement>) {
        const target = event.target as HTMLButtonElement;
        const stepId = target.getAttribute('data-id');

        if (!stepId) return;

        setFormRecipeSteps(formRecipeSteps.filter(step => step.id !== stepId));
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

    function convertMinsToHrs(mins: number) {
        const hours = (mins / 60);
        const rhours = Math.floor(hours);
        const minutes = (hours - rhours) * 60;
        const rminutes = Math.round(minutes);

        return {
            hours: rhours,
            minutes: rminutes,
        };
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

    function deleteAlertAction(type: 'yes' | 'no') {
        setShowAlert(false);

        if (type === 'yes') {
            try {
                fetch(`/api/recipe?id=${editRecipeId}`, {
                    method: 'DELETE',
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

                        router.replace('/admin?setFormFeedback=Form success: Recipe deleted!');
                    });
            } catch (error) {
                setFormFeedback('Form error: Please try again.');
            }
        }
    }

    function parseRecipeDataForInputs(recipe: RecipeFormatted) {
        setEditRecipeId(recipe.id);
        setFormSubmitValue('Update recipe');

        setFormTitle(recipe.title);
        setFormSlug(recipe.slug);
        setFormSourceName(recipe.sourceName);

        if (recipe.sourceURL) setFormSourceURL(recipe.sourceURL);

        const convertedPrepTime = convertMinsToHrs(recipe.prepTimeMins);
        setFormPrepTimeHours(convertedPrepTime.hours);
        setFormPrepTimeMins(convertedPrepTime.minutes);

        const convertedCookTime = convertMinsToHrs(recipe.cookTimeMins);
        setFormCookTimeHours(convertedCookTime.hours);
        setFormCookTimeMins(convertedCookTime.minutes);

        setFormServingAmount(recipe.servingAmount);
        setFormServingUnit(recipe.servingUnit.name);

        setFormCourseTypes(recipe.courseTypes.map(category => category.name));
        setFormCuisines(recipe.cuisines.map(category => category.name));
        setFormDietaryRestrictions(recipe.dietaryRestrictions.map(category => category.name));
        setFormDishTypes(recipe.dishTypes.map(category => category.name));

        const formattedRecipeIngredients: RecipeIngredient[] = recipe.ingredients.map(ingredient => {
            const mappedIngredient: RecipeIngredient = {
                id: (ingredient.id) ? ingredient.id.toString() : v4(),
                name: ingredient.name.name,
                isOptional: ingredient.isOptional,
                substitutions: ingredient.substitutions.map(substitution => substitution.name),
            };

            if (ingredient.section) mappedIngredient.section = ingredient.section;
            if (ingredient.quantityWhole) mappedIngredient.quantityWhole = ingredient.quantityWhole;
            if (ingredient.quantityFraction) mappedIngredient.quantityFraction = ingredient.quantityFraction.name;
            if (ingredient.quantityMinWhole) mappedIngredient.quantityMinWhole = ingredient.quantityMinWhole;
            if (ingredient.quantityMinFraction) mappedIngredient.quantityMinFraction = ingredient.quantityMinFraction.name;
            if (ingredient.quantityMaxWhole) mappedIngredient.quantityMaxWhole = ingredient.quantityMaxWhole;
            if (ingredient.quantityMaxFraction) mappedIngredient.quantityMaxFraction = ingredient.quantityMaxFraction.name;
            if (ingredient.unit) mappedIngredient.unit = ingredient.unit.name;
            if (ingredient.alteration) mappedIngredient.alteration = ingredient.alteration;

            return mappedIngredient;
        });
        setFormRecipeIngredients(formattedRecipeIngredients);

        const formattedRecipeSteps: RecipeStepNote[] = recipe.steps.map(step => {
            const mappedStep: RecipeStepNote = {
                id: (step.id) ? step.id.toString() : v4(),
                details: step.details,
            };

            if (step.section) mappedStep.section = step.section;

            return mappedStep;
        });
        setFormRecipeSteps(formattedRecipeSteps);

        const formattedRecipeNotes: RecipeStepNote[] = recipe.notes.map(note => {
            const mappedNote: RecipeStepNote = {
                id: (note.id) ? note.id.toString() : v4(),
                details: note.details,
            };

            if (note.section) mappedNote.section = note.section;

            return mappedNote;
        });
        setFormRecipeNotes(formattedRecipeNotes);
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
                {formRecipeIngredients.map((ingredient, index) => {
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
                                    disabled={index === formRecipeIngredients.length - 1}
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
                <h2>Add new recipe</h2>

                <p>All fields marked with an asterisk (<b>*</b>) are required.</p>

                <hr />

                <details className={styles.details} open>
                    <summary>Main info</summary>

                    <form
                        className={styles.form}
                        id='submit-recipe'
                        onSubmit={handleFormOnSubmit}
                    >
                        {/* title ============================================= */}
                        <InputGroup
                            input={<input
                                aria-required='true'
                                disabled={isLoading}
                                id='title'
                                maxLength={titleMaxCharLength}
                                name='title'
                                onBlur={handleOnBlurTitle}
                                onChange={event => setFormTitle(event.target.value)}
                                required
                                type='text'
                                value={formTitle}
                            />}
                            label={<label htmlFor='title'>Title *</label>}
                        />

                        {/* slug ============================================== */}
                        <InputGroup
                            input={<input
                                aria-required='true'
                                disabled={isLoading}
                                id='slug'
                                maxLength={slugMaxCharLength}
                                name='slug'
                                onChange={event => setFormSlug(event.target.value)}
                                required
                                type='text'
                                value={formSlug}
                            />}
                            label={<label htmlFor='slug'>Slug *</label>}
                        />

                        {/* sourceName ======================================== */}
                        <InputGroup
                            input={<input
                                aria-required='true'
                                disabled={isLoading}
                                id='source-name'
                                maxLength={sourceNameMaxCharLength}
                                name='source-name'
                                onChange={event => setFormSourceName(event.target.value)}
                                required
                                type='text'
                                value={formSourceName}
                            />}
                            label={<label htmlFor='source-name'>
                                Source name *
                            </label>}
                        />

                        {/* sourceURL ========================================= */}
                        <InputGroup
                            input={<input
                                disabled={isLoading}
                                id='source-url'
                                inputMode='url'
                                maxLength={sourceURLMaxCharLength}
                                name='source-url'
                                onChange={event => setFormSourceURL(event.target.value)}
                                type='url'
                                value={formSourceURL}
                            />}
                            label={<label htmlFor='source-url'>Source URL</label>}
                        />

                        {/* prepTimeMins ====================================== */}
                        <p><b>Prep time</b></p>

                        <div className={styles['inline-time-inputs']}>
                            <InputGroup
                                input={<input
                                    aria-required='true'
                                    disabled={isLoading}
                                    id='prep-time-hours'
                                    inputMode='numeric'
                                    max={prepTimeMinsMaxValue / 60}
                                    min={0}
                                    name='prep-time-hours'
                                    onChange={(event) => {
                                        const value = parseInt(event.target.value);
                                        setFormPrepTimeHours((!isNaN(value) ? value : ''));
                                    }}
                                    step={1}
                                    type='number'
                                    value={formPrepTimeHours}
                                />}
                                label={<label htmlFor='prep-time-hours'>
                                    Hours
                                </label>}
                            />

                            <InputGroup
                                input={<input
                                    aria-required='true'
                                    disabled={isLoading}
                                    id='prep-time-mins'
                                    inputMode='numeric'
                                    max={59}
                                    min={0}
                                    name='prep-time-mins'
                                    onChange={(event) => {
                                        const value = parseInt(event.target.value);
                                        setFormPrepTimeMins((!isNaN(value) ? value : ''));
                                    }}
                                    step={1}
                                    type='number'
                                    value={formPrepTimeMins}
                                />}
                                label={<label htmlFor='prep-time-mins'>
                                    Minutes
                                </label>}
                            />
                        </div>

                        {/* cookTimeMins ====================================== */}
                        <p><b>Cook time</b></p>

                        <div className={styles['inline-time-inputs']}>
                            <InputGroup
                                input={<input
                                    aria-required='true'
                                    disabled={isLoading}
                                    id='cook-time-hours'
                                    inputMode='numeric'
                                    max={cookTimeMinsMaxValue / 60}
                                    min={0}
                                    name='cook-time-hours'
                                    onChange={(event) => {
                                        const value = parseInt(event.target.value);
                                        setFormCookTimeHours((!isNaN(value) ? value : ''));
                                    }}
                                    step={1}
                                    type='number'
                                    value={formCookTimeHours}
                                />}
                                label={<label htmlFor='cook-time-hours'>
                                    Hours
                                </label>}
                            />

                            <InputGroup
                                input={<input
                                    aria-required='true'
                                    disabled={isLoading}
                                    id='cook-time-mins'
                                    inputMode='numeric'
                                    max={59}
                                    min={0}
                                    name='cook-time-mins'
                                    onChange={(event) => {
                                        const value = parseInt(event.target.value);
                                        setFormCookTimeMins((!isNaN(value) ? value : ''));
                                    }}
                                    step={1}
                                    type='number'
                                    value={formCookTimeMins}
                                />}
                                label={<label htmlFor='cook-time-mins'>
                                    Minutes
                                </label>}
                            />
                        </div>

                        <div className={styles['section-heading']}>
                            <p><b>Serving</b></p>
                            <button
                                aria-label='Edit serving units'
                                className='icon-only'
                                disabled={isLoading}
                                onClick={handleEditServingUnitOnClick}
                                ref={editServingsButtonRef}
                                type='button'
                            >
                                <Icon ariaHidden={true} Icon={bxsEditAlt} />
                            </button>
                        </div>

                        {/* servingAmount ===================================== */}
                        {/* servingUnit ======================================= */}
                        <div className={styles['inline-serving-inputs']}>
                            <InputGroup
                                input={<input
                                    aria-required='true'
                                    disabled={isLoading}
                                    id='serving-amount'
                                    inputMode='numeric'
                                    max={servingAmountMaxValue}
                                    min={1}
                                    name='serving-amount'
                                    onChange={(event) => {
                                        const value = parseInt(event.target.value);
                                        setFormServingAmount((!isNaN(value) ? value : 0));
                                    }}
                                    step={1}
                                    type='number'
                                    value={formServingAmount}
                                />}
                                label={<label htmlFor='serving-amount'>
                                    Amount *
                                </label>}
                            />

                            <InputGroup
                                input={<select
                                    aria-required='true'
                                    disabled={isLoading}
                                    id='serving-unit'
                                    name='serving-unit'
                                    onChange={event => setFormServingUnit(event.target.value)}
                                    required
                                    value={formServingUnit}
                                >
                                    <option value=''>
                                        -- Select a serving unit --
                                    </option>
                                    {localServingUnits.map((servingUnit) => {
                                        return <option
                                            key={`serving-unit-${servingUnit.name}`}
                                            value={servingUnit.name}
                                        >
                                            {servingUnit.namePlural}
                                        </option>;
                                    })}
                                </select>}
                                label={<label htmlFor='serving-unit'>
                                    Unit *
                                </label>}
                            />
                        </div>

                        <div className={styles['section-heading']}>
                            <p><b>Categories</b></p>
                            <button
                                aria-label='Edit categories'
                                className='icon-only'
                                disabled={isLoading}
                                onClick={handleEditCategoryOnClick}
                                ref={editCategoryButtonRef}
                                type='button'
                            >
                                <Icon ariaHidden={true} Icon={bxsEditAlt} />
                            </button>
                        </div>

                        {/* courseTypes ======================================= */}
                        <InputGroup
                            input={<select
                                aria-required='true'
                                disabled={isLoading}
                                id='course-types'
                                multiple
                                name='course-types'
                                onChange={event => {
                                    const options = [...event.target.selectedOptions];
                                    const values = options.map(option => option.value);
                                    setFormCourseTypes(values);
                                }}
                                required
                                value={formCourseTypes}
                            >
                                {localCourseTypes.map((courseType) => {
                                    return <option
                                        key={`course-types-${courseType.name}`}
                                        value={courseType.name}
                                    >
                                        {courseType.name}
                                    </option>;
                                })}
                            </select>}
                            label={<label htmlFor='course-types'>
                                Course types *
                            </label>}
                        />

                        {/* cuisines ========================================== */}
                        <InputGroup
                            input={<select
                                aria-required='true'
                                disabled={isLoading}
                                id='cuisines'
                                multiple
                                name='cuisines'
                                onChange={event => {
                                    const options = [...event.target.selectedOptions];
                                    const values = options.map(option => option.value);
                                    setFormCuisines(values);
                                }}
                                required
                                value={formCuisines}
                            >
                                {localCuisines.map((cuisine) => {
                                    return <option
                                        key={`cuisines-${cuisine.name}`}
                                        value={cuisine.name}
                                    >
                                        {cuisine.name}
                                    </option>;
                                })}
                            </select>}
                            label={<label htmlFor='cuisines'>Cuisines *</label>}
                        />

                        {/* dietaryRestrictions =============================== */}
                        <InputGroup
                            input={<select
                                disabled={isLoading}
                                id='dietary-restrictions'
                                multiple
                                name='dietary-restrictions'
                                onChange={event => {
                                    const options = [...event.target.selectedOptions];
                                    const values = options.map(option => option.value);
                                    setFormDietaryRestrictions(values);
                                }}
                                value={formDietaryRestrictions}
                            >
                                {localDietaryRestrictions.map((dietaryRestriction) => {
                                    return <option
                                        key={`dietary-restrictions-${dietaryRestriction.name}`}
                                        value={dietaryRestriction.name}
                                    >
                                        {dietaryRestriction.name}
                                    </option>;
                                })}
                            </select>}
                            label={<label htmlFor='dietary-restrictions'>
                                Dietary restrictions
                            </label>}
                        />

                        {/* dishTypes ========================================= */}
                        <InputGroup
                            input={<select
                                aria-required='true'
                                disabled={isLoading}
                                id='dish-types'
                                multiple
                                name='dish-types'
                                onChange={event => {
                                    const options = [...event.target.selectedOptions];
                                    const values = options.map(option => option.value);
                                    setFormDishTypes(values);
                                }}
                                required
                                value={formDishTypes}
                            >
                                {localDishTypes.map((dishType) => {
                                    return <option
                                        key={`dish-types-${dishType.name}`}
                                        value={dishType.name}
                                    >
                                        {dishType.name}
                                    </option>;
                                })}
                            </select>}
                            label={<label htmlFor='dish-types'>
                                Dish types *
                            </label>}
                        />
                    </form>
                </details>

                <hr />

                {/* ingredients =========================================== */}
                <details className={styles.details}>
                    <summary>Add ingredients</summary>

                    <form
                        className={styles.form}
                        id='add-ingredient'
                        onSubmit={handleOnSubmitAddIngredient}
                    >
                        {/* ingredient / section ============================== */}
                        <InputGroup
                            input={<input
                                disabled={isLoading}
                                id='ingredient-section'
                                maxLength={sectionMaxCharLength}
                                name='ingredient-section'
                                onChange={event => setFormIngredientSection(event.target.value)}
                                type='text'
                                value={formIngredientSection}
                            />}
                            label={<label htmlFor='ingredient-section'>
                                Section
                            </label>}
                        />

                        <div className={styles['section-heading']}>
                            <p><b>
                                Quantity {(quantityTypeIsSingle) ? '(single)' : '(range)'}
                            </b></p>
                            <div>
                                <button
                                    aria-label='Toggle between range and single value quantity'
                                    aria-pressed={(quantityTypeIsSingle) ? false : true}
                                    className='icon-only'
                                    disabled={isLoading}
                                    onClick={handleOnClickToggleQuantityType} type='button'
                                >
                                    <Icon ariaHidden={true} Icon={bxRuler} />
                                </button>
                                <button
                                    aria-label='Edit quantity fractions'
                                    className='icon-only'
                                    disabled={isLoading}
                                    onClick={handleOnClickEditQuantityFractions}
                                    ref={editFractionsButtonRef}
                                    type='button'
                                >
                                    <Icon ariaHidden={true} Icon={bxsEditAlt} />
                                </button>
                            </div>
                        </div>

                        {/* ingredient / quantityWhole ======================== */}
                        {/* ingredient / quantityFraction ===================== */}
                        {quantityTypeIsSingle &&
                            <div className={styles['inline-quantity-inputs']}>
                                <InputGroup
                                    input={<input
                                        disabled={isLoading}
                                        id='ingredient-quantity-whole'
                                        inputMode='numeric'
                                        max={quantityWholeMaxValue}
                                        min={0}
                                        name='ingredient-quantity-whole'
                                        onChange={(event) => {
                                            const value = parseInt(event.target.value);
                                            setFormIngredientQuantityWhole((!isNaN(value) ? value : ''));
                                        }}
                                        step={1}
                                        type='number'
                                        value={formIngredientQuantityWhole}
                                    />}
                                    label={<label
                                        htmlFor='ingredient-quantity-whole'
                                    >Whole</label>}
                                />

                                <InputGroup
                                    input={<select
                                        aria-required='true'
                                        disabled={isLoading}
                                        id='ingredient-quantity-fraction'
                                        name='ingredient-quantity-fraction'
                                        onChange={event => setFormIngredientQuantityFraction(event.target.value)}
                                        value={formIngredientQuantityFraction}
                                    >
                                        <option value=''>
                                            -- Select a fraction --
                                        </option>
                                        {localQuantityFractions.map((quantityFraction) => {
                                            return <option
                                                key={`ingredient-quantity-fraction-${quantityFraction.id}`}
                                                value={quantityFraction.name}
                                            >
                                                {quantityFraction.name}
                                            </option>;
                                        })}
                                    </select>}
                                    label={<label
                                        htmlFor='ingredient-quantity-fraction'
                                    >Fraction</label>}
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
                                        input={<input
                                            disabled={isLoading}
                                            id='ingredient-quantity-min-whole'
                                            inputMode='numeric'
                                            max={quantityWholeMaxValue}
                                            min={0}
                                            name='ingredient-quantity-min-whole'
                                            onChange={event => setFormIngredientQuantityMinWhole(event.target.value)}
                                            step={1}
                                            type='number'
                                            value={formIngredientQuantityMinWhole}
                                        />}
                                        label={<label
                                            htmlFor='ingredient-quantity-min-whole'
                                        >
                                            Whole
                                        </label>}
                                    />

                                    <InputGroup
                                        input={<select
                                            aria-required='true'
                                            disabled={isLoading}
                                            id='ingredient-quantity-min-fraction'
                                            name='ingredient-quantity-min-fraction'
                                            onChange={event => setFormIngredientQuantityMinFraction(event.target.value)}
                                            value={formIngredientQuantityMinFraction}
                                        >
                                            <option value=''>-- Select a fraction --</option>
                                            {localQuantityFractions.map((quantityFraction) => {
                                                return <option
                                                    key={`ingredient-quantity-min-fraction-${quantityFraction.id}`}
                                                    value={quantityFraction.name}
                                                >
                                                    {quantityFraction.name}
                                                </option>;
                                            })}
                                        </select>}
                                        label={<label
                                            htmlFor='ingredient-quantity-min-fraction'
                                        >
                                            Fraction
                                        </label>}
                                    />
                                </div>

                                <p><b>Maximum</b></p>

                                <div className={styles['inline-quantity-inputs']}>
                                    <InputGroup
                                        input={<input
                                            disabled={isLoading}
                                            id='ingredient-quantity-max-whole'
                                            inputMode='numeric'
                                            max={quantityWholeMaxValue}
                                            min={0}
                                            name='ingredient-quantity-max-whole'
                                            onChange={event => setFormIngredientQuantityMaxWhole(event.target.value)}
                                            step={1}
                                            type='number'
                                            value={formIngredientQuantityMaxWhole}
                                        />}
                                        label={<label
                                            htmlFor='ingredient-quantity-max-whole'
                                        >Whole</label>}
                                    />

                                    <InputGroup
                                        input={<select
                                            aria-required='true'
                                            disabled={isLoading}
                                            id='ingredient-quantity-max-fraction'
                                            name='ingredient-quantity-max-fraction'
                                            onChange={event => setFormIngredientQuantityMaxFraction(event.target.value)}
                                            value={formIngredientQuantityMaxFraction}
                                        >
                                            <option value=''>-- Select a fraction --</option>
                                            {localQuantityFractions.map((quantityFraction) => {
                                                return <option
                                                    key={`ingredient-quantity-max-fraction-${quantityFraction.id}`}
                                                    value={quantityFraction.name}
                                                >
                                                    {quantityFraction.name}
                                                </option>;
                                            })}
                                        </select>}
                                        label={<label
                                            htmlFor='ingredient-quantity-max-fraction'
                                        >Fraction</label>}
                                    />
                                </div>
                            </>
                        }

                        <div className={styles['section-heading']}>
                            <p><b>Unit</b></p>
                            <button
                                aria-label='Edit ingredient units'
                                className='icon-only'
                                disabled={isLoading}
                                onClick={handleOnClickEditIngredientUnits}
                                ref={editIngredientUnitsButtonRef}
                                type='button'
                            >
                                <Icon ariaHidden={true} Icon={bxsEditAlt} />
                            </button>
                        </div>

                        {/* ingredient / unit ================================= */}
                        <InputGroup
                            input={<select
                                aria-required='true'
                                disabled={isLoading}
                                id='ingredient-unit'
                                name='ingredient-unit'
                                onChange={event => setFormIngredientUnit(event.target.value)}
                                value={formIngredientUnit}
                            >
                                <option value=''>-- Select a unit --</option>
                                {localIngredientUnits.map((ingredientUnit) => {
                                    return <option
                                        key={`ingredient-unit-${ingredientUnit.name}`}
                                        value={ingredientUnit.name}
                                    >
                                        {ingredientUnit.name}
                                    </option>;
                                })}
                            </select>}
                            label={<label htmlFor='ingredient-unit'>
                                Unit
                            </label>}
                        />

                        <div className={styles['section-heading']}>
                            <p><b>Name</b></p>
                            <button
                                aria-label='Edit ingredient names'
                                className='icon-only'
                                disabled={isLoading}
                                onClick={handleOnClickEditIngredients}
                                ref={editIngredientsButtonRef}
                                type='button'
                            >
                                <Icon ariaHidden={true} Icon={bxsEditAlt} />
                            </button>
                        </div>

                        {/* ingredient / name ================================= */}
                        <InputGroup
                            input={<select
                                aria-required='true'
                                disabled={isLoading}
                                id='ingredient-name'
                                name='ingredient-name'
                                onChange={event => setFormIngredientName(event.target.value)}
                                required
                                value={formIngredientName}
                            >
                                <option value=''>-- Select an ingredient --</option>
                                {localIngredients.map((ingredient) => {
                                    return <option
                                        key={`ingredient-unit-${ingredient.name}`}
                                        value={ingredient.name}
                                    >
                                        {ingredient.name}
                                    </option>;
                                })}
                            </select>}
                            label={<label htmlFor='ingredient-name'>
                                Name *
                            </label>}
                        />

                        {/* ingredient / alteration =========================== */}
                        <InputGroup
                            input={<input
                                disabled={isLoading}
                                id='ingredient-alteration'
                                maxLength={alterationMaxCharLength}
                                name='ingredient-alteration'
                                onChange={event => setFormIngredientAlteration(event.target.value)}
                                type='text'
                                value={formIngredientAlteration}
                            />}
                            label={<label htmlFor='ingredient-alteration'>
                                Alteration
                            </label>}
                        />

                        {/* ingredient / isOptional =========================== */}
                        <div className={styles['checkbox']}>
                            <input
                                checked={formIngredientIsOptional}
                                disabled={isLoading}
                                id='ingredient-is-optional'
                                name='ingredient-is-optional'
                                onChange={() => setFormIngredientIsOptional(formIngredientIsOptional => !formIngredientIsOptional)}
                                type='checkbox'
                            />
                            <label
                                className='no-styles'
                                htmlFor='ingredient-is-optional'
                            >Optional</label>
                        </div>

                        {/* ingredient / substitutions ======================== */}
                        <InputGroup
                            input={<select
                                disabled={isLoading}
                                id='ingredient-substitutions'
                                multiple
                                name='ingredient-substitutions'
                                onChange={event => {
                                    const options = [...event.target.selectedOptions];
                                    const values = options.map(option => option.value);
                                    setFormIngredientSubstitutions(values);
                                }}
                                value={formIngredientSubstitutions}
                            >
                                {localIngredients.map((ingredient) => {
                                    return <option
                                        key={`ingredient-substitutions-${ingredient.name}`}
                                        value={ingredient.name}
                                    >
                                        {ingredient.name}
                                    </option>;
                                })}
                            </select>}
                            label={<label htmlFor='ingredient-substitutions'>
                                Substitutions
                            </label>}
                        />

                        <div className={styles['section-submit-alt']}>
                            <div>
                                <input
                                    disabled={isLoading}
                                    form='add-ingredient'
                                    type='submit'
                                    value='Add ingredient'
                                />
                            </div>
                        </div>
                    </form>
                </details>

                <>
                    {formRecipeIngredients.length > 0 &&
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

                    <form
                        className={styles.form}
                        id='add-step'
                        onSubmit={handleOnSubmitAddStep}
                    >
                        {/* step / section ================================ */}
                        <InputGroup
                            input={<input
                                disabled={isLoading}
                                id='step-section'
                                maxLength={sectionMaxCharLength}
                                name='step-section'
                                onChange={event => setFormStepSection(event.target.value)}
                                type='text'
                                value={formStepSection}
                            />}
                            label={<label htmlFor='step-section'>
                                Section
                            </label>}
                        />

                        {/* step / details ================================ */}
                        <InputGroup
                            input={<textarea
                                disabled={isLoading}
                                id='step-details'
                                maxLength={detailsMaxCharLength}
                                name='step-details'
                                onChange={event => setFormStepDetails(event.target.value)}
                                required
                                value={formStepDetails}
                            ></textarea>}
                            label={<label htmlFor='step-details'>
                                Details
                            </label>}
                        />

                        <div className={styles['section-submit-alt']}>
                            <div>
                                <input
                                    disabled={isLoading}
                                    form='add-step'
                                    type='submit'
                                    value='Add step'
                                />
                            </div>
                        </div>
                    </form>
                </details>

                <>
                    {formRecipeSteps.length > 0 &&
                        <div>
                            <p><b>Steps</b></p>
                            <ul className={styles.list}>
                                {formRecipeSteps.map((step, index) => {
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
                                                    disabled={(index === 0) || isLoading}
                                                    onClick={(event) => onClickOrderStep(event, 'up')}
                                                >
                                                    <Icon ariaHidden={true} Icon={bxUpArrowAlt} />
                                                </button>
                                                <button
                                                    aria-label='Move down in list by one'
                                                    className='icon-only'
                                                    data-id={step.id}
                                                    disabled={(index === formRecipeSteps.length - 1) || isLoading}
                                                    onClick={(event) => onClickOrderStep(event, 'down')}
                                                >
                                                    <Icon ariaHidden={true} Icon={bxDownArrowAlt} />
                                                </button>
                                                <button
                                                    aria-label='Remove from list'
                                                    className='icon-only'
                                                    data-id={step.id}
                                                    disabled={isLoading}
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

                    <form
                        className={styles.form}
                        id='add-note'
                        onSubmit={handleOnSubmitAddNote}
                    >
                        {/* note / section ================================ */}
                        <InputGroup
                            input={<input
                                disabled={isLoading}
                                id='note-section'
                                maxLength={sectionMaxCharLength}
                                name='note-section'
                                onChange={event => setFormNoteSection(event.target.value)}
                                type='text'
                                value={formNoteSection}
                            />}
                            label={<label htmlFor='note-section'>
                                Section
                            </label>}
                        />

                        {/* note / details ================================ */}
                        <InputGroup
                            input={<textarea
                                disabled={isLoading}
                                id='note-details'
                                maxLength={detailsMaxCharLength}
                                name='note-details'
                                onChange={event => setFormNoteDetails(event.target.value)}
                                required
                                value={formNoteDetails}
                            ></textarea>}
                            label={<label htmlFor='note-details'>
                                Details
                            </label>}
                        />

                        <div className={styles['section-submit-alt']}>
                            <div>
                                <input
                                    disabled={isLoading}
                                    form='add-note'
                                    type='submit'
                                    value='Add note'
                                />
                            </div>
                        </div>
                    </form>
                </details>

                <>
                    {formRecipeNotes.length > 0 &&
                        <div>
                            <p><b>Notes</b></p>
                            <ul className={styles.list}>
                                {formRecipeNotes.map((note, index) => {
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
                                                    disabled={(index === 0) || isLoading}
                                                    onClick={(event) => onClickOrderNote(event, 'up')}
                                                >
                                                    <Icon ariaHidden={true} Icon={bxUpArrowAlt} />
                                                </button>
                                                <button
                                                    aria-label='Move down in list by one'
                                                    className='icon-only'
                                                    data-id={note.id}
                                                    disabled={(index === formRecipeSteps.length - 1) || isLoading}
                                                    onClick={(event) => onClickOrderNote(event, 'down')}
                                                >
                                                    <Icon ariaHidden={true} Icon={bxDownArrowAlt} />
                                                </button>
                                                <button
                                                    aria-label='Remove from list'
                                                    className='icon-only'
                                                    data-id={note.id}
                                                    disabled={isLoading}
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
                        <input
                            disabled={isLoading ||
                                formTitle.length === 0 ||
                                formSlug.length === 0 ||
                                formSourceName.length === 0 ||
                                formCourseTypes.length === 0 ||
                                formCuisines.length === 0 ||
                                formDishTypes.length === 0
                            }
                            form='submit-recipe'
                            type='submit'
                            value={formSubmitValue}
                        />
                        <div>
                            {editRecipeId &&
                                <button
                                    aria-label='Delete recipe'
                                    className='icon-only'
                                    disabled={isLoading}
                                    onClick={handleOnClickDeleteRecipe}
                                    type='button'
                                >
                                    <Icon ariaHidden={true} Icon={bxTrash} />
                                </button>
                            }
                            <button
                                aria-label='Refresh page'
                                className='icon-only'
                                disabled={isLoading}
                                onClick={() => router.reload()}
                                type='button'
                            >
                                <Icon ariaHidden={true} Icon={bxRefresh} />
                            </button>
                        </div>
                    </div>

                    {formFeedback.length > 0 &&
                        <p
                            aria-live='assertive'
                            className={styles['form-feedback']}
                            ref={formFeedbackRef}
                            tabIndex={-1}
                        >{formFeedback}</p>
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

            {showAlert &&
                <AlertDialog action={deleteAlertAction} header='Confirmation'>
                    <p>Are you sure you want to delete recipe <b>{formTitle}</b>?</p>
                    <p><b>This action cannot be reversed!</b></p>
                </AlertDialog>
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

    const categorySelect = {
        id: true,
        createdAt: false,
        name: true,
    };

    const courseTypes = await prisma.courseType.findMany({
        select: categorySelect,
        orderBy: {
            name: 'asc',
        },
    });

    const cuisines = await prisma.cuisine.findMany({
        select: categorySelect,
        orderBy: {
            name: 'asc',
        },
    });

    const dietaryRestrictions = await prisma.dietaryRestriction.findMany({
        select: categorySelect,
        orderBy: {
            name: 'asc',
        },
    });

    const dishTypes = await prisma.dishType.findMany({
        select: categorySelect,
        orderBy: {
            name: 'asc',
        },
    });

    const ingredients = await prisma.ingredient.findMany({
        select: {
            id: true,
            createdAt: false,
            name: true,
            namePlural: true,
        },
        orderBy: {
            name: 'asc',
        },
    });

    const ingredientUnits = await prisma.ingredientUnit.findMany({
        select: {
            id: true,
            createdAt: false,
            name: true,
            nameAbbr: true,
            namePlural: true,
        },
        orderBy: {
            name: 'asc',
        },
    });

    const quantityFractions = await prisma.quantityFraction.findMany({
        select: {
            id: true,
            createdAt: false,
            name: true,
            value: true,
        },
        orderBy: {
            value: 'asc',
        },
    });

    const servingUnits = await prisma.servingUnit.findMany({
        select: {
            id: true,
            createdAt: false,
            name: true,
            namePlural: true,
        },
        orderBy: {
            name: 'asc',
        },
    });

    return {
        props: {
            courseTypes: courseTypes,
            dietaryRestrictions: dietaryRestrictions,
            cuisines: cuisines,
            dishTypes: dishTypes,
            ingredients: ingredients,
            ingredientUnits: ingredientUnits,
            quantityFractions: (quantityFractions as QuantityFraction[]).map(quantityFraction => {
                return {
                    id: quantityFraction.id,
                    name: quantityFraction.name,
                    value: Number(quantityFraction.value.toFixed(3)),
                };
            }),
            servingUnits: servingUnits,
            session: session,
        },
    };
};
