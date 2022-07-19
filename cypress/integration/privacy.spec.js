  //Desafio!
/*it.only('testa a página da política de privavidade de forma independente', function(){
    cy.visit('./src/privacy.html')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    
})
*/

Cypress._.times(3, function(){
  it.only('testa a página da política de privavidade de forma independente', function(){
    cy.visit('./src/privacy.html')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    
})
})