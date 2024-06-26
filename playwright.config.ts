import { defineConfig, devices } from '@playwright/test';
import baseEnvUrl from './tests/utils/environmentBaseUrl';

const authSetup = process.env.AUTH_SETUP || 'auth-setup-admin';

require('dotenv').config();

export default defineConfig({
  //globalSetup: require.resolve('./tests/setup/global-setup'),
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: undefined,
  reporter: 'html',
  // timeout: 5000,
  use: {
    //storageState: 'storageState.json',
    headless: false,
    trace: 'on',
    baseURL: process.env.ENV === 'production' 
      ? baseEnvUrl.production.home
      : process.env.ENV === 'staging' 
        ? baseEnvUrl.staging.home
        : baseEnvUrl.local.home
  },

  projects: [
    { 
      name: 'auth-setup-user', 
      testMatch: /auth-setup-user\.ts/ 
    },
    { 
      name: 'auth-setup-admin', 
      testMatch: /auth-setup-admin\.ts/ 
    },
    { 
      name: 'auth-setup-admin-api', 
      testMatch: /auth-setup-admin-api\.ts/ 
    },
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'storageState.json',
       },
    },
    {
      name: 'chromium-auth',
      use: { 
        ...devices['Desktop Chrome'] ,
        // storageState: '.auth/admin.json', //use this in case you have multiple projects one per user
      },
      dependencies: [authSetup],
    },
  ],
});
