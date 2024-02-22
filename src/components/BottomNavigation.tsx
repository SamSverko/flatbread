"use client";

import { List } from "@mui/icons-material";
import {
    BottomNavigation as MUIBottomNavigation,
    BottomNavigationAction,
    Paper,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function BottomNavigation() {
    const pathname = usePathname();

    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(pathname);
    }, [pathname]);

    return (
        <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            elevation={3}
        >
            <MUIBottomNavigation value={value} showLabels>
                <BottomNavigationAction
                    href="/"
                    icon={<List />}
                    label="All Recipes"
                    LinkComponent={Link}
                    value="/"
                />
            </MUIBottomNavigation>
        </Paper>
    );
}
