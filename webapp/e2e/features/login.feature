Feature: Login

Scenario: The user can log in to the app correctly
  Given A new user
  When I click on the login button
  Then We are redirected to the login view
  When I click sign in
  Then It logs in, and we are redirected to the main view