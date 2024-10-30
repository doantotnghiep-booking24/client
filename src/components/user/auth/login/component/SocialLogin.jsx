import React from "react";
import { Box, Button } from "@mui/material";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import auth from "../../../../../firebase/configFireBase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addAuth } from "../../../../../redux/features/AuthSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
const SocialLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLoginGoogle = async () => {
    const api = "http://localhost:3001/User/LoginWithGoogle";
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      if (result) {
        const user = result.user;
        const data = {
          Name: user.displayName,
          Email: user.email,
          photoUrl: user?.photoURL,
        };
        try {
          const newData = await axios.post(api, data);
          const datas = await newData.data;
          console.log(datas.inforUser);
          dispatch(addAuth(datas.inforUser));
          Swal.fire({
            title: "Đăng nhập thành công!",
            text: "Chào mừng bạn đến với hệ thống.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/"); // Chuyển hướng sau khi người dùng nhấn OK
          });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleLoginFacebook = async () => {
    const api = "http://localhost:3001/User/LoginWithFacebook";
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      if (result) {
        const user = result.user;
        const data = {
          Name: user.displayName,
          Email: user.email,
          photoUrl: user?.photoURL,
        };
        try {
          const newData = await axios.post(api, data);
          const datas = await newData.data;
          console.log(datas.inforUser);
          dispatch(addAuth(datas.inforUser));
          Swal.fire({
            title: "Đăng nhập thành công!",
            text: "Chào mừng bạn đến với hệ thống.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/"); // Chuyển hướng sau khi người dùng nhấn OK
          });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  // login here
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <Button
        variant="contained"
        size="large"
        onClick={handleLoginGoogle}
        sx={{
          width: "100%",
          display: "flex",
          gap: "5px",
          alignItems: "center",
          padding: 1.5,
          borderRadius: 2,
          textTransform: "capitalize",
          fontSize: "1rem",
          color: "black",
          bgcolor: "white",
          "&:hover": {
            bgcolor: "#F0F8FF",
          },
        }}
      >
        {" "}
        {
          <img
            width={24}
            height={24}
            src="https://img.icons8.com/color/48/google-logo.png"
            alt="google-logo"
          />
        }
        Google
      </Button>

      <Button
        variant="contained"
        size="large"
        onClick={handleLoginFacebook}
        sx={{
          width: "100%",
          display: "flex",
          gap: "5px",
          alignItems: "center",
          padding: 1.5,
          borderRadius: 2,
          textTransform: "capitalize",
          fontSize: "1rem",
          color: "black",
          bgcolor: "white",
          "&:hover": {
            bgcolor: "#F0F8FF",
          },
        }}
      >
        {" "}
        {
          <img
            width={26}
            height={26}
            src="https://img.icons8.com/?size=100&id=13912&format=png&color=000000"
            alt="google-logo"
          />
        }
        Facebook
      </Button>
    </Box>
  );
};

export default SocialLogin;
