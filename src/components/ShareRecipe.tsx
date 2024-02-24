"use client";

import { Share } from "@mui/icons-material";
import { IconButton, Snackbar } from "@mui/material";
import { useState } from "react";

type ShareRecipeProps = {
    slug: string;
    title: string;
};

export default function ShareRecipe({ slug, title }: ShareRecipeProps) {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    function handleClick() {
        const url = `${window.location.origin}/recipe/${slug}`;

        if (navigator.share) {
            navigator.share({
                text: `Recipe: ${title}`,
                title: `Recipe: ${title}`,
                url: url,
            });
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(
                () => {
                    setSnackbarMessage("Recipe link copied to clipboard.");
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
        } else {
            setSnackbarMessage(
                "Unable to share or copy link to clipboard. What device are you using??"
            );
            setOpenSnackbar(true);
        }
    }

    return (
        <>
            <IconButton
                aria-label="Share recipe"
                onClick={handleClick}
                size="small"
                title="Share recipe"
            >
                <Share />
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
