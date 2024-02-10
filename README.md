# Flatbread

> "People who love to eat are always the best people. - Julia Child"

\- Flatbread.

## What is Flatbread?

Flatbread is a **website for recipes**.

## Development

### Prerequisites

1. Your local development environment has has [Git](https://git-scm.com/), [Node.js](https://nodejs.org/en/), and [NPM](https://www.npmjs.com/) installed.
1. You have the project cloned into your local development environment:
    ```shell
    git clone https://github.com/SamSverko/flatbread.git
    ```

### Local

1. Install dependencies:
    ```shell
    npm install
    ```
1. Start the website in development mode:
    ```shell
    npm run dev
    ```
1. Development website is hosted at [http://localhost:3000](http://localhost:3000).

## Production

Every push to the `main` branch will deploy a new build to production. The production website can be viewed at [https://www.flatbread.app](https://www.flatbread.app).

To build the website for a production environment:

```shell
npm run build
```

## Versioning

The project version is updated whenever code is pushed to the `main` branch.

This project uses [CalVer](https://calver.org/) as the project versioning convention.

CalVer scheme: `YYYY.0M.0D_MICRO`:

-   `YYYY` - Full year (e.g. `2022` = 2022).
-   `0M` - Zero-padded month (e.g. `09` = September).
-   `0D` - Zero-padded day (e.g. `02` = Second day of the month).
-   `_MICRO` - Version released (e.g. `_2` = second release under the same `YYYY.0M.0D` version).

## Tech stack

-   Frontend framework: [Next.js](https://nextjs.org/)
-   Static types: [TypeScript](https://www.typescriptlang.org/)
-   Recipe data storage: [Markdown files](https://www.markdownguide.org/)
-   Website hosting: [Vercel](https://vercel.com/)
