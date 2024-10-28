import axios from 'axios';

export const CreateUrlZalopay = async (data) => {
  const response = await axios.post('http://localhost:3001/Ticket/PaymentZalopay',data);
  return response
};

