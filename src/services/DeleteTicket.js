import axios from 'axios';
export const DeleteTicket = async (id) => {
    const response = await axios.post(`http://localhost:3001/Ticket/DeleteTicket/${id}`);
    return response
  };