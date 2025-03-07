import axios from 'axios';

export const CreateTicket = async (data) => {
  const response = await axios.post('https://bookingtravel-44jm.onrender.com/Ticket/CreateTicket',
    data,
    { withCredentials: true });
  return response
};

