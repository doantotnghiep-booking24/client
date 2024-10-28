import axios from 'axios';

export const GetAllTicket = async () => {
  const response = await axios.get('http://localhost:3001/Ticket/GetAllTicket');
  return response
};

