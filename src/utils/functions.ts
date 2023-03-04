// Data
export const LSKey = { // LS = Local Storage
    plannedRecipes: 'planned-recipes' as const,
    savedRecipes: 'saved-recipes' as const,
    shoppingList: 'shopping-list' as const,
};

// Functions
export function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatPageTitle(title: string) {
    return `Flatbread | ${title} `;
}
