// jest-dom.d.ts

import "@testing-library/jest-dom/extend-expect";

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toBeInTheDocument(): R;
      // Add other custom matchers if needed
    }
  }
}
