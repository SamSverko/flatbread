import type { NextPage } from 'next';
import Link from 'next/link';
import * as React from 'react';

const Settings: NextPage = () => {
    const [localStorageDeleted, setLocalStorageDeleted] = React.useState(false);

    function handleDeleteLocalStorageClick() {
        localStorage.removeItem('recipes');
        const recipes = localStorage.getItem('recipes');

        if (!recipes) {
            setLocalStorageDeleted(true);
        }
    }

    return (
        <>
            <h1>Settings</h1>

            <h2>Local Storage</h2>

            <p>Flatbread uses your browser&apos;s <Link href='https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage'><a rel='noreferrer' target='_blank'><b>localStorage</b></a></Link> to save recipes locally for faster searches.</p>
            <p>This setup reduces the number of network requests needed when you perform any type of search.</p>
            <p>Flatbread will automatically save new recipes to your <b>localStorage</b> if new ones are detected.</p>
            <p>If you would like to erase all Flatbread <b>localStorage</b> data, you can use the button below:</p>

            <button onClick={handleDeleteLocalStorageClick}>Delete all Flatbread <b>localStorage</b> data</button>

            {localStorageDeleted &&
                <p role='status'>All Flatbread <b>localStorage</b> data successfully deleted.</p>
            }
        </>
    );
};

export default Settings;
