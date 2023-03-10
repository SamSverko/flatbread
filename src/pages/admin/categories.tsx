import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth/next';
import * as React from 'react';

import AdminNavCard from '../../components/admin-nav-card';
import Card from '../../components/card';
import InputGroup from '../../components/input-group';

import authOptions from '../api/auth/[...nextauth]';
import { prisma } from '../../prisma/db';
import { categoryTables, getCategoryFormat } from '../../prisma/utils';

import styles from '../../styles/admin.module.scss';

import type { CourseType, Cuisine, DietaryRestriction, DishType } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import type { Category } from '../../types';

type AdminCategoriesProps = {
    courseTypes: CourseType[];
    cuisines: Cuisine[];
    dietaryRestrictions: DietaryRestriction[];
    dishTypes: DishType[];
}

const AdminCategories: NextPage<AdminCategoriesProps> = ({
    courseTypes,
    cuisines,
    dietaryRestrictions,
    dishTypes,
}: AdminCategoriesProps) => {
    // Hooks
    const router = useRouter();

    // States
    const [formAddFeedback, setFormAddFeedback] = React.useState('');
    const [formDeleteCategorySelection, setFormDeleteCategorySelection] = React.useState('courseType');
    const [formDeleteFeedback, setFormDeleteFeedback] = React.useState('');
    const [submitAdd, setSubmitAdd] = React.useState(false);
    const [submitDelete, setSubmitDelete] = React.useState(false);

    // Event listeners
    function handleAddCategoryOnSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;

        const formElement = (event.target as HTMLFormElement);
        const formData = new FormData(formElement);

        const formDataName = formData.get('category-add-name');
        const nameValidated = (formDataName) ? formDataName.toString() : undefined;
        if (!nameValidated) {
            setFormAddFeedback('Form error: Name value must be a string.');
            return;
        }

        const formDataCategory = formData.get('category-add');
        const categoryValidated: Category | undefined = (formDataCategory) ? formDataCategory as Category : undefined;
        if (!categoryValidated || !categoryTables.includes(categoryValidated)) {
            setFormAddFeedback(`Form error: Category value must be any of these values: "${categoryTables.join('", "')}". The value was "${categoryValidated}".`);
            return;
        }

        setFormAddFeedback('');

        const queryString = `/api/category?category=${categoryValidated}&name=${nameValidated}`;

        try {
            fetch(queryString, {
                method: 'POST',
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        setFormAddFeedback(`Form error: ${data.error}`);
                        return;
                    }

                    if (data.code) {
                        setFormAddFeedback(`Form error: ${data.code}: ${data.message}`);
                        return;
                    }

                    setFormAddFeedback(`Form success: New ${categoryValidated} created (name: "${nameValidated}"). The page will now refresh with the latest data.`);
                    setSubmitAdd(true);
                    window.setTimeout(() => {
                        router.reload();
                    }, 2000);
                });
        } catch (error) {
            setFormAddFeedback('Form error: Please try again.');
        }
    }

    function handleDeleteCategoryOnChange(event: React.FormEvent) {
        if (!event.target) return;

        const selectElement = (event.target as HTMLSelectElement);
        setFormDeleteCategorySelection(selectElement.value);
    }

    function handleDeleteOnSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;

        const formElement = (event.target as HTMLFormElement);
        const formData = new FormData(formElement);

        const formDataCategory = formData.get('category-delete');
        const categoryValidated: Category | undefined = (formDataCategory) ? formDataCategory as Category : undefined;
        if (!categoryValidated || !categoryTables.includes(categoryValidated)) {
            setFormDeleteFeedback(`Form error: Category value must be any of these values: "${categoryTables.join('", "')}". The value was "${categoryValidated}".`);
            return;
        }

        const formDataCategoryId = formData.get('category-id-delete');
        const categoryIdValidated = (formDataCategoryId && !isNaN(parseInt(formDataCategoryId as string))) ? formDataCategoryId : undefined;
        if (!categoryIdValidated) {
            setFormDeleteFeedback('Form error: Id value must be a number.');
            return;
        }

        setFormDeleteFeedback('');

        const queryString = `/api/category?category=${categoryValidated}&id=${categoryIdValidated}`;

        try {
            fetch(queryString, {
                method: 'DELETE',
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        setFormDeleteFeedback(`Form error: ${data.error}`);
                        return;
                    }

                    if (data.code) {
                        setFormDeleteFeedback(`Form error: ${data.code}: ${data.message}`);
                        return;
                    }

                    setFormDeleteFeedback(`Form success: ${categoryValidated} deleted (id: "${data.name}"). The page will now refresh with the latest data.`);
                    setSubmitDelete(true);
                    window.setTimeout(() => {
                        router.reload();
                    }, 2000);
                });
        } catch (error) {
            setFormDeleteFeedback('Form error: Please try again.');
        }
    }

    return (
        <>
            <Card>
                <h2>Admin / Categories</h2>
            </Card>

            <AdminNavCard />

            <Card>
                <details>
                    <summary>Add</summary>

                    <form className={styles.form} onSubmit={handleAddCategoryOnSubmit}>
                        <InputGroup
                            input={<select id='category-add' name='category-add'>
                                {categoryTables.map((category) => {
                                    return <option key={`category-add-${category}`} value={category}>
                                        {category}
                                    </option>;
                                })}
                            </select>}
                            label={<label htmlFor='category-add'>Category</label>}
                        />
                        <InputGroup
                            input={<input id='category-add-name' name='category-add-name' required type='text' />}
                            label={<label htmlFor='category-add-name'>Name</label>}
                        />
                        <div>
                            <input disabled={submitAdd} type='submit' value='Add category' />
                        </div>
                        {formAddFeedback.length > 0 &&
                            <p aria-live='assertive'>{formAddFeedback}</p>
                        }
                    </form>

                    <hr />
                </details>

                <details open>
                    <summary>Delete</summary>

                    <form className={styles.form} onSubmit={handleDeleteOnSubmit}>
                        <InputGroup
                            input={<select id='category-delete' onChange={handleDeleteCategoryOnChange} name='category-delete'>
                                {categoryTables.map((category) => {
                                    return <option key={`category-delete-${category}`} value={category}>
                                        {category}
                                    </option>;
                                })}
                            </select>}
                            label={<label htmlFor='category-delete'>Category</label>}
                        />

                        {formDeleteCategorySelection === 'courseType' &&
                            <InputGroup
                                input={<select id='course-type-delete' name='category-id-delete' required>
                                    <option value=''>Select a course type</option>
                                    {courseTypes.map((courseType) => {
                                        return <option key={`course-type-delete-${courseType.name}`} value={courseType.id}>
                                            {courseType.name}
                                        </option>;
                                    })}
                                </select>}
                                label={<label htmlFor='course-type-delete'>Course types</label>}
                            />
                        }
                        {formDeleteCategorySelection === 'cuisine' &&
                            <InputGroup
                                input={<select id='cuisine-delete' name='category-id-delete' required>
                                    <option value=''>Select a cuisine</option>
                                    {cuisines.map((cuisine) => {
                                        return <option key={`cuisine-delete-${cuisine.name}`} value={cuisine.id}>
                                            {cuisine.name}
                                        </option>;
                                    })}
                                </select>}
                                label={<label htmlFor='cuisine-delete'>Cuisine</label>}
                            />
                        }
                        {formDeleteCategorySelection === 'dietaryRestriction' &&
                            <InputGroup
                                input={<select id='dietary-restriction-delete'name='category-id-delete' required>
                                    <option value=''>Select a dietary restriction</option>
                                    {dietaryRestrictions.map((dietaryRestriction) => {
                                        return <option key={`dietary-restriction-delete-${dietaryRestriction.name}`} value={dietaryRestriction.id}>
                                            {dietaryRestriction.name}
                                        </option>;
                                    })}
                                </select>}
                                label={<label htmlFor='dietary-restriction-delete'>Dietary restriction</label>}
                            />
                        }
                        {formDeleteCategorySelection === 'dishType' &&
                            <InputGroup
                                input={<select id='dish-type-delete' name='category-id-delete' required>
                                    <option value=''>Select a dish type</option>
                                    {dishTypes.map((dishType) => {
                                        return <option key={`dish-type-delete-${dishType.name}`} value={dishType.id}>
                                            {dishType.name}
                                        </option>;
                                    })}
                                </select>}
                                label={<label htmlFor='dish-type-delete'>Dish type</label>}
                            />
                        }

                        <div>
                            <input disabled={submitDelete} type='submit' value='Delete category' />
                        </div>

                        {formDeleteFeedback.length > 0 &&
                            <p aria-live='assertive'>{formDeleteFeedback}</p>
                        }
                    </form>

                    <hr />
                </details>
            </Card>
        </>
    );
};

export default AdminCategories;

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
            session: session,
        },
    };
};
