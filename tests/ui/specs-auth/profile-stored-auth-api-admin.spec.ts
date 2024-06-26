import {test} from '@playwright/test';
import ProfilePage from '../pages/profile-page';
import pages from '../../utils/pages';

let profilePage: ProfilePage;

test.use({ storageState: '.auth/admin.json'});

test.beforeEach( async ({page}) => {
    page.goto(pages.profile);
})

test.describe('Profile Page with API login', () => {

    test('Test Profile Page loogedIn Admin', async ({ page }) => {
        profilePage = new ProfilePage(page);
        await profilePage.checkLoggedInAdmin();
    })
})