"use client";

// TODO - Refactor to keep page server-side so I can change the page title

import { APP_BAR_HEIGHT } from "@/lib/constants";

import { PRODUCE_AVAILABILITY } from "./constants";
import { type Month } from "./types";
import React, { useEffect, useState } from "react";

export default function Index() {
    const [currentMonth, setCurrentMonth] = useState(0);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const [isSwitchChecked, setIsSwitchChecked] = React.useState(false);

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

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSwitchChecked(event.target.checked);
    };

    const sortedProduce = PRODUCE_AVAILABILITY.sort((a, b) => {
        if (a.type !== b.type) {
            return a.type.localeCompare(b.type);
        }

        return a.name.localeCompare(b.name);
    });

    const filteredProduce = isSwitchChecked
        ? sortedProduce.filter((item) => {
              return item.availability.includes(currentMonth as Month);
          })
        : sortedProduce;

    return (
        <main
            style={{
                display: "flex",
                flexDirection: "column",
                height: `calc(100dvh - ${APP_BAR_HEIGHT}px)`,
            }}
        >
            <div
                style={{
                    alignItems: "center",
                    borderBottom: "1px solid grey",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    padding: "8px 16px",
                }}
            >
                <h1>Produce Availability</h1>
                <span style={{ fontSize: "12px" }}>
                    This page provides information on when produce is in season
                    in Ontario, Canada.
                    <br />
                    <br />
                    The highlighted cells indicate the current month.
                    <br />
                    <br />
                    Last updated: 2024-05-11.
                </span>
            </div>

            <div
                style={{
                    flexGrow: 1,
                    overflow: "scroll",
                }}
            >
                <table>
                    <thead>
                        <tr>
                            <th
                                style={{
                                    borderRight: "1px solid grey",
                                }}
                            >
                                Produce
                            </th>
                            {[...Array(12)].map((_, index) => (
                                <th
                                    align="center"
                                    key={index}
                                    style={{
                                        backgroundColor:
                                            index + 1 === currentMonth
                                                ? "grey"
                                                : "white",
                                    }}
                                >
                                    {getMonthString(index + 1)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProduce.map((produce, index) => (
                            <React.Fragment key={produce.name}>
                                {index === 0 ||
                                filteredProduce[index - 1].type !==
                                    produce.type ? (
                                    <tr
                                        style={{
                                            position: "sticky",
                                            top: "37px",
                                            zIndex: 3,
                                        }}
                                    >
                                        <td className="produce-availability-type-header">
                                            <b
                                                style={{
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {`${produce.type}s`}
                                            </b>
                                        </td>
                                        {[...Array(12)].map((_, index) => (
                                            <td
                                                key={index}
                                                style={{
                                                    backgroundColor: "grey",
                                                }}
                                            />
                                        ))}
                                    </tr>
                                ) : null}
                                <tr key={produce.name}>
                                    <th
                                        scope="row"
                                        style={{
                                            borderRight: "1px solid #e0e0e0",
                                        }}
                                    >
                                        {produce.name}
                                    </th>
                                    {[...Array(12)].map((_, index) => (
                                        <td
                                            align="center"
                                            key={index}
                                            style={{
                                                backgroundColor:
                                                    index + 1 === currentMonth
                                                        ? "300"
                                                        : "white",
                                            }}
                                        >
                                            {produce.availability.includes(
                                                (index + 1) as Month,
                                            ) ? (
                                                <div>Y</div>
                                            ) : null}
                                        </td>
                                    ))}
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "8px 16px",
                }}
            >
                <button onClick={() => setIsSwitchChecked(!isSwitchChecked)}>
                    TOGGLE IN SEASON ONLY
                </button>
            </div>
        </main>
    );
}
