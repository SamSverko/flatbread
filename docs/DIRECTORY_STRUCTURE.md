# Directory structure

This document will go through the overall project directory structure and explain what files are used for what purpose.

The `PRIORITY` label is meant to be used as a quick reference to note if that file or directory is of importance to you. Here is what the label could be:

- `ALL` - No matter your scope of the project, it's best to be familiar with these.
- `BACK` - If you are working on anything backend-related (CMS, API, etc.).
- `FRONT` - If you are working on anything frontend-related (views, styling, etc.).
- `IGNORE` - You can essentially ignore these. They are typically auto-generated folders such as `node_modules` or `.git`.
- `PROJECT` - Configuration files for the repository and Next.js framework. These don't need direct attention, but it's a good idea to keep an eye on them as you work on the project.

```yaml
flatbread
│   .env.local                        # ALL     | Environment variables that control the application (e.g. secret CMS keys).
│   .env.local.example                # ALL     | Safe environment samples to use as a template for saving out your own .env.local file.
│   .eslintignore                     # PROJECT | Ignored files and folders from ESLint.
│   .eslintrc.json                    # PROJECT | ESLint configuration file.
│   .gitignore                        # IGNORE  | Ignored files and folders from Git commits.
│   next-env.d.ts                     # IGNORE  | TypeScript types for Next.js framework.
│   next.config.js                    # IGNORE  | Next.js framework configuration file.
│   LICENSE                           # IGNORE  | A software license tells others what they can and can't do with the source code.
│   package-lock.json                 # IGNORE  | Describes exact tree of project dependencies.
│   package.json                      # ALL     | Holds various metadata relevant to the project.
│   README.md                         # ALL     | This file introduces and explains the project.
│   yarn.lock                         # IGNORE  | Automatically generated based on project dependencies.
│   tsconfig.json                     # IGNORE  | TypeScript configuration file.
│
└───.git                              # IGNORE  | Contains all things version controlled, through Git.
└───.github                           # MONITOR | Covers all things relating to GitHub, such as issue templates, and GitHub action configurations.
└───.next                             # IGNORE  | Contains the optimized production build of the application.
└───components                        # ALL     | React components used throughout the application.
└───docs                              # MONITOR | Contains all project-related documentation.
└───node_modules                      # IGNORE  | Project dependencies.
└───pages                             # ALL     | A page is a React Component that is associated with a route based on its file name.
│   api                               # BACK    | Any file here will be treated as an API endpoint instead of a page.
└───public                            # ALL     | Serve static files, like images.
└───styles                            # FRONT   | Styles files.
└───util                              # ALL     | Small functions used throughout the application.
```
