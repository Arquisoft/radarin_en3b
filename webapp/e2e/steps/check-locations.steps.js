const { defineFeature, loadFeature } = require("jest-cucumber");
const feature = loadFeature("./features/check-locations.feature");
defineFeature(feature, (test) => {

    beforeEach(async () => {
        /*global page*/
        /*eslint no-undef: "error"*/
        //await page.setDefaultNavigationTimeout(0);
        //await global.page.goto("http://localhost:3000");
    });

    test("The user can see his locations correctly", ({ given, when, then, and }) => {
        given("A new user", async () => {
            //await expect(page).toMatch("able");
        });

        when("He logs into the system", async () => {
            //await expect(page).toClick("button", { id: "SignInButton" });
            //await expect(page).toMatch("Sign In");
            //await expect(page).toClick("button", { id: "SignInButton" });
            //await expect(page).toMatch("able");
        });

        and("He goes to the locations view", async () => {
            //await expect(page).toClick("a", { id: "LocationsLink" });
        });

        then("He can see his locations", async () => {
            //await expect(page).toMatch("Sign In");
        });
    });
});