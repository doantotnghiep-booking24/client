import axios from 'axios';

export const GetAllTimeSchedule = async () => {
  const response = await axios.get('https://bookingtravel-44jm.onrender.com/TimeSchedules/getTimeSchedules',{ withCredentials: true});
  return response.data
};

