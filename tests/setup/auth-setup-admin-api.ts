import { test as setup } from '@playwright/test';
import baseAPIUrl from '../utils/environmentBaseUrl';

const adminFile = '.auth/admin.json';

setup('authenticate as admin api', async ({ request }) => {
  const username = process.env.USERNAME_ADMIN || '';
  const password = process.env.PASSWORD || '';

  const baseURL = baseAPIUrl['local'].api;
  
  //const baseURL = setup.info().project.use.baseURL!+'/v1/';
  
  // Send authentication request. Replace with your own.
  await request.post(baseURL, {
    form: {
      user: username,
      password: password
    }
  });
  await request.storageState({ path: adminFile });
});