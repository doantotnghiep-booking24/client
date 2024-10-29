import axios from "axios";
export const getTicket = async (id) => {
    const response = await axios.post(`http://localhost:3001/Ticket/FindTicket/${id}`);
    return response
   
  };