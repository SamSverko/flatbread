# Contributing

We're really happy you're reading this! Thank you for taking the time to contribute!

The following is a set of notes for contributing to Flatbread. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a [new issue](https://github.com/SamSverko/flatbread/issues) or pull request.

---

## Code of conduct

This project and everyone participating in it is governed by the [Flatbread Code of Conduct](https://github.com/SamSverko/flatbread/blob/main/docs/CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project owner (Sam) with a message on Discord (SamTheBigs#3861).

---

## What should I know before I get started?

Flatbread is **welcome to anyone at any skill level** who wants to contribute!

Maybe one of the scenarios below describes you. If any are a 'yes' from you, then you've come to the right place! If no, you've still come to the right place!

- Are you an aspiring developer interested in contributing to your first (or second, or third) open-source project?
- Have you really only ever used Git by yourself and are looking to learn how to work on a project with other collaborators?
- Are you a front end developer stumped at how to approach full stack?
- Are you looking to do some good with your super powers (i.e. your coding abilities)?
- Do you want to collaborate with others and learn new things?
- Are you stuck on what to learn or a side project?

We are building Flatbread from the ground up. We are focused on keeping the website as accessible as possible. This we are aiming to maintain the highest level of accessibility possible, currently for [Web Content Accessibility Guidelines (WCAG) 2.1 level AA](https://www.w3.org/TR/WCAG21/) compliancy. If we have the ability to create amazing tools for everyone, we have a duty to make it as accessible to as many people as we possibly can.

We are building Flatbread for the world, this means that we are putting the needs of the end-user before us developers. We are committed to learning what is required, and implement to best practices whether this is code or design.

This is an open source project. Consider the people who will read your code or view your design, and make it look nice for them. It's sort of like driving a car: Perhaps you love doing donuts when you're alone, but with passengers the goal is to make the ride as smooth as possible.

Sounds good so far? Read on!

---

## How can I contribute?

This section details a variety of options for contributing to Flatbread, whether this is code, design, or ideas. While this part is quite extensive, the takeaway is really that **everyone is encouraged to contribute**. While the foundation is being built for Flatbread, we are aiming to outline everything as clearly as possible, so that any newcomer can understand where their abilities will be best directed to. If you are a front end developer, but are looking to learn back end, you can contribute to either!

Read the [Contributing Code document](https://github.com/SamSverko/flatbread/blob/main/docs/CONTRIBUTING_CODE.md) if you want to contribute code.

### Design

You can be honest, Flatbread could use a makeover. Maybe you're a UI/UX/OP/GG/RRSP/whatever-new-acronym-the-kids-are-using-these-days Designer, where you have that keen design eye to make things look and function at the next level. Flatbread needs you to help us create a visually stunning and accessible interface that has both form and function.

### Front end

Know a little HTML/CSS/JS? Know a lot of HTML/CSS, but not so much JS? Know a little HTML/CSS, and a lot of JS? Or something in between? Perfect! You can contribute to the front end portion of Flatbread.

### Back end & api

Okay, confession time, the back end is currently being developed by beginners. Good news, that means you're in the right place if you're at or beyond our level. We are always looking for guidance from experienced back-end developers, and support from newcomers.

### Reporting bugs

Want to start small, but have a huge impact on the integrity of the Flatbread website? Open it up in your favourite browser, open up the dev-tools, and play around with the functionality. We are always iterating new designs and features, yet want to adhere to accessibility standards. Maybe use this handy [WCAG 2.1 quick reference](https://www.w3.org/WAI/WCAG21/quickref/?currentsidebar=%23col_customize) and audit the site to see if we are fully compliant. If you come across a bug, or something doesn't quite look right, let us know!

The way we track bugs are through [GitHub issues](https://guides.github.com/features/issues/).

Found a bug? Let us know by creating a [new issue](https://github.com/SamSverko/flatbread/issues), selecting the "Bug report" template, fill that out, hit submit, and bam! You've just contributed to an open source project! Pat yourself on the back.

### Suggesting enhancements

We are always looking to improve Flatbread! This doesn't just mean performance improvements, or design alterations, it could also be future features or even product vision! You've read this far, so we know you probably have some great inspiration for this project, why not have your voice heard!

The way we track suggesting enhancements are through [GitHub issues](https://guides.github.com/features/issues).

Create a [new issue](https://github.com/SamSverko/flatbread/issues), select the "Feature request" template, and fill that out! We can then know about your awesome suggestion and take the steps to make it a reality (within reason, of course. Flatbread is not in the market of building rockets... yet...).

### Have another way you want to contribute?

Are you interested in contributing to Flatbread in a way that wasn't listed above? Create a [new issue](https://github.com/SamSverko/flatbread/issues), and let us know!

---

## Style guides

Below are guides that Flatbread follows to ensure all contributions remain standardized and consistent among all contributors. Do you know of a better system or guide we should be using? Let us know in a [new issue](https://github.com/SamSverko/flatbread/issues)!

### Accessibility

Flatbread is committed to comply with [WCAG 2.1 level AA](https://www.w3.org/TR/WCAG21/). We will be using this [WCAG 2.1 quick reference guide](https://www.w3.org/WAI/WCAG21/quickref/?currentsidebar=%23col_customize) as our auditing guide for design and development iterations.

### Git commit messages

- Use the present tense ("Add feature" not "Added feature").
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
- Limit the first line to 50 characters or less.
- Reference issues and pull requests liberally after the first line.

### Elements

- Order element attributes alphabetically. For example: `<p aria-label='My label.' className='my-class' id='my-id'>Hello there</p>`.

### Styling

- Styling for this project is provided by [Material-UI's CSS-in-JS solution](https://material-ui.com/styles/basics/).
- All class naming must adhere to the [Block Element Modifier (BEM)](http://getbem.com/naming/) methodology.
- Order selectors alphabetically. For example: `a {} h1 {} p {}`.
- Order declaration properties alphabetically, but ignore vendor prefixes (`-webkit`, `-moz`, `-o`, `-ms`). Meaning `-webkit-box-shadow` should be treated as starting with the letter `b`.
- Order action selectors alphabetically.
- Place `@media` declarations at the end of properties.
- Example:

```jsx
const useStyles = makeStyles((theme) => {
  return {
    pageContainer: {
      // declaration-property: declaration-value
      display: "inline-block",
      fontFamily: '"FontRobotoBold", sans-serif',
      textAlign: "center",
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
    },
  };
});
```

### Linting

All code must adhere to the project's [ESLint configuration](https://eslint.org/).

---

## Acknowledgements

Many thanks to the [The Atom editor contribution guidelines](https://github.com/atom/atom/blob/main/CONTRIBUTING.md) and [The Open Government contribution guidelines](https://github.com/opengovernment/opengovernment/blob/main/CONTRIBUTING.md) for document inspiration and wording.

---

## You have made it this far!

Thank you for taking the time to read through this document (or just scroll down to the bottom to see how long this really was). You might be thinking to yourself, "wow, there are a lot of notes for such a small project!" and you are right! This wasn't meant to scare anyone away, but for contributors of any skill level to feel at ease and a sense of belonging to this project. We are hoping that once the few first contributions make their way into Flatbread, that we all become familiar and even tweak the guidelines to better fit the project.

If after all this reading you are still interested in contributing, feel free to create a [new issue](https://github.com/SamSverko/flatbread/issues) with what you want to contribute with, or hit the project owner (Sam) up on Discord (SamTheBigs#3861). He doesn't bite :blush:
