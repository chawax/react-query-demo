// Nécessaire pour que les expects de Testing Library fonctionnent.
// Sinon on a des messages "Invalid Chai property:xxx"

import '@testing-library/jest-dom/extend-expect';

// Pour empêcher les traces de console.error de Axios pourrir la sortie des tests

const nativeConsoleError = global.console.error;
global.console.error = (...args) => {
  if (args.join('').includes('Error: Network Error')) {
    return;
  }
  return nativeConsoleError(...args);
};
