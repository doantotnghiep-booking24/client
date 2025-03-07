import axios from 'axios';

export const Update_StatusCancelTicketsByClient = async (id) => {
  const response = await axios.post(`https://bookingtravel-44jm.onrender.com/Ticket/Update_StatusCancelTicketsByClient/${id}`,{}, { withCredentials: true});
  return response
};

