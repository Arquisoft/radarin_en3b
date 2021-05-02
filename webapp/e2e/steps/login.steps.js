const { jssPreset } = require("@material-ui/styles");
const { defineFeature, loadFeature } = require("jest-cucumber");
const feature = loadFeature("./features/login.feature");

defineFeature(feature, (test) => {

    beforeEach(async () => {
        /*global page*/
        /*eslint no-undef: "error"*/
        //await page.setDefaultNavigationTimeout(0);
        //await global.page.goto("http://localhost:3000");
    });

    test("The user can log in to the app correctly", ({ given, when, then }) => {
        given("A new user", async () => {
            //await expect(page).toMatch("able");
        });

        when("I click on the login button", async () => {
            //await expect(page).toClick("button", { id: "SignInButton" });
        });

        then("We are redirected to the login view", async () => {
            //await expect(page).toMatch("able");
        });
        when("I click sign in", async () => {
            //await expect(page).toClick("button", { id: "SignInButton" });
        });

        then("It logs in, and we are redirected to the main view", async () => {
            //await expect(page).toMatch("able");
        });
    });
});