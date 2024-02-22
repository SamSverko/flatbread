import { remark } from "remark";
import html from "remark-html";

// TODO - change to render react components instead?
export async function markdownToHtml(markdown: string) {
    const result = await remark().use(html).process(markdown);
    return result.toString();
}
