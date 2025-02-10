import { test } from '@playwright/test';
import { LoginPage } from '../pageObjects/loginPage';
import { UserManagementPage } from '../pageObjects/userManagementPage';

test.describe('Edición de Usuario Existente', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('Admin', 'admin123');
    });

    test('Agregar un usuario, filtrarlo y validar que fue creado exitosamente', async ({ page }) => {
        const userManagementPage = new UserManagementPage(page);
        await userManagementPage.navigate();

        console.log('➡️ Agregando usuario...');
        await userManagementPage.addUser();

        console.log('🔍 Filtrando usuario por nombre de usuario...');
        await userManagementPage.searchUser('HappyTesting');

        console.log('✅ Validando que el usuario existe en la tabla...');
        await userManagementPage.validateUserExists('HappyTesting');
    });
});
