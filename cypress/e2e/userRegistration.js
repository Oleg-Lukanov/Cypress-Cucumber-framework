import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { registrationPage } from '../pages/registrationPage';
import { loginPage } from '../pages/loginPage';
import { faker } from '@faker-js/faker';

const getUserData = () => {
  const username = faker.internet.userName();
  const email = faker.internet.email();
  const password = faker.internet.password();
  return { username, email, password };
};

Given('the user is on the Registration page', () => {
  cy.visit('/register');
});

When('the user registers with a valid username, email, and password', () => {
  const { username, email, password } = getUserData();
  registrationPage.register(username, email, password);
  cy.writeFile('cypress/fixtures/user.json', { username, email, password });
  cy.wrap(username).as('username');
});

Then('the user should be redirected to the Home page', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/`);
});

When('the user tries to register with empty fields', () => {
  registrationPage.register('', '', '');
});

Then('error messages should be displayed indicating that all fields are required', () => {
  registrationPage.elements.errorMessage().should('contain', "email can't be blank");
});

When('the user registers with an empty username', () => {
  registrationPage.register('', faker.internet.email(), faker.internet.password());
});

Then('an error message should be displayed indicating the "Username" field is required', () => {
  registrationPage.elements.errorMessage().should('contain', "username can't be blank");
});

When('the user registers with an invalid email format', () => {
  registrationPage.register(faker.internet.userName(), 'invalidemail', faker.internet.password());
});

Then('an error message should be displayed indicating the email address is invalid', () => {
  registrationPage.elements.errorMessage().should('contain', 'email is invalid');
});

When('the user registers with a short password', () => {
  registrationPage.register(faker.internet.userName(), faker.internet.email(), '123');
});

Then('an error message should be displayed indicating the password is too short', () => {
  registrationPage.elements.errorMessage().should('contain', 'password is too short');
});
