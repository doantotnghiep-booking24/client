import axios from 'axios';

export const CreatePayment_Direct = async (data) => {
  const response = await axios.post('https://bookingtravel-44jm.onrender.com/Ticket/Direct_PaymentTicket',data, { withCredentials: true});
  return response
};

