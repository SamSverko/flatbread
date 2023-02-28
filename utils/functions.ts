export function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatPageTitle(title: string) {
    return `Flatbread | ${title} `;
}
