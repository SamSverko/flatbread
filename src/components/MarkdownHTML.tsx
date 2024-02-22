import {
    Checkbox,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import Markdown from "react-markdown";

type MarkdownHTMLProps = {
    markdown: string;
};

export default function MarkdownHTML({ markdown }: MarkdownHTMLProps) {
    return (
        <Markdown
            components={{
                a: ({ node, ...rest }) => {
                    return (
                        <Link
                            rel="noopener noreferrer"
                            target="_blank"
                            {...(rest as React.HTMLAttributes<HTMLAnchorElement>)}
                        />
                    );
                },
                h2: ({ node, ...rest }) => {
                    return (
                        <Typography
                            component="h2"
                            variant="h5"
                            {...(rest as React.HTMLAttributes<HTMLHeadingElement>)}
                        />
                    );
                },
                h3: ({ node, ...rest }) => {
                    return (
                        <Typography
                            component="h3"
                            variant="h6"
                            {...(rest as React.HTMLAttributes<HTMLHeadingElement>)}
                        />
                    );
                },
                h4: ({ node, ...rest }) => {
                    return (
                        <Typography
                            component="h4"
                            variant="h6"
                            {...(rest as React.HTMLAttributes<HTMLHeadingElement>)}
                        />
                    );
                },
                h5: ({ node, ...rest }) => {
                    return (
                        <Typography
                            component="h5"
                            variant="h6"
                            {...(rest as React.HTMLAttributes<HTMLHeadingElement>)}
                        />
                    );
                },
                h6: ({ node, ...rest }) => {
                    return (
                        <Typography
                            component="h6"
                            variant="h6"
                            {...(rest as React.HTMLAttributes<HTMLHeadingElement>)}
                        />
                    );
                },
                li: ({ children, node, ...rest }) => {
                    return (
                        <ListItem
                            disablePadding
                            {...(rest as React.HTMLAttributes<HTMLLIElement>)}
                        >
                            <ListItemIcon sx={{ minWidth: "unset" }}>
                                <Checkbox />
                            </ListItemIcon>
                            <ListItemText primary={children} />
                        </ListItem>
                    );
                },
                ol: ({ node, ...rest }) => {
                    return (
                        <List
                            disablePadding
                            {...(rest as React.HTMLAttributes<HTMLUListElement>)}
                        />
                    );
                },
                ul: ({ node, ...rest }) => {
                    return (
                        <List
                            disablePadding
                            {...(rest as React.HTMLAttributes<HTMLUListElement>)}
                        />
                    );
                },
            }}
        >
            {markdown}
        </Markdown>
    );
}
