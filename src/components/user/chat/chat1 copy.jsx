import { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, Divider, Typography, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { receiveMessage, sendMessage, dataChat } from '../../../redux/features/ChatSlice';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { fetchChat, fetchAllChat } from '../../../services/fetchChat';

const socket = io('http://localhost:3001');

const Chat = () => {

  // const [contacts] = useState([
  //   { id: 1, name: 'Người 1', lastMessage: 'Tin nhắn gần nhất 1' },
  //   { id: 2, name: 'Người 2', lastMessage: 'Tin nhắn gần nhất 2' },
  //   { id: 3, name: 'Người 3', lastMessage: 'Tin nhắn gần nhất 3' },
  // ]);
  const [messageText, setMessageText] = useState('');
  // const [selectedUser, setSelectedUser] = useState(null); // User selection for admin
  const dispatch = useDispatch();
  const [usersWhoMessaged, setUsersWhoMessaged] = useState([]); // State to store users who have messaged admin
  const [selectedContact, setSelectedContact] = useState(null);
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
  const handleSelectContact = (id) => {
    setSelectedContact(id);
  };

  const toggleChatBox = () => {
    setIsChatBoxOpen(!isChatBoxOpen);
  };
  // Get userId from cookie
  const authCookie = Cookies.get('auth');
  let userId;
  let isAdmin = false;
  let Role
  if (authCookie) {
    try {
      const parsedAuth = JSON.parse(decodeURIComponent(authCookie));
      userId = parsedAuth._id;
      Role = parsedAuth.role
      isAdmin = parsedAuth._id === '67318dd0e23a808c2ecfbb43';
    } catch (error) {
      console.error('Error parsing auth cookie:', error);
    }
  }

  console.log(userId);
  console.log(Role)
  const adminId = '67318dd0e23a808c2ecfbb43'; // Fixed admin ID
  // const currentChatId = useSelector((state) => state.chat.currentChat);
  // console.log(currentChatId);

  // const messages = useSelector((state) => state.chat.chats[currentChatId] || []);
  // useEffect(() => {
  //   // console.log("Selected user:", selectedUser);
  //   if (selectedUser) {
  //     const chatId = userId < selectedUser ? `${userId}-${selectedUser}` : `${selectedUser}-${userId}`;
  //     dispatch(setCurrentChat(chatId));
  //   }
  // }, [selectedUser, dispatch, userId]);

  // useEffect(() => {
  //   if (!isAdmin) {
  //     const chatId = userId < adminId ? `${userId}-${adminId}` : `${adminId}-${userId}`;
  //     dispatch(setCurrentChat(chatId));
  //   }
  // }, [isAdmin, dispatch, userId, adminId]);

  // Socket listener for receiving messages
  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      // console.log('Received message on client:', message); // Kiểm tra dữ liệu nhận được
      dispatch(receiveMessage(message)); // Dispatch vào Redux
      if (isAdmin && !usersWhoMessaged.includes(message.senderId)) {
        setUsersWhoMessaged((prev) => [...prev, message.senderId]);
      }
    });
    return () => {
      socket.off('receiveMessage');
    };
  }, [dispatch, isAdmin, usersWhoMessaged]);


  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage = {
        senderId: userId,
        receiverId: Role === 'admin' ? userId : adminId, 
        messages: [{
          senderId: userId,
          text: messageText,
          time: new Date(),
          role: Role
        }],
        time: new Date().toISOString(),
      };

      // Gửi tin nhắn qua socket
      socket.emit('sendMessage', newMessage, (response) => {
        if (response.status === 'success') {
          dispatch(sendMessage(newMessage));
        } else {
          console.error('Error sending message:', response.error);
        }
      });

      setMessageText(''); // Xóa nội dung tin nhắn
    }
  };


  // console.log('Messages from Redux:', messages);
  const datachats = useSelector((state) => state.chat.datachats);
  console.log(datachats);

  useEffect(() => {
    const callMessages = async () => {
      const res = await fetchChat(userId)
      console.log(res[0].message);
      dispatch(dataChat(res[0].message))
    }
    callMessages()
  }, [])
  
  useEffect(() => {
    const fetchRoomMessage = async () => {
      try {
        const allChats = await fetchAllChat();
        setUsersWhoMessaged(allChats.Chat); 
      } catch (error) {
        console.error("Failed to fetch chat list:", error);
      }
    };
  
    fetchRoomMessage();
  }, []);
  

  return (
    <>
      {/* Nút mở/đóng ChatBox */}
      <IconButton
        onClick={toggleChatBox}
        sx={{
          position: 'fixed',
          bottom: 50,
          right: 20,
          zIndex: 1000,
          backgroundColor: '#B8E1FF',
          boxShadow: 3,
          color: 'white'
        }}
      >
        {isChatBoxOpen ? <CloseIcon /> : <ChatIcon />}
      </IconButton>

      {/* Giao diện ChatBox */}
      {isChatBoxOpen && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 10, // Cách nút mở/đóng một khoảng nhỏ
            right: 60,
            width: 400,
            height: 450,
            border: '1px solid #ccc',
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'white',
          }}
        >
          {/*Danh sách nhắn tin bên trái*/}
          {Role == 'Admin' || Role == 'admin' ? (
            <>

              <Box sx={{ width: '35%', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
                <List>
                {usersWhoMessaged.map((user) => (
                    <ListItem
                      button
                      key={user._id}
                      onClick={() => handleSelectContact(user._id)}
                      selected={selectedContact === user._id}
                    >
                    <ListItemText primary={`User ID: ${user._id}`} />
                    </ListItem>
                  ))}
                </List>
              </Box>
              {/* Nhắn tin bên phải*/}
              <Box sx={{ width: '65%', display: 'flex', flexDirection: 'column' }}>
                {selectedContact ? (
                  <>
                    <Typography variant="h6" gutterBottom sx={{ p: 1 }}>
                      {selectedContact.senderId}
                    </Typography>
                    <Divider />
                    {/* Khu vực hiển thị tin nhắn */}
                    <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 1 }}>
                      {datachats?.map((message, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            justifyContent: message.receiverId === adminId ? 'flex-end' : 'flex-start',
                            mb: 1,
                          }}
                        >
                          <Box
                            sx={{
                              maxWidth: '70%',
                              p: 1,
                              borderRadius: 1,
                              backgroundColor: message.receiverId === adminId ? '#d1f7c4' : '#f1f1f1',
                              color: 'black',
                            }}
                          >
                            <Typography variant="body2">{message.text}</Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>

                    {/* Ô nhập tin nhắn */}
                    <Box sx={{ display: 'flex', p: 1, borderTop: '1px solid #ccc' }}>
                      <TextField
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        variant="outlined"
                        placeholder="Nhập tin nhắn..."
                        fullWidth
                        size="small"
                      />
                      <IconButton color="primary">
                        <SendIcon onClick={handleSendMessage} />
                      </IconButton>
                    </Box>
                  </>

                ) : (
                  <Typography variant="body1" sx={{ mt: 2, p: 1 }}>
                    Vui lòng chọn một người nhắn để bắt đầu trò chuyện.
                  </Typography>
                )}
              </Box>
            </>
          ) :
            (
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <>
                  <Typography variant="h6" gutterBottom sx={{ p: 1 }}>
                    Bạn dang chat với admin
                  </Typography>
                  <Divider />
                  {/* Khu vực hiển thị tin nhắn */}
                  <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 1 }}>
                  {datachats?.map((message, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: message.receiverId !== adminId ? 'flex-end' : 'flex-start',
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: '70%',
                          p: 1,
                          borderRadius: 1,
                          backgroundColor: message.receiverId === adminId ? '#d1f7c4' : '#f1f1f1',
                          color: 'black',
                        }}
                      >
                        <Typography variant="body2">{message.text}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
                  {/* Ô nhập tin nhắn */}
                  <Box sx={{ display: 'flex', p: 1, borderTop: '1px solid #ccc' }}>
                    <TextField
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      variant="outlined"
                      placeholder="Nhập tin nhắn..."
                      fullWidth
                      size="small"
                    />
                    <IconButton color="primary">
                      <SendIcon onClick={handleSendMessage} />
                    </IconButton>
                  </Box>
                </>
              </Box>
            )}



        </Box>
      )}
    </>
  );
};

export default Chat;
