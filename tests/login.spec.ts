import { test } from '@playwright/test';
import { LoginPage } from '../pageObjects/loginPage';

test.describe('Login Tests', () => {
    test('Validar Login Exitoso', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('Admin', 'admin123');
        await loginPage.validateLoginSuccess();
    });

    test('Validar Login Fallido', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('Admin', 'wrongpassword');
        await loginPage.validateLoginFailure();
    });
});
