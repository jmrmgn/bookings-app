import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Action } from '../enums';

import { IBookingAction, IBookingState, IContextModel } from '../interfaces';
import { BookingService } from '../services/bookings';

// Initial State
const initialState: IBookingState = {
  bookings: [],
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
    case Action.DELETE:
      return {
        ...state,
        bookings: state.bookings.filter(
          booking => booking.id !== action.payload
        ),
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

  const deleteBooking = async (id: number): Promise<void> => {
    await BookingService.deleteBooking(id);
    dispatch({
      type: Action.DELETE,
      payload: id,
    });
  };

  return (
    <Context.Provider
      value={{
        bookings: state.bookings,
        deleteBooking,
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
