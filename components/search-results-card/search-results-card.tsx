type searchResultsProps = {
    numberOfRecipes: number
}

const SearchResultsCard = ({ numberOfRecipes }: searchResultsProps) => {
    return (
        <div>
            <h2>Search results</h2>
            <p>{numberOfRecipes} {numberOfRecipes === 1 ? 'recipe' : 'recipes'} found</p>

            <hr />
        </div>
    );
};

export default SearchResultsCard;
