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
                bottom: `calc(${STYLE_SPACER} * 1)`,
                left: "50%",
                position: "fixed",
                transform: "translateX(-50%)",
            }}
        >
            <input
                enterKeyHint="search"
                onChange={(event) => onChange(event.target.value)}
                placeholder="Search..."
                style={{
                    backdropFilter: "blur(10px)",
                    background: "rgba(255, 255, 255, 0.8)",
                    bottom: `env(safe-area-inset-bottom, calc(${STYLE_SPACER} * 2))`,
                    boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.08)",
                }}
                type="search"
                value={value}
            />
        </div>
    );
}
