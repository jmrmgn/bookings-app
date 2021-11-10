# Bookings App

A simple Web Application that manages Bookings.



## Config File (.env)

```
# For simplicity, env file will not be added to .gitignore

REACT_APP_SERVER_URI='http://localhost:3001'
REACT_APP_SCHEDULE_START_TIME='08:00:00'
REACT_APP_SCHEDULE_END_TIME='17:00:00'
```



## Quick Start

**Install dependencies**

```
// go to directory
npm install
```



**Mock Server** ([json-server](https://github.com/typicode/json-server))

```
npm run mock:server
```

The mock server should now be running in [localhost:3001](http://localhost:3001)



**Start Web Application**

```
npm start
```

The app should now be running on [localhost:3000](http://localhost:3000/).



**Running Cypress Tests** ([cypress](https://www.cypress.io/))

```
npm run cypress:open
```

An interactive cypress browser should appear.



## Model

**Bookings**

| Name       | Type   | Sample     |
| ---------- | ------ | ---------- |
| id         | string | length + 1 |
| roomName   | string | --         |
| hostName   | string | --         |
| guestsName | string | --         |
| date       | date   | yyyy-mm-dd |
| from       | string | 12:00      |
| to         | string | 13:00      |



## Features

- [x] Booking List Page (/)
  - [x] List of Booking
  - [x] Edit Booking (with Icon)
  - [x] Delete Booking (with Icon)
  - [x] Sortable Booking
    - [x] Meeting Room name
    - [x] Host name
    - [x] Guests name
    - [x] Date
    - [x] From-To (08:00-17:00)
  - [x] Able to Filtered By:
    - [x] By the date interval (only days, not times) of the booking time
    - [x] By meeting room
  - [x] Full Text search
    - [x] user name(?) (Might be hostName)
    - [x] meeting room name
- [x] Single Meeting Room Details Page (/booking/:id)
  - [x] This page can display the name of the room with any image and details about the room/
    It should also display the bookings made for that particular room.



## Validations

- [x] A booking can be 30 minute or 1 hour long
- [x] The first booking start time at 8:00 AM, the last one (start time) at 5:00 PM
- [x] Booking start time and end time has to be on the same day
- [ ] A meeting room can not be booked if already booked for the chosen time



## Additional Notes

- [x] Responsive
- [x] Form Validation
- [x] Error handler
- [ ] Documented Code
- [ ] Cypress Test Case
  - [ ] Should be able to show the list of Bookings
    - [ ] Should be able to filter and sort the table
  - [ ] Should be able to delete a booking
    - [ ] Must not delete a booking if cancel is clicked
  - [ ] Should be able to update a booking
    - [ ] Should be able to show error when the booking is not 30-mins or 1 hour long
    - [ ] Should be able to show error when the schedule is not in between of 8:00am - 5pm
  - [x] Should be able to View the Booking



## Good to have feature

- [ ] Add Booking
- [ ] Pagination of Booking
- [ ] Login
- [x] Validation: Can't create booking for previous dates
