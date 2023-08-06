Feature: Show/Hide Event Details
  Scenario: When the user opens the app the event details should be hidden and the show details button should be visable.
    Given user visits the app
    When user opens the app
    Then user should see the events

  Scenario: When the user clicks on an events show details button they should see the event description.
    Given user opens the app
    When user clicks on show details button
    Then event detils description appears
    And hide details button is visable

  Scenario: When the user clicks on an events hide details button they should not be able to see the event description.
    Given user has opened the app
    And has clicked on an events show details button
    When user clicks on event hide details button
    Then event details should be hidden
    And show details button should be visable