import axios from 'axios';

export const GetTours_Related = async () => {
  const response = await axios.get('http://localhost:3001/V1/Tours/GetTours_Related', { withCredentials: true })
  return response
};

