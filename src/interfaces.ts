import { Action } from './enums';

export interface IBookings {
  id: number;
  roomName: string;
  hostName: string;
  guestsName: string;
  date: string;
  fromTo: string;
}

export interface IBookingState {
  bookings: IBookings[];
  booking: IBookings;
}

export type IBookingAction =
  | { type: Action.GET_ONE; payload: IBookings }
  | { type: Action.GET; payload: IBookings[] }
  | { type: Action.DELETE; payload: number };

export interface IContextModel extends IBookingState {
  getBooking: (id: number) => void;
  deleteBooking: (id: number) => void;
}
