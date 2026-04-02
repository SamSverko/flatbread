"use client";

type ShareRecipeProps = {
    slug: string;
    title: string;
};

export default function ShareRecipe({ slug, title }: ShareRecipeProps) {
    function handleClick() {
        const url = `${window.location.origin}/recipe/${slug}`;

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

    return <button onClick={handleClick}>SHARE</button>;
}
