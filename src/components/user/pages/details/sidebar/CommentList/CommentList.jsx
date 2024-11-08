/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import styles from "./list.module.scss";
import classNames from "classnames/bind";
import formatDate from "../../../../../../utils/formatDate";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
const cx = classNames.bind(styles);

const CommentList = ({
  dataComment,
  openReviewImg,
  setOpenReviewImg,
  imgReview,
  setImgReview,
  contentReview,
  setContentReview,
  handleLike,
  handleDislike,
}) => {
  const dataAuth = useSelector((state) => state.auth);

  const user = (() => {
    try {
      return JSON.parse(Cookies.get("auth")) || null;
    } catch (error) {
      console.error("Lỗi khi parse JSON từ cookie:", error);
      return null; 
    }
  })();

  return (
    <div>
      <div className={cx("box-top")}>
        <div className={cx("box-1")}>
          <h4>Các đánh giá</h4>
        </div>
        {dataComment?.map((item, index) => (
          <div key={index} className={cx("slider-item")}>
            <Avatar
              alt="Remy Sharp"
              src={item?.photoUrl ? item?.photoUrl : "L"}
            />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <h3 style={{ margin: 0 }}>{item?.userName}</h3>
              <p
                className="review-date"
                style={{ margin: 0, fontSize: "12px" }}
              >
              Đã đánh giá:   {formatDate(item?.Create_At?.slice(0, 10))}
              </p>
              <Rating
                name="size-small"
                defaultValue={item?.rating}
                value={item?.rating}
                size="small"
              />
              <div key={item?._id}>
                <p
                  className="review-content"
                  style={{
                    textOverflow: "ellipsis",
                    whiteSpace: "wrap",
                    overflow: "hidden",
                  }}
                >
                  {item?.content}
                </p>
                {item?.Image?.map((imgItem, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={`${imgItem?.path}`}
                    alt={imgItem?.title}
                    style={{
                      width: "80px",
                      height: "100px",
                      objectFit: "cover",
                      margin: "0 5px",
                      cursor: "pointer",
                    }}
                    loading="lazy"
                    onClick={() => {
                      setOpenReviewImg(true);
                      setImgReview(item?.Image);
                      setContentReview(item?.content);
                    }}
                  />
                ))}
              </div>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  paddingTop: "5px",
                }}
              >
                <Button
                  variant="text"
                  sx={{ display: "flex", alignItems: "center", gap: "3px" }}
                  onClick={() => handleLike(item?._id)}
                >
                  <span>Hữu ích</span>
                  {item?.likes?.includes(dataAuth?._id) ? (
                    <ThumbUpIcon />
                  ) : (
                    <ThumbUpOffAltIcon />
                  )}
                </Button>
                <span style={{ fontSize: "12px" }}>
                  <span>{item?.likes?.length}</span>
                </span>
                <Button
                  variant="text"
                  sx={{ display: "flex", alignItems: "center", gap: "3px" }}
                  onClick={() => handleDislike(item?._id)}
                >
                  <span>Không hữu ích</span>
                  {item?.dislikes?.includes(dataAuth?._id) ? (
                    <ThumbDownIcon />
                  ) : (
                    <ThumbDownOffAltIcon />
                  )}
                </Button>
              </Box>
            </div>
            <Divider />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
