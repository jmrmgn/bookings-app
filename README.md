# Bookings-App

**Model**

Bookings

| Name       | Type                          | Sample                              |
| ---------- | ----------------------------- | ----------------------------------- |
| id         | string                        | length + 1                          |
| roomName   | string                        | --                                  |
| hostName   | string                        | --                                  |
| guestsName | string                        | --                                  |
| date       | date                          | yyyy-mm-dd                          |
| fromTo     | object {from: time, to: time} | { from: "08:00 AM", to: "09:00AM" } |



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
    - [x] user name? (Might be hostName)
    - [x] meeting room name
- [x] Single Meeting Room Details Page
  - [x] This page can display the name of the room with any image and details about the room/
    It should also display the bookings made for that particular room.



Validations

- [x] A booking can be 30 minute or 1 hour long
- [x] The first booking start time at 8:00 AM, the last one (start time) at 5:00 PM
- [x] Booking start time and end time has to be on the same day
- [ ] A meeting room can not be booked if already booked for the chosen time



Additional Notes

- [ ] Responsive
- [x] Form Validation
- [x] Error handler
- [ ] Documented Code
- [ ] Cypress Test Case
  - [ ] Should be able to show the list of Bookings
  - [ ] Should be able to delete a booking
    - [ ] Must not delete a booking if cancel is clicked
  - [ ] Should be able to update a booking
    - [ ] Should be able to show error when the booking is not 30-mins or 1 hour long
    - [ ] Should be able to show error when the schedule is not in between of 8:00am - 5pm
  - [x] Should be able to View the Booking



Good to have feature

- [ ] Add Booking
- [ ] Pagination of Booking
- [ ] Login
- [x] Validation: Can't create booking for previous dates
