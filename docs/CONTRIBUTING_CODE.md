# Contributing code

If you are interested in contributing some code to Flatbread, then you've come to the right place! Have you only ever worked on Git projects by yourself and not quite sure how to collaborate with others? No problem! The goal of this document is to get you comfortable with working on a project with more than one contributor. Read on!

This project uses [Git](https://git-scm.com/) for version control (big surprise, I know).

Here is a breakdown of the process of working on Flatbread. We will assume that:

- You understand the basics of Git.
- Your local environment has Git, [Node](https://nodejs.org/en/), and [npm](https://www.npmjs.com/) installed.
- You have cloned the repository (run `git clone git@github.com:SamSverko/flatbread.git`).
- You have updated the project dependencies (run `yarn`).
- You are ready to have fun and write some code for Flatbread!

## Git process

All releases of Flatbread are pushed to the `main` branch. What you see on the `main` branch, assume that is live on the production server.

All development work is done on `feature` branches. When you want to work on a feature, you will branch off of the `main` branch into a `feature` branch, and do your coding there. Once you believe that the feature is ready for release, you will request to merge that `feature` branch into the `main` branch by creating a [pull request](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/about-pull-requests). The pull request must pass all necessary tests before a review will take place.Once the pull request has been reviewed and approved, the `feature` branch will be merged into the `main` branch. Once that is complete, your feature will be on the live site! How exciting!

Always make sure to check the status of the `main` branch, and ensure they are up to date before creating your feature branch. That's where the handy `git status`, `git fetch --prune`, and `git pull` commands come in.

After your `feature` branch has been successfully merged into the `main` branch, please delete the `feature branch`. It is no longer needed.

If you have a _super_ minor change to make, such as fixing a typo in a document, in certain situtations, you can make that change directly in the `main` branch. No need to create a new feature branch for something that small.

## Git branch diagram

```
CURRENT
| |
| | <- feature-first (your second feature branch where you work on your code, etc...)
|/
|\<- feature-first (merged into main, and deleted after)
| |
| |
| |<- feature-first (your first feature branch where you work on your code)
|/
|<- main (this represents the live site)
PAST
```
