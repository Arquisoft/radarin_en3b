const { jssPreset } = require("@material-ui/styles");
const { defineFeature, loadFeature } = require("jest-cucumber");
const feature = loadFeature("./features/login.feature");

jest.useFakeTimers();

defineFeature(feature, (test) => {

    beforeEach(async () => {
        /*global page*/
        /*eslint no-undef: "error"*/
        await global.page.goto("http://localhost:3000/");
    });

    test("The user can log in to the app correctly", ({ given, when, then }) => {
        given("A new user", async () => {
            await expect(page).toMatch("Improve");
        });

        when("I click on the login button", async () => {
            await expect(page).toClick("button", { id: "SignInButton" });
        });

        then("We are redirected to the login view", async () => {
            doAsync();
        });
        when("I click sign in", async () => {
            await expect(page).toClick("button", { id: "SignInButton" });
        });

        then("It logs in, and we are redirected to the main view", async () => {
            await expect(page).toMatch("Improve");
            await expect(page).toMatch("a", { id: "LocationsLink" });
            await expect(page).not.toMatch("button", { id: "SignInButton" });
        });
    });
});

function doAsync() {
    setTimeout(() => {
        expect(page).toMatch("Don't have one?");
    }, 7000)
}