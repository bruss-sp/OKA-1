import { Page, expect } from '@playwright/test';

export class LoginPage {
    private page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    async login(username: string, password: string) {
        await this.page.fill('input[name="username"]', username);
        await this.page.fill('input[name="password"]', password);
        await this.page.click('button[type="submit"]');
    }

    async validateLoginSuccess() {
        await expect(this.page.locator('.oxd-topbar-header-title')).toContainText('Dashboard');
    }

    async validateLoginFailure() {
        await expect(this.page.locator('.oxd-alert-content')).toContainText('Invalid credentials');
    }
}
