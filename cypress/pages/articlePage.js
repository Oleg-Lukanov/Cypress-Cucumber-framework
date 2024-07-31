class ArticlePage {
  elements = {
    articleTitle: () => cy.get('h1'),
    commentField: () => cy.get('textarea[placeholder="Write a comment..."]'),
    postCommentButton: () => cy.contains('button', 'Post Comment'),
    commentText: () => cy.get('.card-text'),
    deleteCommentButton: () => cy.get('.mod-options'),
    deleteArticleButton: () => cy.get('.article-actions .btn-outline-danger'),
  };

  login() {
    cy.fixture('user.json').as('user');
  
    cy.get('@user').then((user) => {
      cy.request({
        method: 'POST',
        url: 'https://api.realworld.io/api/users/login',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          user: {
            email: user.email,
            password: user.password
          }
        }
      }).then((response) => {        
            window.localStorage.setItem('token', response.body.user.token);
            return response.body.user.token;  
        });
    });
  }

  createArticle(token) {
    const article = {
      title: faker.lorem.sentence(),
      description: faker.lorem.sentences(2),
      body: faker.lorem.paragraphs(3)
    };

    return cy.request({
      method: 'POST',
      url: 'https://api.realworld.io/api/articles',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: { article }
    }).then(response => response.body.article.slug);
  }

  addComment(comment) {
    this.elements.commentField().type(comment);
    this.elements.postCommentButton().click();
  }

  deleteComment() {
    this.elements.deleteCommentButton().click();
  }

  deleteArticle() {
    this.elements.deleteArticleButton().click();
  }
}

// module.exports = new ArticlePage();
export const articlePage = new ArticlePage();
