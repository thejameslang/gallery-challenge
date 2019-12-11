# gallery-challenge

## What is this?

This is my submission to the Redfin UXE Gallery Challenge. It is a web UI project which when run features an initial view to see a grid of available Unsplash photo thumbnails. The user will be able to click/tap on a thumbnail to view in fullscreen mode. From there the user can return to the initial grid view by clicking/tapping 'close'.

The site has been deployed via Netlify to [here](https://jovial-perlman-1ae51f.netlify.com/).

## Requirements

Begin by installing the following:

- [Node.js](https://nodejs.org)

## Getting Started

### Install dependencies with npm

```bash
$ npm install
```

### Compile and hot-reload for development

```bash
$ npm run dev
```

After running the above, http://localhost:1234 should open in your default browser. Changes in the `src` directory and its sub-directories are watched.

### Building for production

```bash
$ npm run build
```

## What I would like to do with more time

If there was more time, I would like to have the following improvements:

- Design
  - ADA compliance
    - Designing for accessibility and inclusion.
  - Ability to move through photos without needing to exit full screen
    - a la TikTok's vertical scroll on mobile or even just the common left right arrows on desktop.
  - User testing
    - Conduct user studies to guide how design should progress from these initial example designs.
- Maintainability
  - Static type system and linter
  - Unit testing
  - Integration tests
  - e2e functional tests
- Reusability
  - Web components were used to satisfy the requirement to use [Vanilla JS](http://vanilla-js.com/). While this photo gallery was built using web components, it can also be tweaked and packaged to become a web component itself for use in other applications.
- My Technical Implementation Thoughts

  - I would like to have even a simple loading message so the user does not see the brief blank screen as the photos are loading.
  - Native lazy loading if keeping the Chrome only requirement or hybrid if supporting other browsers
  - Pagination is definitely a way to deal with a copious number of photos; could also split the array of photos recursively to a minimal amount of photos to show on screen at once to avoid bogging down the DOM. Inspiration [here](https://github.com/rinasm/react-eternal-list).

  If this was going out to Redfin customers, I would definitely prioritize accessibility and user testing. Since it is going on Redfin's website, I would package it as a web component for ease-of-use. Depending on the findings from user testing, enhancements to the design and subsequently the component itself could be determined. Concepts such as being able to TikTok/Instagram scroll between photos in full screen view could be tested with users before starting the more costlier-to-change dev effort.
