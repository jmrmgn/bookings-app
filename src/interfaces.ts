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
}

export type IBookingAction =
  | { type: Action.GET; payload: IBookings[] }
  | { type: Action.DELETE; payload: number };

export interface IContextModel extends IBookingState {
  deleteBooking: (id: number) => void;
}
