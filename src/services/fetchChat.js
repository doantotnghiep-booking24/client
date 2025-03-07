import axios from 'axios';

export const fetchChat = async (userId) => {
  const response = await axios.get(`https://bookingtravel-44jm.onrender.com/chat/${userId}`, {withCredentials: true});
  return response.data;
};

export const fetchAllChat = async () => {
  const response = await axios.get(`https://bookingtravel-44jm.onrender.com/chat/`, {withCredentials: true});
  // console.log(response.data);
  return response.data;
};

export const fetchChatByIdUser = async (userId) => {
  const response = await axios.get(`https://bookingtravel-44jm.onrender.com/chat/chats/${userId}`, {withCredentials: true});
  console.log(response.data);
  return response.data;

};
