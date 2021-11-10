/* eslint-disable no-undef */
/* eslint-disable jest/valid-expect */
/// <reference types="cypress" />

describe('Bookings View', () => {
  it('Should be able to View the Booking', () => {
    cy.visit(Cypress.config().baseUrl);

    // Click the btn-view (any)
    cy.get('[data-cy=btn-view]').eq(0).click();

    // Check the details and check the link if it's http://localhost:3000/booking/1
    cy.url().should('include', '/booking/1');

    // Check the details of the view
    cy.get('[data-cy=view-header]').should('be.visible');
    cy.get('[data-cy=view-header]').should('contain.text', 'EAC Hall');
    cy.get('[data-cy=view-header]').should(
      'contain.text',
      'Monday, November 15th 2021 (10:00 AM - 10:30 AM)'
    );

    cy.get('[data-cy=details-label-hostName]').should('have.text', 'Host name');
    cy.get('[data-cy=details-value-hostName]').should('have.text', 'John Doe');

    cy.get('[data-cy=details-label-guestsName]').should(
      'have.text',
      'Guests name'
    );
    cy.get('[data-cy=details-value-guestsName]').should('have.text', 'IT-4A1');
    cy.get('[data-cy=view-media]').should('be.visible');
  });

  it('Should be able to navigate back inside View', () => {
    cy.visit(Cypress.config().baseUrl);

    // Click the btn-view (any)
    cy.get('[data-cy=btn-view]').eq(0).click();

    // Check the details and check the link if it's http://localhost:3000/booking/1
    cy.url().should('include', '/booking/1');

    // Click the back
    cy.get('[data-cy=btn-back]').click();

    // Check the details and check the link if it's http://localhost:3000/booking/1
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
