import Chance from "chance";

const chance = new Chance();

describe("Register", () => {
  const username = chance.first();
  const email = chance.email();
  const password = "testpassword123";

  beforeEach(() => {
    cy.visit("http://localhost:3000/register");
  });

  it("has correct title", () => {
    cy.contains("Register");
  });

  it("signs up a new user", () => {
    cy.get("input[name=username]").type(username);
    cy.get("input[name=email]").type(email);
    cy.get("input[name=password]").type(password);

    cy.get("#register-submit").click();

    cy.url().should("eq", "http://localhost:3000/");
  });
});
