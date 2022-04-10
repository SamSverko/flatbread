# Flatbread

[![first-timers-only](https://img.shields.io/badge/first--timers--only-friendly-blue.svg)](https://www.firsttimersonly.com/) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![CalVer](https://img.shields.io/badge/CalVer-YYYY.0M.0D__MICRO-blue)](https://calver.org/)

> "People who love to eat are always the best people. - Julia Child"

\- Flatbread.

---

## What is Flatbread?

Flatbread is a **website for recipes**.

---

## Development

To get the website running locally, please do the following:

1. Ensure your environment has [Git](https://git-scm.com/), [Node.js](https://nodejs.org/en/), and [npm](https://www.npmjs.com/) installed.
2. Clone this repository; Run `git clone https://github.com/SamSverko/flatbread.git`.
3. Install dependencies; Run `npm install`.
4. Copy the `.env.local.example` file, rename it to `.env.local`, and update the values to your needs.
5. Start the website in development mode; Run `npm run dev`.
6. View website at [http://localhost:3000](http://localhost:3000).

---

## Production

- This website is hosted by [Vercel](https://vercel.com/).
- Every push to the `main` branch will deploy a new build to production.
- The production website can be viewed at `https://www.flatbread.app`.

---

## Versioning

- This project uses [CalVer](https://calver.org/) as the project versioning convention.
- CalVer scheme: `YYYY.0M.0D_MICRO`:
  - `YYYY` - Full year (e.g. `2022` = 2022).
  - `0M` - Zero-padded month (e.g. `09` = September).
  - `0D` - Zero-padded day (e.g. `02` = Second day of the month).
  - `_MICRO` - Version released (e.g. `_2` = second release under the same `YYYY.0M.0D` version).

---

## Tech stack

- **Front End Framework:** [Next.js](https://nextjs.org/) - A React framework for developing single page and multi-page JavaScript applications and websites.
- **Headless CMS:** [Contentful](https://www.contentful.com/) - An API-first content management platform to create, manage and publish content on any digital channel.
- **Hosting:** [Vercel](https://aws.amazon.com/ec2/) - A cloud platform for static sites and serverless functions.
