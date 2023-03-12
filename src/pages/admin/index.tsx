import { getServerSession } from 'next-auth/next';
import * as React from 'react';

import Card from '../../components/card';
import EditDataDialog from '../../components/edit-data-dialog';
import Icon from '../../components/icon';
import InputGroup from '../../components/input-group';

import authOptions from '../api/auth/[...nextauth]';
import { prisma } from '../../prisma/db';
import { getCategoryFormat, getServingUnitFormat } from '../../prisma/utils';

import bxsEditAlt from '../../../public/icons/bxs-edit-alt.svg';

import styles from '../../styles/admin.module.scss';

import type { CourseType, Cuisine, DietaryRestriction, DishType, ServingUnit } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';

type AdminProps = {
    courseTypes: CourseType[];
    cuisines: Cuisine[];
    dietaryRestrictions: DietaryRestriction[];
    dishTypes: DishType[];
    servingUnits: ServingUnit[];
}

const Admin: NextPage<AdminProps> = ({
    courseTypes,
    cuisines,
    dietaryRestrictions,
    dishTypes,
    servingUnits,
}: AdminProps) => {
    // Refs
    const editCategoryButtonRef = React.useRef(null);
    const editServingsButtonRef = React.useRef(null);

    // States
    const [formFeedback, setFormFeedback] = React.useState('');
    const [showDialog, setShowDialog] = React.useState(false);
    const [editType, setEditType] = React.useState<'serving units' | 'categories'>('serving units');
    const [localCourseTypes, setLocalCourseTypes] = React.useState(courseTypes);
    const [localCuisines, setLocalcuisines] = React.useState(cuisines);
    const [localDietaryRestrictions, setLocalDietaryRestrictions] = React.useState(dietaryRestrictions);
    const [localDishTypes, setLocalDishTypes] = React.useState(dishTypes);
    const [localServingUnits, setLocalServingUnits] = React.useState(servingUnits);

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
        const servingUnitValidated = (formDataServingUnit) ? localServingUnits.map(servingUnit => servingUnit.name).includes(formDataServingUnit as string) : undefined;
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

    // Helpers
    function closeDialog(editType: string, changeMade: boolean) {
        setShowDialog(false);

        const button = editServingsButtonRef.current;
        if (button) (button as HTMLButtonElement).focus();

        if (!changeMade) return;

        if (editType === 'serving units') {
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
                <form className={styles.form} onSubmit={handleFormOnSubmit}>
                    <h2>Add new recipe</h2>

                    <InputGroup
                        input={<input id='title' name='title' required type='text' />}
                        label={<label htmlFor='title'>Title</label>}
                    />

                    <InputGroup
                        input={<input id='slug' name='slug' required type='text' />}
                        label={<label htmlFor='slug'>Slug</label>}
                    />

                    <InputGroup
                        input={<input id='source-name' name='source-name' required type='text' />}
                        label={<label htmlFor='source-name'>Source name</label>}
                    />

                    <InputGroup
                        input={<input id='source-url' name='source-url' type='url' />}
                        label={<label htmlFor='source-url'>Source URL</label>}
                    />

                    <p><b>Prep time</b></p>

                    <div className={styles['inline-time-inputs']}>
                        <InputGroup
                            input={<input defaultValue={0} id='prep-time-hours' max={99} min={0} name='prep-time-hours' step={1} type='number' />}
                            label={<label htmlFor='prep-time-hours'>Hours</label>}
                        />

                        <InputGroup
                            input={<input defaultValue={30} id='prep-time-mins' max={59} min={0} name='prep-time-mins' step={1} type='number' />}
                            label={<label htmlFor='prep-time-mins'>Minutes</label>}
                        />
                    </div>

                    <p><b>Cook time</b></p>

                    <div className={styles['inline-time-inputs']}>
                        <InputGroup
                            input={<input defaultValue={0} id='cook-time-hours' max={99} min={0} name='cook-time-hours' step={1} type='number' />}
                            label={<label htmlFor='cook-time-hours'>Hours</label>}
                        />

                        <InputGroup
                            input={<input defaultValue={30} id='cook-time-mins' max={59} min={0} name='cook-time-mins' step={1} type='number' />}
                            label={<label htmlFor='cook-time-mins'>Minutes</label>}
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
                            input={<input defaultValue={0} id='serving-amount' max={999} min={0} name='serving-amount' step={1} type='number' />}
                            label={<label htmlFor='serving-amount'>Amount</label>}
                        />

                        <InputGroup
                            input={<select id='serving-unit' name='serving-unit' required>
                                <option value=''>--Select a serving unit--</option>
                                {localServingUnits.map((servingUnit) => {
                                    return <option key={`serving-unit-${servingUnit.name}`} value={servingUnit.name}>
                                        {servingUnit.namePlural}
                                    </option>;
                                })}
                            </select>}
                            label={<label htmlFor='serving-unit'>Unit</label>}
                        />
                    </div>

                    <div className={styles['section-heading']}>
                        <p><b>Categories</b></p>
                        <button aria-label='Edit categories' className='icon-only' onClick={handleEditCategoryOnClick} ref={editCategoryButtonRef} type='button'>
                            <Icon ariaHidden={true} Icon={bxsEditAlt} />
                        </button>
                    </div>

                    <InputGroup
                        input={<select id='course-types' multiple name='course-types' required>
                            {localCourseTypes.map((courseType) => {
                                return <option key={`course-types-${courseType.name}`} value={courseType.name}>
                                    {courseType.name}
                                </option>;
                            })}
                        </select>}
                        label={<label htmlFor='course-types'>Course types</label>}
                    />

                    <div>
                        <input type='submit' value='Submit' />
                    </div>

                    {formFeedback.length > 0 &&
                        <p aria-live='assertive'>{formFeedback}</p>
                    }
                </form>
            </Card>

            {showDialog &&
                <EditDataDialog
                    closeDialog={closeDialog}
                    editType={editType}
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

    const servingUnits = await prisma.servingUnit.findMany({
        select: getServingUnitFormat(false),
        orderBy: {
            name: 'asc',
        },
    });

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

    return {
        props: {
            servingUnits: (servingUnits as ServingUnit[]).map(servingUnit => {
                return {
                    id: servingUnit.id,
                    name: servingUnit.name,
                    namePlural: servingUnit.namePlural,
                };
            }),
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
            session: session,
        },
    };
};
