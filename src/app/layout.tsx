import { Box, CssBaseline } from "@mui/material";
import { type Metadata, type Viewport } from "next";
import { Roboto } from "next/font/google";

import { AppBar, BottomNavigation } from "@/components";
import {
    APP_BAR_HEIGHT,
    BOTTOM_NAVIGATION_HEIGHT,
    WEBSITE_DESCRIPTION,
    WEBSITE_TITLE,
    WEBSITE_URL,
} from "@/lib/constants";

const font = Roboto({
    display: "swap",
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
    appleWebApp: {
        title: "Flatbread",
        statusBarStyle: "black-translucent",
        startupImage: [
            {
                media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
                url: "/apple-touch-startup-image-640x1136.png",
            },
            {
                media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
                url: "/apple-touch-startup-image-750x1334.png",
            },
            {
                media: "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
                url: "/apple-touch-startup-image-1242x2208.png",
            },
            {
                media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
                url: "/apple-touch-startup-image-1125x2436.png",
            },
            {
                media: "(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)",
                url: "/apple-touch-startup-image-1536x2048.png",
            },
            {
                media: "/apple-touch-startup-image-1668x2224.png",
                url: "(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)",
            },
            {
                media: "/apple-touch-startup-image-2048x2732.png",
                url: "(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)",
            },
        ],
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
        <html className={font.className} lang="en">
            <body style={{ backgroundColor: "#1976d2" }}>
                <CssBaseline />
                <AppBar />
                <Box
                    sx={{
                        backgroundColor: "white",
                        height: `calc(100vh - ${APP_BAR_HEIGHT}px - ${BOTTOM_NAVIGATION_HEIGHT}px)`,
                        overflow: "scroll",
                    }}
                >
                    {children}
                </Box>
                <BottomNavigation />
            </body>
        </html>
    );
}
