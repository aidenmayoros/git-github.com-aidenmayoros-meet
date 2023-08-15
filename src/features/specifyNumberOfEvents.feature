Feature: A user wants to see more or less total events in the list.
  Scenario: When the user opens the app there should be 32 events shown by default
    Given the app is open
    When the user has not changed the number of events
    Then there should be 32 events displayed in the event lsit

  Scenario: User can change the number of events
    Given the app is open and shows 32 events
    When the user removes the number 32 from the input field and clicks the apply button
    Then all events should no longer be displayed
    When the user enters 5
    Then five events should be displayed