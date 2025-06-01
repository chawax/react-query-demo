import '@testing-library/jest-dom';

// Pour empêcher les traces de console.error de Axios pourrir la sortie des tests
const nativeConsoleError = global.console.error;
global.console.error = (...args) => {
  if (args.join('').includes('Error: Network Error')) {
    return;
  }
  return nativeConsoleError(...args);
};
