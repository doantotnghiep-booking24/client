import axios from 'axios';

export const fetchChat = async (userId) => {
  const response = await axios.get(`http://localhost:3001/chat/${userId}`);
  return response.data;
};

export const fetchAllChat = async () => {
  const response = await axios.get(`http://localhost:3001/chat/`);
  console.log(response.data);
  return response.data;

};

export const fetchChatByIdUser = async (userId) => {
  const response = await axios.get(`http://localhost:3001/chat/chats/${userId}`);
  console.log(response.data);
  return response.data;

};
