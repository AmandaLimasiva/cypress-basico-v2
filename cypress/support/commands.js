Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){

    cy.get('#firstName').type('Amanda')
    cy.get('#lastName').type('Lima')
    cy.get('#email').type('amandalimasiva@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

})