import Document, { Html, Head, Main, NextScript } from 'next/document';
import * as React from 'react';

class AppDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link as='font' crossOrigin='' href='/fonts/spartan-regular.woff2' rel='preload' />
                    <link as='font' crossOrigin='' href='/fonts/spartan-regular.woff' rel='preload' />
                    <link as='font' crossOrigin='' href='/fonts/spartan-regular.ttf' rel='preload' />
                    <link as='font' crossOrigin='' href='/fonts/spartan-medium.woff2' rel='preload' />
                    <link as='font' crossOrigin='' href='/fonts/spartan-medium.woff' rel='preload' />
                    <link as='font' crossOrigin='' href='/fonts/spartan-medium.ttf' rel='preload' />
                    <link as='font' crossOrigin='' href='/fonts/spartan-bold.woff2' rel='preload' />
                    <link as='font' crossOrigin='' href='/fonts/spartan-bold.woff' rel='preload' />
                    <link as='font' crossOrigin='' href='/fonts/spartan-bold.ttf' rel='preload' />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default AppDocument;
