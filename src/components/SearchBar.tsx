import { useRef } from "react";

import { STYLE_SPACER } from "../constants";

type SearchBarProps = {
    onChange: (value: string) => void;
    value: string;
};

export default function SearchBar({ onChange, value }: SearchBarProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const params = new URLSearchParams(window.location.search);

    if (params.get("recipe")) return null;

    return (
        <div style={{ position: "relative" }}>
            <div
                style={{
                    bottom: `env(safe-area-inset-bottom, calc(${STYLE_SPACER} * 1))`,
                    left: 0,
                    padding: `0 calc(${STYLE_SPACER} * 2)`,
                    position: "fixed",
                    right: 0,
                }}
            >
                <input
                    enterKeyHint="search"
                    onChange={(event) => onChange(event.target.value)}
                    placeholder="Search..."
                    ref={inputRef}
                    style={{
                        backdropFilter: "blur(10px)",
                        background: "rgba(255, 255, 255, 0.8)",
                        border: "1px solid #ddd",
                        borderRadius: "100px",
                        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.08)",
                        fontSize: "1rem",
                        padding: "14px 16px",
                        width: "100%",
                    }}
                    type="search"
                    value={value}
                />
                {value && (
                    <button
                        onClick={() => {
                            onChange("");
                            inputRef.current?.focus();
                        }}
                        style={{
                            backdropFilter: "blur(10px)",
                            border: "none",
                            borderRadius: "100px",
                            background: "white",
                            cursor: "pointer",
                            fontFamily: "monospace",
                            fontSize: "1.2rem",
                            position: "absolute",
                            right: `calc(${STYLE_SPACER} * 4)`,
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                    >
                        x
                    </button>
                )}
            </div>
        </div>
    );
}
