import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private page: Page;
    private emailInput: Locator;
    private continueButton: Locator;
    public passwordInput: Locator;
    public editButton: Locator;
    public showButton: Locator;
    public hideButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' })
        this.editButton = page.getByRole('link', { name: 'Edit email address' });
        this.showButton = page.getByRole('button', { name: 'Show password' });
        this.hideButton = page.getByRole('button', { name: 'Hide password' });
    }

    async goto() {
        const url = process.env.BASE_URL;
        if (!url) {
            throw new Error("BASE_URL is not defined in .env file!");
        }
        await this.page.goto(url);
    }

    async populateEmail(email: string ) {

    await this.emailInput.click();
    await this.emailInput.fill(email);
    await this.continueButton.click();
    }

    async populatePassword(password: string ) {

    await this.passwordInput.click();
    await this.passwordInput.fill(password);
    await this.continueButton.click();

    }

    async enterEmail(email: string = process.env.EMAIL || "") {
        if (!email) {
            throw new Error("EMAIL is not defined in .env file!");
        }
        await this.populateEmail(email);
    }

    async enterIncorrectEmail(email: string = process.env.INCORRECTEMAIL || "") {
        if (!email) {
            throw new Error("EMAIL is not defined in .env file!");
        }
        await this.populateEmail(email);
    }

    async enterInvalidEmail(email: string = process.env.INVALIDEMAIL || "") {
        if (!email) {
            throw new Error("EMAIL is not defined in .env file!");
        }
        await this.populateEmail(email);
    }

    async enterPassword(password: string = process.env.PASSWORD || "") {
        if (!password) {
            throw new Error("PASSWORD is not defined in .env file!");
        }
        await this.populatePassword(password);
    }

    async enterIncorrectPassword(password: string = process.env.INCORRECTPASSWORD || "") {
        if (!password) {
            throw new Error("PASSWORD is not defined in .env file!");
        }
        await this.populatePassword(password);
    }

    async login(email: string = process.env.EMAIL || "", password: string = process.env.PASSWORD || "") {
        await this.enterEmail(email);
        await this.enterPassword(password);
    }
}
