import React from "react";
import { Button } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../../../../../firebase/configFireBase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addAuth } from "../../../../../redux/features/AuthSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
const SocialLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
          dispatch(addAuth(datas.inforUser))
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
  return (
    <Button
      variant="contained"
      size="large"
      onClick={handleLoginGoogle}
      sx={{
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
  );
};

export default SocialLogin;
