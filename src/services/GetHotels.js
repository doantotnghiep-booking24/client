import axios from 'axios';

export const getHotels = async () => {
  const response = await axios.get(`https://bookingtravel-44jm.onrender.com/Hotel/GetHotel`, {withCredentials: true});
  return response.data;
};

