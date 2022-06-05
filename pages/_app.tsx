import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';

import { formatPageTitle } from '../utils/functions';

import NavBar from '../components/nav-bar/nav-bar';

import '../styles/global.scss';

import type { AppProps } from 'next/app';

type Route = {
    path: string
    title: string
}

const routes: Route[] = [
    { path: '/', title: 'Search' },
    { path: '/about', title: 'About' },
    { path: '/settings', title: 'Settings' },
];

function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const matchedRoute = routes.find((route: Route) => route.path === router.pathname);

    return (
        <>
            <Head>
                <link href='/apple-touch-icon.png' rel='apple-touch-icon' sizes='180x180' />
                <link href='/favicon-32x32.png' rel='icon' sizes='32x32' type='image/png' />
                <link href='/favicon-16x16.png' rel='icon' sizes='16x16' type='image/png' />
                <link href='/site.webmanifest' rel='manifest' />
                <link color='#dd2e44' href='/safari-pinned-tab.svg' rel='mask-icon' />

                <meta content='Flatbread' name='apple-mobile-web-app-title' />
                <meta content='Flatbread' name='application-name' />
                <meta content='A blazingly-fast website to find tasty recipes.' name='description' />
                <meta content='#dd2e44' name='msapplication-TileColor' />
                <meta content='#ffffff' name='theme-color' />
                <meta content='width=device-width, initial-scale=1.0' name='viewport' />

                <title>{matchedRoute ? formatPageTitle(matchedRoute.title) : ''}</title>
            </Head>
            <NavBar activeRoute={(matchedRoute) ? matchedRoute.path : '/'} />
            <Component {...pageProps} />
        </>
    );
}

export default App;
