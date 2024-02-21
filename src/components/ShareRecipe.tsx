"use client";

import { useState } from "react";

type ShareRecipeProps = {
    slug: string;
};

export default function ShareRecipe({ slug }: ShareRecipeProps) {
    const [buttonText, setButtonText] = useState("🔗");
    const [isDisabled, setIsDisabled] = useState(false);

    function handleClick() {
        setIsDisabled(true);
        const url = `${window.location.origin}/recipe/${slug}`;

        navigator.clipboard.writeText(url).then(
            () => {
                setButtonText("✔️");

                window.setTimeout(() => {
                    setButtonText("🔗");
                    setIsDisabled(false);
                }, 3000);
            },
            (error) => {
                setButtonText("❌");
                setIsDisabled(false);

                console.error(error);
            }
        );
    }

    return (
        <button
            aria-label="Copy link to clipboard"
            disabled={isDisabled}
            onClick={handleClick}
            title="Copy link to clipboard"
        >
            {buttonText}
        </button>
    );
}
