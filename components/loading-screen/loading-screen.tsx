type componentProps = {
    recipeCount: number
}

const LoadingScreen = ({ recipeCount }: componentProps) => {
    return (
        <div>
            <h2>Fetching all <b>{recipeCount}</b> recipes <em>just for you</em>!</h2>
        </div>
    );
};

export default LoadingScreen;
