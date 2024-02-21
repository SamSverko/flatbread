import { MetadataRoute } from "next";

import { WEBSITE_DESCRIPTION, WEBSITE_TITLE } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
    return {
        background_color: "#fff",
        description: WEBSITE_DESCRIPTION,
        display: "standalone",
        icons: [
            {
                purpose: "any",
                sizes: "192x192",
                src: "/manifest-icon-any-192x192.png",
                type: "image/png",
            },
            {
                purpose: "any",
                sizes: "512x512",
                src: "/manifest-icon-any-512x512.png",
                type: "image/png",
            },
            {
                purpose: "maskable",
                sizes: "512x512",
                src: "/manifest-icon-maskable.png",
                type: "image/png",
            },
        ],
        name: WEBSITE_TITLE,
        prefer_related_applications: true,
        short_name: WEBSITE_TITLE,
        start_url: "/",
        theme_color: "#fff",
    };
}
