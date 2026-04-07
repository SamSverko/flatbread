type HighlightedTextProps = {
    searchTerm?: null | string | undefined;
    text: string;
};

export default function HighlightedText({
    searchTerm,
    text,
}: HighlightedTextProps) {
    if (!searchTerm) {
        return <>{text}</>;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const parts = text.split(new RegExp(`(${searchTermLower})`, "gi"));

    return (
        <>
            {parts.map((part, index) => {
                if (part.toLowerCase() === searchTermLower) {
                    return (
                        <mark key={index} style={{ backgroundColor: "yellow" }}>
                            {part}
                        </mark>
                    );
                } else {
                    return part;
                }
            })}
        </>
    );
}
