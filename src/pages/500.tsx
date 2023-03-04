import * as React from 'react';

import Card from '../components/card';

import type { NextPage } from 'next';

const ServerErrorPage: NextPage = () => {
    // Renderers
    return (
        <>
            <Card>
                <h2>Server-side error</h2>
            </Card>

            <Card>
                <p>Sorry about that!</p>
            </Card>
        </>
    );
};

export default ServerErrorPage;
