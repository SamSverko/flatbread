import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import * as React from 'react';

import Card from '../components/card';
import Icon from '../components/icon';

import { LSKey } from '../utils';

import bxCalendarCheck from '../../public/icons/bx-calendar-check.svg';
import bxLinkExternal from '../../public/icons/bx-link-external.svg';
import bxListCheck from '../../public/icons/bx-list-check.svg';
import bxsHeart from '../../public/icons/bxs-heart.svg';

import styles from '../styles/settings.module.scss';

import type { NextPage } from 'next';
import type { PlannedRecipe, SavedIngredient } from '../types';

const Settings: NextPage = () => {
    // Hooks
    const { data: session } = useSession();

    // States
    const [listItems, setListItems] = React.useState<Array<SavedIngredient>>([]);
    const [plannedRecipes, setPlannedRecipes] = React.useState<Array<PlannedRecipe>>([]);
    const [savedRecipes, setSavedRecipes] = React.useState([]);
    const [searchStatus, setSearchStatus] = React.useState<'pending' | 'searching' | 'complete'>('pending');

    // Effects
    React.useEffect(() => {
        const localListItems = localStorage.getItem(LSKey.shoppingList);
        const localPlannedMeals = localStorage.getItem(LSKey.plannedRecipes);
        const localSavedRecipes = localStorage.getItem(LSKey.savedRecipes);

        if (localListItems) {
            setListItems(JSON.parse(localListItems));
        }

        if (localPlannedMeals) {
            setPlannedRecipes(JSON.parse(localPlannedMeals));
        }

        if (localSavedRecipes) {
            setSavedRecipes(JSON.parse(localSavedRecipes));
        }

        setSearchStatus('complete');
    }, []);

    // Event listeners
    function handleDeleteLocalStorageOnClick() {
        localStorage.removeItem(LSKey.shoppingList);
        setListItems([]);

        localStorage.removeItem(LSKey.plannedRecipes);
        setPlannedRecipes([]);

        localStorage.removeItem(LSKey.savedRecipes);
        setSavedRecipes([]);
    }

    // Renderers
    return (
        <>
            <Card>
                <h2>Settings</h2>
            </Card>

            <Card>
                <div className={styles.section}>
                    <h2>Local Storage</h2>

                    <p>
                        Flatbread uses your browser&apos;s <a href='https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage' rel='noreferrer' target='_blank'>
                            Local Storage
                            <Icon ariaLabel='Open link in new tab' Icon={bxLinkExternal} />
                        </a> to store data for the&nbsp;following:
                    </p>

                    <ul>
                        <li><Icon ariaHidden={true} Icon={bxsHeart} />Saved recipes</li>
                        <li><Icon ariaHidden={true} Icon={bxCalendarCheck} />Meal plan recipes</li>
                        <li><Icon ariaHidden={true} Icon={bxListCheck} />Shopping list items</li>
                    </ul>

                    <p>This data will persist until you clear your browser&apos;s&nbsp;cache.</p>

                    {((searchStatus === 'complete') && (listItems.length > 0 || plannedRecipes.length > 0 || savedRecipes.length > 0)) &&
                        <div className={styles.section}>
                            <p>If you would like to erase all Flatbread <b>Local Storage</b> data, you can use the button&nbsp;below:</p>
                            <div>
                                <button onClick={handleDeleteLocalStorageOnClick}>Delete all Flatbread<br />Local Storage data</button>
                            </div>
                        </div>
                    }
                    {((searchStatus === 'complete') && (listItems.length === 0 && plannedRecipes.length === 0 && savedRecipes.length === 0)) &&
                        <p>No Flatbread <b>Local Storage</b> found!</p>
                    }
                </div>

                <hr />

                <div className={styles.section}>
                    <h2>Support</h2>

                    <p>Questions, comments, found a bug?</p>

                    <a href='https://github.com/SamSverko/flatbread/issues/new/choose' rel='noreferrer' target='_blank'>Let us know! <Icon ariaLabel='Open link in new tab' Icon={bxLinkExternal} /></a>
                </div>

                <hr />

                <div className={styles.section}>
                    <h2>Admin</h2>

                    <p>At this time, only admins can edit recipe data.</p>

                    <div className={styles.buttons}>
                        {!session && <button onClick={() => signIn('github', { callbackUrl: 'http://localhost:3000/admin' })}>Sign in as admin</button>}
                        {session &&
                            <>
                                <Link href='/admin'>Admin page</Link>
                                <button className='secondary' onClick={() => signOut()}>Sign out</button>
                            </>
                        }
                    </div>
                </div>
            </Card>
        </>
    );
};

export default Settings;
