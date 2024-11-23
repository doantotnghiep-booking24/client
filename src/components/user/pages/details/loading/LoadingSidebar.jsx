import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function LoadingSidebar({isLoading}) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', border: '1px solid #ccc', padding: '20px' }}>

      <Backdrop
        sx={(theme) => ({
          color: '#fff',
          zIndex: theme.zIndex.drawer + 1,
          position: 'absolute', // Đặt vị trí tuyệt đối
          top: 0,
          left: 0,
          width: '100%', // Đảm bảo nó phủ toàn bộ vùng cha
          height: '100%', // Đảm bảo nó phủ toàn bộ vùng cha
        })}
        open={isLoading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
     
    </Box>
  );
}
