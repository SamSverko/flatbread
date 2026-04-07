import { STYLE_SPACER } from "../constants";

type SearchBarProps = {
    onChange: (value: string) => void;
    value: string;
};

export default function SearchBar({ onChange, value }: SearchBarProps) {
    const params = new URLSearchParams(window.location.search);

    if (params.get("recipe")) return null;

    return (
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
        </div>
    );
}
