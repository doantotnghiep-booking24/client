import axios from 'axios';

export const CreateTicket = async (data) => {
  const response = await axios.post('http://localhost:3001/Ticket/CreateTicket',data,{ withCredentials: true});
  return response
};

