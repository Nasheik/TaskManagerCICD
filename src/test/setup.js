import '@testing-library/jest-dom'

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: globalThis.vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: globalThis.vi.fn(), // deprecated
    removeListener: globalThis.vi.fn(), // deprecated
    addEventListener: globalThis.vi.fn(),
    removeEventListener: globalThis.vi.fn(),
    dispatchEvent: globalThis.vi.fn(),
  })),
})

// Mock IntersectionObserver
globalThis.IntersectionObserver = globalThis.vi.fn().mockImplementation(() => ({
  observe: globalThis.vi.fn(),
  unobserve: globalThis.vi.fn(),
  disconnect: globalThis.vi.fn(),
}))

