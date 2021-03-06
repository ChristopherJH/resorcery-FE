describe("Signed out user features work", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders correctly", () => {
    cy.get("#page-title").should("exist");
  });

  it("renders a sign-in button", () => {
    cy.get("#signin-button").should("exist");
  });
  it("doesn't render sign out button", () => {
    cy.get("#signout-button").should("not.exist");
  });

  it("renders a search bar which filters recommendations down to 2 matches", () => {
    cy.get("#searchbar").should("exist");
    cy.get("#searchbar").clear();
    cy.get("#searchbar").type("sql");
    cy.get(".recommendation").should("have.length", 2);
  });

  it("renders a search bar which filters recommendations down to 0 matches if it can't find the search term", () => {
    cy.get("#searchbar").should("exist");
    cy.get("#searchbar").clear();
    cy.get("#searchbar").type("lol");
    cy.get(".recommendation").should("have.length", 0);
  });

  it("the search bar does not return results for tags typed in", () => {
    cy.get("#searchbar").should("exist");
    cy.get("#searchbar").clear();
    cy.get("#searchbar").type("github");
    cy.get(".recommendation").should("have.length", 0);
  });

  it("clicking view all after using the searchbar shows all existing recommendations", () => {
    cy.get("#searchbar").should("exist");
    cy.get("#searchbar").clear();
    cy.get("#searchbar").type("github");
    cy.get(".recommendation").should("have.length", 0);
    cy.get("#view-all-button").click();
    cy.get(".recommendation").should("have.length", 4);
  });

  it("renders a tags dropdown which filters recommendations for the selected tag", () => {
    cy.get(".tag-dropdown").should("exist");
    cy.get("#tag-dropdown-select").select("back-end");
    cy.get(".recommendation").should("have.length", 2);
  });
  it("renders a view all button", () => {
    cy.get("#view-all-button").should("exist");
  });
  it("doesn't render view study list button", () => {
    cy.get("#view-study-list-button").should("not.exist");
  });
  it("doesn't render create button", () => {
    cy.get("#create-button").should("not.exist");
  });
  it("doesn't render add to study list button", () => {
    cy.get("#add-sl-button").should("not.exist");
  });
  it("doesn't render comment button", () => {
    cy.get("#add-comment-button").should("not.exist");
  });
  it("clicking sign-in button shows a modal", () => {
    cy.get("#signin-button").click().get("#signInModal").should("exist");
  });
  it("signing in closes sign-in modal", () => {
    cy.get("#signin-button").click();
    cy.get("#users-dropdown-select").select("Chris");
    cy.get("#modal-signin-button").click();
    cy.get("#signInModal").should("not.exist");
  });
  it("renders a recommendation", () => {
    cy.get("#recommendations-list")
      .should("exist")
      .get(".recommendation")
      .should("exist")
      .get(".recommendation-title")
      .should("exist")
      .get("#recommendation-author")
      .should("exist")
      .get("#recommendation-description")
      .should("exist")
      .get("#recommendation-content")
      .should("exist")
      .get("#recommendation-stage")
      .should("exist")
      .get("#recommendation-recommended")
      .should("exist")
      .get("#recommendation-url")
      .should("exist")
      .get("#recommendation-date")
      .should("exist")
      .get(".recommendation-tags-div")
      .should("exist");
  });
});
