import axios from 'axios';

export const Update_StatusCancelTicketsByClient = async (id) => {
  const response = await axios.post(`http://localhost:3001/Ticket/Update_StatusCancelTicketsByClient/${id}`, { withCredentials: true});
  return response
};

