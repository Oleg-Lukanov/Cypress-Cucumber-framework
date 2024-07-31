class EditorPage {
  elements = {
    titleField: () => cy.get('input[placeholder="Article Title"]'),
    descriptionField: () => cy.get('input[placeholder="What\'s this article about?"]'),
    contentField: () => cy.get('textarea[placeholder="Write your article (in markdown)"]'),
    tagsField: () => cy.get('input[placeholder="Enter tags"]'),
    publishButton: () => cy.contains('button', 'Publish Article'),
    errorMessage: () => cy.get('.error-messages'),
  };

  createArticle(title, description, content, tags) {
    if (title) this.elements.titleField().type(title);
    if (description) this.elements.descriptionField().type(description);
    if (content) this.elements.contentField().type(content);
    if (tags) this.elements.tagsField().type(tags);
    this.elements.publishButton().click();
  }
}

// module.exports = new EditorPage();
export const editorPage = new EditorPage();

