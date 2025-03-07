import axios from "axios";
export const getTicket = async (id) => {
  const response = await axios.post(`https://bookingtravel-44jm.onrender.com/Ticket/FindTicket/${id}`, {}, { withCredentials: true });
  return response

};
