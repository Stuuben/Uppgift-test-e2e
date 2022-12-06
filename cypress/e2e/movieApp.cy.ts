import { mockData } from "./../../src/ts/services/__mock__/movieservice";

describe("MovieApps get movies", () => {
  it("Should go to site", () => {
    cy.visit("http://localhost:1234");
  });
  it("Should search for movies with input.value Star", () => {
    cy.visit("http://localhost:1234");
    cy.get("input").type("Star");
    cy.get("button").click();
  });
  it("Should find first h3", () => {
    cy.visit("http://localhost:1234");
    cy.get("input").type("Star");
    cy.get("button").click();
    cy.get("h3:first").contains("Star Wars: Episode IV - A New Hope");
  });
  it("Should find 10 divs", () => {
    cy.visit("http://localhost:1234");
    cy.get("input").type("Star");
    cy.get("button").click();
    cy.get("div.movie").should("have.length", 10);
  });
  it("Should get error-message searching with 2 letters", () => {
    cy.visit("http://localhost:1234");
    cy.get("input").type("st");
    cy.get("button").click();
    cy.get("p").contains("Inga sökresultat att visa");
  });

  /*   it("Should get 4 movies", () => {
    cy.visit("http://localhost:1234");
    cy.intercept("GET", "http://omdbapi.com/*", { mockData }).as(mockData);

    cy.wait("@mockMoives").its("request.url").should("contain", "Best");
  }); */
});
