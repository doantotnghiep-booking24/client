/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "7px",
  boxShadow: 24,
  p: 4,
};

export default function ModalReset({ isOpen, setIsOpen }) {
  const [dataReset, setDataReset] = React.useState({
    Password: "",
    ConfirmPassword: "",
  });

  const [otp, setOtp] = React.useState(new Array(6).fill(""));
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    setError("");
    setIsOpen(false);
    setDataReset({ Password: "", ConfirmPassword: "" });
    setOtp(new Array(6).fill(""));
  };

  const handleChangePassword = (e) => {
    const { name, value } = e.target;

    setDataReset((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnChange = (e, index) => {
    const value = e.target.value;

    if (!isNaN(value) && value.length <= 1) {
      setOtp((prev) => {
        const newOtp = [...prev];
        newOtp[index] = value;
        return newOtp;
      });

      if (value && index < otp.length - 1) {
        setTimeout(() => {
          const nextInput = document.getElementById(`otp-input-${index + 1}`);
          if (nextInput) nextInput.focus();
        }, 0);
      }
    }
  };

  const handlePasteOtp = (e) => {
    const value = e.clipboardData.getData("text");
    if (!isNaN(value)) {
      const updateValue = value.toString().split("").slice(0, otp.length);
      setOtp(updateValue);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        setOtp((prev) => {
          const newOtp = [...prev];
          newOtp[index - 1] = "";
          return newOtp;
        });

        setTimeout(() => {
          const prevInput = document.getElementById(`otp-input-${index - 1}`);
          if (prevInput) prevInput.focus();
        }, 0);
      } else {
        setOtp((prev) => {
          const newOtp = [...prev];
          newOtp[index] = "";
          return newOtp;
        });
      }
    }

    if (e.key === "Delete") {
      setOtp((prev) => {
        const newOtp = [...prev];
        newOtp[index] = "";
        return newOtp;
      });
    }
  };

  const handleReplacePass = async () => {
    const api = "https://bookingtravel-44jm.onrender.com/User/Password-reset/code";

    // Kiểm tra mật khẩu
    if (dataReset.Password !== dataReset.ConfirmPassword) {
      setError("Mật khẩu không khớp!");
      return;
    }

    const data = {
      newPassword: dataReset.ConfirmPassword,
      code: otp.join(""),
    };
    console.log(data);

    setIsLoading(true);
    setError(""); // Reset lỗi khi bắt đầu quá trình

    try {
      const res = await axios.post(api, data);
      const newpass = await res.data;

      // Kiểm tra phản hồi từ server
      if (newpass && newpass.message) {
        navigate("/auth");
      } else {
        // Nếu không có thông báo thành công, hiển thị lỗi
        setError("Thay đổi mật khẩu không thành công. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setError("Có lỗi xảy ra. Vui lòng thử lại."); // Cập nhật lỗi cho người dùng
    } finally {
      setIsLoading(false); // Đặt lại trạng thái loading
    }
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Đặt lại mật khẩu
          </Typography>
          <Typography variant="body2" align="center" sx={{ my: 1 }}>
            Vui lòng nhập mã xác nhận của bạn được gửi đến Email. Nếu không có
            hãy kiểm tra trong mục Spam của Email.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              my: 2,
            }}
          >
            {otp.map((item, index) => {
              return (
                <input
                  id={`otp-input-${index}`} // Thêm id cho mỗi ô
                  key={index}
                  value={item}
                  style={{
                    width: "40px",
                    height: "40px",
                    padding: "10px",
                    textAlign: "center",
                    border: "2px solid #55525c",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    transition: "all 0.1s",
                  }}
                  maxLength={1}
                  onChange={(e) => handleOnChange(e, index)}
                  onPaste={handlePasteOtp}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              );
            })}
          </Box>

          <TextField
            margin="normal"
            required
            fullWidth
            label="Mật khẩu mới"
            type="password"
            name="Password"
            variant="outlined"
            value={dataReset.Password}
            onChange={handleChangePassword}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nhập lại mật khẩu mới"
            type="password"
            variant="outlined"
            name="ConfirmPassword"
            value={dataReset.ConfirmPassword}
            onChange={handleChangePassword}
            error={Boolean(error)}
            helperText={error}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleReplacePass}
            >
              {isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Thay đổi mật khẩu"
              )}
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Hủy
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
