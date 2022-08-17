describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'https://blogapp-for-heroku.herokuapp.com/api/testing/reset')
    const user = {
      name: 'Tester',
      username: 'Tester',
      password: 'lol'
    }
    cy.request('POST', 'https://blogapp-for-heroku.herokuapp.com/api/users/', user)
    cy.visit('https://blogapp-for-heroku.herokuapp.com')
  })

  it('Login form is shown', function() {
    cy.contains('Welcome to Blog App!')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'Tester', password: 'lol' })
    })

    it('fails with wrong credentials', function() {
      cy.get('#floatingInput').type('Tester')
      cy.get('#floatingPassword').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })
})