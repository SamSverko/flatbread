import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    description: "A website for recipes.",
    metadataBase: new URL("https://www.flatbread.app/"),
    openGraph: {
        images: "/favicon/android-chrome-512x512.png",
    },
    title: "Flatbread",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link
                    href="/favicon/apple-touch-icon.png"
                    rel="apple-touch-icon"
                    sizes="180x180"
                />
                <link
                    href="/favicon/favicon-16x16.png"
                    rel="icon"
                    sizes="16x16"
                    type="image/png"
                />
                <link
                    href="/favicon/favicon-32x32.png"
                    rel="icon"
                    sizes="32x32"
                    type="image/png"
                />
                <link href="/favicon/favicon.ico" rel="shortcut icon" />
                <link
                    color="#000000"
                    href="/favicon/safari-pinned-tab.svg"
                    rel="mask-icon"
                />
                <link href="/favicon/site.webmanifest" rel="manifest" />
                <meta
                    content="/favicon/browserconfig.xml"
                    name="msapplication-config"
                />
                <meta content="#000000" name="msapplication-TileColor" />
                <meta content="#000" name="theme-color" />
                <meta content="nositelinkssearchbox" name="google" />
                <meta content="noindex,nofollow" name="googlebot" />
                <meta content="noindex,nofollow" name="robots" />
            </head>
            <body className={inter.className}>
                <h1>Flatbread</h1>
                <nav>
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                    </ul>
                </nav>
                <div>{children}</div>
            </body>
        </html>
    );
}
