type props = {
    [key: string]: any
}

export const SearchCard = ({ categories }: props) => {
    console.log(categories);

    return (
        <div>
            <h2>Search for recipes</h2>

            <form>
                <label htmlFor='recipe-title'>Title</label>
                <br />
                <input id='recipe-title' type='search' />

                <details>
                    <summary>Advanced options</summary>

                    <h3>Filter by categories</h3>

                    <p>By default, all recipe categories are selected.</p>
                    <p>To refine your search results, select only the categories needed.</p>

                    <div>
                        <label htmlFor='recipe-course-types'>Course types</label>
                        <br />
                        <input id='recipe-course-types' type='text' />
                    </div>

                    <div>
                        <label htmlFor='recipe-cuisines'>Cuisines</label>
                        <br />
                        <input id='recipe-cuisines' type='text' />
                    </div>

                    <div>
                        <label htmlFor='recipe-dietary-restrictions'>Dietary Restrictions</label>
                        <br />
                        <input id='recipe-dietary-restrictions' type='text' />
                    </div>

                    <div>
                        <label htmlFor='recipe-dish-types'>Dish Types</label>
                        <br />
                        <input id='recipe-dish-types' type='text' />
                    </div>
                </details>

                <div>
                    <input type='submit' value='Search' />
                    <span>or</span>
                    <input type='submit' value='Get a random recipe' />
                </div>
            </form>
        </div>
    );
};

export default SearchCard;
