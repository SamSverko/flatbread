"use client";

import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
    display: "swap",
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
});

const theme = createTheme({
    palette: {
        mode: "light",
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: "black",
                },
            },
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
});

export default theme;
