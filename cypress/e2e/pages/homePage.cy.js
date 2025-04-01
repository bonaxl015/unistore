import spacebook from '../../pageObjects';

describe('When I open Spacebook website', () => {
  beforeEach(() => {
    cy.loadSpacebook();
  });

  it('should display the home page by default', () => {
    spacebook.homePage.container.should('be.visible');
  });
});
