import { Link as MUILink, Typography } from "@mui/material";
import Link from "next/link";

import { HighlightedText } from "@/components";
import type { RecipeFrontMatter } from "@/lib/types";

type RecipeSourceProps = Pick<RecipeFrontMatter, "source"> & {
    searchTerm?: null | string | undefined;
};

export default function RecipeSource({
    searchTerm,
    source,
}: RecipeSourceProps) {
    const sourceName = source?.name ?? "Unknown";

    const RecipeSourceText = () => (
        <HighlightedText searchTerm={searchTerm} text={sourceName} />
    );

    if (source?.url) {
        return (
            <Link href={source.url} legacyBehavior passHref>
                <MUILink rel="noopener noreferrer" target="_blank">
                    <RecipeSourceText />
                </MUILink>
            </Link>
        );
    } else {
        return (
            <Typography component="span" variant="body2">
                <RecipeSourceText />
            </Typography>
        );
    }
}
