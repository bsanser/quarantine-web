This project has been created with Create React App. It is the front-end side of the quarantine app, an web-app made with the MERN stack.

The web app is an events app but with the particularity that all events need to be free and online. 


The app is already deployed to production here: https://quarantine-web.herokuapp.com/home

To start the development server in the local environment: ```npm start```


### Why this app? ###

The idea, of course, came from the quarantine itself, and the need to look for plans to do while at home. I also wanted to take the opportunity to play with different apis, testing and analytics tools.


### Basic idea ###

The webapp aims at being a hub for all free digital plans. These plans are created by users. That is why, in order to make users create them, it needed to be very easy, simple and straightforward: 

- users don't need to be authenticated to see the available plans, but to like a plan (and save it) or to create one, they will be required to do so

- user creation and authentication happens through Google auth, so that in a few clicks the user is already registered/logged-in

- to upload a plan, the user submits a link to the plan and he is directed to a form. That form will already have most of its fields pre-filled with information extracted from the url. The user will still be able to edit these prefilled fields but won't necessarily need to (thus making the process faster and easier).

### Features ###

Users can, so far:
- find plans
- filter plans by category, language or date(the date filter is not yet implemented)
- like a plan (so that it is stored in his "Liked plans")
- create a plan
- localized times (the date/time of the event is entered by the user using his own timezone - In the db, though, it is stored as UTC 0. To render it to the client, it will get the client's timezone and display the proper date/time accordingly.

### Coming soon features ###
- Share a plan
- Download ics of the plan to add it to your calendar (so that you can be reminded before it starts)
- Edit and delete plans (the endpoints are already created, but the client is not yet using them)
- Separate upcoming plans from past plans
- Onboarding explaining what the app is for and how to use it
- Integrate with google analytics
- Perform e2e tests with Cypress
- Refactor front-end side: it is currently built with React following a mobile-first approach. It uses styled components
 and components from the material ui library. It is pretty messy, because I did not want to focus on the front-end but in making everything work as soon as possible (ideally while still in quarantine).
 
 ### My web mantras ###
 1) Make it work - I'm still here
 2) Make it right
 3) Make it fast

