import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    {/* spartan - regular (400) + medium (500) + bold (700) */}
                    <link href='https://fonts.googleapis.com' rel='preconnect' />
                    <link
                        as='font'
                        crossOrigin=''
                        href='https://fonts.gstatic.com/s/spartan/v10/l7gfbjR61M69yt8Z2QKtlAXJExs.woff2'
                        rel='preconnect'
                        type='font/woff2'
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
