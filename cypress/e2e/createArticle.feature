Feature: Article Creation

  Scenario: The user can successfully create an article by filling in all required fields
    Given the user is logged in
    And the user is on the editor page
    When the user creates an article with a valid title, description, content, and tags
    Then the article should be visible on the article page

  Scenario: The user cannot create an article with an empty title field
    Given the user is logged in
    And the user is on the editor page
    When the user tries to create an article with an empty title
    Then an error message should be displayed indicating the "Article Title" field is required

  Scenario: The user cannot create an article with an empty description field
    Given the user is logged in
    And the user is on the editor page
    When the user tries to create an article with an empty description
    Then an error message should be displayed indicating the "What's this article about?" field is required

  Scenario: The user cannot create an article with an empty content field
    Given the user is logged in
    And the user is on the editor page
    When the user tries to create an article with an empty content
    Then an error message should be displayed indicating the "Write your article (in markdown)" field is required

    
