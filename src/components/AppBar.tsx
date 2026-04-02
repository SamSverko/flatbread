"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AppBar() {
    const pathname = usePathname();

    const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const [searchTerm, setSearchTerm] = useState("");

    const clearSearch = () => {
        setSearchTerm("");
        window.history.replaceState({}, "", window.location.pathname);
        searchInputRef.current && searchInputRef.current.focus();
    };

    const handleRefresh = () => {
        window.history.replaceState({}, "", window.location.pathname);
        window.location.reload();
    };

    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);

        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
            const params = new URLSearchParams(window.location.search);
            params.delete("searchTerm");
            params.append(
                "searchTerm",
                (searchInputRef.current && searchInputRef.current.value) || "",
            );
            window.history.replaceState(
                {},
                "",
                `${window.location.pathname}?${params}`,
            );

            debounceTimerRef.current = null;
        }, 500);
    };

    useEffect(() => {
        clearSearch();
    }, [pathname]);

    return (
        <nav
            style={{
                alignItems: "center",
                backgroundColor: "black",
                color: "white",
                bottom: 0,
                display: "flex",
                gap: "8px",
                justifyContent: "space-between",
                padding: "8px",
                position: "fixed",
                top: "auto",
                width: "100%",
            }}
        >
            <div>FLATBREAD</div>
            <div
                style={{
                    alignItems: "center",
                    display: "flex",
                    flexGrow: 1,
                    gap: "8px",
                    justifyContent: "flex-end",
                }}
            >
                {pathname === "/" && (
                    <input
                        enterKeyHint="search"
                        onChange={handleSearchInput}
                        ref={searchInputRef}
                        style={{
                            flexGrow: 1,
                        }}
                        type="search"
                        value={searchTerm}
                    />
                )}
                <Link href="/" style={{ color: "white" }}>
                    HOME
                </Link>
                <Link href="/produce-availability" style={{ color: "white" }}>
                    PRODUCE
                </Link>
                <button onClick={handleRefresh}>REFRESH</button>
            </div>
        </nav>
    );
}
