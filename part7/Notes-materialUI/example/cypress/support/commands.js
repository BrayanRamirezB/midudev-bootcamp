/* eslint-disable no-undef */
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password
  }).then((reponse) => {
    localStorage.setItem('loggedNoteAppUser', JSON.stringify(reponse.body))
    cy.visit('http://localhost:5173/')
  })
})

Cypress.Commands.add('createNote', ({ content, important }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/notes',
    body: { content, important },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('loggedNoteAppUser')).token
      }`
    }
  })
  cy.visit('http://localhost:5173/')
})
