## How do I run this app?

1. `git pull` the repo
2. `npm install`
3. configure your `.env` file according to the suggestive specifications found in `example.env` (and have an appropriate PostgreSQL server live)
4. `npm run backend` (on your API server)
5. `npm run start` (on your HTTP server)

### Small Trivia

Now, you might be wondering: "alright, I can host HTTP on your backend, but HTTPS is waaaaay better and you should make your app run securely on it aswell!!!"

Well, go ahead and implement it yourself :^). This app's main purpose was for me to learn to code a more proper React & Redux Front End app, not a backend server. But if you'd still like to see an actual HTTPS server, check out https://github.com/Fsalker/sapunareala. It's great and very small :D.

## Available Back End Scripts (my OG scripts)

### `npm run backend`
Starts the Back End API server.

### `npm run "backend tests"`

Runs the tests against the API Server.

---

## Available Scripts (scripts that have been indefinitely borrowed)

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).