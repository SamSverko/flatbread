import * as React from 'react';

import Icon from '../icon';
import InputGroup from '../input-group';

import { categoryTables } from '../../prisma/utils';

import bxX from '../../../public/icons/bx-x.svg';

import styles from './index.module.scss';

import type { CourseType, Cuisine, DietaryRestriction, DishType, IngredientUnit, QuantityFraction, ServingUnit } from '@prisma/client';
import type { Category } from '../../types';

type ComponentProps = {
    closeDialog: (editType: string) => void;
    courseTypes: CourseType[];
    cuisines: Cuisine[];
    dataChange: (editType: string) => void;
    dietaryRestrictions: DietaryRestriction[];
    dishTypes: DishType[];
    editType: 'categories' | 'ingredient units' | 'serving units' | 'quantity fractions' | '';
    ingredientUnits: IngredientUnit[];
    quantityFractions: QuantityFraction[];
    servingUnits: ServingUnit[];
}

const EditDataDialog = ({
    closeDialog,
    courseTypes,
    cuisines,
    dataChange,
    dietaryRestrictions,
    dishTypes,
    editType,
    ingredientUnits,
    quantityFractions,
    servingUnits,
}: ComponentProps) => {
    // Refs
    const categoryUpdateNameRef = React.useRef(null);
    const headerRef = React.useRef(null);
    const quantityFractionUpdateNameRef = React.useRef(null);
    const quantityFractionUpdateValueRef = React.useRef(null);
    const servingUnitUpdateNameRef = React.useRef(null);
    const servingUnitUpdateNamePluralRef = React.useRef(null);

    // States
    const [currentDeleteCategoryType, setCurrentDeleteCategoryType] = React.useState('courseType');
    const [currentUpdateCategoryType, setCurrentUpdateCategoryType] = React.useState('courseType');
    const [deleteCategoryOptions, setDeleteCategoryOptions] = React.useState(courseTypes);
    const [formFeedback, setFormFeedback] = React.useState('');
    const [updateCategoryOptions, setUpdateCategoryOptions] = React.useState(courseTypes);

    // Effects
    React.useEffect(() => {
        const header = headerRef.current;
        if (header) (header as HTMLElement).focus();

        document.body.style.height = '100vh';
        document.body.style.overflow = 'hidden';

        return function cleanup() {
            document.body.style.removeProperty('height');
            document.body.style.removeProperty('overflow');
        };
    }, []);

    React.useEffect(() => {
        if (currentDeleteCategoryType === 'courseType' || currentUpdateCategoryType === 'courseType') {
            setDeleteCategoryOptions(courseTypes);
            setUpdateCategoryOptions(courseTypes);
        } else if (currentDeleteCategoryType === 'cuisine' || currentUpdateCategoryType === 'cuisine') {
            setDeleteCategoryOptions(cuisines);
            setUpdateCategoryOptions(cuisines);
        } else if (currentDeleteCategoryType === 'dietaryRestriction' || currentUpdateCategoryType === 'dietaryRestriction') {
            setDeleteCategoryOptions(dietaryRestrictions);
            setUpdateCategoryOptions(dietaryRestrictions);
        } else if (currentDeleteCategoryType === 'dishType' || currentUpdateCategoryType === 'dishType') {
            setDeleteCategoryOptions(dishTypes);
            setUpdateCategoryOptions(dishTypes);
        }
    }, [courseTypes, cuisines, dietaryRestrictions, dishTypes]);

    // Event listeners
    function onKeyUpDialog(event: React.KeyboardEvent) {
        if (event.key === 'Escape') {
            closeDialog(editType);
        }
    }

    function onChangeDeleteCategory(event: React.ChangeEvent<HTMLSelectElement>) {
        if (!event.target) return;
        const select = event.target as HTMLSelectElement;

        if (select.value === 'courseType') {
            setCurrentDeleteCategoryType('courseType');
            setDeleteCategoryOptions(courseTypes);
        } else if (select.value === 'cuisine') {
            setCurrentDeleteCategoryType('cuisine');
            setDeleteCategoryOptions(cuisines);
        } else if (select.value === 'dietaryRestriction') {
            setCurrentDeleteCategoryType('dietaryRestriction');
            setDeleteCategoryOptions(dietaryRestrictions);
        } else if (select.value === 'dishType') {
            setCurrentDeleteCategoryType('dishType');
            setDeleteCategoryOptions(dishTypes);
        }
    }

    function onChangeUpdateCategory(event: React.ChangeEvent<HTMLSelectElement>) {
        if (!event.target) return;
        const select = event.target as HTMLSelectElement;

        if (select.value === 'courseType') {
            setCurrentUpdateCategoryType('courseType');
            setUpdateCategoryOptions(courseTypes);
        } else if (select.value === 'cuisine') {
            setCurrentUpdateCategoryType('cuisine');
            setUpdateCategoryOptions(cuisines);
        } else if (select.value === 'dietaryRestriction') {
            setCurrentUpdateCategoryType('dietaryRestriction');
            setUpdateCategoryOptions(dietaryRestrictions);
        } else if (select.value === 'dishType') {
            setCurrentUpdateCategoryType('dishType');
            setUpdateCategoryOptions(dishTypes);
        }
    }

    function onChangeUpdateCategoryName(event: React.ChangeEvent<HTMLSelectElement>) {
        if (!event.target) return;
        if (!categoryUpdateNameRef.current) return;

        const select = event.target as HTMLSelectElement;
        const inputName = categoryUpdateNameRef.current as HTMLInputElement;

        let selectedCategory;

        if (currentUpdateCategoryType === 'courseType') {
            selectedCategory = courseTypes.find(category => category.id === parseInt(select.value));
        } else if (currentUpdateCategoryType === 'cuisine') {
            selectedCategory = cuisines.find(category => category.id === parseInt(select.value));
        } else if (currentUpdateCategoryType === 'dietaryRestriction') {
            selectedCategory = dietaryRestrictions.find(category => category.id === parseInt(select.value));
        } else if (currentUpdateCategoryType === 'dishType') {
            selectedCategory = dishTypes.find(category => category.id === parseInt(select.value));
        }

        if (selectedCategory) {
            inputName.value = selectedCategory.name;
        }
    }

    function onChangeUpdateQuantityFractionValues(event: React.ChangeEvent<HTMLSelectElement>) {
        if (!event.target) return;
        if (!quantityFractionUpdateNameRef.current) return;
        if (!quantityFractionUpdateValueRef.current) return;

        const select = event.target as HTMLSelectElement;
        const inputName = quantityFractionUpdateNameRef.current as HTMLInputElement;
        const inputValue = quantityFractionUpdateValueRef.current as HTMLInputElement;

        const selectedQuantityFraction = quantityFractions.find(quantityFraction => quantityFraction.id === parseInt(select.value));

        if (selectedQuantityFraction) {
            inputName.value = selectedQuantityFraction.name;
            inputValue.value = selectedQuantityFraction.value.toString();
        }
    }

    function onChangeUpdateServingUnitNames(event: React.ChangeEvent<HTMLSelectElement>) {
        if (!event.target) return;
        if (!servingUnitUpdateNameRef.current) return;
        if (!servingUnitUpdateNamePluralRef.current) return;

        const select = event.target as HTMLSelectElement;
        const inputName = servingUnitUpdateNameRef.current as HTMLInputElement;
        const inputNamePlural = servingUnitUpdateNamePluralRef.current as HTMLInputElement;

        const selectedServingUnit = servingUnits.find(servingUnit => servingUnit.id === parseInt(select.value));

        if (selectedServingUnit) {
            inputName.value = selectedServingUnit.name;
            inputNamePlural.value = selectedServingUnit.namePlural;
        }
    }

    function onSubmitAddCategory(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;
        setFormFeedback('');

        const formElement = (event.target as HTMLFormElement);
        const formData = new FormData(formElement);

        const formDataCategory = formData.get('add-category-type');
        const categoryValidated: Category | undefined = (formDataCategory) ? formDataCategory as Category : undefined;
        if (!categoryValidated || !categoryTables.includes(categoryValidated)) {
            setFormFeedback(`Form error: Category value must be any of these values: "${categoryTables.join('", "')}". The value was "${categoryValidated}".`);
            return;
        }

        const formDataName = formData.get('add-name');
        const nameValidated = (formDataName) ? formDataName.toString() : undefined;
        if (!nameValidated) {
            setFormFeedback('Form error: \'Name\' value must be a string.');
            return;
        }

        const queryString = `/api/category?category=${categoryValidated}&name=${nameValidated}`;

        try {
            fetch(queryString, {
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

                    setFormFeedback(`Form success: New '${categoryValidated}' created (name: '${nameValidated}').`);
                    dataChange(editType);
                });
        } catch (error) {
            setFormFeedback('Form error: Please try again.');
        }
    }

    function onSubmitAddIngredientUnit(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;
        setFormFeedback('');

        const formElement = (event.target as HTMLFormElement);
        const formData = new FormData(formElement);

        const formDataName = formData.get('add-name');
        const nameValidated = (formDataName) ? formDataName.toString() : undefined;
        if (!nameValidated) {
            return setFormFeedback('Form error: \'Name\' value must be a string.');
            
        }

        const formDataNameAbbr = formData.get('add-name-abbr');
        const nameAbbrValidated = (formDataNameAbbr) ? formDataNameAbbr.toString() : undefined;
        if (!nameAbbrValidated) {
            return setFormFeedback('Form error: \'Name (abbreviated)\' value must be a string.');
        }

        const formDataNamePlural = formData.get('add-name-abbr');
        const namePluralValidated = (formDataNamePlural) ? formDataNamePlural.toString() : undefined;
        if (!namePluralValidated) {
            return setFormFeedback('Form error: \'Name (plural)\' value must be a string.');
        }

        const queryString = `/api/ingredient-unit?name=${nameValidated}&nameAbbr=${nameAbbrValidated}&namePlural=${namePluralValidated}`;

        try {
            fetch(queryString, {
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

                    setFormFeedback(`Form success: New 'ingredient unit' created (name: "${nameValidated}", nameAbbr: "${nameAbbrValidated}", namePlural: "${namePluralValidated}").`);
                    dataChange(editType);
                });
        } catch (error) {
            setFormFeedback('Form error: Please try again.');
        }
    }

    function onSubmitAddQuantityFraction(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;
        setFormFeedback('');

        const formElement = (event.target as HTMLFormElement);
        const formData = new FormData(formElement);

        const formDataName = formData.get('add-name');
        const nameValidated = (formDataName) ? formDataName.toString() : undefined;
        if (!nameValidated) {
            return setFormFeedback('Form error: \'Name\' value must be a string.');
            
        }

        const formDataValue = formData.get('add-value');
        const valueValidated = (formDataValue) ? formDataValue.toString() : undefined;
        if (!valueValidated) {
            return setFormFeedback('Form error: \'Value\' value must be a number (can be a decimal).');
        }

        const queryString = `/api/quantity-fraction?name=${nameValidated}&value=${valueValidated}`;

        try {
            fetch(queryString, {
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

                    setFormFeedback(`Form success: New 'quantity fraction' created (name: "${nameValidated}", value: "${formDataValue}").`);
                    dataChange(editType);
                });
        } catch (error) {
            setFormFeedback('Form error: Please try again.');
        }
    }

    function onSubmitAddServingUnit(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;
        setFormFeedback('');

        const formElement = (event.target as HTMLFormElement);
        const formData = new FormData(formElement);

        const formDataName = formData.get('add-name');
        const nameValidated = (formDataName) ? formDataName.toString() : undefined;
        if (!nameValidated) {
            setFormFeedback('Form error: \'Name\' value must be a string.');
            return;
        }

        const formDataNamePlural = formData.get('add-name-plural');
        const namePluralValidated = (formDataNamePlural) ? formDataNamePlural.toString() : undefined;
        if (!namePluralValidated) {
            setFormFeedback('Form error: \'Name (when plural)\' value must be a string.');
            return;
        }

        const queryString = `/api/serving-unit?name=${nameValidated}&namePlural=${namePluralValidated}`;

        try {
            fetch(queryString, {
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

                    setFormFeedback(`Form success: New 'serving unit' created (name: "${nameValidated}", namePlural: "${namePluralValidated}").`);
                    dataChange(editType);
                });
        } catch (error) {
            setFormFeedback('Form error: Please try again.');
        }
    }

    function onSubmitDeleteCategory(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;
        setFormFeedback('');

        const formElement = (event.target as HTMLFormElement);
        const formData = new FormData(formElement);

        const formDataCategory = formData.get('delete-category');
        const categoryValidated: Category | undefined = (formDataCategory) ? formDataCategory as Category : undefined;
        if (!categoryValidated || !categoryTables.includes(categoryValidated)) {
            setFormFeedback(`Form error: Category value must be any of these values: "${categoryTables.join('", "')}". The value was "${categoryValidated}".`);
            return;
        }

        const formDataId = formData.get('delete-id');
        const idValidated = (formDataId && !isNaN(parseInt(formDataId as string))) ? formDataId : undefined;
        if (!idValidated) {
            setFormFeedback('Form error: \'Id\' value must be a number.');
            return;
        }

        const queryString = `/api/category?category=${categoryValidated}&id=${idValidated}`;

        try {
            fetch(queryString, {
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

                    setFormFeedback(`Form success: '${categoryValidated}' deleted (name: "${data.name}").`);
                    dataChange(editType);
                });
        } catch (error) {
            setFormFeedback('Form error: Please try again.');
        }
    }

    function onSubmitDeleteIngredientUnit(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;
        setFormFeedback('');

        const formElement = (event.target as HTMLFormElement);
        const formData = new FormData(formElement);

        const formDataId = formData.get('delete-id');
        const idValidated = (formDataId && !isNaN(parseInt(formDataId as string))) ? formDataId : undefined;
        if (!idValidated) {
            return setFormFeedback('Form error: \'Id\' value must be a number.');
        }

        const queryString = `/api/ingredient-unit?id=${idValidated}`;

        try {
            fetch(queryString, {
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

                    setFormFeedback(`Form success: 'ingredient unit' deleted (name: "${data.name}").`);
                    dataChange(editType);
                });
        } catch (error) {
            setFormFeedback('Form error: Please try again.');
        }
    }

    function onSubmitDeleteQuantityFraction(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;
        setFormFeedback('');

        const formElement = (event.target as HTMLFormElement);
        const formData = new FormData(formElement);

        const formDataId = formData.get('delete-id');
        const idValidated = (formDataId && !isNaN(parseInt(formDataId as string))) ? formDataId : undefined;
        if (!idValidated) {
            return setFormFeedback('Form error: \'Id\' value must be a number.');
        }

        const queryString = `/api/quantity-fraction?id=${idValidated}`;

        try {
            fetch(queryString, {
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

                    setFormFeedback(`Form success: 'quantity fraction' deleted (name: "${data.name}").`);
                    dataChange(editType);
                });
        } catch (error) {
            setFormFeedback('Form error: Please try again.');
        }
    }

    function onSubmitDeleteServingUnit(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;
        setFormFeedback('');

        const formElement = (event.target as HTMLFormElement);
        const formData = new FormData(formElement);

        const formDataId = formData.get('delete-id');
        const idValidated = (formDataId && !isNaN(parseInt(formDataId as string))) ? formDataId : undefined;
        if (!idValidated) {
            setFormFeedback('Form error: \'Id\' value must be a number.');
            return;
        }

        const queryString = `/api/serving-unit?id=${idValidated}`;

        try {
            fetch(queryString, {
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

                    setFormFeedback(`Form success: 'serving unit' deleted (name: "${data.name}").`);
                    dataChange(editType);
                });
        } catch (error) {
            setFormFeedback('Form error: Please try again.');
        }
    }

    function onSubmitUpdateCategory(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;
        setFormFeedback('');

        const formElement = (event.target as HTMLFormElement);
        const formData = new FormData(formElement);

        const formDataCategory = formData.get('update-category');
        const categoryValidated: Category | undefined = (formDataCategory) ? formDataCategory as Category : undefined;
        if (!categoryValidated || !categoryTables.includes(categoryValidated)) {
            setFormFeedback(`Form error: Category value must be any of these values: "${categoryTables.join('", "')}". The value was "${categoryValidated}".`);
            return;
        }

        const formDataId = formData.get('update-id');
        const idValidated = (formDataId && !isNaN(parseInt(formDataId as string))) ? formDataId : undefined;
        if (!idValidated) {
            setFormFeedback('Form error: \'Id\' value must be a number.');
            return;
        }

        const formDataName = formData.get('update-name');
        const nameValidated = (formDataName) ? formDataName.toString() : undefined;
        if (!nameValidated) {
            setFormFeedback('Form error: \'Name\' value must be a string.');
            return;
        }

        const queryString = `/api/category?category=${categoryValidated}&id=${idValidated}&name=${nameValidated}`;

        try {
            fetch(queryString, {
                method: 'PUT',
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

                    setFormFeedback(`Form success: '${categoryValidated}' updated (name: '${data.name}').`);
                    dataChange(editType);
                });
        } catch (error) {
            setFormFeedback('Form error: Please try again.');
        }
    }

    function onSubmitUpdateIngredientUnit(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;
        setFormFeedback('');

        const formElement = (event.target as HTMLFormElement);
        const formData = new FormData(formElement);

        const formDataId = formData.get('update-id');
        const idValidated = (formDataId && !isNaN(parseInt(formDataId as string))) ? formDataId : undefined;
        if (!idValidated) {
            setFormFeedback('Form error: \'Id\' value must be a number.');
            return;
        }

        const formDataName = formData.get('update-name');
        const nameValidated = (formDataName) ? formDataName.toString() : undefined;
        if (!nameValidated) {
            setFormFeedback('Form error: \'Name\' value must be a string.');
            return;
        }

        const formDataNameAbbr = formData.get('update-name-abbr');
        const nameAbbrValidated = (formDataNameAbbr) ? formDataNameAbbr.toString() : undefined;
        if (!nameAbbrValidated) {
            setFormFeedback('Form error: \'Name (abbreviated)\' value must be a string.');
            return;
        }

        const formDataNamePlural = formData.get('update-name-plural');
        const namePluralValidated = (formDataNamePlural) ? formDataNamePlural.toString() : undefined;
        if (!namePluralValidated) {
            setFormFeedback('Form error: \'Name (plural)\' value must be a string.');
            return;
        }

        const queryString = `/api/ingredient-unit?id=${idValidated}&name=${nameValidated}&nameAbbr=${nameAbbrValidated}&namePlural=${namePluralValidated}`;

        try {
            fetch(queryString, {
                method: 'PUT',
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

                    setFormFeedback(`Form success: 'ingredient unit' updated (name: '${data.name}', nameAbbr: '${data.nameAbbr}', namePlural: '${data.namePlural}').`);
                    dataChange(editType);
                });
        } catch (error) {
            setFormFeedback('Form error: Please try again.');
        }
    }

    function onSubmitUpdateQuantityFraction(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;
        setFormFeedback('');

        const formElement = (event.target as HTMLFormElement);
        const formData = new FormData(formElement);

        const formDataId = formData.get('update-id');
        const idValidated = (formDataId && !isNaN(parseInt(formDataId as string))) ? formDataId : undefined;
        if (!idValidated) {
            return setFormFeedback('Form error: \'Id\' value must be a number.');
        }

        const formDataName = formData.get('update-name');
        const nameValidated = (formDataName) ? formDataName.toString() : undefined;
        if (!nameValidated) {
            return setFormFeedback('Form error: \'Name\' value must be a string.');
            
        }

        const formDataValue = formData.get('update-value');
        const valueValidated = (formDataValue) ? formDataValue.toString() : undefined;
        if (!valueValidated) {
            return setFormFeedback('Form error: \'Value\' value must be a number (can be a decimal).');
        }

        const queryString = `/api/quantity-fraction?id=${idValidated}&name=${nameValidated}&value=${valueValidated}`;

        try {
            fetch(queryString, {
                method: 'PUT',
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

                    setFormFeedback(`Form success: 'quantity fraction' updated (name: '${data.name}', value: '${data.value}').`);
                    dataChange(editType);
                });
        } catch (error) {
            setFormFeedback('Form error: Please try again.');
        }
    }

    function onSubmitUpdateServingUnit(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;
        setFormFeedback('');

        const formElement = (event.target as HTMLFormElement);
        const formData = new FormData(formElement);

        const formDataId = formData.get('update-id');
        const idValidated = (formDataId && !isNaN(parseInt(formDataId as string))) ? formDataId : undefined;
        if (!idValidated) {
            setFormFeedback('Form error: \'Id\' value must be a number.');
            return;
        }

        const formDataName = formData.get('update-name');
        const nameValidated = (formDataName) ? formDataName.toString() : undefined;
        if (!nameValidated) {
            setFormFeedback('Form error: \'Name\' value must be a string.');
            return;
        }

        const formDataNamePlural = formData.get('update-name-plural');
        const namePluralValidated = (formDataNamePlural) ? formDataNamePlural.toString() : undefined;
        if (!namePluralValidated) {
            setFormFeedback('Form error: \'Name (when plural)\' value must be a string.');
            return;
        }

        const queryString = `/api/serving-unit?id=${idValidated}&name=${nameValidated}&namePlural=${namePluralValidated}`;

        try {
            fetch(queryString, {
                method: 'PUT',
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

                    setFormFeedback(`Form success: 'serving unit' updated (name: '${data.name}', namePlural: '${data.namePlural}').`);
                    dataChange(editType);
                });
        } catch (error) {
            setFormFeedback('Form error: Please try again.');
        }
    }

    // Renderers
    function renderBody() {
        if (editType === 'categories') {
            return (
                <>
                    <details>
                        <summary>Add</summary>

                        <form onSubmit={onSubmitAddCategory}>
                            <InputGroup
                                input={<select id='add-category-type' name='add-category-type' required>
                                    <option value=''>-- Select a category type --</option>
                                    {categoryTables.map((category) => {
                                        return <option key={`add-category-type-${category}`} value={category}>
                                            {category}
                                        </option>;
                                    })}
                                </select>}
                                label={<label htmlFor='add-category-type'>Type</label>}
                            />

                            <InputGroup
                                input={<input id='add-name' name='add-name' required type='text' />}
                                label={<label htmlFor='add-name'>Name</label>}
                            />

                            <div>
                                <input type='submit' value='Add category' />
                            </div>

                            <hr />
                        </form>
                    </details>

                    <details>
                        <summary>Delete</summary>

                        <form onSubmit={onSubmitDeleteCategory}>
                            <InputGroup
                                input={<select id='delete-category' onChange={onChangeDeleteCategory} name='delete-category' required>
                                    {categoryTables.map((category) => {
                                        return <option key={`delete-category-${category}`} value={category}>
                                            {category}
                                        </option>;
                                    })}
                                </select>}
                                label={<label htmlFor='delete-category'>Type</label>}
                            />

                            <InputGroup
                                input={<select id='delete-id' name='delete-id' required>
                                    <option value=''>Select a category</option>
                                    {deleteCategoryOptions.map((category) => {
                                        return <option key={`delete-id-${category.name}`} value={category.id}>
                                            {category.name}
                                        </option>;
                                    })}
                                </select>}
                                label={<label htmlFor='delete-id'>Category</label>}
                            />

                            <div>
                                <input type='submit' value='Delete category' />
                            </div>

                            <hr />
                        </form>
                    </details>

                    <details>
                        <summary>Update</summary>

                        <form onSubmit={onSubmitUpdateCategory}>
                            <InputGroup
                                input={<select id='update-category' onChange={onChangeUpdateCategory} name='update-category' required>
                                    {categoryTables.map((category) => {
                                        return <option key={`update-category-${category}`} value={category}>
                                            {category}
                                        </option>;
                                    })}
                                </select>}
                                label={<label htmlFor='update-category'>Type</label>}
                            />

                            <InputGroup
                                input={<select id='update-id' name='update-id' onChange={onChangeUpdateCategoryName} required>
                                    <option value=''>-- Select a category --</option>
                                    {updateCategoryOptions.map((category) => {
                                        return <option key={`update-id-${category.name}`} value={category.id}>
                                            {category.name}
                                        </option>;
                                    })}
                                </select>}
                                label={<label htmlFor='update-id'>Category</label>}
                            />

                            <InputGroup
                                input={<input id='update-name' name='update-name' ref={categoryUpdateNameRef} required type='text' />}
                                label={<label htmlFor='update-name'>Name</label>}
                            />

                            <div>
                                <input type='submit' value='Update category' />
                            </div>
                        </form>
                    </details>
                </>
            );
        } else if (editType === 'ingredient units') {
            return (
                <>
                    <details>
                        <summary>Add</summary>

                        <form onSubmit={onSubmitAddIngredientUnit}>
                            <InputGroup
                                input={<input id='add-name' name='add-name' required type='text' />}
                                label={<label htmlFor='add-name'>Name</label>}
                            />

                            <InputGroup
                                input={<input id='add-name-abbr' name='add-name-abbr' required type='text' />}
                                label={<label htmlFor='add-name-abbr'>Name (abbreviated)</label>}
                            />

                            <InputGroup
                                input={<input id='add-name-plural' name='add-name-plural' required type='text' />}
                                label={<label htmlFor='add-name-plural'>Name (plural)</label>}
                            />

                            <div>
                                <input type='submit' value='Add ingredient unit' />
                            </div>

                            <hr />
                        </form>
                    </details>

                    <details>
                        <summary>Delete</summary>

                        <form onSubmit={onSubmitDeleteIngredientUnit}>
                            <InputGroup
                                input={<select id='delete-id' name='delete-id' required>
                                    <option value=''>-- Select an ingredient unit --</option>
                                    {ingredientUnits.map((ingredientUnit) => {
                                        return <option key={`delete-id-${ingredientUnit.id}`} value={ingredientUnit.id}>
                                            {ingredientUnit.name}
                                        </option>;
                                    })}
                                </select>}
                                label={<label htmlFor='delete-id'>Name</label>}
                            />

                            <div>
                                <input type='submit' value='Delete quantity fraction' />
                            </div>

                            <hr />
                        </form>
                    </details>

                    <details>
                        <summary>Update</summary>

                        <form onSubmit={onSubmitUpdateIngredientUnit}>
                            <InputGroup
                                input={<select id='update-id' name='update-id' required>
                                    <option value=''>-- Select an ingredient unit --</option>
                                    {ingredientUnits.map((ingredientUnit) => {
                                        return <option key={`update-id-${ingredientUnit.id}`} value={ingredientUnit.id}>
                                            {ingredientUnit.name}
                                        </option>;
                                    })}
                                </select>}
                                label={<label htmlFor='update-id'>Ingredient unit</label>}
                            />

                            <InputGroup
                                input={<input id='update-name' name='update-name' required type='text' />}
                                label={<label htmlFor='update-name'>Name</label>}
                            />

                            <InputGroup
                                input={<input id='update-name-abbr' name='update-name-abbr' required type='text' />}
                                label={<label htmlFor='update-name-abbr'>Name (abbreviated)</label>}
                            />

                            <InputGroup
                                input={<input id='update-name-plural' name='update-name-plural' required type='text' />}
                                label={<label htmlFor='update-name-plural'>Name (plural)</label>}
                            />

                            <div>
                                <input type='submit' value='Update serving unit' />
                            </div>
                        </form>
                    </details>
                </>
            );
        } else if (editType === 'quantity fractions') {
            return (
                <>
                    <details>
                        <summary>Add</summary>

                        <form onSubmit={onSubmitAddQuantityFraction}>
                            <InputGroup
                                input={<input id='add-name' name='add-name' required type='text' />}
                                label={<label htmlFor='add-name'>Name</label>}
                            />

                            <InputGroup
                                input={<input id='add-value' inputMode='decimal' name='add-value' required step='0.001' type='number' />}
                                label={<label htmlFor='add-value'>Value</label>}
                            />

                            <div>
                                <input type='submit' value='Add quantity fraction' />
                            </div>

                            <hr />
                        </form>
                    </details>

                    <details>
                        <summary>Delete</summary>

                        <form onSubmit={onSubmitDeleteQuantityFraction}>
                            <InputGroup
                                input={<select id='delete-id' name='delete-id' required>
                                    <option value=''>-- Select a quantity fraction --</option>
                                    {quantityFractions.map((quantityFraction) => {
                                        return <option key={`delete-id-${quantityFraction.id}`} value={quantityFraction.id}>
                                            {quantityFraction.name}
                                        </option>;
                                    })}
                                </select>}
                                label={<label htmlFor='delete-id'>Quantity fraction</label>}
                            />

                            <div>
                                <input type='submit' value='Delete quantity fraction' />
                            </div>

                            <hr />
                        </form>
                    </details>

                    <details>
                        <summary>Update</summary>

                        <form onSubmit={onSubmitUpdateQuantityFraction}>
                            <InputGroup
                                input={<select id='update-id' name='update-id' onChange={onChangeUpdateQuantityFractionValues} required>
                                    <option value=''>-- Select a quantity fraction --</option>
                                    {quantityFractions.map((quantityFraction) => {
                                        return <option key={`update-id-${quantityFraction.id}`} value={quantityFraction.id}>
                                            {quantityFraction.name}
                                        </option>;
                                    })}
                                </select>}
                                label={<label htmlFor='update-id'>Quantity fraction</label>}
                            />

                            <InputGroup
                                input={<input id='update-name' name='update-name' ref={quantityFractionUpdateNameRef} required type='text' />}
                                label={<label htmlFor='update-name'>Name</label>}
                            />

                            <InputGroup
                                input={<input id='update-value' inputMode='decimal' name='update-value' ref={quantityFractionUpdateValueRef} required step='0.001' type='number' />}
                                label={<label htmlFor='update-value'>Value</label>}
                            />

                            <div>
                                <input type='submit' value='Update quantity fraction' />
                            </div>
                        </form>
                    </details>
                </>
            );
        } else if (editType === 'serving units') {
            return (
                <>
                    <details>
                        <summary>Add</summary>

                        <form onSubmit={onSubmitAddServingUnit}>
                            <InputGroup
                                input={<input id='add-name' name='add-name' required type='text' />}
                                label={<label htmlFor='add-name'>Name</label>}
                            />

                            <InputGroup
                                input={<input id='add-name-plural' name='add-name-plural' required type='text' />}
                                label={<label htmlFor='add-name-plural'>Name (plural)</label>}
                            />

                            <div>
                                <input type='submit' value='Add serving unit' />
                            </div>

                            <hr />
                        </form>
                    </details>

                    <details>
                        <summary>Delete</summary>

                        <form onSubmit={onSubmitDeleteServingUnit}>
                            <InputGroup
                                input={<select id='delete-id' name='delete-id'>
                                    <option value=''>-- Select a serving unit --</option>
                                    {servingUnits.map((servingUnit) => {
                                        return <option key={`delete-id-${servingUnit.id}`} value={servingUnit.id}>
                                            {servingUnit.name}
                                        </option>;
                                    })}
                                </select>}
                                label={<label htmlFor='delete-id'>Serving unit</label>}
                            />

                            <div>
                                <input type='submit' value='Delete serving unit' />
                            </div>
                        </form>
                    </details>

                    <details>
                        <summary>Update</summary>

                        <form onSubmit={onSubmitUpdateServingUnit}>
                            <InputGroup
                                input={<select id='update-id' onChange={onChangeUpdateServingUnitNames} name='update-id'>
                                    <option value=''>-- Select a course type --</option>
                                    {servingUnits.map((servingUnit) => {
                                        return <option key={`update-id-${servingUnit.id}`} value={servingUnit.id}>
                                            {servingUnit.name}
                                        </option>;
                                    })}
                                </select>}
                                label={<label htmlFor='update-id'>Serving unit</label>}
                            />

                            <InputGroup
                                input={<input id='update-name' name='update-name' ref={servingUnitUpdateNameRef} required type='text' />}
                                label={<label htmlFor='update-name'>Name</label>}
                            />

                            <InputGroup
                                input={<input id='update-name-plural' name='update-name-plural' ref={servingUnitUpdateNamePluralRef} required type='text' />}
                                label={<label htmlFor='update-name-plural'>Name (plural)</label>}
                            />

                            <div>
                                <input type='submit' value='Update serving unit' />
                            </div>
                        </form>
                    </details>
                </>
            );
        } else {
            return <></>;
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.background}></div>
            <div
                aria-modal='true'
                aria-labelledby='dialog-header'
                className={styles.dialog}
                onKeyUp={onKeyUpDialog}
                role='dialog'
            >
                <div className={styles.header}>
                    <h2 id='dialog-header' ref={headerRef} tabIndex={-1}>Edit {editType}</h2>
                    <button aria-label='Close dialog' className='icon-only' onClick={() => closeDialog(editType)}>
                        <Icon ariaHidden={true} Icon={bxX} />
                    </button>
                </div>
                <div className={styles.body}>
                    {renderBody()}
                    {formFeedback.length > 0 &&
                        <p aria-live='assertive'>{formFeedback}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default EditDataDialog;
