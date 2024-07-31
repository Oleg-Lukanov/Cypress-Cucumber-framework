class RegistrationPage {
  elements = {
    usernameField: () => cy.get('input[placeholder="Username"]'),
    emailField: () => cy.get('input[placeholder="Email"]'),
    passwordField: () => cy.get('input[placeholder="Password"]'),
    signUpButton: () => cy.contains('button', 'Sign up'),
    errorMessage: () => cy.get('.error-messages'),
  };

  register(username, email, password) {
    if (username) this.elements.usernameField().type(username);
    if (email) this.elements.emailField().type(email);
    if (password) this.elements.passwordField().type(password);
    this.elements.signUpButton().click();
  }
}

// module.exports = new RegistrationPage();
export const registrationPage = new RegistrationPage();
