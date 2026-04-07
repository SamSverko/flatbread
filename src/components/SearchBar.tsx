import { STYLE_SPACER } from "../constants";

type SearchBarProps = {
    onChange: (value: string) => void;
    value: string;
};

const SearchBar = ({ onChange, value }: SearchBarProps) => {
    return (
        <div
            style={{
                position: "fixed",
                bottom: `calc(${STYLE_SPACER} * 1)`,
                left: "50%",
                transform: "translateX(-50%)",
            }}
        >
            <input
                enterKeyHint="search"
                onChange={(event) => onChange(event.target.value)}
                placeholder="Search..."
                type="search"
                value={value}
            />
        </div>
    );
};

export default SearchBar;
