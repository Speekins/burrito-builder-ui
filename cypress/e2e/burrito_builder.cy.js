describe('Burrito Builder UI', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/orders', { fixture: '../fixtures/getorders.json' })
    cy.visit('http://localhost:3000')
  })

  it('should show current orders', () => {
    cy.get('.order').first().find('h3').should('contain', 'Gary')
    cy.get('.order').eq(1).find('h3').should('contain', 'Jerry')
    cy.get('.order').first().find('li')
      .should('contain', 'beans', 'lettuce', 'carnitas', 'queso fresco', 'jalapeno')
    cy.get('.order').eq(1).find('li')
      .should('contain', 'steak', 'pico de gailo', 'lettuce', 'carnitas', 'queso fresco', 'jalapeno')
  })

  it('should be able to type name', () => {
    cy.get('input[name="name"]').type('Terry')
    cy.get('input[name="name"]').should('have.attr', 'value', 'Terry')
  })

  it('should be able to add some ingredients', () => {
    cy.get('.ingredient-button').click({ multiple: true })
    cy.get('form > p')
      .should('contain', 'beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream')
  })

  it('should be able to submit order', () => {
    cy.submitOrder()
    cy.get('.order').eq(2).find('h3').should('contain', 'Terry')
    cy.get('.order').eq(2).find('li')
      .should('contain', 'carnitas', 'beans', 'cilantro')
  })

  // it('should be able to delete an order', () => {

  // })
})

describe('Burrito Builder Sad Path Stuff', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/orders', { fixture: '../fixtures/getorders.json' })
  })

  it('should alert user is no name is entered', () => {
    cy.get('button[name="cilantro"]').click()
    cy.get('.submit-button').click()
    cy.get('.alert').find('.alert-message').should('contain', 'UH OH! Looks like you haven\'t added a name or ingredients!')
    cy.get('.alert-message').should('be.visible')
  })

  // it('should alert the user if no ingredients have been selected', () => {

  // })

  // it('should hide alert message after informing the user', () => {

  // })
})