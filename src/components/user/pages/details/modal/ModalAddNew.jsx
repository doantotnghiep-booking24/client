/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  width: {
    xs: "85%", // Mobile screens
    sm: "80%", // Small screens
    md: "600px", // Medium and large screens
  },
};

export default function ModalAddNew({
  isOpen,
  nameTour,
  toggleModel,
  handleSetValueComment,
}) {
  const { id } = useParams();
  const [valueInput, setValueInput] = React.useState({
    rating: 5,
    img: [],
    content: "",
    likes: [],
    dislikes: [],
  });
  const [urlImg, setUrlImg] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isCheckContent, setIsCheckContent] = React.useState("")
  const socketRef = React.useRef(null);
  // kĩ thuật IIFE là gì quên rồi kiểu như mới vào gọi hàm này liền
  const user = (() => {
    try {
      return JSON.parse(Cookies.get("auth")) || null;
    } catch (error) {
      console.error("Lỗi khi parse JSON từ cookie:", error);
      return null;
    }
  })();

  React.useEffect(() => {
    // Kết nối đến Socket.IO server
    socketRef.current = io("http://localhost:3001");
    socketRef.current.on("connect", () => {
      console.log("Connecting...");
    });
    socketRef.current.on("newReview", (review) => {
      console.log("Nhận review mới:", review);
      handleSetValueComment(review);
    });

    // Lắng nghe sự kiện 'newComment'

    return () => {
      socketRef.current.disconnect(); // Cleanup
      socketRef.current.off("newReview"); // Dọn dẹp listener
    };
  }, []);

  const handleClose = () => {
    setIsCheckContent("")
    setValueInput({ rating: 5, img: [], content: "" });
    toggleModel(false);
    setUrlImg();
  };

  const handleGetValueInput = (e) => {
    const { name, value, files } = e.target;
    
  
    
    
    
    if (files) {
      const arrayFile = Array.from(files);
      setUrlImg(arrayFile);
      const filesDisplay = arrayFile.map((item) => URL.createObjectURL(item));
      setValueInput((prev) => ({ ...prev, img: filesDisplay }));
    } else {
      setValueInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRatingChange = (event, newValue) => {
    setValueInput((prev) => ({ ...prev, rating: newValue }));
  };

  const handleAddNewReview = async () => {
    if(valueInput.content.length <= 30 ) {
      setIsCheckContent("Vui lòng nhập trên 30 kí tự")
      return 
    } 
    setIsLoading(true);
    const formData = new FormData();
  
    // Thêm dữ liệu vào formData
    formData.append("userId", user._id);
    formData.append("tourId", id);
    formData.append("content", valueInput.content);
    formData.append("rating", valueInput.rating);
    formData.append("likes", JSON.stringify([]));
    formData.append("dislikes", JSON.stringify([]));
    // Thêm các ảnh vào formData
    for (let i = 0; i < urlImg?.length; i++) {
      let file = urlImg[i];
      formData.append("Image", file || []);
    }

    try {
      // Gửi bình luận đến server
      const response = await fetch(
        "http://localhost:3001/V1/Review/AddNewReview",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      socketRef.current.emit("newComment", result); // Sử dụng socketRef.current
    } catch (error) {
      console.error("Có lỗi xảy ra khi gửi bình luận:", error);
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };


  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {nameTour?.map((item) => (
          <h4 key={item._id} style={{ fontWeight: "700" }}>
            {item.Name_Tour}
          </h4>
        ))}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            padding: "5px 10px",
          }}
        >
          <span style={{ fontWeight: "600" }}>Đánh giá tour</span>
          <Rating
            name="rating"
            value={valueInput.rating}
            size="large"
            onChange={handleRatingChange}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            padding: "5px 10px",
          }}
        >
          <span style={{ fontWeight: "600" }}>
            Có thể cho chúng tôi xem các khoảnh khắc của bạn không?
          </span>
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <label htmlFor="raised-button-file" style={{ cursor: "pointer" }}>
              <input
                accept="image/*"
                id="raised-button-file"
                multiple
                type="file"
                style={{ display: "none" }}
                onChange={handleGetValueInput}
              />
               <span style={{ color: "red" }}>{valueInput.content?.length <= 30 && isCheckContent}</span>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "10px 20px",
                  width: "150px",
                  border: "1px dashed #ccc",
                }}
              >
                <CameraAltOutlinedIcon />
                <span>Hình ảnh</span>
              </Box>
            </label>
            {valueInput?.img?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Preview ${index}`}
                style={{ width: 60, height: 60, borderRadius: "5px" }}
              />
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            padding: "5px 10px",
          }}
        >
          <span style={{ fontWeight: "600" }}>Viết đánh giá từ 50 ký tự</span>
          <TextField
            name="content"
            label="Hãy viết tại đây"
            multiline
            rows={6}
            value={valueInput.content}
            onChange={handleGetValueInput}
          />
          <span style={{ color: "red" }}>{valueInput.content?.length <= 30 && isCheckContent}</span>
        </Box>

        <Box
          sx={{ display: "flex", justifyContent: "end", padding: "5px 10px" }}
        >
          <Button
            disabled={isLoading} // Vô hiệu hóa nút trong lúc đang loading
            variant="contained"
            onClick={handleAddNewReview}
            sx={{
              bgcolor: "#003b95",
            }}
          >
            {isLoading ? (
              <CircularProgress
                size={20} // Kích thước nhỏ lại
                color="inherit" // Lấy màu của Button
              />
            ) : (
              "Gửi"
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
