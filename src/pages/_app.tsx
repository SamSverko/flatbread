import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';

import NavCard from '../components/nav-card';
import { formatPageTitle } from '../utils';

import bxCog from '../../public/icons/bx-cog.svg';
import bxsHeart from '../../public/icons/bxs-heart.svg';
import bxCalendarCheck from '../../public/icons/bx-calendar-check.svg';
import bxListCheck from '../../public/icons/bx-list-check.svg';
import bxSearch from '../../public/icons/bx-search.svg';

import '../styles/global.scss';
import '../styles/variables.css';

import type { AppProps } from 'next/app';
import type { Route } from '../types';

const routes: Route[] = [
    {
        path: '/settings',
        title: 'Settings',
        icon: bxCog,
    },
    {
        path: '/saved',
        title: 'Saved',
        icon: bxsHeart,
    },
    {
        path: '/plan',
        title: 'Plan',
        icon: bxCalendarCheck,
    },
    {
        path: '/list',
        title: 'List',
        icon: bxListCheck,
    },
    {
        path: '/',
        title: 'Search',
        icon: bxSearch,
    },
];

function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const matchedRoute = routes.find((route: Route) => route.path === router.pathname);

    // Renderers
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
            <Component {...pageProps} />
            <NavCard activeRoute={(matchedRoute) ? matchedRoute.path : ''} routes={routes} />
        </>
    );
}

export default App;
