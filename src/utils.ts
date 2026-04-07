import { z } from "zod";

const recipeModules = import.meta.glob<string>("../recipes/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
});

const frontMatterSchema = z.object({
    title: z.string().transform((s) => s.replace(/^["']|["']$/g, "")),
    source: z.object({
        name: z.string().transform((s) => s.replace(/^["']|["']$/g, "")),
        url: z
            .string()
            .optional()
            .transform((s) => s?.replace(/^["']|["']$/g, "")),
    }),
});

export type RecipeFrontMatter = z.infer<typeof frontMatterSchema>;

export type Recipe = {
    slug: string;
    content: string;
} & RecipeFrontMatter;

let cached: Recipe[] | null = null;

export function getAllRecipes(): Recipe[] {
    if (cached) return cached;

    cached = Object.entries(recipeModules)
        .map(([path, rawContent]) => {
            const slug = getSlug(path);
            if (!slug || slug === "_TEMPLATE") return null;

            const { data, content } = parseMarkdown(rawContent);

            const parsed = frontMatterSchema.safeParse(data);

            if (!parsed.success) {
                console.warn("Invalid frontmatter:", path, parsed.error);
                return null;
            }

            return {
                slug,
                content,
                ...parsed.data,
            };
        })
        .filter((r): r is Recipe => r !== null)
        .sort((a, b) => a.title.localeCompare(b.title));

    return cached;
}

export function getRecipeBySlug(slug: Recipe["slug"]) {
    const allRecipes = getAllRecipes();
    return allRecipes.find((r) => r.slug === slug) || null;
}

export function getShareLink(slug: Recipe["slug"]) {
    return `https://github.com/SamSverko/flatbread/blob/main/recipes/${slug}.md`;
}

export function getSlug(path: string) {
    return path.split("/").pop()?.replace(".md", "");
}

function parseMarkdown(raw: string) {
    const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

    if (!match) {
        return { data: {}, content: raw };
    }

    const [, frontmatter, content] = match;

    const data: Record<string, unknown> = {};
    let currentKey: string | null = null;

    for (const line of frontmatter.split("\n")) {
        if (line.startsWith("  ") && currentKey) {
            const [key, ...rest] = line.trim().split(":");
            const value = rest.join(":").trim();

            const parent = data[currentKey] as Record<string, unknown>;
            parent[key] = value;
            continue;
        }

        const [key, ...rest] = line.split(":");
        const value = rest.join(":").trim();

        if (!value) {
            currentKey = key.trim();
            data[currentKey] = {};
        } else {
            currentKey = null;
            data[key.trim()] = value;
        }
    }

    return { data, content };
}
