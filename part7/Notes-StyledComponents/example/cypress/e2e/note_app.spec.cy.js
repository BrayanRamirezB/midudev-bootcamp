/* eslint-disable no-undef */
describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Mictlan',
      username: 'Mictlan',
      password: '1234'
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
  })

  it('frontpage can be opened', () => {
    cy.contains('Notes')
  })

  it('login form can be opened', () => {
    cy.contains('Show Login').click()
  })

  it('User can login', () => {
    cy.contains('Show Login').click()
    cy.get('[placeholder="Username"]').type('Mictlan')
    cy.get('[placeholder="Password"]').type('1234')
    cy.get('#form-login-button').click()
    cy.contains('New Note')
  })

  it('login fails with wrong password', () => {
    cy.contains('Show Login').click()
    cy.get('[placeholder="Username"]').type('Mictlan')
    cy.get('[placeholder="Password"]').type('password-incorrect')
    cy.get('#form-login-button').click()

    cy.get('.error').should('contain', 'Wrong credentials')
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'Mictlan', password: '1234' })
    })

    it('a new note can be created', () => {
      const noteContent = 'a note created by cypress'
      cy.contains('New Note').click()
      cy.get('[placeholder="Write yor note content :)"]').type(noteContent)
      cy.contains('Save').click()
      cy.contains(noteContent)
    })

    describe.only('and a note exists', () => {
      beforeEach(() => {
        cy.createNote({
          content: 'First note from cypress',
          important: false
        })

        cy.createNote({
          content: 'Second note from cypress',
          important: false
        })

        cy.createNote({
          content: 'Third note from cypress',
          important: false
        })
      })

      it('it can be important', () => {
        cy.contains('Second note from cypress').as('theNote')

        cy.get('@theNote')
        cy.contains('make important').click()

        cy.get('@theNote')
        cy.contains('make not important')
      })
    })
  })
})
