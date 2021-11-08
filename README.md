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



- [ ] Booking List Page (/)
  - [x] List of Booking
  - [ ] Edit Booking (with Icon)
  - [x] Delete Booking (with Icon)
  - [ ] Sortable Booking
    - [ ] Meeting Room name
    - [ ] Host name
    - [ ] Guests name
    - [ ] Date
    - [ ] From-To (13:00-20:00)
  - [ ] Able to Filtered By:
    - [ ] By the date interval (only days, not times) of the booking time
    - [ ] By meeting room
  - [ ] Full Text search
    - [ ] Username
    - [ ] meeting room name
- [ ] Single Meeting Room Details Page
  - [ ] This page can display the name of the room with any image and details about the room/
    It should also display the bookings made for that particular room.



Validations

- [ ] A booking can be 30 minute or 1 hour long
- [ ] The first booking start time at 8:00 AM, the last one (start time) at 5:00 PM
- [ ] Booking start time and end time has to be on the same day
- [ ] A meeting room can not be booked if already booked for the chosen time



Additional Notes

- [ ] Responsive
- [ ] Form Validation
- [ ] Error handler
- [ ] Documented Code
- [ ] Cypress Test Case



Good to have feature

- [ ] Add Booking
- [ ] Pagination of Booking
- [ ] Login
- [ ] Validation: Can't create booking for previous dates
