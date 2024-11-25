import { useState } from 'react';
import { Box, List, ListItem, ListItemText, Divider, Typography, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import Cookies from 'js-cookie';
import io from 'socket.io-client';

function Chat() {

  const socket = io('http://localhost:3001');

  const [contacts] = useState([
    { id: 1, name: 'Người 1', lastMessage: 'Tin nhắn gần nhất 1' },
    { id: 2, name: 'Người 2', lastMessage: 'Tin nhắn gần nhất 2' },
    { id: 3, name: 'Người 3', lastMessage: 'Tin nhắn gần nhất 3' },
  ]);

  const authCookie = Cookies.get('auth');
  let userId;
  let isAdmin = false;
  let role;
  if (authCookie) {
    try {
      const parsedAuth = JSON.parse(decodeURIComponent(authCookie));
      userId = parsedAuth._id;
      isAdmin = parsedAuth._id === '67318dd0e23a808c2ecfbb43';
      role = parsedAuth.role
      console.log(userId,isAdmin, role);
      
    } catch (error) {
      console.error('Error parsing auth cookie:', error);
    }
  }

  const [selectedContact, setSelectedContact] = useState(null);
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);




  
  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
  };

  const toggleChatBox = () => {
    setIsChatBoxOpen(!isChatBoxOpen);
  };

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
          {/* Danh sách người nhắn bên trái */}
          <Box sx={{ width: '35%', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
            <List>
              {contacts.map((contact) => (
                <ListItem
                  button
                  key={contact.id}
                  onClick={() => handleSelectContact(contact)}
                  selected={selectedContact && selectedContact.id === contact.id}
                >
                  <ListItemText primary={contact.name} secondary={contact.lastMessage} />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Khu vực nhập tin nhắn bên phải */}
          <Box sx={{ width: '65%', display: 'flex', flexDirection: 'column' }}>
            {selectedContact ? (
              <>
                <Typography variant="h6" gutterBottom sx={{ p: 1 }}>
                  {selectedContact.name}
                </Typography>
                <Divider />
                {/* Khu vực hiển thị tin nhắn */}
                <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 1 }}>
                  {/* Các tin nhắn có thể hiển thị ở đây */}
                </Box>
                {/* Ô nhập tin nhắn */}
                <Box sx={{ display: 'flex', p: 1, borderTop: '1px solid #ccc' }}>
                  <TextField
                    variant="outlined"
                    placeholder="Nhập tin nhắn..."
                    fullWidth
                    size="small"
                  />
                  <IconButton color="primary">
                    <SendIcon />
                  </IconButton>
                </Box>
              </>
            ) : (
              <Typography variant="body1" sx={{ mt: 2, p: 1 }}>
                Vui lòng chọn một người nhắn để bắt đầu trò chuyện.
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </>
  );
}

export default Chat;
