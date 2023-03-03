import * as React from 'react';

import Card from '../components/card';

import type { NextPage } from 'next';

const ThankYouPage: NextPage = () => {
    // Renderers
    return (
        <>
            <Card>
                <h2>Thank you</h2>
            </Card>

            <Card>
                <p>This app would not be possible without all the generous help from others.</p>

                <p>A few notable people deserve a big thanks, but I will keep anonymous to be respectful.</p>

                <p>If you recognize yourself and want to be removed, just let me know!</p>

                <p>Thank you:</p>

                <ul style={{ margin: '0' }}>
                    <li>KS</li>
                    <li>JHL</li>
                    <li>GS</li>
                    <li>DW</li>
                </ul>

                <p>❤️</p>
            </Card>
        </>
    );
};

export default ThankYouPage;
