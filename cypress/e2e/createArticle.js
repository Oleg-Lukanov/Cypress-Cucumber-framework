import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { editorPage } from '../pages/editorPage';
import { articlePage } from '../pages/articlePage';
import { loginPage } from '../pages/loginPage';
import { faker } from '@faker-js/faker';

const getArticleData = () => {
  const title = faker.lorem.words();
  const description = faker.lorem.sentence();
  const content = faker.lorem.paragraphs();
  const tags = faker.lorem.words(3).split(' ').join(',');
  return { title, description, content, tags };
};

Given('the user is logged in', () => {
  articlePage.login();
});

Given('the user is on the editor page', () => {
  cy.visit('/editor');
});

When('the user creates an article with a valid title, description, content, and tags', () => {
  const { title, description, content, tags } = getArticleData();
  editorPage.createArticle(title, description, content, tags);
  cy.wrap(title).as('articleTitle');
});

Then('the article should be visible on the article page', function() {
  articlePage.elements.articleTitle().should('contain', this.articleTitle);
});

When('the user tries to create an article with an empty title', function() {
  const { title, description, content, tags } = getArticleData();
  editorPage.createArticle('', description, content);
});

Then('an error message should be displayed indicating the "Article Title" field is required', () => {
  cy.get('.error-messages li').should('contain', "title can't be blank");
});

When('the user tries to create an article with an empty description', function() {
  const { title, description, content, tags } = getArticleData();

  editorPage.createArticle(title, '', content);
});

Then('an error message should be displayed indicating the "What\'s this article about?" field is required', () => {
  cy.get('.error-messages li').should('contain', "description can't be blank");
});

When('the user tries to create an article with an empty content', function() {
  const { title, description, content, tags } = getArticleData();

  editorPage.createArticle(title, description, '');
});

Then('an error message should be displayed indicating the "Write your article (in markdown)" field is required', () => {
  cy.get('.error-messages li').should('contain', "body can't be blank");
});


