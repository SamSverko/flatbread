module.exports = {
    async redirects() {
        return [
            {
                source: "/recipe",
                destination: "/",
                permanent: true,
            },
        ];
    },
};
