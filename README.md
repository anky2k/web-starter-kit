# web starter kit

nextjs + tailwind based opinionated web starter kit.

## Design Pattern

The core pattern is functional composition, which means the entire app is just be a set of functions which can composed to build more complex functions / features.

Why are we doing functional composition? :

- it is simple to understand and use, no need to make too many decisions of where do we have a model, controller or service. Everything is a function.
- it is declarative by nature, facilitates self documenting code.
- it is faster on the metal since (pure) functions can be memoized by modern browser engines.
- composition is better than inheritance in most of the cases, facilitates loose coupling and high cohesion.
- it tends to have state isolated.
- it is easy to unit test functions.

## Features

- uses only functional react.
- has ability to [SSR / SSG / ISR](https://www.jackherrington.com/csr-ssr-and-ssg-on-nextjs/).
- custom solution for state management.
- works on [nodejs](https://nodejs.org/en/) 14 and above.
- stays updated with latest nextjs releases and hence latest versions of [react](https://reactjs.org/) / [webpack](https://webpack.js.org/).
- uses [google conformance default by nextjs](https://web.dev/conformance/) for linting.
- has env setup for [jest](https://jestjs.io/) and [react testing library](https://testing-library.com/docs/react-testing-library/intro/) for unit testing.
- uses module / no-module approach for shipping js bundles.
- scripts for dev / precommits / coverage etc.
- generates source maps.
- uses [source map explorer](https://www.npmjs.com/package/source-map-explorer) to generate bundle size reports.
- takes care of all necessary meta tags for web / social.
-  manifest.json file.
- a fetch based isomorphic network lib.
- an HOC which can be used to handle component loading and error states with minimum pain.
- generates unit test reports and code coverage reports.
- uses css modules and [tailwind](https://tailwindcss.com/) as a styling solution.
- uses [lhci](https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/getting-started.md) for page  perf analysis. (WIP)
- has [budget.json](https://github.com/GoogleChrome/budget.json) and lighthouse config to run performance checks locally.
- has ability to push state via routes while using the router.pushState - refer Notes for more
- [error boundaries](https://github.com/bvaughn/react-error-boundary) for functional components
- vscode suggested extensions.
- lots of custom hooks.
- comes with a multi stage docker file with nginx setup enabling brotli compression.
- github actions to run lint checks, unit tests, compare head and base bundle sizes, run lhci

### Getting started

```bash
git clone https://github.com/anky2k/web-starter-kit.git
cd web-starter-kit
npm i
npm run dev
```

### Start a local webserver with http2 and gzip to mimic real web server

```bash
npm run serve
```

### Start a local mock app

```bash
npm run mock
```

### Run test cases

```bash
npm run test
```

### Running Docker

```bash
docker build . -f=Dockerfile -t=webapp-1.0
```

```bash
docker run -d --publish 8001:80 webapp-1.0
```

```bash
curl http://localhost:8001
```

```bash
# debug 
docker run -it --rm webapp-1.0 /bin/ash
```

## Localization

- URLs should be parameterized with a language code (i.e. locale subpaths).
- The app needs to be able to read the locale from the URL (during SSR and client-side navigation).
- The URL language parameter must be kept in sync with the app’s internal state.
- It must be possible to change the language.
- The app should be able to set a language when it is accessed for the first time at a root (url-agnostic) URL (preferably by performing some sort of auto-detection with a fallback to the default setting).
- The language selected by a user should be saved as their preference for future sessions.
- The contents of the website/app should be translated/localized based on the current language setting.
- The app’s metadata should respect the selected language setting (for SEO purposes).

## Approach

Multi lingual support is very different when its via CSR / SSR / SSG and we might need to solve for all cases but our priority is SSG since we believe most of the webapp cases in should be addressed with SSG.

### via CSR
generate version of pages for respective language at run time on browser, users will see default language page for sometime before it shows the language respective page after client side mount cycle is complete.

### via SSR

generate version of pages for respective language at run time and cache it in cdn, the page to have language as base path in the route
  example - com/en/movies,  com/hi/shows
  this is so that language specific pages are directly discoverable and shareable.

### via SSG

pre-generate version of pages for respective language at build time in respective folders as follows :

```bash
  /dist
    /en
    /hi
    /bn
```

this is so that language specific pages are directly discoverable and shareable.
  
## Notes

- for lhci to run locally please do the following

  ```bash
  npm i -g lhci/ci
  ```

- state sharing via routes

we donot use redux, hence to share data between pages we use route states - but unfortunately nextjs does not support route state i guess this is because they have an isomorphic router they allow data sharing only via query params, now to support route state we have extended the next router to have a method pushState which saves the data to be shared in session storage. And leveraging the getIntialProps lifecycle hook we read the data from storage and pass it on to the respective page (via withRouteState) but this doesn't seem to work by adding a basePath (i think this is because the basepath is not physically present in the pages directory), hence added a hook for to solve for that
