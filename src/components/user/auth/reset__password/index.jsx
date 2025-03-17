import * as React from "react";
import {
  Box,
  Button,
  FormControl,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import ModalReset from "./components/ModalReset";
const FormPasswordReset = () => {
  const existingData = JSON.parse(localStorage.getItem("resetPass")) || {};
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false)
   const [valueReset,setValueReset] = React.useState()
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
const handelegetValueResetPass = (e) => {
  setValueReset(e.target.value)
}
  const handleRequestCode = async () => {
    setIsLoading(true);
    const api = "https://bookingtravel-44jm.onrender.com/User/Password-reset/request";

    const email = valueReset;
console.log(email)
    try {
      const result = await axios.post(api, { email });
      const data = await result.data;
      if (data) {
        setIsOpen(true)
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        backgroundColor: "#f0f0f0",
      }}
    >
      <Paper sx={{ padding: 4, width: 400, maxWidth: "90%" }} elevation={3}>
        <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
          Đặt lại mật khẩu
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth margin="dense">
              <FormControl variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={"text"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      ></IconButton>
                    </InputAdornment>
                  }
                  label=""
                  value={existingData.Email}
                   onChange={(e) => handelegetValueResetPass(e)}
                />
              </FormControl>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                height: 40,
                backgroundColor: "#3fd0d4",
                color: "white",
                "&:hover": {
                  backgroundColor: "#2fb3b7",
                },
              }}
              fullWidth
              onClick={handleRequestCode}
            >
              {isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Thiết lập"
              )}
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <ModalReset isOpen={isOpen} setIsOpen={setIsOpen}/>
    </Box>
  );
};

export default FormPasswordReset;
