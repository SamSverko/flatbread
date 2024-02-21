import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import {
    WEBSITE_DESCRIPTION,
    WEBSITE_TITLE,
    WEBSITE_URL,
} from "@/lib/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    appleWebApp: {
        title: "Flatbread",
        statusBarStyle: "default",
        // startupImage: [
        //     "/apple-web-app-startup-image-black.png",
        //     {
        //         media: "screen and (device-width: 375px) and (device-height: 667px)", // iPhone 8
        //         url: "/apple-web-app-startup-image-black.png",
        //     },
        // ],
    },
    applicationName: WEBSITE_TITLE,
    description: WEBSITE_DESCRIPTION,
    creator: "Sam Sverko",
    metadataBase: new URL(WEBSITE_URL),
    openGraph: {
        description: WEBSITE_DESCRIPTION,
        images: [
            {
                alt: "Flatbread logo",
                height: 1200,
                url: "/opengraph-image.png",
                width: 630,
            },
        ],
        locale: "en_US",
        siteName: WEBSITE_TITLE,
        title: WEBSITE_TITLE,
        type: "website",
        url: WEBSITE_URL,
    },
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
        },
    },
    title: "Flatbread",
};

export const viewport: Viewport = {
    colorScheme: "light",
    themeColor: "white",
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
                    rel="apple-touch-startup-image"
                    href="/apple-touch-startup-image-640x1136.png"
                    media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-touch-startup-image-750x1294.png"
                    media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-touch-startup-image-1242x2148.png"
                    media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-touch-startup-image-1125x2436.png"
                    media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-touch-startup-image-1536x2048.png"
                    media="(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-touch-startup-image-1668x2224.png"
                    media="(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/apple-touch-startup-image-2048x2732.png"
                    media="(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
                />
            </head>
            <body className={inter.className}>
                <nav>
                    <a href="/">All recipes</a>
                </nav>
                <hr />
                <div>{children}</div>
            </body>
        </html>
    );
}
