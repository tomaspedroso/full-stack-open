describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const user = {
      name: 'root',
      username: 'root',
      password: 'secret',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
      cy.contains('Login successful')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.Notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'secret' })
      cy.visit('')
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('input[placeholder="Title"]').type('New')
      cy.get('input[placeholder="Author"]').type('root')
      cy.get('input[placeholder="Url"]').type('url.com')
      cy.contains('create').click()

      cy.contains('New by root added')
    })

    describe('and several blog exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'blog 1',
          author: 'author A',
          url: 'url I',
          likes: 10,
        })
        cy.createBlog({
          title: 'blog 2',
          author: 'author B',
          url: 'url II',
          likes: 30,
        })
        cy.createBlog({
          title: 'blog 3',
          author: 'author C',
          url: 'url III',
          likes: 20,
        })
        cy.visit('')
      })

      it('user can like a blog', function () {
        cy.contains('blog 1').contains('view').click()

        cy.get('.showWithView').should('contain', '10').and('not.contain', '11')

        cy.get('.showWithView').contains('like').click()

        cy.get('.showWithView').should('contain', '11').and('not.contain', '10')
      })

      it('user who creates can a blog can delete it', function () {
        cy.contains('blog 1').contains('view').click()

        cy.get('.showWithView').contains('delete').click()

        cy.contains('blog 1 author A').should('not.exist')
      })

      it('only the create of a blog can delete it', function () {
        cy.contains('logout').click()
        cy.contains('blog 1').contains('view').click()

        cy.get('.showWithView').contains('delete').should('not.exist')
      })

      it('blogs are ordered according to likes', function () {
        cy.get('.blogBody').eq(0).should('contain', 'blog 2')
        cy.get('.blogBody').eq(1).should('contain', 'blog 3')
        cy.get('.blogBody').eq(2).should('contain', 'blog 1')
      })
    })
  })
})
