# SPECIFICATION

Create a React application which would show only one screen (see sketch attached). It consists of a squared component/s which display a single value in the middle and a change from the last value on the bottom (both the diff of previous and current value and an arrow which shows was it changed up or down).

There should also be the same sized square plus button which would open a modal and give you the ability to add one more element (by default there would be no elements until you add them)

Inside the modal give user ability to search through the values he wants to monitor in a way of an auto-completion list, so if you write 'AB' it would show you all the values which start with 'AB' and give you the ability to select it. When it's selected - new tracker squared element is added on an initial screen

You should track values by updating their values via API every 5 seconds. While you're waiting for the update from API - display the spinning icon instead of the value.

Which data should you display and where should you take this API, would you ask me? :) That's up to you, be creative. Best to take a real-world data (rather than mocking API) with real APIs, but for values which might change frequently enough to see how data updates on a screen (so weather data probably is not a good choice, but stocks or bitcoin trading data might work)

Don't waste much time on design, but make it look neat

Data must be stored in redux (even though app is really small), for the side effects use saga, and use axios for the API calls themself.

Please store in local storage which values user selected to track, so the page would continue if we refresh it or open it later
