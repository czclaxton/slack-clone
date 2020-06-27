import Chance from "chance";

const chance = new Chance();

describe("Login", () => {
  const email = chance.email();
  const password = "testpassword123";

  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("has correct title", () => {
    cy.contains("Login");
  });

  it("should warn about empty fields", () => {
    cy.get("#login-submit").click();
    cy.get(".bp3-intent-danger");
  });
});
