/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { ScreenMode } from "../../pages/siginPage";

import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";

import InputAdornment from "@mui/material/InputAdornment";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addAuth } from "../../../../redux/features/AuthSlice";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import SocialLogin from "./component/SocialLogin";
function SigninForm({ onSwitchMode }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [valueInput, setValueInput] = useState({
    Email: "",
    Password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    const existingData = JSON.parse(localStorage.getItem("resetPass")) || {};

    // Cập nhật dữ liệu mới vào đối tượng dữ liệu
    const updatedData = { ...existingData, ["Email"]: value };

    // Lưu đối tượng dữ liệu đã cập nhật vào localStorage
    localStorage.setItem("resetPass", JSON.stringify(updatedData));
    setValueInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    const api = "http://localhost:3001/User/Login";

    try {
      setIsLoading(true);
      const res = await axios.post(api, valueInput);
      const data = await res.data;

      if (data) {
        dispatch(addAuth(data.inforUser));
        setIsLoading(false);
        // Thông báo thành công
        Swal.fire({
          title: "Đăng nhập thành công!",
          text: "Chào mừng bạn đến với hệ thống.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/"); // Chuyển hướng sau khi người dùng nhấn OK
        });
      }
    } catch (error) {
      console.log(error);
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
                name="Email"
                onChange={handleGetValueInput}
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
              <FilledInput
                name="Password"
                onChange={handleGetValueInput}
                id="filled-adornment-password"
                sx={{ height: "45px" }}
                type={showPassword ? "text" : "password"}
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
            onClick={handleLogin}
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              " Đăng nhập"
            )}
          </Button>

        <SocialLogin/>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Link
            to="/reset-password"
            style={{ textDecoration: "none", color: "#212121" }}
            variant="body2"
            color="#555"
          >
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
