import axios from 'axios';

export const GetAllTicket = async () => {
  const response = await axios.get('https://bookingtravel-44jm.onrender.com/Ticket/GetAllTicket',{ withCredentials: true});
  return response
};

