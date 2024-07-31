import { faker } from '@faker-js/faker';

Cypress.Commands.add('register', () => {
  const username = faker.internet.userName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  cy.visit('/register');
  cy.get('input[placeholder="Username"]').type(username);
  cy.get('input[placeholder="Email"]').type(email);
  cy.get('input[placeholder="Password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.wait(1000)

  // Save user data to a JSON file
  cy.writeFile('cypress/fixtures/user.json', { username, email, password });

  cy.wrap({ username, email, password }).as('user');
});

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('input[placeholder="Email"]').type(email);
  cy.get('input[placeholder="Password"]').type(password);
  cy.get('button[type="submit"]').click();
});
