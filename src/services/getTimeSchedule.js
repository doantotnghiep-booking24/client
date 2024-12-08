import axios from 'axios';

export const GetAllTimeSchedule = async () => {
  const response = await axios.get('http://localhost:3001/TimeSchedules/getTimeSchedules',{ withCredentials: true});
  return response.data
};

