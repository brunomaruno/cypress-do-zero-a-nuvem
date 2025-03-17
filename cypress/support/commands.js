// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/* Cypress.Commands.overwrite("type", (originalFn, subject, text, options = {}) => {
    options = { delay: 0, ...options }; // Define um delay padrão de 100ms, mas permite sobrescrever se necessário
    return originalFn(subject, text, options);
  }); */
   

  Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: "Primeiro Nome",
    lastName: "Ultimo Nome",
    email: "email@emai.com",
    phone: "1234567890",
    textao: "Texto grande"

  }) => {
    cy.get("#firstName").type(data.firstName);
    cy.get("#lastName").type(data.lastName);
    cy.get("#email").type(data.email);
    cy.get("#phone").type(data.phone);
    
    
    cy.get("#open-text-area").type(data.textao, { delay: 0 });

    cy.get('button[type="submit"]').click();
  })