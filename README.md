# sports-odds
Choose a sport, card shows upcoming games with odds 

This was my first attempt at displaying info pulled from an API.  I have this idea for a gambling app and being able to pull upcoming games to see the spreads is a component.  I really enjoy this aspect of coding where I find info that exists and then display it visually. 

 The bottom half is a greyed out version where I used an AJAX call, vs the newer code up top which contains fetch requests.

A Div box displays the sport for which the user selected in a title, followed by cards that populate with all pertinent information, date/time who's favored/underdogs, home and away of all upcoming games in that sport.  So, if someone were to select "NFL", the html inserted would be the title "NFL" followed by all up and coming games that takes place on sun, mon nite, etc... each on their respective card.

THE PROBLEM:
Outside of the newbie code and I don't have any err catches (yet), the main problem I'm having is when the user selects a second (or third, etc..) sport from the dropdown menu, I wind up with 2 Title boxes on top of another (i.e "NFL" then "MMA") with all subsequent games appearing below (the upcoming "NFL" games are displayed on their cards, followed by the "MMA" bouts).  I'd like to be able to add a event listner to the drop down menu so when there's a change, the HTML resets. If the user moves from "La Liga -Spain" to "NBA", all the soccer cards and the La Liga title are replaced by all upcoming basketball games under the sole title "NBA".

 I've cleared fields (values) before w/ an init function, as in a game with a "new game!" button that resets all scores and game related values back to zero.  I feel like i should be using the remove() method.  w3schools.com has examples where this is done w/ a script tag but I've been unsuccessful trying to accomplish this and am not sure how I would apply it. Any help in this would be most appreciated
