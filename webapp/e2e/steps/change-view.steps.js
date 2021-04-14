const { defineFeature, loadFeature } = require("jest-cucumber");
const feature = loadFeature("./features/change-view.feature");

defineFeature(feature, (test) => {

  beforeEach(async () => {
    /*global page*/
    /*eslint no-undef: "error"*/
    await global.page.goto("http://localhost:3000/");
  });

  test("The user is in the main page", ({ given, when, then }) => {
    given("A new user", async () => {
      await expect(page).toMatch("Improve");
    });

    when("I click on the login button", async () => {
      await expect(page).toClick("button", { id: "SignInButton" });
    });

    then("We are redirected to the login view", async () => {
      await expect(page).toMatch("Sign In");
    });
  });
});