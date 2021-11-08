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
  | { type: 'GET'; payload: IBookings[] }
  | { type: 'DELETE'; payload: number };

export interface IContextModel extends IBookingState {
  deleteBooking: (id: number) => void;
}
