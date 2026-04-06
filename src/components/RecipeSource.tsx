import Link from "next/link";

import HighlightedText from "@/components/HighlightedText";
import type { RecipeFrontMatter } from "@/lib/types";

type RecipeSourceProps = Pick<RecipeFrontMatter, "source"> & {
    searchTerm?: null | string | undefined;
};

export default function RecipeSource({
    searchTerm,
    source,
}: RecipeSourceProps) {
    const sourceName = source?.name ?? "Unknown";

    if (source?.url) {
        return (
            <Link
                href={source.url}
                legacyBehavior
                passHref
                rel="noopener noreferrer"
                target="_blank"
            >
                <a>
                    <HighlightedText
                        searchTerm={searchTerm}
                        text={sourceName}
                    />
                </a>
            </Link>
        );
    } else {
        return (
            <span>
                <HighlightedText searchTerm={searchTerm} text={sourceName} />
            </span>
        );
    }
}
