import { getServerSession } from 'next-auth/next';
import * as React from 'react';

import Card from '../../components/card';
import EditDataDialog from '../../components/edit-data-dialog';
import Icon from '../../components/icon';
import InputGroup from '../../components/input-group';

import authOptions from '../api/auth/[...nextauth]';
import { prisma } from '../../prisma/db';
import { getCategoryFormat, getQuantityFractionFormat, getServingUnitFormat } from '../../prisma/utils';

import bxRuler from '../../../public/icons/bx-ruler.svg';
import bxsEditAlt from '../../../public/icons/bxs-edit-alt.svg';

import styles from '../../styles/admin.module.scss';

import type { CourseType, Cuisine, DietaryRestriction, DishType, QuantityFraction, ServingUnit } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import type { RecipeIngredient } from '../../prisma/types';

type AdminProps = {
    courseTypes: CourseType[];
    cuisines: Cuisine[];
    dietaryRestrictions: DietaryRestriction[];
    dishTypes: DishType[];
    quantityFractions: QuantityFraction[];
    servingUnits: ServingUnit[];
}

const Admin: NextPage<AdminProps> = ({
    courseTypes,
    cuisines,
    dietaryRestrictions,
    dishTypes,
    quantityFractions,
    servingUnits,
}: AdminProps) => {
    // Refs
    const editCategoryButtonRef = React.useRef(null);
    const editFractionsButtonRef = React.useRef(null);
    const editServingsButtonRef = React.useRef(null);

    // States
    const [formFeedback, setFormFeedback] = React.useState('');
    const [showDialog, setShowDialog] = React.useState(false);
    const [editType, setEditType] = React.useState<'categories' | 'quantity fractions' | 'serving units' | ''>('');
    const [localCourseTypes, setLocalCourseTypes] = React.useState(courseTypes);
    const [localCuisines, setLocalCuisines] = React.useState(cuisines);
    const [localDietaryRestrictions, setLocalDietaryRestrictions] = React.useState(dietaryRestrictions);
    const [localDishTypes, setLocalDishTypes] = React.useState(dishTypes);
    const [localQuantityFractions, setLocalQuantityFractions] = React.useState(quantityFractions);
    const [localServingUnits, setLocalServingUnits] = React.useState(servingUnits);
    const [quantityTypeIsSingle, setQuantityTypeIsSingle] = React.useState(true);
    const [recipeIngredients, setRecipeIngredients] = React.useState([]);

    // Event listeners
    function handleEditCategoryOnClick(event: React.MouseEvent<HTMLButtonElement>) {
        if (!event.target) return;

        setEditType('categories');
        setShowDialog(true);
    }

    function handleEditServingUnitOnClick(event: React.MouseEvent<HTMLButtonElement>) {
        if (!event.target) return;

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
        const prepTimeValidated = (prepTimeHoursValidated * 60) + prepTimeMinsValidated;

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
        const cookTimeValidated = (cookTimeHoursValidated * 60) + cookTimeMinsValidated;

        const formDataServingAmount = formData.get('serving-amount');
        const servingAmountValidated = (formDataServingAmount) ? parseInt(formDataServingAmount as string) : undefined;
        if (!servingAmountValidated) {
            return setFormFeedback('Form error: Serving amount value must be a positive whole number.');
        }

        const formDataServingUnit = formData.get('serving-unit');
        const servingUnitValidated = (localServingUnits.map(servingUnit => servingUnit.name).includes(formDataServingUnit as string)) ? formDataServingUnit : undefined;
        if (!servingUnitValidated) {
            return setFormFeedback('Form error: Serving unit value must be an existing serving unit.');
        }

        const formDataCourseTypes = formData.getAll('course-types');
        const courseTypesValidated = (formDataCourseTypes.length > 0) ? formDataCourseTypes.join(',') : undefined;
        if (!courseTypesValidated) {
            return setFormFeedback('Form error: Course types must have at least one selection.');
        }

        const recipeToAdd = {
            title: titleValidated,
            slug: slugValidated,
            sourceName: sourceNameValidated,
            sourceURL: sourceURLValidated,
            prepTimeMin: prepTimeValidated,
            cookTimeMin: cookTimeValidated,
            servingAmount: servingAmountValidated,
            servingUnit: servingUnitValidated,
            courseTypes: courseTypesValidated,
        };

        console.log(recipeToAdd);
    }

    function handleOnClickEditQuantityFractions(event: React.MouseEvent<HTMLButtonElement>) {
        if (!event.target) return;

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
        const ingredientToAdd: RecipeIngredient = {
            name: 'CHANGE ME',
            isOptional: false,
            substitutions: [],
        };

        const formDataSection = formData.get('section');
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
        } else {
            return setFormFeedback('Form error: \'Quantity fraction\' value must be an existing quantity fraction.');
        }

        console.log(ingredientToAdd);
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
    return (
        <>
            <Card>
                <h2>Admin</h2>
            </Card>

            <Card>
                <form className={styles.form} id='add-recipe' onSubmit={handleFormOnSubmit}>
                    <h2>Add new recipe</h2>

                    <p>All fields marked with an asterisk (<b>*</b>) are required.</p>

                    <InputGroup
                        input={<input aria-required='true' id='title' name='title' required type='text' />}
                        label={<label htmlFor='title'>Title *</label>}
                    />

                    <InputGroup
                        input={<input aria-required='true' id='slug' name='slug' required type='text' />}
                        label={<label htmlFor='slug'>Slug *</label>}
                    />

                    <InputGroup
                        input={<input aria-required='true' id='source-name' name='source-name' required type='text' />}
                        label={<label htmlFor='source-name'>Source name *</label>}
                    />

                    <InputGroup
                        input={<input id='source-url' inputMode='url' name='source-url' type='url' />}
                        label={<label htmlFor='source-url'>Source URL</label>}
                    />

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

                    <div className={styles['inline-serving-inputs']}>
                        <InputGroup
                            input={<input aria-required='true' defaultValue={0} id='serving-amount' inputMode='numeric' max={999} min={0} name='serving-amount' step={1} type='number' />}
                            label={<label htmlFor='serving-amount'>Amount *</label>}
                        />

                        <InputGroup
                            input={<select aria-required='true' id='serving-unit' name='serving-unit' required>
                                <option value=''>-- Select a serving unit --</option>
                                {localServingUnits.map((servingUnit) => {
                                    return <option key={`serving-unit-${servingUnit.name}`} value={servingUnit.name}>
                                        {servingUnit.namePlural}
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

                <form className={styles.form} id='add-ingredient' onSubmit={handleOnSubmitAddIngredient}>
                    <p><b>Ingredients</b></p>

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
                                            return <option key={`ingredient-quantity-min-fraction-${quantityFraction.id}`} value={Number(quantityFraction.value.toFixed(3))}>
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
                                            return <option key={`ingredient-quantity-max-fraction-${quantityFraction.id}`} value={Number(quantityFraction.value.toFixed(3))}>
                                                {quantityFraction.name}
                                            </option>;
                                        })}
                                    </select>}
                                    label={<label htmlFor='ingredient-quantity-max-fraction'>Fraction</label>}
                                />
                            </div>
                        </>
                    }

                    <div className={styles['section-submit-alt']}>
                        <div>
                            <input form='add-ingredient' type='submit' value='Add ingredient' />
                        </div>
                    </div>
                </form>

                <>
                    {recipeIngredients.length > 0 &&
                        <ul>
                            {(recipeIngredients as RecipeIngredient[]).map((ingredient, index) => {
                                return (
                                    <li key={`ingredient-${index}`}>{ingredient.name}</li>
                                );
                            })}
                        </ul>
                    }
                </>

                <div className={styles['section-submit']}>
                    <div>
                        <input form='add-recipe' type='submit' value='Submit' />
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
