import { Box, Grid } from "@mui/material";
import { useState } from "react";

import assets from "../../../../assets";
import SigninForm from "../../auth/login";
import SignupForm from "../../auth/register";
import Cookies from "js-cookie"
export const ScreenMode = {
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SIGN_UP",
};

function SiginPage() {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState("unset");
  const [width, setWidth] = useState(0);
  const dataAuth = Cookies.get("auth")
  console.log(dataAuth);
  
  const [backgroundImage, setBackgroundImage] = useState(
    assets.images.signinBg
  );
  const [currMode, setCurrMode] = useState(ScreenMode.SIGN_IN);

  const onSwitchMode = (mode) => {
    setWidth(100);
    const timeout1 = setTimeout(() => {
      setCurrMode(mode);
      setBackgroundImage(
        mode === ScreenMode.SIGN_IN
          ? assets.images.signinBg
          : assets.images.signupBg
      );
    }, 1100);

    const timeout2 = setTimeout(() => {
      setLeft("unset");
      setRight(0);
      setWidth(0);
    }, 1200);

    const timeout3 = setTimeout(() => {
      setRight("unset");
      setLeft(0);
    }, 2500);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  };

  return (
    !dataAuth ? (
      <Grid container sx={{ height: "110vh", backgroundColor: "#f0f0f0" }}>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            position: "relative",
            padding: { xs: 3, md: 5 },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          {currMode === ScreenMode.SIGN_IN ? (
            <SigninForm onSwitchMode={onSwitchMode} />
          ) : (
            <SignupForm onSwitchMode={onSwitchMode} />
          )}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: left,
              right: right,
              width: `${width}%`,
              height: "100%",
              bgcolor: "#3fd0d4",
              transition: "all 1s ease-in-out",
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            position: "relative",
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: { xs: "50vh", md: "110vh" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: left,
              right: right,
              width: `${width}%`,
              height: "100%",
              bgcolor: "white",
              transition: "all 1s ease-in-out",
            }}
          />
        </Grid>
      </Grid>
    ) : null // hoặc dùng điều kiện chuyển hướng đến trang khác nếu đã đăng nhập
  );
  
}

export default SiginPage;
