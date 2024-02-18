type RecipeEditProps = {
    slug: string;
};

export default function RecipeEdit({ slug }: RecipeEditProps) {
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
