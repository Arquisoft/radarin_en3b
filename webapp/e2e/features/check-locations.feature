Feature: Check Locations

Scenario: The user can see his locations correctly
  Given A new user
  When He logs into the system
  And He goes to the locations view
  Then He can see his locations