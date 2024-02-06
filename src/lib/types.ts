export type Recipe = RecipeFrontMatter & {
    content: string;
    slug: string;
};

export type RecipeFrontMatter = {
    source?: {
        name?: string;
        url?: string;
    };
    title: string;
};
