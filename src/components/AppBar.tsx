"use client";

import { HorizontalRule, List } from "@mui/icons-material";
import { AppBar as MUIAppBar, Box, IconButton, Toolbar } from "@mui/material";
import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";

import { LOGO_COLOR } from "@/lib/constants";

export default function AppBar() {
    // const pathname = usePathname();

    // const [value, setValue] = useState("");

    // useEffect(() => {
    //     setValue(pathname);
    // }, [pathname]);

    return (
        <MUIAppBar
            position="fixed"
            color="primary"
            sx={{ top: "auto", bottom: 0 }}
        >
            <Toolbar>
                <IconButton
                    aria-label="Flatbread logo"
                    sx={{ color: LOGO_COLOR }}
                >
                    <HorizontalRule />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton href="/" LinkComponent={Link} color="inherit">
                    <List />
                </IconButton>
            </Toolbar>
        </MUIAppBar>
    );
}
