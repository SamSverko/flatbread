export type Recipe = {
    content: string;
    slug: string;
    source?: {
        name?: string;
        url?: string;
    };
    title: string;
};
