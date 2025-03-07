import axios from 'axios';

export const getScheduleByid = async (id) => {
  const response = await axios.get(`https://bookingtravel-44jm.onrender.com/GetSchedule/${id}`, { withCredentials: true });
  return response.data;
};

