/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import styles from "./sider.module.scss";
import classNames from "classnames/bind";
import ClearIcon from "@mui/icons-material/Clear";
import { Rating } from "@mui/material";
import Pagination from "@mui/material/Pagination";

import ModalAddNew from "../modal/ModalAddNew";
import { useParams } from "react-router-dom";

import { useMemo } from "react";
import { io } from "socket.io-client";

import ModalReviewImg from "../modal/ModalReviewImg";
import LoadingSidebar from "../loading/LoadingSidebar";
import CommentList from "./CommentList/CommentList";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
const cx = classNames.bind(styles);

export default function SideBarComponent({ reviewButton }) {
  const [state, setState] = React.useState({
    right: false,
  });
  const [dataComment, setDataComment] = React.useState([]);
  const [dataTour, setDataTour] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [openReviewImg, setOpenReviewImg] = React.useState(false);
  const [imgReview, setImgReview] = React.useState([]);
  const [contentReview, setContentReview] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [dataTicket, setDataTicket] = React.useState([]);
  const [isCheckReview, setIsCheckReview] = React.useState(false);
  const commentsPerPage = 10;
  const { id } = useParams();
  const socketRef = React.useRef(null);
  const dataAuth = useSelector((state) => state.auth);
  const user = (() => {
    try {
      const authCookie = Cookies.get("auth");

      if (!authCookie) {
        console.error("No 'auth' cookie found.");
        return null;
      }
      return JSON.parse(authCookie) || {}; // Parse the cookie, fallback to empty object if parsing fails
    } catch (error) {
      console.error("Lỗi khi parse JSON từ cookie:", error);
      return null; // Return an empty object if any error occurs during parsing
    }
  })();
  const { _id } = user || {};

  
  React.useEffect(() => {
    socketRef.current = io("https://bookingtravel-44jm.onrender.com");
    socketRef.current.on("connect", () => {
      console.log("Connecting sidebar...");
    });
    socketRef.current.on("comment liked", (updatedComment) => {
      updateCommentState(updatedComment);
    });

    socketRef.current.on("comment disliked", (updatedComment) => {
      updateCommentState(updatedComment);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);



  const currentComments = useMemo(() => {
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    return dataComment?.slice(indexOfFirstComment, indexOfLastComment);
  }, [currentPage, commentsPerPage, dataComment]);


  const getAllTicket = async () => {
    try {
      const res = await fetch('https://bookingtravel-44jm.onrender.com', { credentials: "include" });
      const data = await res.json();
      setDataTicket(data.Tickets)
    } catch (error) {
      console.log(error);
    }
  }
  const checkIfBooked = () => {
    if(!_id) return
    
    const userTicket = dataTicket.find(ticket => ticket.id_user === _id && ticket.id_tour === id && ticket.Status === "Đã Xác Nhận");
    if (userTicket) {
      
      if (userTicket) {
        return setIsCheckReview(true);  
      } else {
        return setIsCheckReview(false); 
      }
    } else {
      return setIsCheckReview(false);  
    }
  };
  const getAllDataReview = async () => {
    const api = "https://bookingtravel-44jm.onrender.com/V1/Review/GetReview";
    try {
      const result = await fetch(`${api}/${id}`, { credentials: "include" });
      const data = await result.json();
      setDataComment(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getDataTour = async () => {
    const api = "https://bookingtravel-44jm.onrender.com/V1/Tours/DetailTour";
    try {
      const result = await fetch(`${api}/${id}`, { credentials: "include" });
      const data = await result.json();
      setDataTour(data.detailTour);
    } catch (error) {
      console.log(error);
    }
  };




  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleLike = (commentId) => {
    if(user) {
      socketRef.current.emit("toggleLikeComment", {
        commentId,
        userId: dataAuth._id,
      });

    }else {
      alert("please login")
    }
    
  };

  const handleDislike = (commentId) => {
    if(user) {
      socketRef.current.emit("toggleDisLikeComment", {
        commentId,
        userId: dataAuth._id,
      });
    }else {
      alert("please login")
    }
    
  };

  const updateCommentState = (updatedComment) => {
    setDataComment((prevComments) =>
      prevComments.map((comment) =>
        comment._id === updatedComment._id
          ? {
            ...comment,
            ...updatedComment,
          }
          : comment
      )
    );
  };
  React.useEffect(() => {
    getAllDataReview();
    getDataTour();
  }, [id]);

  React.useEffect(() => {
    if (_id) {
      getAllTicket();
    }
  }, [_id])


React.useEffect(() => {
  if (dataTicket?.length > 0) {
    checkIfBooked(); 
  }
}, [dataTicket]);
  const list = (anchor) => (
    <Box
      sx={{
        width: {
          xs: "100%", // Full width on extra small screens
          sm: 400, // 400px on small screens
          md: 750, // 700px on medium screens and up
        },
      }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div>
        {dataTour.map((item) => (
          <div key={item._id} className={cx("box-top")}>
            <div className={cx("box-1")}>
              <h4>{item.Name_Tour}</h4>
              <Button
                style={{
                  padding: "5px",
                  bgcolor: "white",
                  "&:hover": {
                    bgcolor: "white",
                  },
                }}
                onClick={toggleDrawer(reviewButton, false)}
              >
                <ClearIcon />
              </Button>
            </div>

            <div
              className={cx("review-info")}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                className={cx("review-summary")}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Box
                  sx={{
                    bgcolor: "#003b95",
                    width: "40px",
                    height: "40px",
                    borderRadius: "5px",
                    color: "white",
                    fontWeight: "bold",
                    margin: "auto",
                    display: "flex", // Sử dụng flexbox
                    alignItems: "center", // Căn giữa theo chiều dọc
                    justifyContent: "center", // Căn giữa theo chiều ngang
                  }}
                >
                  {item.totalReview}
                </Box>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Rating
                    name="size-small"
                    defaultValue={item.totalReview}
                    size="small"
                    sx={{ margin: 0 }}
                  />
                  <span>{dataComment?.length} đánh giá</span>
                </div>
                <span style={{ fontSize: "13px", color: "#003b95" }}>
                  Chúng tôi hướng tới những đánh giá thực tế 100%
                </span>
              </div>
              <Button
                variant="outlined"
                sx={{
                  fontWeight: "bold",
                  border: "1px solid #003b95",
                  color: "#006ce4",
                  "&:hover": {
                    border: "1px solid #003b95", // Màu nền khi hover
                    color: "#006ce4", // Màu chữ khi hover
                  },
                }}
                disabled={!isCheckReview}
                onClick={() => setIsOpen(true)}
               
              >
                Viết đánh giá
              </Button>
            </div>
          </div>
        ))}

        <CommentList
          dataComment={currentComments}
          openReviewImg={openReviewImg}
          setOpenReviewImg={setOpenReviewImg}
          imgReview={imgReview}
          setImgReview={setImgReview}
          contentReview={contentReview}
          setContentReview={setContentReview}
          handleLike={handleLike}
          handleDislike={handleDislike}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "end",
            padding: "10px",
          }}
        >
          <Pagination
            count={Math.ceil(dataComment?.length / commentsPerPage)} // Số lượng trang
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)} // Cập nhật trang
            shape="rounded"
          />
        </div>
      </div>
      <Divider />
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button

            onClick={toggleDrawer(reviewButton, true)}
            variant="outlined"
            sx={{
              marginLeft: "10px",
              marginTop: "10px",
              border: "1px solid #003b95",
              color: "#006ce4",
              fontWeight: "bold",
              "&:hover": {
                border: "1px solid #003b95", // Màu nền khi hover
                color: "#006ce4", // Màu chữ khi hover
              },
            }}
          >
            {"Tất cả đánh giá"}
          </Button>
          {isLoading ? (
            <LoadingSidebar isLoading={isLoading} />
          ) : (
            <SwipeableDrawer
              anchor={reviewButton}
              open={state[reviewButton]}
              onClose={toggleDrawer(reviewButton, false)}
              onOpen={toggleDrawer(reviewButton, true)}
              sx={{
                "& .MuiDrawer-paper": {
                  // Target the drawer paper (the actual content area)
                  borderTopLeftRadius: "10px", // Set border-radius for top-left
                  borderBottomLeftRadius: "10px", // Set border-radius for bottom-left
                  width: {
                    xs: "100%", // Full width on extra small screens
                    sm: 450, // 400px on small screens
                    md: 770, // 700px on medium screens and up
                  },
                },
              }}
            >
              {list(anchor)}
            </SwipeableDrawer>
          )}

          <ModalAddNew
            nameTour={dataTour}
            isOpen={isOpen}
            toggleModel={(value) => {

              setIsOpen(value);
            }}
            handleSetValueComment={(value) => {
              setIsLoading(true);
              setDataComment((prev) => (prev ? [value, ...prev] : [value]));

              getAllDataReview();
              setIsLoading(false);
            }}
          />
          <ModalReviewImg
            isOpen={openReviewImg}
            toggleModelReviewDetail={(value) => {
              setOpenReviewImg(value);
            }}
            imgReview={imgReview}
            setImgReview={(value) => {
              setImgReview(value);
            }}
            contentReview={contentReview}
          />
        </React.Fragment>
      ))}
    </div>
  );
}
