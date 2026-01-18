This document provides context for the Gemini CLI to understand the project.

### Project Overview

This is a React application that displays a 3D globe using the `react-globe.gl` library. The application is set up to be built with `react-scripts` (Create React App) and also has a `vite.config.js` file. It's designed to be deployed to GitHub Pages.

### Key Technologies

*   **React:** The core frontend framework.
*   **react-globe.gl:** For rendering the interactive 3D globe.
*   **three.js:** A dependency of `react-globe.gl` for 3D graphics.
*   **Vite:** A build tool configured for the project.
*   **gh-pages:** For deploying the `build` folder to a `gh-pages` branch.

### Project Structure

*   `public/index.html`: Main HTML template.
*   `src/main.jsx`: The entry point for the React application when using Vite.
*   `src/App.jsx`: The main application component that renders the globe.
*   `src/components/Globe.jsx`: The component that encapsulates the `react-globe.gl` functionality. It displays points on the globe and handles user interaction.
*   `create_embeddable_html.js`: A Node.js script that likely bundles the application into a single HTML file for embedding elsewhere.
*   `embedded_globe.html`: The output of the `create_embeddable_html.js` script.
*   `index.html`: The main entry point for the application, which loads the React app.

### How to run the project

*   `npm install` to install dependencies.
*   `npm start` to run the development server using `react-scripts`.
*   `npm run build` to create a production build.
*   `npm run deploy` to deploy the application to GitHub Pages.
