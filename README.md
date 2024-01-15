# Uncle Big Bucks Hunting Lodge

This project is built with React and Styled with BootStrap and CSS. It uses:
* Redux/Toolkit for state management.
* AsyncThunk for api calls.
* Jest as a testing suite
* GitHub Actions to store all secrets and deploy directly to Netlify.
* All tests are run in the "Run Test Coverage" action, and the coverage report is printed in the console.

This project was built with React, uses Redux/Redux Toolkit for state managemant, and Bootstrap for base CSS stylings. 
## Available Scripts

# Testing Specifications

This projects meets the standard of 100% test coverage using Jest and Redux testing libraries

In the project directory, you can run:

### `npm run coverage`

Launches the test runner in the interactive watch mode.\

### `npm coverage`

Launches the test runner in the interactive watch mode and populates the coverage directory in with the test-coverage file.
The coverage for all components and relative files will be calculated.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**


### `npm run build` fails to minify
If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

# Deployment

This project's main branch is deployed to Netlify upon pull request merges
