import '@testing-library/jest-dom';
import '@testing-library/jest-dom/vitest';
import { JSDOM } from 'jsdom';
import { vi } from 'vitest';

import { server } from './mocks/node';

// Import the MSW server setup

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// This is to prevent Axios console.error traces from cluttering the test output
const nativeConsoleError = global.console.error;
global.console.error = (...args) => {
  if (args.join('').includes('Error: Network Error')) {
    return;
  }
  return nativeConsoleError(...args);
};

const { window } = new JSDOM();

// window.matchMedia mock
window.matchMedia =
  window.matchMedia ||
  function (query: string) {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
  };

// IntersectionObserver mock
const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
window['IntersectionObserver'] = IntersectionObserverMock;

// Scroll Methods mock
window.Element.prototype.scrollTo = () => {};
window.Element.prototype.scrollIntoView = () => {};

// requestAnimationFrame mock
window.requestAnimationFrame = (cb) => setTimeout(cb, 1000 / 60);

// URL object mock
window.URL.createObjectURL = () => 'https://i.pravatar.cc/300';
window.URL.revokeObjectURL = () => {};

// navigator mock
Object.defineProperty(window, 'navigator', {
  value: {
    clipboard: {
      writeText: vi.fn(),
    },
  },
});

// Override globalThis
Object.assign(global, { window, document: window.document });
