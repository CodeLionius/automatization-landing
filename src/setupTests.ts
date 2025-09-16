// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock IntersectionObserver for tests
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() { return null; }
  disconnect() { return null; }
  unobserve() { return null; }
};

// Mock performance for tests
Object.defineProperty(window, 'performance', {
  value: {
    now: () => 1234567890,
    mark: () => {},
    measure: () => {},
    getEntriesByName: () => [],
  },
  writable: true,
});

// Mock navigator for tests
Object.defineProperty(navigator, 'onLine', { writable: true, value: true });