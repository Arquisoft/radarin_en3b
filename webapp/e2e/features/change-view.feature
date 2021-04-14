Feature: Changing to the login view

Scenario: The user is in the main page
  Given A new user
  When I click on the login button
  Then We are redirected to the login view
