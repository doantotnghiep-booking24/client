import axios from 'axios';

export const CreatePayment_Direct = async (data) => {
  const response = await axios.post('http://localhost:3001/Ticket/Direct_PaymentTicket',data, { withCredentials: true});
  return response
};

