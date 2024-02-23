"use client";

import { Link as LinkIcon } from "@mui/icons-material";
import { IconButton, Snackbar } from "@mui/material";
import { useState } from "react";

type ShareRecipeProps = {
    slug: string;
};

export default function ShareRecipe({ slug }: ShareRecipeProps) {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    function handleClick() {
        navigator.clipboard
            .writeText(`${window.location.origin}/recipe/${slug}`)
            .then(
                () => {
                    setSnackbarMessage("Link copied to clipboard.");
                    setOpenSnackbar(true);
                },
                (error) => {
                    setSnackbarMessage(
                        "Error copying link to clipboard. Please try again."
                    );
                    setOpenSnackbar(false);
                    console.error(error);
                }
            );
    }

    return (
        <>
            <IconButton
                aria-label="Copy link to clipboard"
                onClick={handleClick}
                size="small"
                title="Copy link to clipboard"
            >
                <LinkIcon />
            </IconButton>
            <Snackbar
                anchorOrigin={{ horizontal: "center", vertical: "top" }}
                autoHideDuration={2000}
                onClose={() => setOpenSnackbar(false)}
                open={openSnackbar}
                message={snackbarMessage}
            />
        </>
    );
}
