import * as React from 'react';

import Card from '../components/card';

import type { NextPage } from 'next';

const NotFoundPage: NextPage = () => {
    const foodPuns = [
        '🥚 Have an egg-cellent day!',
        '🧈 You butter believe it.',
        '🧀 Let\'s cut to the cheese!',
        '🍩 We donut belong here.',
        '🍝 Pasta la vista, baby!',
        '🥓 Don\'t go bacon my heart.',
        '🍐 We make a great pear!',
        '🍊 Orange you excited?',
        '☕ Thanks a latte!',
        '🥬 Romaine calm!',
    ];

    // States
    const [pun, setPun] = React.useState('');

    // Effects
    React.useEffect(() => {
        setPun(foodPuns[Math.floor(Math.random() * foodPuns.length)]);
    }, []);

    // Renderers
    return (
        <>
            <Card>
                <h2>Page not found</h2>
            </Card>

            <Card hide={pun.length === 0}>
                <p>{foodPuns[foodPuns.length - 1]}</p>
            </Card>
        </>
    );
};

export default NotFoundPage;
