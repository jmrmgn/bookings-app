import axios from 'axios';
import moment from 'moment';

import { IBookings, IBookingsFilters } from '../interfaces';

// Todo: Move to .env
const SERVER_URI = 'http://localhost:3001';

const buildFilter = (filters: IBookingsFilters): string => {
  const roomName = filters?.roomName;
  const dateFrom = filters?.from;
  const dateTo = filters?.to;
  const q = filters?.q;

  // Check if the dates are valid
  const isValidFromDate = moment(dateFrom, 'YYYY-MM-DD').isValid();
  const isValidToDate = moment(dateTo, 'YYYY-MM-DD').isValid();

  const filtersArray = [];

  // Checking room name
  if (roomName) {
    filtersArray.push(`roomName=${roomName}`);
  }

  // Validating Dates
  if (isValidFromDate) {
    filtersArray.push(`date_gte=${dateFrom}`);
  }
  if (isValidToDate) {
    filtersArray.push(`date_lte=${dateTo}`);
  }

  // Check q (search value)
  if (q) {
    filtersArray.push(`q=${q}`);
  }

  const filter = filtersArray.join('&');

  return filter;
};

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

const getBookingsByFilter = async (
  filters: IBookingsFilters
): Promise<IBookings[]> => {
  const newFilter = buildFilter(filters);

  const res = await axios.get(`${SERVER_URI}/bookings?${newFilter}`);
  return res.data;
};

export const BookingService = {
  getBookings,
  getBooking,
  getBookingsByFilter,
  updateBooking,
  deleteBooking,
};
