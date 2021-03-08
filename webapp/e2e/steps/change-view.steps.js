const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./features/change-view.feature");

defineFeature(feature, test => {
  
  beforeEach(async () => {
    /*global page*/
    /*eslint no-undef: "error"*/
    await global.page.goto("http://localhost:3000");
  });

  test("The user is in the main page", ({given, when, then}) => {
      given("A new user", () => {

      });

      when("I click on the localizations button", async () => {
          await expect(page).toMatch("Home");
          await expect(page).toClick("a", {text: "Localizations"});
      });

      then("We are redirected to the localizations view", async () => {
          await expect(page).toMatch("Home");
      });
  });
});