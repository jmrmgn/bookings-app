import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Action } from '../enums';
import reducer from './reducer';

import {
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
