import {
    Box,
    Link as MUILink,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import Link from "next/link";

import { getAllRecipes } from "@/lib/api";
import { RecipeEdit, RecipeSource, ShareRecipe } from "@/components";

export default function Index() {
    const allRecipes = getAllRecipes();

    return (
        <TableContainer
            sx={{
                height: "100%",
            }}
        >
            <Table size="small" stickyHeader={true}>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Source</TableCell>
                        <TableCell align="left">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allRecipes.map((recipe) => (
                        <TableRow key={recipe.slug}>
                            <TableCell align="left">
                                <Link
                                    href={`/recipe/${recipe.slug}`}
                                    legacyBehavior
                                    passHref
                                >
                                    <MUILink>{recipe.title}</MUILink>
                                </Link>
                            </TableCell>
                            <TableCell align="left">
                                <RecipeSource source={recipe.source} />
                            </TableCell>
                            <TableCell align="center">
                                <Box alignItems="center" display="flex" gap={1}>
                                    <RecipeEdit slug={recipe.slug} />
                                    <ShareRecipe slug={recipe.slug} />
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
