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
            <a href={source.url} rel="noopener noreferrer" target="_blank">
                {sourceName}
            </a>
        );
    } else {
        return <span>{sourceName}</span>;
    }
}
