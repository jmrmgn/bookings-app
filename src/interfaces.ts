import { Action } from './enums';

export interface IBookings {
  id?: number;
  roomName: string;
  hostName: string;
  guestsName: string;
  date: string;
  from: string;
  to: string;
}

export interface IBookingState {
  bookings: IBookings[];
  booking: IBookings;
}

export type IBookingAction =
  | { type: Action.GET_ONE; payload: IBookings }
  | { type: Action.GET; payload: IBookings[] }
  | { type: Action.UPDATE; payload: IBookings }
  | { type: Action.DELETE; payload: number };

export interface IContextModel extends IBookingState {
  getBooking: (id: number) => void;
  updateBooking: (booking: IBookings) => void;
  deleteBooking: (id: number) => void;
}
