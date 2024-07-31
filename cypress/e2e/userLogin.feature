Feature: User Login

  Scenario Outline: The user cannot log in with an empty email field
    Given the user is on the Login page
    When the user tries to log in with empty email
    Then error messages should be displayed indicating the field email is required
 
  Scenario Outline: The user cannot log in with an empty password field
    Given the user is on the Login page
    When the user tries to log in with empty password
    Then error messages should be displayed indicating the field password is required

  Scenario Outline: The user cannot log in with an empty email and password field
    Given the user is on the Login page
    When the user tries to log in with empty email and password
    Then error messages should be displayed indicating fields email and password is required

  Scenario: The user can successfully log in with valid credentials
    Given the user is on the Login page
    When the user logs in with a valid email and password
    Then the user should be redirected to the Home page
    And the profile name should be the username

