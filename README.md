# This is Jian He

A personal portfolio site built around an interactive 3D globe.

## Stack

- [Create React App](https://create-react-app.dev/) (`react-scripts`)
- [react-globe.gl](https://github.com/vasturiano/react-globe.gl) + [three.js](https://threejs.org/) for the 3D globe
- Deployed to GitHub Pages via [gh-pages](https://github.com/tschaub/gh-pages)

## Project structure

```
public/index.html       CRA HTML template
src/index.js             React entry point
src/App.js                Top-level app shell
src/GlobeComponent.js      Page logic: city data, camera moves, hero text, city detail panel
src/GlobeComponent.css     Styles for the above
src/components/Globe.jsx   Thin wrapper around the react-globe.gl <Globe> instance
```

## Getting started

```bash
npm install
npm start
```

Opens the dev server at [http://localhost:3000](http://localhost:3000) with hot reload.

## Scripts

- `npm start` — run the dev server
- `npm run build` — production build to `build/`
- `npm test` — run tests (`react-scripts test`)
- `npm run deploy` — build and publish `build/` to the `gh-pages` branch

## Embeddable version

`create_embeddable_html.js` bundles a production build into a single
self-contained `embedded_globe.html` file (CSS/JS inlined), for
dropping the globe into another page (e.g. a Notion embed). Regenerate
it after a `npm run build`:

```bash
npm run build
node create_embeddable_html.js
```
