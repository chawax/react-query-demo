# Demo application for React Query

This project is a demo application for [React Query](https://react-query.tanstack.com/), a library used to manage server sate on React and React Native applications.

In addition to React Query, this project uses mainly these tools and libraries :

- [Vite](https://vitejs.dev/) as bundler
- [Vitest](https://vitest.dev/) as test runner
- [Chakra UI](https://chakra-ui.com/) as components library
- [React-i18Next](https://react.i18next.com/) for internationalization
- [React Router](https://reactrouter.com/) as router
- [React Hook Form](https://react-hook-form.com/) for forms
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit tests

To start the demo, first run `json-server` :

```bash
npm run json-server
```

It will start a small API server on `3004` port.

To start the application in development mode :

```bash
npm start
```

It will start the application in development mode on `5173` port. Any change to the source code will refresh the application.

To start the application in production mode :

```bash
npm run serve
```

It will start the application in production mode on `54173` port.

To build the application :

```bash
npm run build
```

It will generate production files in `dist` directory.
