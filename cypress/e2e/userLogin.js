import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { loginPage } from '../pages/loginPage';

Given('the user is on the Login page', () => {
  cy.visit('/login');
  cy.fixture('user.json').as('user');
});

When('the user logs in with a valid email and password', function () {  
  const email = this.user.email;
  const password = this.user.password;
  
  loginPage.login(email, password);
  
});

Then('the user should be redirected to the Home page', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/`);
});

Then('the profile name should be the username', function() {
  loginPage.elements.profileName().should('contain', this.user.username);
});

When('the user tries to log in with {string} and {string}', (email, password) => {
  loginPage.login(email, password);
});

Then('error messages should be displayed indicating the field {string} is required', (field) => {
  if (field.includes("Email")) {
    loginPage.elements.errorMessage().should('contain', "Email can't be blank");
  }
  if (field.includes("Password")) {
    loginPage.elements.errorMessage().should('contain', "Password can't be blank");
  }
  
});

When('the user tries to log in with empty email', () => {
  loginPage.login('', 'password');
});

Then('error messages should be displayed indicating the field email is required', (field) => {
    loginPage.elements.errorMessage().should('contain', "email can't be blank");
 });

When('the user tries to log in with empty password', () => {
  loginPage.login('email', '');
});

Then('error messages should be displayed indicating the field password is required', (field) => {
    loginPage.elements.errorMessage().should('contain', "password can't be blank");
});

When('the user tries to log in with empty email and password', () => {
  loginPage.login('', '');
});

Then('error messages should be displayed indicating fields email and password is required', (field) => {
    loginPage.elements.errorMessage().should('contain', "email can't be blank");
});
