# TODO
- Auth
  - [ ] Auth route to switch between users
    - [X] add cookie parser middleware
    - [ ] Add auth route
      - [ ] Get user based on ID passed in
      - [ ] Checks if cookie already set
          - [ ] If not set cookie, if it is return 204
          - [ ] If user is admin create another cookie
          - [ ] On success redirect to userpage
          - [ ] On fail redirect to access denied page
    - [ ] Connect log in button to route
    - [ ] Connect log out button to route
  - [ ] auth/logout route
    - [ ] removes all cookies
    - [ ] on return redirect to homepage
    - [ ] on fail return to access denied page

- Home Page
  - [X] Page created

- Droid page
  - [X] Page created

- Droids page
  - [X] Page created
  - [ ] Add to favourites button
    - [ ] Link to favourites click handler
  - [ ] Fix bug when going from small to large screen, display settings

- User / Admin page
  - [ ] Page created

- Modal to add Droid
  - [ ] Created

**_ Stretch _**

- Components
  - [ ] Homepage categories
  - [ ] Header style
        - [ ] Add Avatar
        - [ ] Take a look back into responsiveness
        - [ ] links for logged in or not
  - [ ] More filter options
  - [ ] Edit user details on user page

**_ USER STORIES _**

- User
  - [X] See featured
  - [X] Filter droids by price
  - [ ] Favourite Droid
  - [X] As a user I want to send messages to owner
// Users

- [X] As a user I want to be able to see featured droids on the homepage

- [X] As a user I want to filter possible droids by price

- As a user I want to be able to favourite droids to check up on them later

- As a user I want to send messages to the user that is listing that item

Admin
  - [ ] Modal to add droid
  - [X] Remove Droid
  - [ ] Mark droids as sold
  - [X] Message back

// Admins

- As an Admin I want to be able to list droids to be seen by users
  
- [X] As an Admin I want to be able to remove droids from the site

- as an Admin I want to be able to mark droids as sold

- As an Admin I want to be able to message via app, email or text back on negotiations in buying the bounty
