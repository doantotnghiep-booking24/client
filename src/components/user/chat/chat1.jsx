import { useState, useEffect, useRef } from 'react';
import { Box, Divider, Typography, TextField, IconButton, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { receiveMessage, sendMessage, dataChat } from '../../../redux/features/ChatSlice';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { fetchChat } from '../../../services/fetchChat';
const socket = io('http://localhost:3001');

const Chat = () => {
  const refScrollText = useRef(null)
  const datachats = useSelector((state) => state.chat.datachats);
  const [messageText, setMessageText] = useState('');
  const dispatch = useDispatch();
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleChatBox = () => {
    setIsChatBoxOpen(!isChatBoxOpen);
  };
  useEffect(() => {
    if (refScrollText) {
      refScrollText.current?.scrollIntoView();
    }
  }, [datachats, !isChatBoxOpen]);

  // Get userId from cookie
  const authCookie = Cookies.get('auth');
  let userId;
  let Role
  if (authCookie) {
    try {
      var parsedAuth = JSON.parse(decodeURIComponent(authCookie));
      userId = parsedAuth._id;
      Role = parsedAuth.role;
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

    socket.on('showFirstMessageNotice', (data) => {
      setNotice(data.message);
      localStorage.setItem('notice', data.message); // Lưu thông báo vào localStorage
    });

    socket.on('receiveMessage', (message) => {
      callMessages()
      dispatch(receiveMessage(message));  // Dispatch vào Redux để cập nhật state
      if (message.role === 'Admin') {
        setNotice('');  // Ẩn thông báo sau khi admin trả lời
      }
    });

    return () => {
      socket.off('receiveMessage');  // Hủy lắng nghe khi component unmount
    };
  }, [dispatch]);

  useEffect(() => {
    const storedNotice = localStorage.getItem('notice');
    if (storedNotice) {
      setNotice(storedNotice);
    }

  }, []);


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
          background: 'linear-gradient(135deg, #6EC1E4, #4183D7)',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          color: 'white',
          borderRadius: '50%',
          transition: 'transform 0.2s ease, background 0.3s ease',
          '&:hover': {
            background: 'linear-gradient(135deg, #5A9FCF, #367BB5)',
            transform: 'scale(1.1)',
          },
          '&:active': {
            transform: 'scale(1)',
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        {isChatBoxOpen ? <CloseIcon sx={{ fontSize: 28 }} /> : <ChatIcon sx={{ fontSize: 28 }} />}
      </IconButton>


      {/* Giao diện ChatBox */}
      {isChatBoxOpen && (
        <Box
          sx={ screenWidth >= 300 && screenWidth <= 468 ?{
            position: 'fixed',
            bottom: 10, // Cách nút mở/đóng một khoảng nhỏ
            right: 60,
            width: 240,
            height: 400,
            border: '1px solid #ccc',
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'white',
            marginRight: '7px',
            zIndex: 1000
          } : { position: 'fixed',
            bottom: 10, // Cách nút mở/đóng một khoảng nhỏ
            right: 60,
            width: 400,
            height: 500,
            border: '1px solid #ccc',
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'white',
            marginRight: '7px',
            zIndex: 1000 } }
        >

          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <>
              <div style={{ display: ' flex' }}>
                {/* <ChatBubbleOutlineIcon sx={{ fontSize: '50px', margin: '15px' }}/> */}
                <Typography variant="h6" gutterBottom sx={{ p: 1 }}>
                  Hãy trò chuyện với chúng tôi khi có thắc mắc nhé !!
                </Typography>
              </div>

              <Divider />
              {/* Khu vực hiển thị tin nhắn */}

              <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 1 }}>
                {/* Hiển thị tin nhắn đầu tiên */}
                {datachats?.length > 0 && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: datachats[0].role !== 'Admin' ? 'flex-end' : 'flex-start',
                      mb: 1,
                    }}
                  >
                    {datachats[0].role === 'Admin' && (
                      <Avatar
                        src="https://i.pinimg.com/736x/18/c3/34/18c33493ba7ed7d680e0987855986225.jpg"
                        alt="Admin Avatar"
                        sx={{ width: 40, height: 40, marginRight: '10px' }}
                      />
                    )}
                      <Tooltip title={new Date(datachats[0].time).toLocaleTimeString()} arrow>
                        <Box
                          sx={{
                            maxWidth: '70%',
                            p: 1,
                            borderRadius: 1.5,
                            backgroundColor: datachats[0].role !== 'Admin' ? '#d1e7ff' : '#f1f1f1',
                            color: 'black',
                          }}
                        >
                          <Typography variant="body2">{datachats[0].text}</Typography>
                        </Box>
                      </Tooltip>
                  </Box>

                )}
                {/* thông báo đợi admin reply*/}
                {datachats?.length > 0 && datachats[0].text && notice && (
                  <Typography
                    variant="body2"
                    sx={{
                      padding: '8px',
                      borderRadius: '8px',
                      marginBottom: '10px',
                      textAlign: 'center',
                      color: 'red',
                      fontStyle: 'italic',
                    }}
                  >
                    {notice}
                  </Typography>
                )}
                {/* Tách các tin nhắn còn lại */}
                {datachats?.length > 1 && (
                  <>

                    {datachats?.slice(1).map((message, index) => (
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
                            src="https://i.pinimg.com/736x/18/c3/34/18c33493ba7ed7d680e0987855986225.jpg"
                            alt="Admin Avatar"
                            sx={{ width: 40, height: 40, marginRight: '10px' }}
                          />
                        )}
                        <Tooltip title={new Date(message.time).toLocaleTimeString()} arrow>
                          <Box
                            sx={{
                              maxWidth: '70%',
                              p: 1,
                              borderRadius: 1.5,
                              backgroundColor: message.role !== 'Admin' ? '#d1e7ff' : '#f1f1f1',
                              color: 'black',
                            }}
                          >
                            <Typography variant="body2">{message.text}</Typography>
                          </Box>
                        </Tooltip>
                        <div ref={refScrollText} />
                      </Box>
                    ))}
                  </>
                )}
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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') { // Kiểm tra nếu phím nhấn là 'Enter'
                      e.preventDefault(); // Ngăn chặn hành động mặc định (ví dụ như tạo dòng mới trong ô nhập)
                      handleSendMessage(); // Gọi hàm gửi tin nhắn
                    }
                  }}
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
