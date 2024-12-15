import axios from 'axios';

export const getHotels = async () => {
  const response = await axios.get(`http://localhost:3001/Hotel/GetHotel`, {withCredentials: true});
  return response.data;
};

