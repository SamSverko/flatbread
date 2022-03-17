import type { AppProps } from 'next/app';
import React from 'react';

import NavBar from '../components/nav-bar/nav-bar';

// import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <NavBar />
            <Component {...pageProps} />
        </>
    );
}

export default App;
