import { Action } from '../enums';
import { IBookingAction, IBookings, IBookingState } from '../interfaces';

const reducer = (
  state: IBookingState,
  action: IBookingAction
): IBookingState => {
  switch (action.type) {
    case Action.GET:
      return {
        ...state,
        bookings: action.payload,
      };

    case Action.GET_ONE:
      return {
        ...state,
        booking: action.payload,
      };

    case Action.UPDATE:
      const updatedBooking = action.payload;

      const updatedBookings: IBookings[] = state.bookings.map(booking => {
        if (booking.id === updatedBooking.id) {
          return updatedBooking;
        }

        return booking;
      });

      return { ...state, bookings: updatedBookings };

    case Action.DELETE:
      return {
        ...state,
        bookings: state.bookings.filter(
          booking => booking.id !== action.payload
        ),
      };

    case Action.FILTER:
      return {
        ...state,
        filters: action.payload.filters,
        bookings: action.payload.data,
      };

    default:
      return state;
  }
};

export default reducer;
