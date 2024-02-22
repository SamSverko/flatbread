import { Link as MUILink, Typography } from "@mui/material";
import Link from "next/link";

import type { RecipeFrontMatter } from "@/lib/types";

type RecipeSourceProps = Pick<RecipeFrontMatter, "source">;

export default function RecipeSource({ source }: RecipeSourceProps) {
    let sourceName = "";

    if (source?.name) {
        sourceName = source.name;
    } else {
        sourceName = "Unknown";
    }

    if (source?.url) {
        return (
            <Link href={source.url} legacyBehavior passHref>
                <MUILink rel="noopener noreferrer" target="_blank">
                    {sourceName}
                </MUILink>
            </Link>
        );
    } else {
        return (
            <Typography component="span" variant="body1">
                {sourceName}
            </Typography>
        );
    }
}
