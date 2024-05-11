"use client";

import {
    Check as CheckIcon,
    InfoOutlined as InfoOutlinedIcon,
} from "@mui/icons-material";
import {
    Box,
    ClickAwayListener,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import { APP_BAR_HEIGHT, APP_BAR_HEIGHT_LG } from "@/lib/constants";

import { PRODUCE_AVAILABILITY } from "./constants";
import { type Month } from "./types";
import React, { useEffect, useState } from "react";

export default function Index() {
    const [currentMonth, setCurrentMonth] = useState(0);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    useEffect(() => {
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        setCurrentMonth(month);
    }, []);

    const getMonthString = (month: number) => {
        switch (month) {
            case 1:
                return "Jan";
            case 2:
                return "Feb";
            case 3:
                return "Mar";
            case 4:
                return "Apr";
            case 5:
                return "May";
            case 6:
                return "Jun";
            case 7:
                return "Jul";
            case 8:
                return "Aug";
            case 9:
                return "Sep";
            case 10:
                return "Oct";
            case 11:
                return "Nov";
            case 12:
                return "Dec";
        }
    };

    const sortedProduce = PRODUCE_AVAILABILITY.sort((a, b) => {
        if (a.type !== b.type) {
            return a.type.localeCompare(b.type);
        }

        return a.name.localeCompare(b.name);
    });

    return (
        <Box
            component="main"
            display="flex"
            flexDirection="column"
            gap={2}
            padding={2}
            sx={{
                height: `calc(100dvh - ${APP_BAR_HEIGHT}px)`,
                "@media (min-width: 600px)": {
                    height: `calc(100dvh - ${APP_BAR_HEIGHT_LG}px)`,
                },
            }}
        >
            <Box alignItems="center" display="flex" flexWrap="nowrap" gap={1}>
                <Typography component="h1" variant="h5">
                    Produce Availability
                </Typography>

                <ClickAwayListener onClickAway={() => setIsTooltipOpen(false)}>
                    <Tooltip
                        arrow
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        onClose={() => setIsTooltipOpen(false)}
                        open={isTooltipOpen}
                        PopperProps={{
                            disablePortal: true,
                        }}
                        slotProps={{
                            popper: {
                                modifiers: [
                                    {
                                        name: "offset",
                                        options: {
                                            offset: [0, -14],
                                        },
                                    },
                                ],
                            },
                        }}
                        title={
                            <>
                                This page provides information on when produce
                                is in season in Ontario, Canada.
                                <br />
                                <br />
                                The highlighted cells indicate the current
                                month.
                                <br />
                                <br />
                                Last updated: 2024-05-11.
                            </>
                        }
                    >
                        <IconButton
                            aria-label="More info"
                            onClick={() => setIsTooltipOpen(true)}
                        >
                            <InfoOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </ClickAwayListener>
            </Box>

            <TableContainer
                sx={{
                    flexGrow: 1,
                    overflow: "scroll",
                }}
            >
                <Table
                    size="small"
                    stickyHeader
                    sx={{
                        "& th:first-child, & td:first-child": {
                            backgroundColor: "white",
                            left: 0,
                            position: "sticky",
                        },
                        "& thead th": {
                            zIndex: 4,
                            "&:first-child": {
                                zIndex: 5,
                            },
                        },
                        "& td.produce-availability-type-header": {
                            backgroundColor: "grey.100",
                        },
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>Produce</TableCell>
                            {[...Array(12)].map((_, index) => (
                                <TableCell
                                    key={index}
                                    sx={{
                                        backgroundColor:
                                            index + 1 === currentMonth
                                                ? "grey.300"
                                                : "common.white",
                                    }}
                                >
                                    {getMonthString(index + 1)}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedProduce.map((produce, index) => (
                            <React.Fragment key={produce.name}>
                                {index === 0 ||
                                sortedProduce[index - 1].type !==
                                    produce.type ? (
                                    <TableRow>
                                        <TableCell className="produce-availability-type-header">
                                            <Box
                                                component="b"
                                                sx={{
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {`${produce.type}s`}
                                            </Box>
                                        </TableCell>
                                        {[...Array(12)].map((_, index) => (
                                            <TableCell
                                                key={index}
                                                sx={{
                                                    backgroundColor: "grey.100",
                                                }}
                                            />
                                        ))}
                                    </TableRow>
                                ) : null}
                                <TableRow key={produce.name}>
                                    <TableCell component="th" scope="row">
                                        {produce.name}
                                    </TableCell>
                                    {[...Array(12)].map((_, index) => (
                                        <TableCell
                                            key={index}
                                            sx={{
                                                backgroundColor:
                                                    index + 1 === currentMonth
                                                        ? "grey.300"
                                                        : "common.white",
                                            }}
                                        >
                                            {produce.availability.includes(
                                                (index + 1) as Month
                                            ) ? (
                                                <CheckIcon />
                                            ) : null}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
