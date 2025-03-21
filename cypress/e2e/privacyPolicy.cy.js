Cypress._.times(10, () => {
  it('md07 - Teste a página da política de privacidade de forma independente',() => {
    cy.visit('./src/privacy.html');
    cy.contains('h1', 'Política de Privacidade').should('be.visible');
  })
});






