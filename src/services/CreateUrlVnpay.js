import axios from 'axios';

export const CreateUrlVnpay = async (data) => {
  const response = await axios.post('http://localhost:3001/Ticket/create_payment_url',data,{ withCredentials: true});
  return response
};

