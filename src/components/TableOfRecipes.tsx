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
    TablePagination,
    TableRow,
} from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
    HighlightedText,
    RecipeEdit,
    RecipeSource,
    ShareRecipe,
} from "@/components";
import { TABLE_PAGINATION_HEIGHT } from "@/lib/constants";
import { Recipe } from "@/lib/types";

type RecipeTableProps = {
    recipes: Recipe[];
};

export default function TableOfRecipes({ recipes }: RecipeTableProps) {
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get("searchTerm");

    const tableContainerRef = useRef<HTMLTableSectionElement>(null);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleTableHeadClick = () => {
        if (tableContainerRef.current) {
            tableContainerRef.current.scrollTop = 0;
        }
    };

    return (
        <Box sx={{ height: "100%", overflow: "hidden", width: "100%" }}>
            <TableContainer
                ref={tableContainerRef}
                sx={{
                    height: `calc(100% - ${TABLE_PAGINATION_HEIGHT}px)`,
                    scrollBehavior: "smooth",
                }}
            >
                <Table size="small" stickyHeader={true}>
                    <TableHead onClick={handleTableHeadClick}>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Source</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRecipes
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((recipe) => (
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
            <TablePagination
                component="div"
                count={filteredRecipes.length}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10, 25, 100]}
                sx={{ ".MuiToolbar-root": { p: 0 } }}
            />
            <Snackbar
                anchorOrigin={{ horizontal: "center", vertical: "top" }}
                autoHideDuration={2000}
                onClose={() => setOpenSnackbar(false)}
                open={openSnackbar}
                message="No recipes found. Try another search term."
            />
        </Box>
    );
}
