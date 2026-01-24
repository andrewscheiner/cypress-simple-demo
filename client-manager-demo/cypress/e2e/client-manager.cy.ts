function wait_demo() {
  cy.wait(1000);
}


// Describe this testing file (aka suite)
describe('Client Manager', () => {
  /**
   * beforeEach() block
   * Runs before each test in the suite
   */
  // Before each test, visit the app and wait for 500 milliseconds to ensure all elements fully load
  beforeEach(() => {
    //visit demo site
    // cy. indicates we are using Cypress / automated testing
    cy.visit('localhost:4200');
    wait_demo();
  });

  /**
   * it() block
   * Description and tests
   * This test suite will validate that the home page loads correctly
   */
  it('loads the home page', () => {
    // cy.get allows us to get an item on the page and test it
    // .should allows us to define the expected outcome

    //the page should be visible
    cy.get('[data-cy="client-manager-page"]').should('be.visible');
    //the client list should have at least one client
    cy.get('[data-cy="client-row"]').should('have.length.at.least', 1);
    //client list should have 2 clients upon initial load
    cy.get('[data-cy="client-row"]').should('have.length', 2);
  });

  /**
   * This test suite will ensure we can add a new client
   * Test all elements of the add client functionality
   */
  it('adds a new client', () => {
    //find the element to input a name and type a test name
    cy.get('[data-cy="input-name"]').type('Charlie Tester');
    wait_demo();
    //find the element to input an email and type a test email
    cy.get('[data-cy="input-email"]').type('charlie@test.com');
    wait_demo();
    //find the element to set a status and select Active
    cy.get('[data-cy="select-status"]').select('Active');
    wait_demo();

    //find the button to add the client and click it
    cy.get('[data-cy="btn-add-client"]').click();
    wait_demo();

    //verify the new client appears in the client list
    cy.get('[data-cy="client-row"]').should('contain', 'Charlie Tester');
    wait_demo();
  });

  /**
   * This test suite will ensure we can filter for a client
   */
  it('filters clients', () => {
    //find the input box for the filter functionality and type "alice"
    cy.get('[data-cy="input-filter"]').type('alice');
    wait_demo();

    //verify that all displayed clients contain "alice" in their text
    cy.get('[data-cy="client-row"]').each(row => {
      //the row should contain "alice"
      cy.wrap(row).should('contain.text', 'alice');
    });
    wait_demo();
  });

  /**
   * This test suite will ensure we can delete a client
   */
  it('deletes a client', () => {
    //delete the first client in the list
    cy.get('[data-cy="client-row"]').first().within(() => {
      //click the button to delete
      cy.get('[data-cy="btn-delete-client"]').click();
    });
    wait_demo();
    //client list should now have 1 clients
    // ID = 2: Bob Smith
    // Alice Johnson was deleted
    cy.get('[data-cy="client-row"]').should('have.length', 1);
    wait_demo();
  });
});