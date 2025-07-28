import unistore from '../../pageObjects';

describe('When I open UniStore website', () => {
  beforeEach(() => {
    cy.loadUnistore();
  });

  it('should display the home page by default', () => {
    unistore.homePage.container.should('be.visible');
  });
});
