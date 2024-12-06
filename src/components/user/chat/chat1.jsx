import { useState, useEffect } from 'react';
import { Box, Divider, Typography, TextField, IconButton, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { receiveMessage, sendMessage, dataChat } from '../../../redux/features/ChatSlice';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { fetchChat } from '../../../services/fetchChat';

const socket = io('http://localhost:3001');

const Chat = () => {
  const datachats = useSelector((state) => state.chat.datachats);
  const [messageText, setMessageText] = useState('');
  const dispatch = useDispatch();
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
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
      var parsedAuth = JSON.parse(decodeURIComponent(authCookie));
      userId = parsedAuth._id;
      Role = parsedAuth.role;
      isAdmin = parsedAuth._id === '67318dd0e23a808c2ecfbb43';
    } catch (error) {
      console.error('Error parsing auth cookie:', error);
    }
  }
  const adminId = '67318dd0e23a808c2ecfbb43'; // Fixed admin ID

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage = {
        senderId: userId,
        receiverId: adminId,
        messages: [{
          senderId: userId,
          receiverId: adminId,
          text: messageText,
          time: new Date(),
          role: Role
        }],
        time: new Date().toISOString(),
      };


      // Gửi tin nhắn qua socket
      socket.emit('sendMessage', newMessage, (response) => {
        console.log('newMessage', newMessage);
        if (response.status === 'success') {
          if (newMessage) {
            localStorage.setItem('senderId', newMessage.senderId);
          }
          dispatch(sendMessage(newMessage));
        } else {
          console.error('Error sending message:', response.error);
        }
      });
      // console.log('Dispatched action:', newMessage);
      setMessageText(''); // Xóa nội dung tin nhắn
    }
  };
  console.log(datachats);

  // Socket listener for receiving messages
  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      callMessages()
      dispatch(receiveMessage(message));  // Dispatch vào Redux để cập nhật state
    });
    return () => {
      socket.off('receiveMessage');  // Hủy lắng nghe khi component unmount
    };
  }, [dispatch]);



  const callMessages = async () => {
    const res = await fetchChat(userId)
    dispatch(dataChat(res[0].messages))
  }
  useEffect(() => {
    callMessages()
  }, [])

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
            width: 320,
            height: 400,
            border: '1px solid #ccc',
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'white',
            zIndex: 1000
          }}
        >
          {/*Danh sách nhắn tin bên trái*/}

          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <>
              <div style={{ display: ' flex' }}>
                <ChatBubbleOutlineIcon sx={{ fontSize: '50px', margin: '15px' }}/>
                <Typography variant="h6" gutterBottom sx={{ p: 1 }}>
                  Hãy trò chuyện với chúng tôi khi có thắc mắc nhé !!
                </Typography>
              </div>

              <Divider/>
              {/* Khu vực hiển thị tin nhắn */}

              <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 1 }}>
                {datachats?.map((message, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: message.role !== 'Admin' ? 'flex-end' : 'flex-start',
                      mb: 1,
                    }}
                  >

                    {message.role === 'Admin' && (
                      <Avatar
                        src='https://i.pinimg.com/736x/18/c3/34/18c33493ba7ed7d680e0987855986225.jpg'
                        alt="Admin Avatar"
                        sx={{
                          width: 40,
                          height: 40,
                          marginRight: '10px',
                        }}
                      />
                    )}

                    <Box
                      sx={{
                        maxWidth: '70%',
                        p: 1,
                        borderRadius: 1,
                        backgroundColor: message.role !== 'Admin' ? '#d1e7ff' : '#f1f1f1',
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
        </Box>
      )}
    </>
  );
};

export default Chat;
