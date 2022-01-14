# Flatbread

[![first-timers-only](https://img.shields.io/badge/first--timers--only-friendly-blue.svg)](https://www.firsttimersonly.com/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> "People who love to eat are always the best people. - Julia Child"

\- Flatbread.

---

## Project documents

- [README](https://github.com/SamSverko/flatbread/blob/main/README.md)
- [CODE OF CONDUCT](https://github.com/SamSverko/flatbread/blob/main/docs/CODE_OF_CONDUCT.md)
- [CONTRIBUTING](https://github.com/SamSverko/flatbread/blob/main/docs/CONTRIBUTING.md)
- [CONTRIBUTING CODE](https://github.com/SamSverko/flatbread/blob/main/docs/CONTRIBUTING_CODE.md)
- [COSTS](https://github.com/SamSverko/flatbread/blob/main/docs/COSTS.md)
- [DIRECTORY STRUCTURE](https://github.com/SamSverko/flatbread/blob/main/docs/DIRECTORY_STRUCTURE.md)
- [LICENSE](https://github.com/SamSverko/flatbread/blob/main/docs/LICENSE.md)
- [RESEARCH](https://github.com/SamSverko/flatbread/blob/main/docs/RESEARCH.md)

---

## What is Flatbread?

Flatbread is a **website for recipes**. That's it!

You might be wondering **"why even build this website?"** considering the dozens of already-existing recipes sites ([All Recipes](https://www.allrecipes.com/), [Epicurious](https://www.epicurious.com/), [Tasty](https://tasty.co/), [Yummly](https://www.yummly.com/) and many, many more) that already contain more recipes (and users) than anyone could even count? For us, it all boils down to **simplicity**. Flatbread wants to be as **lean** as you do on the first day of your new years resolution, as **accessible** as possible to work for **everyone**, and **free**. We were going to continue that list with "as free as possible", but while that would keep the list-trend going, it wouldn't be true. We want Flatbread to be free. Period (see the `.` before the word "Period"). There are enough things that you already pay money for, including food. Flatbread doesn't want to be yet another notch on your 'monthly-subscriptions' belt.

Speaking of spending money on food; while most of us spend somewhere around [**11% of our income on groceries**](https://www.thestreet.com/personal-finance/average-cost-of-food-14845479), Flatbread is looking to do something about that. A later phase of this project will be introducing the **Save-O-Matic Recipe Builder 3000** (working title). This feature will scrape the internet for weekly food flyers and pair what's on sale with what recipes are in the Flatbread database. That way you can save money while you meal prep for the week.

Let's peddle back to the lean segment of Flatbread's goals for a moment. It is too common for recipe websites to overload the user with bloat content and endless network requests. As a little experiment, we loaded a generic recipe page from three different recipe websites to test the number of network requests as well as the overall page weight. The results were not pretty:

- Website #1 had 162 network requests and loaded 1.0 MB of data! ([screenshot](https://github.com/SamSverko/flatbread/blob/main/docs/img/screenshot-1.png))
- Website #2 had 548 network requests and loaded 3.0 MB of data! ([screenshot](https://github.com/SamSverko/flatbread/blob/main/docs/img/screenshot-2.png))
- Website #3 had 484 network requests and loaded 19.0 MB of data! ([screenshot](https://github.com/SamSverko/flatbread/blob/main/docs/img/screenshot-3.png))

Do not get us started on those lovely full-screen popups that appear after a few seconds asking for you to sign up to their newsletter (we have a screenshot [here](https://github.com/SamSverko/flatbread/blob/main/docs/img/screenshot-4.png) and [here](https://github.com/SamSverko/flatbread/blob/main/docs/img/screenshot-5.png)).

We just wanted waffles people! We can do better.

Thanks for reading this far, friend! If you are interested in this project in any scope, feel free to check out our [Contributing document](https://github.com/SamSverko/flatbread/blob/main/docs/CONTRIBUTING.md).

---

## You keep saying 'we' when it looks like it's just you, Sam

We thank you for that great observation! Okay, seriously, Flatbread is not just for Sam. Yes, it's his side project to learn new things and become a better web developer, but to him, it's much more than that. It's (hopefully) the start of building a community around developing amazing tools for the internet to enjoy, learn new things, meet new people, and have fun along the way. That day may never come (I'm looking at you `Insights / Contributors: 1`), but this project will always aim to be as inclusive as possible.

Sam hopes to one day remove this section of the **README**.

---

## Development

This website is built using the [Next.js](https://nextjs.org/) framework.

To get the website running locally, please do the following:

1. Ensure your environment has [Git](https://git-scm.com/), [Node.js](https://nodejs.org/en/), and [npm](https://www.npmjs.com/) installed.
2. Clone repository, run `git clone https://github.com/SamSverko/flatbread.git`.
3. Install dependencies, run `npm i`.
4. Copy the `.env.local.example` file and rename it to `.env.local`. Update the values to your needs.
5. Start the website in development mode, run `npm run dev`.
6. View website at [http://localhost:3000](http://localhost:3000).

---

## Production

We're not quite there yet, however we will most likely be deploying this website to [Vercel](https://vercel.com/) due to it's extremely-interoperable nature with Next.js projects. Stay tuned!

---

## Resources

### Available scripts

- `npm run build` creates an optimized production build of your application. The output displays information about each route.
- `npm run dev` starts the application in development mode with hot-code reloading, error reporting, and more.
- `npm run lint` runs ESLint towards all project directories and files except those specified inside the `.eslintignore` configuration file..
- `npm start` starts the application in production mode. The application should be compiled with `npm run build` first.

### Tech stack

- **Hosting (TBD):** [Vercel](https://aws.amazon.com/ec2/) - A cloud platform for static sites and Serverless Functions.
- **Front End Framework:** [Next.js](https://nextjs.org/) - A React framework for developing single page and multi-page JavaScript applications and websites.
- **Headless CMS:** [Contentful](https://www.contentful.com/) - More than a headless CMS, Contentful is the API-first content management platform to create, manage and publish content on any digital channel.

---

## Contribute

If you would like to get involved in any way, feel free to give our [Contributing document](https://github.com/SamSverko/flatbread/blob/main/docs/CONTRIBUTING.md) a visit :blush:
