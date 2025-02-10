import { test } from '@playwright/test';
import { LoginPage } from '../pageObjects/loginPage';
import { UserPage } from '../pageObjects/userPage';

test.describe('Filtro de Usuarios por Rol', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate(); // Ir a la página de login
        await loginPage.login('Admin', 'admin123'); // Iniciar sesión
        
        // Esperar hasta que el dashboard esté cargado antes de continuar
        await page.waitForSelector('.oxd-topbar-header-title', { state: 'visible' });
    });

    test('Validar que el filtro por rol "Admin" muestra las acciones "editar" y "eliminar"', async ({ page }) => {
        const userPage = new UserPage(page);
        await userPage.navigate();
        await userPage.filterByRole('Admin');
        await userPage.validateResults();
    });

});

