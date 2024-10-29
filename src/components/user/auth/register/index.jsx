/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { ScreenMode } from "../../pages/siginPage";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";
import SocialLogin from "../login/component/SocialLogin";
function SignupForm({ onSwitchMode }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [valueInput, setValueInput] = useState({
    Name: "",
    Email: "",
    Password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleGetValueInput = (e) => {
    const { value, name } = e.target;
    setValueInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    setIsLoading(true);
    const api = "http://localhost:3001/User/Register";
    console.log(valueInput);
    try {
      const result = await axios.post(api, valueInput);
      const data = await result.data;

      data && onSwitchMode(ScreenMode.SIGN_IN);
      setValueInput({});
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(true);
    }
  };
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
              <Typography variant="subtitle1" color="#555">
                Họ và tên
              </Typography>
              <TextField
                name="Name"
                id="filled-search"
                type="search"
                variant="filled"
                InputProps={{ style: { height: "45px" } }}
                onChange={handleGetValueInput}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography variant="subtitle1" color="#555">
                Email
              </Typography>
              <TextField
                name="Email"
                id="filled-search"
                type="search"
                variant="filled"
                InputProps={{ style: { height: "45px" } }}
                onChange={handleGetValueInput}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography variant="subtitle1" color="#555">
                Mật khẩu
              </Typography>
              <FilledInput
                name="Password"
                id="filled-adornment-password"
                sx={{ height: "45px" }}
                type={showPassword ? "text" : "password"}
                onChange={handleGetValueInput}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
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
            onClick={handleSignup}
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Đăng ký"
            )}
          </Button>
          <SocialLogin />
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
