import fs from 'fs';

import { defineConfig } from 'cypress';
import CypressFailFastPlugin from 'cypress-fail-fast/plugin';

async function setupNodeEvents(on, config) {
  CypressFailFastPlugin(on, config);

  on('after:spec', (_spec, results) => {
    if (results?.video) {
      const failures = results.tests.some((test) =>
        test.attempts.some((attempt) => attempt.state === 'failed')
      );

      if (!failures) {
        fs.unlinkSync(results.video);
      }
    }
  });

  return config;
}

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents,
    specPattern: '**/*.cy.js'
  },
  retries: {
    runMode: 1
  },
  env: {
    url: 'http://localhost:3000',
    FAIL_FAST_STRATEGY: 'spec',
    FAIL_FAST_ENABLED: true,
    FAIL_FAST_BAIL: 1
  },
  defaultCommandTimeout: 5000,
  screenshotsFolder: 'cypress/screenshots',
  video: true,
  videosFolder: 'cypress/videos'
});
