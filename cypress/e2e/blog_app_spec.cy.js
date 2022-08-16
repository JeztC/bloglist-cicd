describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Tester',
      username: 'Tester',
      password: 'lol'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'Tester', password: 'lol' })
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Tester')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })
})

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Tester',
      username: 'Tester',
      password: 'lol'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Tester', password: 'lol' })
    })

    it('A blog can be created', function() {
      cy.get('#create-blog-button').click()
      cy.get('#blog-title').type('TestTitle')
      cy.get('#blog-author').type('TestAuthor')
      cy.get('#blog-url').type('http://localhost.com')
      cy.get('#create-new-blog').click()
      cy.get('.notification')
        .should('contain', 'A new blog TestTitle by TestAuthor added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('#create-blog-button').click()
      cy.get('.blog')
        .should('contain', 'TestTitle TestAuthor')
        .and('have.css', 'border-style', 'solid')
    })
  })
})

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Tester',
      username: 'Tester',
      password: 'lol'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Tester', password: 'lol' })
    })

    it('A blog can be liked', function() {
      const blog = { title: 'TestTitle', author: 'TestAuthor', url : 'http://localhost.com', likes : 50 }
      cy.createBlog(blog)
      cy.get('#create-blog-button').click()
      cy.get('.blog')
        .should('contain', 'TestTitle TestAuthor')
        .and('have.css', 'border-style', 'solid')
      cy.get('#view-button').click()
      cy.get('#like-button').click()
      cy.get('#like-button').click()
      cy.get('.likes')
        .should('contain', blog.likes + 1)
    })
  })
})

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Tester',
      username: 'Tester',
      password: 'lol'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Tester', password: 'lol' })
    })

    it('A blog can be deleted', function() {
      const blog = { title: 'TestTitle', author: 'TestAuthor', url : 'http://localhost.com', likes : 50 }
      cy.createBlog(blog)
      cy.get('#create-blog-button').click()
      cy.get('.blog')
        .should('contain', `${blog.title} ${blog.author}`)
        .and('have.css', 'border-style', 'solid')
      cy.get('#delete-button').click()
      cy.get('.blog')
        .not('contain', `${blog.title} ${blog.author}`)
    })
  })
})

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Tester',
      username: 'Tester',
      password: 'lol'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Tester', password: 'lol' })
    })

    it('The blogs are in the right order', function() {
      const blog = { title: 'TestTitle', author: 'TestAuthor', url : 'http://localhost.com', likes : 70 }
      const secondBlog = { title: 'TestTitle1', author: 'TestAuthor1', url : 'http://localhost.com', likes : 50 }
      cy.createBlog(blog)
      cy.createBlog(secondBlog)
      cy.get('#create-blog-button').click()
      cy.get('.blog').eq(0).should('contain', `${blog.title} ${blog.author}`)
      cy.get('.blog').eq(1).should('contain', `${secondBlog.title} ${secondBlog.author}`)
    })
  })
})