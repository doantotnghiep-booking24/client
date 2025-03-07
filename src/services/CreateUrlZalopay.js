import axios from 'axios';

export const CreateUrlZalopay = async (data) => {
  const response = await axios.post('https://bookingtravel-44jm.onrender.com/Ticket/PaymentZalopay',data,{ withCredentials: true});
  return response
};

