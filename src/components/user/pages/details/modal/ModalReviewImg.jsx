/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw", // Chiều rộng chiếm 80% viewport width
  maxWidth: "700px", // Giới hạn chiều rộng tối đa
  height: "88vh", // Chiều cao chiếm 80% viewport height
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 15,
  p: 4,
  overflow: "hidden", // Ẩn nội dung tràn ra ngoài
};

export default function ModalReviewImg({
  isOpen,
  toggleModelReviewDetail,
  imgReview,
  setImgReview,
  contentReview,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % imgReview.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + imgReview.length) % imgReview.length // Tránh giá trị âm
    );
  };

  const handleClose = () => {
    toggleModelReviewDetail(false);
    setImgReview([]);
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
          <div
            className="slider-container"
            style={{ position: "relative", height: "100%" }}
          >
            <h5>{contentReview}</h5>
            <div
              className="slider-wrapper"
              style={{
                display: "flex",
                transform: `translateX(-${currentSlide * 100}%)`,
                transition: "transform 0.5s ease-in-out",
                height: "100%",
              }}
            >
              {imgReview?.map((item, index) => (
                <div
                  key={index}
                  className="slide"
                  style={{
                    minWidth: "100%",
                    boxSizing: "border-box",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={item.path}
                    alt={item.title}
                    style={{
                      maxWidth: "90%",
                      maxHeight: "80%", // Đảm bảo ảnh không vượt quá kích thước modal
                      objectFit: "cover", // Phủ kín ảnh mà không bị méo
                      borderRadius: "8px", // Bo tròn các góc của ảnh
                    }}
                  />
                </div>
              ))}
            </div>
            {/* Nút điều hướng */}
            <button
              onClick={handlePrevSlide}
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                border: "none",
                padding: "10px",
                cursor: "pointer",
                borderRadius: "50%", // Bo tròn nút điều hướng
              }}
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={handleNextSlide}
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                border: "none",
                padding: "10px",
                cursor: "pointer",
                borderRadius: "50%", // Bo tròn nút điều hướng
              }}
            >
              <NavigateNextIcon />
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
