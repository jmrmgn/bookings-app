import axios from 'axios';
import { IBookings } from '../interface';

// Todo: Move to .env
const SERVER_URI = 'http://localhost:3001';

const getBookings = async (): Promise<IBookings[]> => {
  const res = await axios.get(`${SERVER_URI}/bookings`);
  return res.data;
};

const deleteBooking = async (id: number): Promise<void> => {
  await axios.delete(`${SERVER_URI}/bookings/${id}`);
};

export { getBookings, deleteBooking };
