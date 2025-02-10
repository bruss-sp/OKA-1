import { Page, expect } from '@playwright/test';

export class UserPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
    }

    async filterByRole(role: string) {
        await this.page.click('div.oxd-select-text-input'); // Abre el dropdown
        await this.page.waitForSelector('.oxd-select-dropdown', { state: 'visible' }); // Espera que el dropdown esté visible
        await this.page.locator(`.oxd-select-dropdown span:text("${role}")`).click(); // Selecciona el rol
        await this.page.click('button[type="submit"]'); // Presiona el botón de búsqueda
    }

    async validateResults() {
        const rows = await this.page.locator('.oxd-table-body .oxd-table-card').count();
        expect(rows).toBeGreaterThan(0); // Aseguramos que hay usuarios en la tabla
    
        for (let i = 1; i <= rows; i++) {
            const editButton = await this.page.locator('.oxd-table-body .oxd-table-card:nth-child(${i}) .bi-pencil-fill');
            const deleteButton = await this.page.locator('.oxd-table-body .oxd-table-card:nth-child(${i}) .bi-trash');
            
            await expect(editButton).toBeVisible();  // Validar que el botón de editar es visible
            await expect(deleteButton).toBeVisible();  // Validar que el botón de eliminar es visible
        }
    }
    
}
