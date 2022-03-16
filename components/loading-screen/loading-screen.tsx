type componentProps = {
    recipeCount: number
}

const LoadingScreen = ({ recipeCount }: componentProps) => {
    return (
        <div>
            <p>Fetching all <b>{recipeCount}</b> recipes <em>just for you</em>!</p>
        </div>
    );
};

export default LoadingScreen;
