/* eslint-disable react/prop-types */
import { Button, Stack, TextField, Typography } from "@mui/material";
import { ScreenMode } from "../../pages/siginPage";

import {Link} from "react-router-dom"

function SigninForm({ onSwitchMode }) {
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
            Chào mừng bạn quay trở lại
          </Typography>
          <Typography variant="body2" color="#555">
            Vui lòng đăng nhập tài khoản để có một trải nghiệm tối nhất và chọn
            cho mình chuyến du lịch phù hợp.
          </Typography>
        </Stack>
        <Stack spacing={3}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography variant="subtitle1" color="#555">
                Email
              </Typography>
              <TextField
                id="filled-search"
                type="search"
                variant="filled"
                InputProps={{ style: { height: "45px" } }}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography variant="subtitle1" color="#555">
                Mật khẩu
              </Typography>
              <TextField
                id="filled-password-input"
                type="password"
                autoComplete="current-password"
                variant="filled"
                InputProps={{ style: { height: "45px" } }}
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
            Đăng nhập
          </Button>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Link to="/reset-password" style={{ textDecoration: "none", color: "#212121"}}  variant="body2" color="#555">
             Quên mật khẩu?
          </Link>
          <Typography
            onClick={() => onSwitchMode(ScreenMode.SIGN_UP)}
            fontWeight={600}
            sx={{
              cursor: "pointer",
              color: "#3fd0d4",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Đăng ký
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default SigninForm;
