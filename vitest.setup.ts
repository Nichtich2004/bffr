import '@testing-library/jest-dom/vitest';
import { beforeEach } from 'vitest';

// Clear storage before each test to ensure isolation
beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});
