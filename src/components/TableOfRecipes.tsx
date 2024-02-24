"use client";

import {
    Box,
    Link as MUILink,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
    HighlightedText,
    RecipeEdit,
    RecipeSource,
    ShareRecipe,
} from "@/components";
import { Recipe } from "@/lib/types";

type RecipeTableProps = {
    recipes: Recipe[];
};

export default function TableOfRecipes({ recipes }: RecipeTableProps) {
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get("searchTerm");

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const filteredRecipes = searchTerm
        ? recipes.filter(
              (recipe) =>
                  recipe.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                  (recipe.source?.name &&
                      recipe.source.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()))
          )
        : recipes;

    useEffect(() => {
        setOpenSnackbar(filteredRecipes.length === 0);
    }, [filteredRecipes]);

    return (
        <>
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
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRecipes.map((recipe) => (
                            <TableRow key={recipe.slug}>
                                <TableCell align="left">
                                    <Link
                                        href={`/recipe/${recipe.slug}`}
                                        legacyBehavior
                                        passHref
                                    >
                                        <MUILink>
                                            <HighlightedText
                                                searchTerm={searchTerm}
                                                text={recipe.title}
                                            />
                                        </MUILink>
                                    </Link>
                                </TableCell>
                                <TableCell align="left">
                                    <RecipeSource
                                        searchTerm={searchTerm}
                                        source={recipe.source}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Box
                                        alignItems="center"
                                        display="flex"
                                        gap={1}
                                        justifyContent="center"
                                    >
                                        <RecipeEdit slug={recipe.slug} />
                                        <ShareRecipe
                                            slug={recipe.slug}
                                            title={recipe.title}
                                        />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar
                anchorOrigin={{ horizontal: "center", vertical: "top" }}
                autoHideDuration={2000}
                onClose={() => setOpenSnackbar(false)}
                open={openSnackbar}
                message="No recipes found. Try another search term."
            />
        </>
    );
}
