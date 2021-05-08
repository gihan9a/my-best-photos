/// <reference types="cypress" />

const getUploadedIntercept = (fixture = "uploaded/ok.json") =>
  cy.intercept(
    {
      method: "get",
      url:
        "https://dev-pb-apps.s3-eu-west-1.amazonaws.com/collection/CHhASmTpKjaHyAsSaauThRqMMjWanYkQ.json",
    },
    {
      fixture,
    }
  );
const getSelectedIntercept = (fixture = "selected/ok.json") =>
  cy.intercept(
    {
      method: "get",
      url: Cypress.env("REACT_APP_API_URL") + "/photos",
    },
    {
      fixture,
    }
  );

context("Load the application", () => {
  it("should load the app successfully with selected photos + change photos", () => {
    getUploadedIntercept().as("allPhotos");
    getSelectedIntercept().as("uploadedPhotos");
    cy.visit("/");
    cy.wait("@allPhotos");
    cy.wait("@uploadedPhotos");

    // should have change selection button
    cy.get('[data-test-id="btn-change-selection"').should("exist");

    // should have 9 photos
    cy.get("img").should("have.length", 9);

    cy.get('[data-test-id="btn-change-selection"').click();
    cy.get('[data-test-id="btn-change-selection"').should("not.exist");
    cy.get('[data-test-id="btn-order"').should("exist");
    cy.get("img").should("have.length", 37);
  });

  it("should show only uploaded photos", () => {
    getUploadedIntercept().as("allPhotos");
    getSelectedIntercept("selected/none.json").as("uploadedPhotos");
    cy.visit("/");
    cy.wait("@allPhotos");
    cy.wait("@uploadedPhotos");

    // should have change selection button
    cy.get('[data-test-id="btn-change-selection"]').should("not.exist");
    cy.get("img").should("have.length", 37);

    // should have order button
    cy.get('[data-test-id="btn-order"]').should("exist");
  });

  it("Image should be clickable", () => {
    getUploadedIntercept().as("allPhotos");
    getSelectedIntercept("selected/none.json").as("uploadedPhotos");
    cy.visit("/");
    cy.wait("@allPhotos");
    cy.wait("@uploadedPhotos");

    cy.get('[data-test-id="btn-unselect-all"]').should("not.exist");
    cy.get("img").first().parent().click();
    cy.get("img").first().parent().should("have.class", "border-4");

    cy.get("img").first().parent().next().next().click();
    cy.get('[data-test-id="btn-unselect-all"]').should("exist");

    // clicking on order button should show alert to validate
    cy.on("window:alert", (str) => {
      expect(str).to.eq("Please select 9 photos");
    });
    cy.get('[data-test-id="btn-order"]').click();
  });

  it("Should clickable only up to 9 photos + save photos", () => {
    getUploadedIntercept().as("allPhotos");
    getSelectedIntercept("selected/none.json").as("uploadedPhotos");
    cy.visit("/");
    cy.wait("@allPhotos");
    cy.wait("@uploadedPhotos");

    // eslint-disable-next-line cypress/no-assigning-return-values
    let next = cy.get("img").first().parent();
    for (let i = 0; i < 9; i += 1) {
      next.click();
      next = next.next();
    }

    // clicking on order button should show alert to validate
    cy.on("window:alert", (str) => {
      expect(str).to.eq(
        "You have already selected the maximum number of photos"
      );
    });
    next.click();

    cy.get('[data-test-id="btn-order"]').click();
    cy.get('[data-test-id="btn-save"]').should("exist");

    // should be able to drag and sort
    // cy.get("img")
    //   .first()
    //   .parent()
    //   .trigger("mousedown", { which: 1, force: true })
    //   .trigger("mousemove", { clientX: 500, clientY: 500 })
    //   .trigger("mouseup", { force: true });

    cy.intercept(
      {
        method: "post",
        url: Cypress.env("REACT_APP_API_URL") + "/photos",
      },
      {
        fixture: "save/ok.json",
      }
    ).as("save");
    cy.get('[data-test-id="btn-save"]').click();
    cy.wait("@save");
  });
});
