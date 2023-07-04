# Meet App

## Description

A serverless, progressive web application (PWA) with React using a
test-driven development (TDD) technique. The application uses the Google
Calendar API to fetch upcoming events.

## User Stories

1: **Filter Events By City** <br>
As a user
I should be able to filter events by city. <br>
So that I can see a list of events taking place in that city.

2: **Show/Hide Event Details** <br>
As a user
I would like to be able to show/hide event details. <br>
So that I can see more/less information about an event.

3: **Specify Number of Events** <br>
As a user
I would like to be able to specify the number of events I want to view in the app. <br>
So that I can see more or fewer events in the events list at once.

4: **Use the App When Offline** <br>
As a user
I would like to be able to use the app when offline. <br>
So that I can see the events I viewed the last time I was online.

5: **Add an App Shortcut to the Home Screen** <br>
As a user
I would like to be able to add the app shortcut to my home screen. <br>
So that I can open the app faster.

6: **Display Charts Visualizing Event Details** <br>
As a user
I would like to be able to see a chart showing the upcoming events in each city.<br>
So that I know what events are organized in which city.

## Scenarios

1: <br>
**Scenario**: A user will be able to filter events by city name. <br>
**Given**: Events will be filtered by city name.<br>
**When**: A user enters a city name into the search box.<br>
**Then**: All other events not in the searched city will disappear.

2: <br>
**Scenario**: A user wants to show more details about an event.<br>
**Given**: More details about an event will be shown/displayed.<br>
**When**: A user clicks on the show more button on an event.<br>
**Then**: The event container will expand to show all details about an event.

3: <br>
**Scenario**: A user wants to see more or less total events in the list.<br>
**Given**: Total specified amount of events will be shown.<br>
**When**: A user selects their desired amount of events to show.<br>
**Then**: More or less events will be shown based on the amount desired.

4: <br>
**Scenario**: A user will not be online<br>
**Given**: App will be functional.<br>
**When**: A user is not connected to the internet.<br>
**Then**: App will still function.

5: <br>
**Scenario**: A user wants to add the app to their home screen.<br>
**Given**: App will be added to users home screen.<br>
**When**: User adds app to home screen or downloads it on desktop.<br>
**Then**: App will be easier to access quickly.

6: <br>
**Scenario**: A user wants to see data charts of city events.<br>
**Given**: App will display visual data chart of a city's events.<br>
**When**: A user clicks on the see details button.<br>
**Then**: App component will change to then show event graph.
