import axios from 'axios';
import { IBookings } from '../interfaces';

// Todo: Move to .env
const SERVER_URI = 'http://localhost:3001';

const getBookings = async (): Promise<IBookings[]> => {
  const res = await axios.get(`${SERVER_URI}/bookings`);
  return res.data;
};

const getBooking = async (id: number): Promise<IBookings> => {
  const res = await axios.get(`${SERVER_URI}/bookings/${id}`);
  return res.data;
};

const updateBooking = async (booking: IBookings): Promise<IBookings> => {
  const res = await axios.put(`${SERVER_URI}/bookings/${booking?.id}`, booking);
  return res.data;
};

const deleteBooking = async (id: number): Promise<void> => {
  await axios.delete(`${SERVER_URI}/bookings/${id}`);
};

const getBookingsByFilter = async (filter: string): Promise<IBookings[]> => {
  const res = await axios.get(`${SERVER_URI}/bookings?${filter}`);
  return res.data;
};

export const BookingService = {
  getBookings,
  getBooking,
  getBookingsByFilter,
  updateBooking,
  deleteBooking,
};
