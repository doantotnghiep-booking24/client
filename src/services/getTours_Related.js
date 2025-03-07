import axios from 'axios';

export const GetTours_Related = async () => {
  const response = await axios.get('https://bookingtravel-44jm.onrender.com/V1/Tours/GetTours_Related', { withCredentials: true })
  return response
};

