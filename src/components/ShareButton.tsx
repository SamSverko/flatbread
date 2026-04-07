import { type Recipe } from "../utils";

type ShareButtonProps = Pick<Recipe, "slug" | "title">;

export default function ShareButton({ slug, title }: ShareButtonProps) {
    function handleClick() {
        const url = `${window.location.origin}/?recipe=${slug}`;

        console.log("Sharing URL:", url);

        if (navigator.share) {
            navigator.share({
                text: `Recipe: ${title}`,
                title: `Recipe: ${title}`,
                url: url,
            });
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(
                () => {
                    return;
                },
                (error) => {
                    console.error(error);
                },
            );
        }
    }

    return <button onClick={handleClick}>Share</button>;
}
