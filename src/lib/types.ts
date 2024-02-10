export type Recipe = RecipeFrontMatter & {
    content: string;
    slug: string;
};

/**
 * Make sure stays in sync with `frontMatterSchema` in `@/lib/api.ts`
 */
export type RecipeFrontMatter = {
    source?: {
        name?: string;
        url?: string;
    };
    title: string;
};
