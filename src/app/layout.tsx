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
        statusBarStyle: "black-translucent",
        startupImage: ["/apple-web-app-startup-image.png"],
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
