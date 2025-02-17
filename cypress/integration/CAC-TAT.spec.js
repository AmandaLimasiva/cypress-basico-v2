// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function(){
    const tresSegundos = 3000
    beforeEach(function(){ //Antes de cada Teste, faça a visita a URL
        cy.visit('./src/index.html')
    })

    it('Verifica o título da aplicação', function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') 
    })

    it('Preenche os campos obrigatórios e envia o formulário', function(){

        const logText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."

        cy.clock()

        cy.get('#firstName').type('Amanda')
        cy.get('#lastName').type('Lima')
        cy.get('#email').type('amandalimasiva@gmail.com')
        cy.get('#open-text-area').type(logText, {delay: 0})//Melhorar o tempo do teste 
        cy.contains('button', 'Enviar').click() //Botão que tem o texto Enviar

        cy.get('.success').should('be.visible')

        cy.tick(tresSegundos)//3000

        cy.get('.success').should('not.be.visible')

    })

    //Only - Faça apenas esse caso de teste
    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){

        cy.clock()

        cy.get('#firstName').type('Amanda')
        cy.get('#lastName').type('Lima')
        cy.get('#email').type('amandalimasiva.gmail.com')// Email inválido
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(tresSegundos)//3000

        cy.get('.error').should('not.be.visible')
    })

    it('Valida se o campo aceita valor não numérico', function(){

        cy.get('#firstName').type('Amanda')
        cy.get('#lastName').type('Lima')
        cy.get('#email').type('amandalimasiva@gmail.com')
        cy.get('#phone')
        .type('ops ops ops')
        .should('have.value', '')

    })

    
    it('Telefone obrigatório', function(){


        const logText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        
        cy.clock()

        cy.get('#firstName').type('Amanda')
        cy.get('#lastName').type('Lima')
        cy.get('#email').type('amandalimasiva@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type(logText, {delay: 0})//Melhorar o tempo do teste 

        //Envia o forms
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')//Valida

        cy.tick(tresSegundos)//3000

        cy.get('.error').should('not.be.visible')

        //Não adicionar o campo telefone de propósito
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        //Nome
        cy.get('#firstName')
            .type('Amanda')
                .should('have.value', 'Amanda')//Valida se o que foi digitado no campo Nome é Amanda, que é o valor correto
                    .clear()
                        .should('have.value', '')

        cy.get('#lastName')
            .type('Lima')
                .should('have.value', 'Lima')
                    .clear()
                        .should('have.value', '')

        cy.get('#email')
            .type('amandalimasiva@gmail.com')
                .should('have.value', 'amandalimasiva@gmail.com')
                    .clear()
                        .should('have.value', '')

    cy.get('#phone')
        .type('11946258963')
            .should('have.value', '11946258963')
                .clear()
                    .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function(){

        cy.clock()

        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

        cy.tick(tresSegundos)//3000

        cy.get('.error').should('not.be.visible')
    })

    //Comandos custumizados - UAU

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })




    //Testando Select - Opcion
    it('YouTube', function(){
        cy.get('#product')
            .select('YouTube')
                .should('have.value', 'youtube')
    })

    it('Seleciona um produto - Mentoria por seu valor - value ', function(){
        cy.get('#product')  
            .select('mentoria')
                .should('have.value', 'mentoria')
    })

    it('Seleciona um produto - Blog por Index', function(){
        cy.get('#product')
            .select(1)
                .should('have.value', 'blog')
    })

    //Radio

    it('Seleciona a opção Feedback', function(){
        cy.get('input[type ="radio"][value="feedback"]').check() //Seleciona
            .should('have.value', 'feedback')
    })

    it('Marca cada tipo de atendimento', function(){
        cy.get('input[type ="radio"]')
            .should('have.length', 3)
                .each(function($radio){
                    cy.wrap($radio).check()
                    cy.wrap($radio).should('be.checked')
                })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .last()
        .uncheck()
        .should('not.be.checked')
        //cy.get('#email-checkbox').check() cy.get('input[type="checkbox"]').
            //.should('have.value', 'email')
        //cy.get('#email-checkbox').uncheck()

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){

    })
    
    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')//'//cy.get('#file-upload')
            .should('not.have.value')
                .selectFile('./cypress/fixtures/example.json')
                    .should(function($input){
                        expect($input[0].files[0].name).to.equal('example.json')
                    })
    })
    
    //drag-drop - Arrastando de outra janela
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')//'//cy.get('#file-upload')
            .should('not.have.value')
                .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
                    .should(function($input){
                        expect($input[0].files[0].name).to.equal('example.json')
                    })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it(' verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
        cy.get('#privacy a').click()
            cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')//E conter a mensagem..
        .invoke('hide')
        .should('not.be.visible')
        cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', () => {
        const text = Cypress._.repeat('Isso é um teste!', 20)

        cy.get('#open-text-area')
            .invoke('val', text)
            .should('have.value', text)

    })

    it('faz uma requisição HTTP', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response){
            const{ status, statusText, body} = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('Central de Atendimento ao Cliente TAT')
        })
    })

    it.only('Achar Gato', () => {
        cy.get('#cat').invoke('show')
        .should('be.visible')
    })

})