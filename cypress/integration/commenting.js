describe("Comment feature works correctly", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#signin-button").click();
    cy.get("#users-dropdown-select").select("Chris");
    cy.get("#modal-signin-button").click();
  });

  it("creating a dummy post for testing", () => {
    cy.get("#create-button").click();
    cy.get("#resource-name").clear();
    cy.get("#resource-name").type("Google");
    cy.get("#author-name").clear();
    cy.get("#author-name").type("Alphabet");
    cy.get("#url").clear();
    cy.get("#url").type("https://www.google.com");
    cy.get("#content-type").select("Website");
    cy.get("#resource-description").click();
    cy.get("#resource-description").type(
      "Great search engine for finding literally anything."
    );
    cy.get("#new-tags").clear();
    cy.get("#new-tags").type("website");
    cy.get("#add-tag-button").click();
    cy.get("#new-tags").clear();
    cy.get("#new-tags").type("google");
    cy.get("#add-tag-button").click();
    cy.get("#why-recommended").clear();
    cy.get("#why-recommended").type("Such a great website");
    cy.get(".stage-dropdown > .form-select").select("8");
    cy.get(".modal-footer > .btn").click();
    cy.wait(1000);
  });

  it("deleting a comment using cy.request", () => {
    cy.get(".recommendation").get("#add-comment-button").click();
    cy.get("#comment-input").click().type("stay away");
    cy.get("#veto-button").click();
    cy.request("DELETE", "localhost:4000/comments");
    cy.get(".comment-div").should("have.length", 0);
  });

  it("Can post a downvote comment and see it", () => {
    cy.get(".recommendation").get("#add-comment-button").click();
    cy.get("#comment-input")
      .click()
      .type("Lmao google is using your data! bing is better");
    cy.get("#veto-button").click();
    cy.get(".comment-div")
      .findByText("Lmao google is using your data! bing is better")
      .should("be.visible");
    cy.get(".post-comment-section").should("not.be.visible");
  });

  it("Posting with downvote will decrease endorsement count by 1", () => {
    cy.get("#recommendation-like-count").should(
      "contain.text",
      `Sorciness: -1`
    );
  });
  it("clicking the trashcan will delete comment", () => {
    cy.get(".comment-header").get("#deleteComment").click();
    cy.get(".comment-header").should("have.length", 0);
  });
  it("Can post an upvote comment and see it", () => {
    cy.get(".recommendation").get("#add-comment-button").click();
    cy.get("#comment-input").click().type("this is lusho");
    cy.get("#endorse-button").click();
    cy.get(".comment-div").findByText("this is lusho").should("be.visible");
  });

  it("Posting with upvote will increase endorsement count by 1", () => {
    cy.get("#recommendation-like-count").should("contain.text", `Sorciness: 1`);
  });
  it("clicking the trashcan will delete comment", () => {
    cy.get(".comment-header").get("#deleteComment").click();
    cy.get(".comment-header").should("have.length", 0);
  });
  it("clicking the trashcan will delete the recommendation", () => {
    cy.get("#deleteRecButton").click();
    cy.get(".recommendation").should("have.length", 4);
  });

  it("trying upvote with an empty body shows an alert and prevents posting", () => {
    cy.get(".recommendation").get("#add-comment-button").click();
    cy.get("#endorse-button").click();
    cy.get("#comment-body-alert").should("be.visible");
  });
  it("pressing the comment button and signing out will close the post comment section", () => {
    cy.get(".recommendation").get("#add-comment-button").click();
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#signout-button").click();
    /* ==== End Cypress Studio ==== */
    cy.get(".post-comment-section").should("not.exist");
  });
});
