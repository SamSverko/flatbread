import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";

type RecipeEditProps = {
    slug: string;
};

export default function RecipeEdit({ slug }: RecipeEditProps) {
    return (
        <IconButton
            aria-label="Edit recipe"
            href={`https://github.com/SamSverko/flatbread/blob/main/recipes/${slug}.md`}
            rel="noopener noreferrer"
            size="small"
            target="_blank"
            title="Edit recipe"
        >
            <Edit />
        </IconButton>
    );
}
