# Flatbread

> "Teach thy never like the neighbour you wanna be teached like. - Matty Matheson"

\- Flatbread

A website for recipes.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development. See **Deployment** section for notes on how to deploy the project to a production environment.

### Prerequisites

1. Your local development environment has has [Git](https://git-scm.com/), [Node.js](https://nodejs.org/en/), and [NPM](https://www.npmjs.com/) installed.
1. You have the project cloned into your local development environment:
    ```shell
    git clone https://github.com/SamSverko/flatbread.git
    ```

### Installing

1. Install dependencies:
    ```shell
    npm install
    ```
1. Start the website in development mode:
    ```shell
    npm run dev
    ```
1. Development website is hosted at [http://localhost:3000](http://localhost:3000).

## Deployment

Every push to the `main` branch will deploy a new build to production. The production website can be viewed at [https://flatbread.vercel.app](https://flatbread.vercel.app).

To deploy this app to a production environment that fits your needs, refer to the [Next.js "Deploying" docs](https://nextjs.org/docs/pages/building-your-application/deploying).

To build the website for a production environment:

```shell
npm run build
```

## Built With

-   Frontend framework: [Next.js](https://nextjs.org/)
-   Static types: [TypeScript](https://www.typescriptlang.org/)
-   Recipe data storage: [Markdown files](https://www.markdownguide.org/)
-   Website hosting: [Vercel](https://vercel.com/)

## Versioning

The project version is updated whenever code is pushed to the `main` branch. However, the project version is not updated when recipe files are added, removed, or edited.

This project uses [CalVer](https://calver.org/) as the project versioning convention.

CalVer scheme: `YYYY.0M.0D_MICRO`:

-   `YYYY` - Full year (e.g. `2024` = 2024).
-   `0M` - Zero-padded month (e.g. `09` = September).
-   `0D` - Zero-padded day (e.g. `04` = Fourth day of the month).
-   `_MICRO` - Version released (e.g. `_2` = second release under the same `YYYY.0M.0D` version).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
