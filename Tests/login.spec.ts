import { test, expect } from '@playwright/test';
import { LoginPage } from '../PageObjects/LoginPage';
import { homePage } from '../PageObjects/homePage';
import dotenv from 'dotenv';

dotenv.config();

let loginPage : LoginPage;

test.beforeEach(async ({ page }) => {
    console.log('Before each test');
    loginPage=new LoginPage(page);
    await loginPage.goto();
  });

test('Successful Login', async ({ page }) => {    

    await loginPage.login(); 
    await expect(page).toHaveTitle("Home - Hudl");
    const home = new homePage(page);
    await home.profileHeader.click();
    await expect(home.yourProfile).toBeVisible();
});

test('Failed Login - Valid email, Incorrect Password', async ({ page }) => {
    
    await loginPage.enterEmail();
    await loginPage.enterIncorrectPassword();
    await expect(page.locator('text=Your email or password is incorrect. Try again.')).toBeVisible();
});

test('Failed Login - Incorrect Email, Correct Password', async ({ page }) => {
    
    await loginPage.enterIncorrectEmail();
    await loginPage.enterPassword();
    await expect(page.locator('text=Incorrect username or password.')).toBeVisible();
});

test('Failed Login with invalid Email', async ({ page }) => {

    await loginPage.enterInvalidEmail(); 
    await expect(page.locator('text=Enter a valid email.')).toBeVisible();
});

test('Successful Login after Editing Incorrect Email', async ({ page }) => {

    await loginPage.enterIncorrectEmail(); 
    await loginPage.enterPassword();
    await expect(page.locator('text=Incorrect username or password.')).toBeVisible();
    await loginPage.editButton.click();
    await loginPage.login(); 
    await expect(page).toHaveTitle("Home - Hudl");
    const home = new homePage(page);
    await home.profileHeader.click();
    await expect(home.yourProfile).toBeVisible();
});

test('Failed Login - Show/Hide Password', async ({ page }) => {
    
    await loginPage.enterEmail();
    await loginPage.passwordInput.fill('showtext');
    await loginPage.showButton.click();
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'text');
    await loginPage.hideButton.click();
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
});