import { defineConfig } from 'vitest/config';

// `npm run coverage` measures how much of the site's code the tests run.
// The dev server (src/) only runs on your computer, so it's left out.
export default defineConfig({
  test: {
    coverage: {
      include: ['public/**/*.js'],
      reporter: ['text', 'html'],
    },
  },
});
