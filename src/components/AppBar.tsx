"use client";

import {
    Clear as ClearIcon,
    DateRange as DateRangeIcon,
    HorizontalRule as HorizontalRuleIcon,
    List as ListIcon,
    Refresh as RefreshIcon,
    Search as SearchIcon,
} from "@mui/icons-material";
import {
    AppBar as MUIAppBar,
    Box,
    IconButton,
    InputBase,
    Snackbar,
    styled,
    Toolbar,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { LOGO_COLOR } from "@/lib/constants";

const Search = styled(Box)(({ theme }) => ({
    alignItems: "center",
    border: `1px solid ${theme.palette.common.white}`,
    borderRadius: theme.shape.borderRadius,
    color: "inherit",
    display: "flex",
    flexGrow: 1,
    gap: theme.spacing(1),
    margin: `0 ${theme.spacing(1)}`,
    padding: theme.spacing(1),
    ".MuiInputBase-input": {
        color: theme.palette.common.white,
        padding: 0,
        "::-webkit-search-cancel-button": {
            WebkitAppearance: "none",
        },
    },
}));

export default function AppBar() {
    const pathname = usePathname();

    const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const clearSearch = () => {
        setSearchTerm("");
        window.history.replaceState({}, "", window.location.pathname);
        searchInputRef.current && searchInputRef.current.focus();
    };

    const handleRefresh = () => {
        setOpenSnackbar(true);
        window.history.replaceState({}, "", window.location.pathname);
        window.location.reload();
    };

    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);

        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
            const params = new URLSearchParams(window.location.search);
            params.delete("searchTerm");
            params.append(
                "searchTerm",
                (searchInputRef.current && searchInputRef.current.value) || ""
            );
            window.history.replaceState(
                {},
                "",
                `${window.location.pathname}?${params}`
            );

            debounceTimerRef.current = null;
        }, 500);
    };

    useEffect(() => {
        clearSearch();
    }, [pathname]);

    return (
        <>
            <MUIAppBar
                position="fixed"
                color="primary"
                sx={{ top: "auto", bottom: 0 }}
            >
                <Toolbar>
                    <HorizontalRuleIcon
                        sx={{ color: LOGO_COLOR, m: 1 }}
                        titleAccess="Flatbread logo"
                    />
                    <Box
                        alignItems="center"
                        display="flex"
                        justifyContent="flex-end"
                        sx={{ flexGrow: 1 }}
                    >
                        {pathname === "/" && (
                            <Search>
                                <SearchIcon />
                                <InputBase
                                    fullWidth
                                    id="search-recipes"
                                    inputProps={{
                                        enterKeyHint: "search",
                                    }}
                                    inputRef={searchInputRef}
                                    onChange={handleSearchInput}
                                    size="small"
                                    type="search"
                                    value={searchTerm}
                                />
                                {searchTerm.length > 0 && (
                                    <IconButton
                                        onClick={clearSearch}
                                        size="small"
                                        sx={{
                                            color: "inherit",
                                            p: 0,
                                        }}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                )}
                            </Search>
                        )}
                        <IconButton
                            aria-label="All recipes"
                            color="inherit"
                            href="/"
                            LinkComponent={Link}
                        >
                            <ListIcon />
                        </IconButton>
                        <IconButton
                            aria-label="Produce availability"
                            color="inherit"
                            href="/produce-availability"
                            LinkComponent={Link}
                        >
                            <DateRangeIcon />
                        </IconButton>
                        <IconButton
                            aria-label="Refresh page"
                            color="inherit"
                            onClick={handleRefresh}
                        >
                            <RefreshIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </MUIAppBar>
            <Snackbar
                anchorOrigin={{
                    horizontal: "center",
                    vertical: "top",
                }}
                autoHideDuration={2000}
                onClose={() => setOpenSnackbar(false)}
                open={openSnackbar}
                message="Refreshing page..."
            />
        </>
    );
}
