class LoginPage {
  elements = {
    emailField: () => cy.get('input[placeholder="Email"]'),
    passwordField: () => cy.get('input[placeholder="Password"]'),
    signInButton: () => cy.contains('button', 'Sign in'),
    // profileName: () => cy.get('.nav-item:nth-child(4) .nav-link'),
    profileName: () => cy.get(':nth-child(4) > .nav-link'),
    errorMessage: () => cy.get('.error-messages'),
  };

  login(email, password) {
    if (email) this.elements.emailField().type(email);
    if (password) this.elements.passwordField().type(password);
    this.elements.signInButton().click();
  }
}

// module.exports = new LoginPage();
export const loginPage = new LoginPage();
