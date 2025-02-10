import { Page, expect } from '@playwright/test';

export class UserManagementPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
        await this.page.waitForSelector('.oxd-table-body', { state: 'visible' });
    }

    async addUser() {
        await this.page.click('button:has-text("Add")');
        await this.page.waitForSelector('.oxd-form', { state: 'visible' });

        await this.page.click('div.oxd-select-text'); // Abre el dropdown de User Role
        await this.page.locator('.oxd-select-dropdown span:text("Admin")').click();

        await this.page.fill('input[placeholder="Type for hints..."]', 'John A. Doe');
        await this.page.waitForTimeout(1000);
        await this.page.locator('.oxd-autocomplete-option').click();

        await this.page.click('div.oxd-select-text'); // Abre el dropdown de Status
        await this.page.locator('.oxd-select-dropdown span:text("Enabled")').click();

        await this.page.fill('input[autocomplete="off"]:nth-of-type(1)', 'HappyTesting');
        await this.page.fill('input[autocomplete="off"]:nth-of-type(2)', 'HappyTesting123');
        await this.page.fill('input[autocomplete="off"]:nth-of-type(3)', 'HappyTesting123');

        await this.page.click('button:has-text("Save")');

        await this.page.waitForSelector('.oxd-toast-content', { state: 'visible' });
    }

    async searchUser(username: string) {
        await this.page.fill('input[placeholder="Type for hints..."]', username);
        await this.page.click('button[type="submit"]');
        await this.page.waitForTimeout(2000);
    }

    async validateUserExists(username: string) {
        const userRow = this.page.locator(`.oxd-table-body .oxd-table-card:has-text("${username}")`);
        await expect(userRow).toBeVisible();
    }
}
