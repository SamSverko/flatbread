import { Box, Link as MUILink, Typography } from "@mui/material";
import Link from "next/link";

import { APP_BAR_HEIGHT, APP_BAR_HEIGHT_LG } from "@/lib/constants";

export default function NotFound() {
    return (
        <Box
            sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                height: `calc(100dvh - ${APP_BAR_HEIGHT}px)`,
                justifyContent: "center",
                "@media (min-width: 600px)": {
                    height: `calc(100dvh - ${APP_BAR_HEIGHT_LG}px)`,
                },
            }}
        >
            <Typography component="h1" variant="h5">
                Page Not Found
            </Typography>
            <Link href="/" legacyBehavior passHref>
                <MUILink>Return Home</MUILink>
            </Link>
        </Box>
    );
}
