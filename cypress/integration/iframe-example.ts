
context('cypress-iframe', () => {
  it('should allow you to interact with elements in an iframe', () => {
    cy.visit('/')
    cy.frameLoaded({ url: 'http://localhost:9000/iframe.html' })
    cy.enter().then(body => {
      body().find('#spooky').should('not.be.visible')
      body().contains('Click Me!').click()
      body().find('#spooky').should('be.visible')
    })

    cy.get('#link-two').should('not.be.visible')
    cy.get('#link-one').click().should('not.be.visible')
    cy.get('#link-two').should('be.visible')

    cy.iframe().find('#spooky').should('be.visible')
    cy.iframe().contains('Click Me!').click()
    cy.iframe().find('#spooky').should('not.be.visible')
  })

  it('should work with a selector', () => {
    cy.visit('/double.html')
    cy.frameLoaded('#frame-one', { url: 'http://localhost:9000/iframe.html' })
    cy.frameLoaded('#frame-two', { url: 'http://localhost:9000/iframe.html' })
    cy.enter('#frame-one').then(body => {
      body().find('#spooky').should('not.be.visible')
      body().contains('Click Me!').click()
      body().find('#spooky').should('be.visible')
    })

    cy.get('#link-two').should('not.be.visible')
    cy.get('#link-one').click().should('not.be.visible')
    cy.get('#link-two').should('be.visible')

    cy.iframe('#frame-two').find('#spooky').should('not.be.visible')
    cy.iframe('#frame-two').contains('Click Me!').click()
    cy.iframe('#frame-two').find('#spooky').should('be.visible')
  })
})
