import LogoutIcon from "@mui/icons-material/Logout";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { TextField, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTourDetails } from "../../../../redux/features/tourSlice";

import Select from "react-select";

import classNames from "classnames/bind";
import styles from "./details.module.scss";
import Slider from "react-slick";
import SideBarComponent from "./sidebar/SideBarComment";
import ModalDetailReview from "./modal/ModalDetailReview";
import axios from "axios";
import formatDate from "../../../../utils/formatDate";
const cx = classNames.bind(styles);

function Details() {
  const [isOpen, setIsOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const options = [
    { value: "date", label: "8h30 - 28-08-2004" },
    { value: "date", label: "8h30 - 28-08-2004" },
    { value: "date", label: "8h30 - 28-08-2004" },
  ];

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // const reviews = [
  //   {
  //     name: "Edward",
  //     date: "October 1, 2024",
  //     content:
  //       "“I was thoroughly impressed with the amenities in this serviced apartment. The infinity pool was a highlight, perfect for relaxation after a busy day exploring the city.”",
  //     rating: 5, // Rating out of 5
  //   },
  //   {
  //     name: "Alice",
  //     date: "October 2, 2024",
  //     content:
  //       "“The location was fantastic, and the staff were incredibly helpful throughout my stay.”",
  //     rating: 4, // Rating out of 5
  //   },
  //   {
  //     name: "John",
  //     date: "October 3, 2024",
  //     content:
  //       "“Clean, spacious, and very comfortable. I will definitely be coming back.”",
  //     rating: 5, // Rating out of 5
  //   },
  //   {
  //     name: "Maria",
  //     date: "October 4, 2024",
  //     content:
  //       "“A wonderful experience! The service was top-notch, and the breakfast was delightful.”",
  //     rating: 5, // Rating out of 5
  //   },
  //   {
  //     name: "David",
  //     date: "October 5, 2024",
  //     content: "“I loved the view from my room. It was breathtaking!”",
  //     rating: 4, // Rating out of 5
  //   },
  //   {
  //     name: "Sophia",
  //     date: "October 6, 2024",
  //     content:
  //       "“Absolutely perfect for a weekend getaway. Highly recommended!”",
  //     rating: 5, // Rating out of 5
  //   },
  //   {
  //     name: "Mike",
  //     date: "October 7, 2024",
  //     content:
  //       "“Great amenities and a beautiful room. I really enjoyed my stay.”",
  //     rating: 4, // Rating out of 5
  //   },
  //   {
  //     name: "Emma",
  //     date: "October 8, 2024",
  //     content: "“Wonderful stay! The staff went above and beyond.”",
  //     rating: 5, // Rating out of 5
  //   },
  //   {
  //     name: "James",
  //     date: "October 9, 2024",
  //     content: "“A perfect place for families. Very kid-friendly!”",
  //     rating: 4, // Rating out of 5
  //   },
  // ];
  const { id } = useParams();

  const dispatch = useDispatch();
  const { tour, loading, error } = useSelector((state) => state.tours);

  useEffect(() => {
    dispatch(fetchTourDetails(id));

    getCommentRating();
  }, [dispatch, id]);

  const getCommentRating = async () => {
    const api = "http://localhost:3001/V1/Tours/AllComment";
    try {
      const res = await axios.get(`${api}/${id}`);
      const data = await res.data;
      console.log(data.data);
      
      setReviews(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) return <div>loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={cx("wrap")}>
      <div className={cx("banner")}>
        <img
          src="https://imgcdn.tapchicongthuong.vn/tcct-media/20/5/20/daot_ly_son.jpg"
          alt=""
          className={cx("banner__img")}
        />
        <h2 className={cx("banner__title")}>Chi Tiết</h2>
      </div>
      {tour && (
        <div className={cx("container")}>
          <div className={cx("content")}>
            <div className={cx("content__main")}>
              <div className={cx("content__home")}>
                <img
                  src={tour.Image_Tour[0].path}
                  alt={tour.Name_Tour}
                  className={cx("content__home-img")}
                />
                <div className={cx("content__home-text")}>
                  <h1 className={cx("content__home-name")}>{tour.Name_Tour}</h1>
                  <div className={cx("content__home-title")}>
                    <p className={cx("content__home-heading")}>
                      {tour.Title_Tour}
                    </p>
                    <span className={cx("content__home-desc")}>
                      {tour.Description_Tour}
                    </span>
                    {/* <div className={cx("content__home-sub-heading")}>
                    Tàu biển từ cảng Sa Kỳ ra đảo Lý Sơn có giá 150.000đ -
                    200.000đ/lượt tùy vào loại tàu thường hay tàu cao tốc, thời
                    gian di chuyển sẽ mất 2 tiếng. Bạn có thể đặt mua vé tàu
                    online hoặc mua vé tại cảng đều được.
                  </div>
                  <span className={cx("content__home-sub-desc")}>
                    Phương tiện di chuyển chủ yếu khi đi du lịch Lý Sơn tự túc
                    là xe máy, có rất nhiều điểm thuê xe máy trên đảo với mức
                    giá từ 120.000đ - 200.000đ/ngày/xe. Bên cạnh đó, đa phần các
                    khách sạn trên đảo đều có dịch vụ cho thuê xe nên bạn cũng
                    có thể thuê luôn ở khách sạn mình đặt mà không cần để lại
                    CMND hay cọc tiền thuê. Di chuyển giữa các đảo Lớn, đảo Bé
                    và hòn Mù Cu thì sẽ đi bằng tàu cao tốc với giá khoảng
                    35.000đ/lượt.
                  </span> */}
                  </div>
                  <div className={cx("content__home-image")}>
                    <img src={tour.Image_Tour[1].path} alt={tour.Name_Tour} />
                    <img
                      src={tour.Image_Tour[2].path}
                      alt={tour.Name_Tour}
                      className={cx("content__home-image-w")}
                    />
                  </div>
                  {/* <p className={cx("content__home-desc")}>
                  Ngoài ra, mình sẽ gợi ý thêm cho các bạn một số địa chỉ lưu
                  trú tại đảo như Mường Thanh Holiday Lý Sơn với giá từ
                  1.400.000đ/đêm, khách sạn Biển Ngọc Lý Sơn có giá từ
                  300.000đ/đêm, Hoàng Sa Resort giá từ 400.000đ/đêm,... đều là
                  những khách sạn được rất nhiều khách du lịch Lý Sơn tự túc yêu
                  thích.
                </p> */}
                </div>

                <div className="reviews">
                  <h3 style={{ marginTop: 20 }}>Đánh giá</h3>
                  <div
                    className="slider-container"
                    style={{ padding: "20px 0" }}
                  >
                    <Slider {...settings}>
                      {reviews?.map((review, index) => (
                        <div key={index} className={cx("slider-item")}>
                          <h3 style={{ margin: 0 }}>{review.userName}</h3>
                          <p
                            className="review-date"
                            style={{ margin: 0, fontSize: "12px" }}
                          >
                            {formatDate(review?.Create_At)}
                          </p>
                          <Rating
                            name="size-small"
                            defaultValue={review?.rating}
                            size="small"
                            style={{ margin: 0 }}
                          />
                          <p
                            className="review-content"
                            style={{
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                          >
                            {review?.content}
                          </p>
                          <Button onClick={() => setIsOpen(true)}>
                            Read more
                          </Button>

                          <ModalDetailReview
                            isOpen={isOpen}
                            toggleModelReviewDetail={(value) => {
                              setIsOpen(value);
                            }}
                            data={review}
                          />
                        </div>
                      ))}
                    </Slider>{" "}
                  </div>
                  <SideBarComponent reviewButton={"right"} />
                </div>
              </div>
              <aside className={cx("aside")}>
                <div className={cx("aside__account")}>
                  <img
                    src="https://apps.odoo.com/web/image/loempia.module/31305/icon_image?unique=4696166"
                    alt=""
                    className={cx("account__img")}
                  />
                  <h3 className={cx("account__name")}>Van Luong</h3>
                  <LogoutIcon className={cx("account__icon")} />
                </div>

                <div className={cx("aside__booking")}>
                  <div className={cx("aside__booking-action")}>
                    <div className={cx("heading")}>
                      <h5>Quảng Ngãi</h5>
                      <span>Đảo Lý Sơn</span>
                    </div>
                    <div className={cx("sub")}>
                      <div className={cx("heart")}>
                        <FavoriteIcon
                          fontSize="small"
                          sx={{ color: "#ff1744" }}
                        />
                      </div>
                      <div className={cx("share")}>
                        <ShareOutlinedIcon fontSize="small" />
                      </div>
                    </div>
                  </div>
                  <div className={cx("aside__booking-list")}>
                    <Select
                      options={options}
                      className={cx("aside__booking-select")}
                      placeholder="Chọn giờ"
                    />
                    <div className={cx("aside__booking-price")}>
                      <div className={cx("adult")}>
                        <span className="adult-name">Người lớn</span>
                        <TextField
                          id="standard-number"
                          type="number"
                          variant="standard"
                          style={{
                            marginTop: "-25px",
                            marginLeft: "10px",
                            width: "40px",
                          }}
                        />
                        <div className={cx("rate")}>
                          <span className={cx("rate-text")}>
                            28.000.000 VNĐ
                          </span>
                        </div>
                      </div>
                      <div className={cx("children")}>
                        <span className="children-name">Trẻ em</span>
                        <TextField
                          id="standard-number"
                          type="number"
                          variant="standard"
                          style={{
                            marginTop: "-25px",
                            marginLeft: "10px",
                            width: "40px",
                          }}
                        />
                        <div className={cx("rate")}>
                          <span className={cx("rate-text")}>
                            28.000.000 VNĐ
                          </span>
                        </div>
                      </div>
                      <div className={cx("total")}>
                        <span className="total-type">Tổng tiền</span>
                        <div className={cx("rate")}>
                          <span className={cx("rate-text")}>
                            28.000.000 VNĐ
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      LinkComponent={Link}
                      to="/booking"
                      variant="outlined"
                      type="button"
                      sx={{
                        borderColor: "#3fd0d4",
                        color: "#3fd0d4",
                        "&:hover": {
                          borderColor: "#3fd0d4",
                          color: "#3fd0d4",
                        },
                      }}
                      className={cx("aside__booking-btn")}
                    >
                      Đặt ngay
                    </Button>
                  </div>
                </div>
                <div className={cx("aside__date")}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker />
                  </LocalizationProvider>
                </div>
                <ul className={cx("aside__list")}>
                  <h4 className={cx("aside__list-heding")}>Bạn đã thích</h4>
                  <li className={cx("aside__item")}>
                    <img
                      src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/09/blog-img-23-150x150.jpg"
                      alt=""
                      className={cx("aside__item-img")}
                    />
                    <div className={cx("aside__item-text")}>
                      <Link to="/tours" className={cx("aside__item-text-name")}>
                        Cảm nhận của khách hàng
                      </Link>
                      <div className={cx("aside__item-text-price")}>
                        <LocalOfferOutlinedIcon fontSize="small" />
                        <span>10.000.000 VNĐ</span>
                      </div>
                    </div>
                  </li>
                  <li className={cx("aside__item")}>
                    <img
                      src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/09/blog-img-23-150x150.jpg"
                      alt=""
                      className={cx("aside__item-img")}
                    />
                    <div className={cx("aside__item-text")}>
                      <Link to="/tours" className={cx("aside__item-text-name")}>
                        Cảm nhận của khách hàng
                      </Link>
                      <div className={cx("aside__item-text-price")}>
                        <LocalOfferOutlinedIcon fontSize="small" />
                        <span>10.000.000 VNĐ</span>
                      </div>
                    </div>
                  </li>
                  <li className={cx("aside__item")}>
                    <img
                      src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/09/blog-img-23-150x150.jpg"
                      alt=""
                      className={cx("aside__item-img")}
                    />
                    <div className={cx("aside__item-text")}>
                      <Link to="/tours" className={cx("aside__item-text-name")}>
                        Cảm nhận của khách hàng
                      </Link>
                      <div className={cx("aside__item-text-price")}>
                        <LocalOfferOutlinedIcon fontSize="small" />
                        <span>10.000.000 VNĐ</span>
                      </div>
                    </div>
                  </li>
                  <li className={cx("aside__item")}>
                    <img
                      src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/09/blog-img-23-150x150.jpg"
                      alt=""
                      className={cx("aside__item-img")}
                    />
                    <div className={cx("aside__item-text")}>
                      <Link to="/tours" className={cx("aside__item-text-name")}>
                        Cảm nhận của khách hàng
                      </Link>
                      <div className={cx("aside__item-text-price")}>
                        <LocalOfferOutlinedIcon fontSize="small" />
                        <span>10.000.000 VNĐ</span>
                      </div>
                    </div>
                  </li>
                  <li className={cx("aside__item")}>
                    <img
                      src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/09/blog-img-23-150x150.jpg"
                      alt=""
                      className={cx("aside__item-img")}
                    />
                    <div className={cx("aside__item-text")}>
                      <Link to="/tours" className={cx("aside__item-text-name")}>
                        Cảm nhận của khách hàng
                      </Link>
                      <div className={cx("aside__item-text-price")}>
                        <LocalOfferOutlinedIcon fontSize="small" />
                        <span>10.000.000 VNĐ</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
