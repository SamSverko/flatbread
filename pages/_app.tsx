import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';

import NavBar from '../components/nav-bar/nav-bar';

import '../styles/global.scss';

type Route = {
    path: string
    title: string
}

const routes = [
    { path: '/', title: 'Home' },
    { path: '/settings', title: 'Settings' },
];

function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const matchedRoute = routes.find((route: Route) => route.path === router.pathname);

    return (
        <>
            <Head>
                <meta content='A blazingly-fast website to search and follow tasty recipes.' name='description' />
                <meta content='width=device-width, initial-scale=1.0' name='viewport' />

                <title>Flatbread{matchedRoute ? ` - ${matchedRoute.title}` : ''}</title>
            </Head>
            <NavBar />
            <Component {...pageProps} />
        </>
    );
}

export default App;
