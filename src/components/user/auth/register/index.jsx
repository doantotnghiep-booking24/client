/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { ScreenMode } from "../../pages/siginPage";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import axios from "axios";
import SocialLogin from "../login/component/SocialLogin";
import { checkValidateName } from "../../../../utils/validateForm";
import checkValidateEmail from "../../../../utils/validateForm";
function SignupForm({ onSwitchMode }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [valueInput, setValueInput] = useState({
    Name: "",
    Email: "",
    Password: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nameTextField, setNameHelperText] = useState("");
  const [nameError, setNameError] = useState(false);
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

    if (name === "Email") {
      if (!checkValidateEmail(value)) {
        setEmailError(true);
        setEmailHelperText("Email không hợp lệ");
      } else {
        setEmailError(false);
        setEmailHelperText("");
      }
    }

    // Validate password
    if (name === "Password") {
      if (value.length < 6) {
        setPasswordError(true);
        setPasswordHelperText("Mật khẩu phải có ít nhất 6 ký tự");
      } else {
        setPasswordError(false);
        setPasswordHelperText("");
      }
    }

    if (name === "Name") {
      if (value.trim().length < 2) {
        // Kiểm tra độ dài tối thiểu
        setNameError(true);
        setNameHelperText("Tên phải có ít nhất 2 ký tự");
      } else if (!checkValidateName(value)) {
        // Kiểm tra ký tự hợp lệ (chỉ cho phép chữ cái và khoảng trắng)
        setNameError(true);
        setNameHelperText("Tên không được chứa ký tự đặc biệt");
      } else {
        setNameError(false);
        setNameHelperText("");
      }
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    const api = "https://bookingtravel-44jm.onrender.com/User/Register";
    if (emailError || passwordError || nameError) {
      setIsLoading(false);
      return Swal.fire({
        title: "Đăng nhập thất bại!",
        text: "Vui lòng nhập đúng format Name,  Email và Password",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    try {
      const result = await axios.post(api, valueInput);
      const data = await result.data;

      data && onSwitchMode(ScreenMode.SIGN_IN);
      setValueInput({ Name: "", Email: "", Password: "" });
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        title: "Đăng ký thất bại!",
        text: error.response.data.error,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
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
                error={nameError}
                helperText={nameError ? nameTextField : " "}
                onChange={handleGetValueInput}
                sx={{ margin: 0, padding: 0 }}
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
                error={emailError}
                helperText={emailError ? emailHelperText : " "}
                onChange={handleGetValueInput}
                sx={{ margin: 0, padding: 0 }}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography variant="subtitle1" color="#555">
                Mật khẩu
              </Typography>
              <TextField
                name="Password"
                onChange={handleGetValueInput}
                id="filled-adornment-password"
                error={passwordError} // Show error state if there is a password error
                helperText={passwordError ? passwordHelperText : " "} // Display helper text based on the error state
                sx={{ height: "45px", margin: 0, padding: 0 }}
                type={showPassword ? "text" : "password"}
                variant="filled"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "show the password"
                        }
                        onClick={handleClickShowPassword} // Toggle password visibility
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: { height: "45px" },
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
