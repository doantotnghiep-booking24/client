import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chats: {}, // Lưu trữ tin nhắn cho mỗi cuộc trò chuyện (dựa trên ID người nhận)
  // currentChat: null, // Lưu trữ ID của cuộc trò chuyện hiện tại
  datachats: [],
  selectedContact: null,
  senderId: '',
  messages: []
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    receiveMessage: (state, action) => {
      // state.messages = action.payload
      state.messages = [...state.messages,action.payload]
      console.log(state.messages);

      // const { senderId, receiverId, message, time } = action.payload;
      // const chatId = receiverId === '67318dd0e23a808c2ecfbb43' 
      //   ? `${senderId}-admin`
      //   : senderId < receiverId 
      //     ? `${senderId}-${receiverId}` 
      //     : `${receiverId}-${senderId}`;

      // if (!state.chats[chatId]) {
      //   state.chats[chatId] = [];
      // }
      // state.chats[chatId].push(action.payload);
    },



    sendMessage: (state, action) => {
      const { senderId, receiverId, message, time } = action.payload;
      const chatId = senderId < receiverId ? `${senderId}-${receiverId}` : `${receiverId}-${senderId}`;

      // console.log('Send Message:', action.payload, 'chatId:', chatId);

      if (!state.chats[chatId]) {
        state.chats[chatId] = [];
      }
      state.chats[chatId].push({ senderId, receiverId, message, time });
    },

    // setCurrentChat: (state, action) => {
    //   state.currentChat = action.payload;
    //   // console.log('Set Current Chat:', action.payload);
    // },

    chatUser: (state, action) => {
      state.chatuser = action.payload;
    },

    dataChat: (state, action) => {
      state.datachats = action.payload
    }

  },
});

export const { receiveMessage, sendMessage, setCurrentChat, chatUser, dataChat } = chatSlice.actions;

export default chatSlice.reducer;
