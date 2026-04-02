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
            <Link
                href={source.url}
                legacyBehavior
                passHref
                rel="noopener noreferrer"
                target="_blank"
            >
                <RecipeSourceText />
            </Link>
        );
    } else {
        return (
            <span>
                <RecipeSourceText />
            </span>
        );
    }
}
