# web-starter-kit

nextjs + tailwind based opinionated web starter kit

## Design Pattern

The core pattern is functional composition, which means the app is just a set of functions which can composed to build more complex functions and hence features. It doesn't follow MVC, MVP or MVVM etc.

### Why are we doing functional composition?

- it is simple to understand and use, no need to make too many decisions of where do we have a model, controller or service, everything is a function.
- it is declarative by nature, facilitates self documenting code.
- it is faster on the metal since (pure) functions can be memoized by modern browser engines.
- composition is better than inheritance in most of the cases, facilitates loose coupling and high cohesion.
- it tends to have state isolated.
- it is easy to unit test functions.

## Features

- uses only functional react.
- has ability to [SSR / SSG / ISR](https://www.jackherrington.com/csr-ssr-and-ssg-on-nextjs/).
- custom solution for state management.
- works on [nodejs](https://nodejs.org/en/) 10 and above.
- stays updated with latest nextjs releases and hence latest versions of [react](https://reactjs.org/) / [webpack](https://webpack.js.org/).
- uses [airbnb eslint rules](https://github.com/airbnb/javascript) for react developement.
- has env setup for [jest](https://jestjs.io/) and [react testing library](https://testing-library.com/docs/react-testing-library/intro/) for unit testing.
- uses module / nomodule approach for shipping js bundles.
- scripts for dev / precommits / coverage etc. uses [husky](https://www.npmjs.com/package/husky)
- generates source maps.
- uses [source map explorer](https://www.npmjs.com/package/source-map-explorer) to generate bundle size reports.
- takes care of all necessary meta tags for web / social.
- manifest.json file.
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

## Getting started

```
git clone git@github.com:anky2k/web-starter-kit.git
cd web-starter-kit
npm i
npm run build
npm run local
```

This will start a local webserver with http2 and gzip to mimic real web server

```
  npm run serve
```

This will start a local mock app

```
  npm run mock
```

To run test cases

```
  npm run test
```

## Running Docker

```
docker build . -f=Dockerfile -t=webapp-1.0
```

```
 docker run -d --publish 8001:80 webapp-1.0
```

```
 curl http://localhost:8001
```

### to debug docker container

```
docker run -it --rm webapp-1.0 /bin/ash
```
## state management

Not every app is reactive in nature, a lot f times the idea is to pull data and render. Data can be categorised in two parts

- application data - this is regarding application states itself, like loading, error states etc.
- bussiness data - this is what we fetch from the backend via apis.
  
 the approach that this repo uses is to have application data managed by react context with hooks. React context should never manage bussiness data. The repo structure has folder called  [sources](https://github.com/anky2k/web-starter-kit/tree/main/src/sources) which by definition is a set of async functions which take in request params and respond with some data, source of data can be anything from an api to some sort of browser storage etc, these can be memoized as well basis request params using the [api-middleware](https://github.com/anky2k/web-starter-kit/blob/07cb1fa89ddf7bfa9107ab3844fb82b319eb1397/src/network/utils.js#L49).

Example :
list top repos from github - its a typical use case where we want to fetch some data transform it and render in UI - this doesn't have to be reactive

```
/src/sources/repos ->

async function getTopRepos({ lang }) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath('test')}/search/repositories?q=${lang}&sort=stars&order=desc`;
    response = await get(apiPath);
    response.data.requestedWith = { lang };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
const [srGetTopRepos, clearGetTopRepos] = apiMiddleWare(getTopRepos, transformSuccess, transformError);
export { srGetTopRepos, clearGetTopRepos };
------------------------------------------------------------------------------------------
src/components/github-repo-list ->

import React, { useEffect, useState } from 'react';
import SearchResults from '../search-results';
import { srGetTopRepos } from '../../sources/repos';
import ComponentStateHandler, {
  useFetcher
} from '../commons/component-state-handler';
import { track } from '../../analytics';

const GitHubRepoList = () => {
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const dataFetcher = () => srGetTopRepos({ lang: 'ruby' });
  const onDataFetched = data => {
    setItems(data.items);
    setTotalCount(data.totalCount);
  };
  useEffect(() => {
    track('View Page', { a: 'b' });
  }, []);
  const [fetchState] = useFetcher(dataFetcher, onDataFetched);
  return (
    <>     
      <ComponentStateHandler state={fetchState}>
        <SearchResults items={items} totalCount={totalCount} />
      </ComponentStateHandler>
    </>
  );
};

export default GitHubRepoList;
```

In the above example all we do is declare an async function and consume it, since it can be memoized basis request params we could import the same function as many times as we want in any component without making duplicate calls. Which means data is now persisted across the app without redux also the code is readable and declarative in nature. All one has do is import a fucntion and call it.

## for lhci to run locally please do the following

  ```
  npm i -g lhci/ci
  ```

## state sharing via routes

redux is not used for state management, hence to share data between pages we use route states - but unfortunately nextjs does not support route state i guess this is because they have an isomorphic router they allow data sharing only via query params, now to support route state we have extended the next router to have a method pushState which saves the data to be shared in session storage. And leveraging the getIntialProps lifecycle hook we read the data from storage and pass it on to the respective page (via withRouteState) but this doesn't seem to work by adding a basePath (i think this is because the basepath is not physically present in the pages directory), hence added a hook for to solve for that

## Support for localisation

- URLs should be parameterized with a language code (i.e. locale subpaths).
- The app needs to be able to read the locale from the URL (during SSR and client-side navigation).
- The URL language parameter must be kept in sync with the app’s internal state.
- It must be possible to change the language.
- The app should be able to set a language when it is accessed for the first time at a root (url-agnostic) URL (preferably by performing some sort of auto-detection with a fallback to the default setting).
- The language selected by a user should be saved as their preference for future sessions.
- The contents of the website/app should be translated/localized based on the current language setting.
- The app’s metadata should respect the selected language setting (for SEO purposes).

## Approach

multi lingual support is very different when its via CSR / SSR / SSG and we might need to solve for all cases but our priority is SSG since we believe most of the webapp cases in should be addressed with SSG.

via SSR

- generate version of pages for respective language at run time and cache it in cdn, the page to have language as base path in the route
  example - com/en/recharge,  com/hi/recharge
  this is so that language specific pages are directly discoverable and shareable

A user journey would look like this

- user lands on the app for the first time (any page)
- app checks if language context exists in the path, if not then checks user pref (local storage), if not checks browser locale. Hence a decision is made for the user as to what is the current language. This should also go as an input to apis
- if the current app env and the selected language from step 2 doesn't match user gets redirected to the respective context
example :
user lands on com but has the browser locale set to hindi - user will be taken to com/hi page OR
user lands on com but has the user pref set to hindi - user will be taken to com/hi page

- user can switch the language at any point from the app - this sets a local pref and redirects to language context page
