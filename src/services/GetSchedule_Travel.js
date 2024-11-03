import axios from 'axios';

export const getScheduleByid = async (id) => {
  const response = await axios.get(`http://localhost:3001/Schedules/GetSchedule/${id}`);
  return response.data;
};

