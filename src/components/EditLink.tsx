import { type Recipe } from "../utils";

type EditLinkProps = Pick<Recipe, "slug">;

export default function EditLink({ slug }: EditLinkProps) {
    return (
        <a
            href={`https://github.com/SamSverko/flatbread/blob/main/recipes/${slug}.md`}
            rel="noopener noreferrer"
            target="_blank"
        >
            Edit
        </a>
    );
}
