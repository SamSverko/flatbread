# Directory structure

This document will go through the overall project directory structure and explain what files are used for what purpose.

The `PRIORITY` label is meant to be used as a quick reference to note if that file or directory is of importance to you. Here is what the label could be:

- `ALL` - No matter your scope of the project, it's best to be familiar with these.
- `BACK` - If you are working on anything backend-related (server, routing, API, etc.).
- `FRONT` - If you are working on anything frontend-related (views, styling, etc.).
- `IGNORE` - You can essentially ignore these. They are typically auto-generated folders such as `node_modules` or `.git`.
- `MONITOR` - These don't need direct attention, but it's a good idea to keep an eye on them as you work on the project.

```yaml
flatbread
│   .env.local                        # ALL     | Environment variables that control the application (e.g. secret database keys).
│   .env.local.example                # ALL     | Safe environment samples to use as a template for saving out your own .env.local file.
│   .gitignore                        # IGNORE  | Ignore files and folders from Git commits.
│   LICENSE                           # IGNORE  | A software license tells others what they can and can't do with the source code.
│   package.json                      # ALL     | Holds various metadata relevant to the project.
│   README.md                         # ALL     | This file introduces and explains the project.
│   yarn.lock                         # IGNORE  | Automatically generated based on project dependencies.
│
└───.git                              # IGNORE  | Contains all things version controlled, through Git.
└───.github                           # MONITOR | Covers all things relating to GitHub, such as issue templates, and GitHub action configurations.
└───.next                             # IGNORE  | Contains the optimized production build of the application.
└───docs                              # MONITOR | Contains all project-related documentation.
└───node_modules                      # IGNORE  | Project dependencies.
└───pages                             # ALL     | A page is a React Component that is associated with a route based on its file name.
│   api                               # BACK    | Any file here will be treated as an API endpoint instead of a page.
│
└───public                            # ALL     | Serve static files, like images.
└───src                               # ALL     | Source code for the application, including components, theme configuration, and more.
└───util                              # ALL     | Small functions used throughout the application.
```
