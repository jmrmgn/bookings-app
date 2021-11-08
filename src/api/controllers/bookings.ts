import axios from 'axios';

// Todo: Move to .env
const SERVER_URI = 'http://localhost:3001';

const getBookings = async () => {
  const res = await axios.get(`${SERVER_URI}/bookings`);
  return res.data;
};

export { getBookings };
