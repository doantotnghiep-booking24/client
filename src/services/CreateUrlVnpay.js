import axios from 'axios';

export const CreateUrlVnpay = async (data) => {
  const response = await axios.post('https://bookingtravel-jhcv.onrender.com/Ticket/create_payment_url', data, { withCredentials: true });
  return response
};

