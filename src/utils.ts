// Data
export const LSKey = { // LS = Local Storage
    plannedRecipes: 'planned-recipes' as const,
    savedRecipes: 'saved-recipes' as const,
    shoppingList: 'shopping-list' as const,
};

export const slugChars = 'abcdefghijklmnopqrstuvwxyz01234567890-'.split('');
export const slugRegEx = /^[a-z0-9]+(?:-[a-z0-9]+)*$/g; // importing this sometimes causes tests to give false negatives

// Functions
export function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatPageTitle(title: string) {
    return `Flatbread | ${title} `;
}
