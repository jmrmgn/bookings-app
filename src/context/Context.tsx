import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Action } from '../enums';

import {
  IBookingAction,
  IBookings,
  IBookingsFilters,
  IBookingState,
  IContextModel,
} from '../interfaces';
import { BookingService } from '../services/bookings';

// Initial State
const initialState: IBookingState = {
  bookings: [],
  booking: {} as IBookings,
  filters: {} as IBookingsFilters,
};

// Reducer
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

// Create Context
export const Context = createContext({} as IContextModel);

// Provider Component
export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async (): Promise<void> => {
    const response = await BookingService.getBookings();
    dispatch({
      type: Action.GET,
      payload: response,
    });
  };

  const getBooking = async (id: number): Promise<void> => {
    const response = await BookingService.getBooking(id);
    dispatch({
      type: Action.GET_ONE,
      payload: response,
    });
  };

  const updateBooking = async (booking: IBookings): Promise<void> => {
    const response = await BookingService.updateBooking(booking);
    dispatch({
      type: Action.UPDATE,
      payload: response,
    });
  };

  const deleteBooking = async (id: number): Promise<void> => {
    await BookingService.deleteBooking(id);
    dispatch({
      type: Action.DELETE,
      payload: id,
    });
  };

  const filterBookings = async (filters: IBookingsFilters) => {
    const data = await BookingService.getBookingsByFilter(filters);
    dispatch({
      type: Action.FILTER,
      payload: { filters, data },
    });
  };

  return (
    <Context.Provider
      value={{
        ...state,
        deleteBooking,
        getBooking,
        updateBooking,
        filterBookings,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// Create a hook to use the Context
export function useBookings() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('Context must be used within a Provider');
  }
  return context;
}
