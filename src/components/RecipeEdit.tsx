type RecipeEditProps = {
    slug: string;
};

export default function RecipeEdit({ slug }: RecipeEditProps) {
    return (
        <a
            aria-label="Edit recipe"
            href={`https://github.com/SamSverko/flatbread/blob/main/recipes/${slug}.md`}
            rel="noopener noreferrer"
            target="_blank"
            title="Edit recipe"
        >
            ✏️
        </a>
    );
}
