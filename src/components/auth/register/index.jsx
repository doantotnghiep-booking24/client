/* eslint-disable react/prop-types */
import { Button, Stack, TextField, Typography } from "@mui/material";
import { ScreenMode } from "../../pages/siginPage";

function SignupForm({ onSwitchMode }) {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100%",
        color: "#333",
        padding: 3,
      }}
    >
      <Stack
        spacing={4}
        sx={{
          width: "100%",
          maxWidth: "450px",
          backgroundColor: "#f9f9f9",
          padding: 4,
          borderRadius: 2,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Stack spacing={1}>
          <Typography variant="h4" fontWeight={600} color="#333">
            Đăng ký tài khoản
          </Typography>
          <Typography variant="body2" color="#555">
            Vui lòng đăng ký tài khoản để có một trải nghiệm tối nhất và chọn
            cho mình chuyến du lịch phù hợp.
          </Typography>
        </Stack>
        <Stack spacing={3}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography color="#333">Tên</Typography>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  sx: {
                    backgroundColor: "#fff",
                    borderRadius: 1,
                  },
                }}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography color="#333">Email</Typography>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  sx: {
                    backgroundColor: "#fff",
                    borderRadius: 1,
                  },
                }}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography color="#333">Mật khẩu</Typography>
              <TextField
                type="password"
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  sx: {
                    backgroundColor: "#fff",
                    borderRadius: 1,
                  },
                }}
              />
            </Stack>
          </Stack>
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{
              bgcolor: "#3fd0d4",
              color: "#fff",
              "&:hover": {
                bgcolor: "#2bb1b6",
              },
              padding: 1.5,
              borderRadius: 2,
            }}
          >
            Đăng ký
          </Button>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Typography variant="body2" color="#555">
            Đi đến đăng nhập?
          </Typography>
          <Typography
            onClick={() => onSwitchMode(ScreenMode.SIGN_IN)}
            fontWeight={600}
            sx={{
              cursor: "pointer",
              color: "#3fd0d4",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Đăng nhập
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default SignupForm;
