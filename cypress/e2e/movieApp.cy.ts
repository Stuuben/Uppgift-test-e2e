import { should } from "chai";
import { mockData } from "./../../src/ts/services/__mock__/movieservice";

let fakedata = [];

beforeEach(() => {
  cy.visit("/");
});

describe("MovieApps get movies", () => {
  it("Should request url", () => {
    cy.intercept("GET", "http://omdbapi.com/*", { mockData }).as("movieNow");
    cy.get("input").type("best");
    cy.get("button").click();
    cy.wait("@movieNow").its("request.url").should("contain", "best");
  });

  it("Should go to site", () => {});
  it("Should search for movies with input.value Star", () => {
    cy.intercept("GET", "http://omdbapi.com/*", mockData);
    cy.get("input").type("Star");
    cy.get("button").click();
  });
  it("Should find first h3", () => {
    cy.intercept("GET", "http://omdbapi.com/*", mockData);
    cy.get("input").type("Star");
    cy.get("button").click();
    cy.get("h3:first").contains("Best");
  });
  it("Should find 4 divs", () => {
    cy.intercept("GET", "http://omdbapi.com/*", mockData);
    cy.get("input").type("Best");
    cy.get("button").click();
    cy.get("div.movie").should("have.length", 4);
  });
  it("Should get error-message searching with 2 letters", () => {
    cy.intercept("GET", "http://omdbapi.com/*", fakedata);
    cy.get("input").type("st");
    cy.get("button").click();
    cy.get("p").contains("Inga sökresultat att visa");
  });
  it("Should get error-message searching with 2 letters", () => {
    cy.intercept("GET", "http://omdbapi.com/*", fakedata);
    cy.get("input").type("st");
    cy.get("button").click();
    cy.get("div.movie").should("have.length", 0);
  });
});
