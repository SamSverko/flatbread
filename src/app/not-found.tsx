import { APP_BAR_HEIGHT } from "@/lib/constants";
import Link from "next/link";

export default function NotFound() {
    return (
        <div
            style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                height: `calc(100dvh - ${APP_BAR_HEIGHT}px)`,
                justifyContent: "center",
            }}
        >
            <h1>Page Not Found</h1>
            <Link href="/">Return Home</Link>
        </div>
    );
}
