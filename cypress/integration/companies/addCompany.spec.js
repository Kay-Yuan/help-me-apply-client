const clientURL = 'http://localhost:3000'

describe('add a company', () => {
  it('should successfully add a company', () => {
    cy.visit(clientURL + '/company')

    cy.get('[data-cy=button-add-company]').click()

    cy.get('[name=companyName').type(Math.random(1000) + Math.random(2000) + ' Group')
    cy.get('[name=companyURL').type('https://test.com')
    cy.get('[name=companyAddress').type('19 Ferny Avenue, Gooburrum, Queensland')
    cy.get('[name=recruiterName').type('Peter')
    cy.get('[name=recruiterEmail').type('peter@test.com')
    cy.get('[name=recruiterNumber').type('0400000000')

    cy.get('[for=mui-9]').click()
    cy.get('[data-cy=button-add]').should('not.be.disabled').click()

    cy.get('#notistack-snackbar').should('have.have.text', 'Company added successfully')
  })
})
