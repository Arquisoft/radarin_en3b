Feature: Changing to the localizations view

Scenario: The user is in the main page
  Given A new user
  When I click on the localizations button
  Then We are redirected to the localizations view
