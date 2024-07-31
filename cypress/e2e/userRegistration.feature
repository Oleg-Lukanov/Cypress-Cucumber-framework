Feature: User Registration

  Scenario: The user can successfully register by filling in all required fields
    Given the user is on the Registration page
    When the user registers with a valid username, email, and password
    Then the user should be redirected to the Home page

  Scenario: The user cannot register with empty fields
    Given the user is on the Registration page
    When the user tries to register with empty fields
    Then error messages should be displayed indicating that all fields are required

   Scenario: The user cannot register with an empty username field
    Given the user is on the Registration page
    When the user registers with an empty username
    Then an error message should be displayed indicating the "Username" field is required

  Scenario: The user cannot register with an invalid email format
    Given the user is on the Registration page
    When the user registers with an invalid email format
    Then an error message should be displayed indicating the email address is invalid

  Scenario: The user cannot register with a short password
    Given the user is on the Registration page
    When the user registers with a short password
    Then an error message should be displayed indicating the password is too short

  # Scenario Outline: The user cannot register with an invalid field
  #   Given the user is on the Registration page
  #   When the user registers with <username>, <email>, and <password>
  #   Then an error message should be displayed indicating the field <field> is invalid

  #   Examples:
  #     | username | email          | password   | field        |
  #     |          | user@domain.com| password   | "Username"   |
  #     | user     | invalidemail   | password   | "Email"      |
  #     | user     | user@domain.com| 123        | "Password"   |
