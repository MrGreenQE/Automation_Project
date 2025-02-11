import { Page, Locator } from '@playwright/test';

export class homePage {
    private page: Page;
    public yourProfile: Locator;
    public profileHeader: Locator;

    constructor(page: Page) {
    this.page = page;
    this.yourProfile = page.getByRole('link', { name: 'Your Profile' });
    this.profileHeader = page.getByRole('heading', { name: 'DG' });

    }
}