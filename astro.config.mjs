// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://matthewpinsker.com',
  build: {
    // The stylesheet is small, so inline it to avoid a render-blocking request.
    inlineStylesheets: 'always',
  },
});
