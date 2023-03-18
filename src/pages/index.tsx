import { useSession } from 'next-auth/react';
import * as React from 'react';

import Card from '../components/card';
import InputGroup from '../components/input-group';
import PaginationCard from '../components/pagination-card';
import RecipeCard from '../components/recipe-card';

import { prisma } from '../prisma/db';
import { capitalizeFirstLetter, LSKey } from '../utils';
import { getCategoryFormat } from '../prisma/utils';

import styles from '../styles/index.module.scss';

import type { NextPage } from 'next';
import type { PlannedRecipe, RecipeFormatted } from '../types';

type IndexProps = {
    courseTypes: string[];
    cuisines: string[];
    dietaryRestrictions: string[];
    dishTypes: string[];
}

const Index: NextPage<IndexProps> = ({
    courseTypes,
    cuisines,
    dietaryRestrictions,
    dishTypes,
}: IndexProps) => {
    // Hooks
    const { data: session } = useSession();

    // Refs
    const resultsParagraphRef = React.useRef(null);

    // States
    const [currentPaginationPage, setCurrentPaginationPage] = React.useState(0);
    const [plannedRecipes, setPlannedRecipes] = React.useState([]);
    const [recipes, setRecipes] = React.useState([]);
    const [recipesPerPage] = React.useState(5);
    const [savedRecipes, setSavedRecipes] = React.useState([]);
    const [searchStatus, setSearchStatus] = React.useState<'pending' | 'searching' | 'complete'>('pending');

    // Effects
    React.useEffect(() => {
        const localSavedRecipes = localStorage.getItem(LSKey.savedRecipes);
        const localPlannedRecipes = localStorage.getItem(LSKey.plannedRecipes);

        if (localSavedRecipes) {
            setSavedRecipes(JSON.parse(localSavedRecipes));
        }

        if (localPlannedRecipes) {
            setPlannedRecipes(JSON.parse(localPlannedRecipes));
        }
    }, []);

    React.useEffect(() => {
        if (resultsParagraphRef.current) {
            (resultsParagraphRef.current as HTMLParagraphElement).focus();
        }
    }, [currentPaginationPage, searchStatus]);

    // Event listeners
    function handleClearSearchResultsOnClick() {
        setSearchStatus('pending');
        setRecipes([]);
        setCurrentPaginationPage(0);

        const recipeTitleInput = document.querySelector('#input-title');
        if (recipeTitleInput) {
            (recipeTitleInput as HTMLInputElement).focus();
        }
    }

    function handleFormOnSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;

        setSearchStatus('searching');

        const formElement = (event.target as HTMLFormElement);
        const formData = new FormData(formElement);
        
        const formDataTitle = formData.get('title');
        const formDataCourseTypes = formData.getAll('course-types');
        const formDataCuisines = formData.getAll('cuisines');
        const formDataDietaryRestrictions = formData.getAll('dietary-restrictions');
        const formDataDishTypes = formData.getAll('dish-types');
        let submitterName = 'submit-search';

        if (event?.nativeEvent) {
            const submitterElement = (event?.nativeEvent as SubmitEvent).submitter;

            if (submitterElement) {
                const submitterElementName = (submitterElement as HTMLInputElement).name;

                if (submitterElementName) {
                    submitterName = submitterElementName;
                }
            }
        }

        const titleValidated = (formDataTitle) ? formDataTitle.toString() : '';
        const courseTypesValidated = (formDataCourseTypes) ? formDataCourseTypes.join(',') : undefined;
        const cuisinesValidated = (formDataCuisines) ? formDataCuisines.join(',') : undefined;
        const dietaryRestrictionsValidated = (formDataDietaryRestrictions) ? formDataDietaryRestrictions.join(',') : undefined;
        const dishTypesValidated = (formDataDishTypes) ? formDataDishTypes.join(',') : undefined;
        const randomValidated = (submitterName === 'submit-random') ? true : false;

        let queryString = `/api/recipes?title=${titleValidated}`;
        if (courseTypesValidated) queryString += `&courseTypes=${courseTypesValidated}`;
        if (cuisinesValidated) queryString += `&cuisines=${cuisinesValidated}`;
        if (dietaryRestrictionsValidated) queryString += `&dietaryRestrictions=${dietaryRestrictionsValidated}`;
        if (dishTypesValidated) queryString += `&dishTypes=${dishTypesValidated}`;
        if (randomValidated) queryString += '&random=true';

        fetch(queryString)
            .then((response) => response.json())
            .then((data) => {
                setRecipes(data);
                setSearchStatus('complete');
                setCurrentPaginationPage(0);
            });
    }

    // Renderers
    return (
        <>
            <Card>
                <h1>Search</h1>
            </Card>

            <Card>
                <h2>Search for recipes</h2>

                <form className={styles['search-form']} onSubmit={handleFormOnSubmit}>
                    <InputGroup
                        input={<input enterKeyHint='search' id='input-title' inputMode='search' name='title' type='search' />}
                        label={<label htmlFor='input-title'>Title</label>}
                    />

                    <p>All recipes will be returned by&nbsp;default.</p>
                    <p>To refine your search results, select only the categories needed using the <b>Advanced options</b>&nbsp;below.</p>

                    <details>
                        <summary>Advanced options</summary>

                        <div className={styles['advanced-options-content']}>
                            <InputGroup
                                input={<select id='select-course-types' multiple name='course-types'>
                                    {courseTypes.map((courseType) => {
                                        return <option key={`course-type-${courseType}`} value={courseType}>
                                            {capitalizeFirstLetter(courseType)}
                                        </option>;
                                    })}
                                </select>}
                                label={<label htmlFor='select-course-types'>Course types</label>}
                            />
                            <InputGroup
                                input={<select id='select-cuisines' multiple name='cuisines'>
                                    {cuisines.map((cuisine) => {
                                        return <option key={`cuisine-${cuisine}`} value={cuisine}>
                                            {capitalizeFirstLetter(cuisine)}
                                        </option>;
                                    })}
                                </select>}
                                label={<label htmlFor='select-cuisines'>Cuisines</label>}
                            />
                            <InputGroup
                                input={<select id='select-dietary-restrictions' multiple name='dietary-restrictions'>
                                    {dietaryRestrictions.map((dietaryRestriction) => {
                                        return <option key={`dietary-restriction-${dietaryRestriction}`} value={dietaryRestriction}>
                                            {capitalizeFirstLetter(dietaryRestriction)}
                                        </option>;
                                    })}
                                </select>}
                                label={<label htmlFor='select-dietary-restriction-s'>Dietary restrictions</label>}
                            />
                            <InputGroup
                                input={<select id='select-dish-types' multiple name='dish-types'>
                                    {dishTypes.map((dishType) => {
                                        return <option key={`dish-type-${dishType}`} value={dishType}>
                                            {capitalizeFirstLetter(dishType)}
                                        </option>;
                                    })}
                                </select>}
                                label={<label htmlFor='select-dish-types'>Dish types</label>}
                            />
                        </div>
                    </details>

                    <div className={styles['submit-container']}>
                        <input name='submit-search' type='submit' value='Search' />
                        <input className='secondary' name='submit-random' type='submit' value='Random' />
                    </div>
                </form>
            </Card>

            <Card hide={searchStatus !== 'searching'}>
                <h2>Fetching recipes...</h2>
            </Card>

            <Card hide={searchStatus !== 'complete'}>
                <h2>Search results</h2>
                <p
                    className={styles['search-results-paragraph']}
                    ref={resultsParagraphRef}
                    tabIndex={-1}
                >
                    {recipes.length} recipe{recipes.length > 1 ? 's' : ''} found.
                </p>
                <div>
                    <button onClick={handleClearSearchResultsOnClick}>Clear search results</button>
                </div>
            </Card>

            {recipes &&
                (recipes as RecipeFormatted[])
                    .slice(currentPaginationPage * recipesPerPage, (currentPaginationPage * recipesPerPage) + recipesPerPage)
                    .map((recipe, index) => {
                        const isPlanned = (plannedRecipes.findIndex((savedRecipe: PlannedRecipe) => savedRecipe.title === recipe.title) === -1) ? false : true;
                        const isSaved = (savedRecipes.findIndex((savedRecipe: RecipeFormatted) => savedRecipe.slug === recipe.slug) === -1) ? false : true;

                        return <RecipeCard
                            adminViewer={(session) ? true : false}
                            isPlanned={isPlanned}
                            isSaved={isSaved}
                            key={`key-recipe-${recipe.slug}-${index}`}
                            recipe={recipe}
                        />;
                    })
            }

            {recipes.length > recipesPerPage &&
                <PaginationCard
                    currentPage={currentPaginationPage}
                    recipeCount={recipes.length}
                    recipesPerPage={recipesPerPage}
                    setPaginationPage={setCurrentPaginationPage}
                />
            }
        </>
    );
};

export default Index;

export async function getStaticProps() {
    const courseTypes = await prisma.courseType.findMany({
        select: getCategoryFormat(true),
        orderBy: {
            name: 'asc',
        },
    });

    const cuisines = await prisma.cuisine.findMany({
        select: getCategoryFormat(true),
        orderBy: {
            name: 'asc',
        },
    });

    const dietaryRestrictions = await prisma.dietaryRestriction.findMany({
        select: getCategoryFormat(true),
        orderBy: {
            name: 'asc',
        },
    });

    const dishTypes = await prisma.dishType.findMany({
        select: getCategoryFormat(true),
        orderBy: {
            name: 'asc',
        },
    });

    return {
        props: {
            courseTypes: courseTypes.map(courseType => courseType.name),
            dietaryRestrictions: dietaryRestrictions.map(dietaryRestriction => dietaryRestriction.name),
            cuisines: cuisines.map(cuisine => cuisine.name),
            dishTypes: dishTypes.map(dishType => dishType.name),
        },
    };
}
