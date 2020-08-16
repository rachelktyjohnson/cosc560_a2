# DropBearEats

DropBearEats is a food delivery platform created for Karen

## User Accounts
There are 3 user accounts, `adam`, `ben` and `charlie`. Usernames are passwords. Eg, `adam`'s password is `adam`

There is 1 admin account, `admin`. The password is `admin`.

## Rubric Check
**Got Something Working**
- Code has been written
- Code compiles, starts, and doesn't break
- Response to mouse click & user input
- Landing page exists and works

**Webpack v4**
- Webpack was used for compiling SCSS, Javascript, and Images

**Tests**
- Written in Mocha/Selenium WebDriver
- 2 per "user" (user, admin, guest)
- Reasonably meaningful

**CSS Framework & PreProcessor**
- Pure CSS was used (minimally. Just Grid and Table)
- Only SCSS was used to overwrite the selected framework

**UI Components**
- UI was rendered using Vue.js
- UI from Assignment 1B was used, plus minor changes. Some Logic changes according to feedback (allowing 2 restaurants to be in the one order)
- Components are interactive
- Admin stats are dynamic (dummy data) using d3.js ($/day and $/restaurant/day)
- UI components fulfil the user requirements (see below)
- Project is usable, designed for its purpose and somewhat attractive

**User Requirements/Flow**
- Customer is able to log in
- Customer is able to navigate through restaurants and add to cart
- Customer is able to check out using cash or credit card
- Customer is able to view their order including status
- Customer is able to view past orders
- Customer gets updates regarding their order with Push notifications
- Admin is able to log in
- Admin is able to edit an order
- Admin is able to delete an order (The "Cancelled" status. I believe an order should still be in the system even if it's been "deleted")
- Admin is able to view the stats (one line, one pie)

**Quality**
- Code quality (I believe some more refactoring can be done)
- **Documentation/commmenting (little to none, change this!)**
- Formatting / code layout (unsure, I think it's alright)
- Readability (I hope so?)
- Version Control (extensive)
- Organisation (?)
- Testability (was tested)

## Commit Legend
:hammer: Feature  
:wrench: Fix  
:nut_and_bolt: Refactor  