import LogoutIcon from "@mui/icons-material/Logout";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { TextField, Button, Avatar } from "@mui/material";
// import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
// import { Link } from "react-router-dom";
// import Rating from "@mui/material/Rating";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CreateTicket } from "../../../../services/PostTicket";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from "@tanstack/react-query";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTourDetails } from "../../../../redux/features/tourSlice";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Cookies from "js-cookie";
import classNames from "classnames/bind";
import styles from "./details.module.scss";
import Slider from "react-slick";
import SideBarComponent from "./sidebar/SideBarComment";
import { Tabs, Tab } from "@mui/material";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import DeckOutlinedIcon from "@mui/icons-material/DeckOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import Rating from "@mui/material/Rating";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { fetchTourDetails } from "../../../../services/fetchTourDetails";
import dayjs from "dayjs";
import axios from "axios";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  ToursRelateds,
  Shedule_tour_Byid,
  TourFavourite,
  Hotels,
} from "../../../../redux/features/PageDetail";
import { getScheduleByid } from "../../../../services/GetSchedule_Travel";
import {
  CreateTourFavourite,
  CancleTourFavourite,
  GetToursFavourite,
} from "../../../../services/Tour_Favourite";
import { getHotels } from "../../../../services/GetHotels";
const cx = classNames.bind(styles);
import formatDate from "../../../../utils/formatDate";
import { FaBus } from "react-icons/fa";
import { MdLunchDining } from "react-icons/md";
import { MdLocalHotel } from "react-icons/md";
import { GetAllTimeSchedule } from "../../../../services/getTimeSchedule";
function Details() {
  const isAuth = Cookies.get("auth");
  const dispatch = useDispatch();

  const user = (() => {
    try {
      const authCookie = Cookies.get("auth");

      if (!authCookie) {
        console.error("No 'auth' cookie found.");
        return {}; // Return an empty object if the cookie is not found
      }

      return JSON.parse(authCookie) || {}; // Parse the cookie, fallback to empty object if parsing fails
    } catch (error) {
      console.error("Lỗi khi parse JSON từ cookie:", error);
      return {}; // Return an empty object if any error occurs during parsing
    }
  })();
  const { Name, photoUrl, _id } = user;
  const {
    Data_ToursRelated,
    Data_SheduleTourByid,
    Data_TourFavourite,
    Data_Hotels,
  } = useSelector((state) => state.PageDetail);

  const { id } = useParams();
  const Name_user = Name || "User";
  const photoUrl_user = photoUrl || null;
  const [reviews, setReviews] = useState([]);
  const id_user = _id || null;
  const navigate = useNavigate();
  const [valueDate, setValueDate] = useState();
  const [validate, setValidate] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [is_Loading, setIs_Loading] = useState(false);
  const [open, setOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [dataHotel, setDataHotel] = useState();
  const [timeSchedule, setTimeSchedule] = useState([]);
  const [valueTime, setValueTime] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDetailOpen = (hotel) => {
    setSelectedHotel(hotel);
    setDetailOpen(true);
  };
  const handleChoseHotel = (hotel) => {
    setDataHotel(hotel);
    handleClose();
  };
  // console.log(dataHotel);

  const handleDetailClose = () => {
    setDetailOpen(false);
    setSelectedHotel(null);
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCRpDqXA3ZGykElXufSRdv-D197WGBoLjc",
  });

  const [valueform, setValueform] = useState({
    Adult: 1,
    Children: 1,
    Hotel: 0,
  });
  const RefScroll = useRef(null);
  const RefFocus = useRef(null);
  const handleSelected = (e) => {
    setSelectedTab(parseInt(e.target.dataset.id));
  };
  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };
  useEffect(() => {
    const handleGetSchedule = async () => {
      const res = await getScheduleByid(tour?.id_Schedule_Travel);
      console.log(res);

      dispatch(Shedule_tour_Byid(res.Schedule_Travelbyid));
    };
    handleGetSchedule();
  }, [selectedTab]);
  useEffect(() => {
    const handleGetTimeSchedule = async () => {
      const res = await GetAllTimeSchedule();
      setTimeSchedule(res.TimeSchedules);
    };
    handleGetTimeSchedule();
  }, []);
  const handleGetTimeSchedule = (e) => {
    setValueTime(e.value);
  };

  useEffect(() => {
    if (RefScroll) {
      RefScroll.current.scrollIntoView();
    }
  }, []);
  const { data: tour, isLoading } = useQuery({
    queryKey: ["Tour", id],
    queryFn: () => fetchTourDetails(id),
  });
  let adult =
    tour?.Price_Tour && tour?.After_Discount > 0
      ? tour?.After_Discount
      : tour?.Price_Tour;
  adult = adult * valueform.Adult;
  let children =
    tour?.Price_Tour && tour?.After_Discount > 0
      ? (tour?.After_Discount * (100 - 50)) / 100
      : (tour?.Price_Tour * (100 - 50)) / 100;
  children = children * valueform.Children;
  let Hotel = dataHotel?.Price_Hotel ? dataHotel?.Price_Hotel : 0;
  Hotel = Hotel * valueform.Hotel;
  let total = adult + children + Hotel;

  if (valueform.Adult <= 0) {
    total = total - adult;
  } else if (valueform.Children <= 0) {
    total = total - children;
  } else if (valueform.Hotel <= 0) {
    total = total - Hotel;
  }

  const ress = Data_TourFavourite?.some(
    (tour_Fav) =>
      tour_Fav?.id_User?.includes(id_user) && tour_Fav?.id_Tour?.includes(id)
  );

  const handleGetTourFavourite = async () => {
    const res = await GetToursFavourite();
    dispatch(TourFavourite(res.TourFavourite));
  };

  useEffect(() => {
    const handleGetHotels = async () => {
      const res = await getHotels();
      dispatch(Hotels(res.Hotel));
    };
    handleGetHotels();
  }, []);
  const HotelFilter = Data_Hotels.filter(
    (hotel) => hotel?.Adress_Hotel === tour?.End_Tour
  );

  useEffect(() => {
    handleGetTourFavourite();
  }, []);

  const handleTourFavourite = async () => {
    const data = { id_user, id };
    setIs_Loading(true);
    const res = await CreateTourFavourite(data);
    if (res) {
      dispatch(TourFavourite(res.CheckIsTourFav));
      handleGetTourFavourite();
      setTimeout(() => {
        setIs_Loading(false);
      }, 500);
    }
  };

  const handleCreateTicket = async () => {
    if (valueDate && valueTime) {
      setValidate(true);
      const ResponseTicket = async () => {
        const data = {
          id_tour: tour?._id,
          id_user: id_user || null,
          id_Service: null,
          id_Custommer: null,
          id_Voucher: null,
          id_Hotel: dataHotel?._id,
          Name_Hotel: dataHotel?.Name_Hotel,
          Price_Hotel: dataHotel?.Price_Hotel,
          Number_Of_Hotel: valueform?.Hotel,
          Departure_Location: tour?.Start_Tour,
          Destination: tour?.End_Tour,
          Title_Tour: tour?.Title_Tour,
          Price_Tour: tour?.Price_Tour,
          After_Discount: tour?.After_Discount,
          Departure_Date: valueDate,
          Departure_Time: valueTime,
          Total_DateTrip: tour?.total_Date,
          Adult_fare: adult,
          Children_fare: children,
          Adult: valueform.Adult,
          Children: valueform.Children,
          Total_price: total,
          Status_Payment: "Chưa Thanh Toán",
          Payment_Method: "",
        };
        setTimeout(async () => {
          const res = await CreateTicket(data);

          if (res.status === 200 && res.statusText === "OK" && _id) {
            navigate(`/booked/${res.data.ticKetId.insertedId}`);
          } else {
            console.log("please login first");
          }
        }, 500);
      };
      ResponseTicket();
    } else {
      setValidate(false);
      RefFocus.current.focus();
      RefScroll.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGetvalueForm = (e) => {
    const { name, value } = e.target;
    setValueform({ ...valueform, [name]: parseInt(value) });
  };

  const options = [
    { value: "date", label: "8h30 - 28-08-2004" },
    { value: "date", label: "8h30 - 28-08-2004" },
    { value: "date", label: "8h30 - 28-08-2004" },
  ];

  const sliderSettings = {
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: "0",
    arrows: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  var settings = {
    dots: false,
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

  useEffect(() => {
    // dispatch(fetchTourDetails(id));
    getCommentRating();
  }, [id]);

  const getCommentRating = async () => {
    const api = "https://bookingtravel-44jm.onrender.com/V1/Tours/AllComment";
    try {
      const res = await axios.get(`${api}/${id}`, { withCredentials: true });

      // console.log(res.data);

      const data = await res.data;
      console.log(data.data);
      if (data) {
        setReviews(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div ref={RefScroll} className={cx("wrap")}>
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
                  src={tour?.Image_Tour[0]?.path}
                  alt={tour?.Name_Tour}
                  className={cx("content__home-img")}
                />
                <div className={cx("Tabs_detail")}>
                  <Tabs
                    value={selectedTab}
                    TabIndicatorProps={{
                      style: {
                        backgroundColor: "#3fd0d4",
                      },
                    }}
                  >
                    <Tab
                      onClick={(e) => handleSelected(e)}
                      data-id="0"
                      label="Tổng Quan"
                      sx={{
                        color: selectedTab === 0 ? "#3fd0d4" : "inherit",
                        "&.Mui-selected": {
                          color: "#3fd0d4",
                        },
                      }}
                    />
                    <Tab
                      onClick={(e) => handleSelected(e)}
                      data-id="1"
                      label="Lịch Trình"
                      sx={{
                        color: selectedTab === 1 ? "#3fd0d4" : "inherit",
                        "&.Mui-selected": {
                          color: "#3fd0d4",
                        },
                      }}
                    />
                    <Tab
                      onClick={(e) => handleSelected(e)}
                      data-id="2"
                      label="Bản Đồ"
                      sx={{
                        color: selectedTab === 2 ? "#3fd0d4" : "inherit",
                        "&.Mui-selected": {
                          color: "#3fd0d4",
                        },
                      }}
                    />
                  </Tabs>
                </div>
                {selectedTab === 0 ? (
                  <div className={cx(`content__home-text `)}>
                    {/* <h1 className={cx("content__home-name")}>{tour.Name_Tour}</h1> */}
                    <div className={cx("content__home-title")}>
                      <p className={cx("content__home-heading")}>
                        {tour.Title_Tour}
                      </p>
                      <span className={cx("content__home-desc")}>
                        {tour.Description_Tour.slice(
                          0,
                          `${isExpanded ? tour.Description_Tour.length : 300}`
                        )}
                      </span>
                    </div>
                    {/* <div className={cx("content__home-image")}> */}
                    {isExpanded ? (
                      <div className={cx("content__home-image")}>
                        <img
                          src={tour.Image_Tour[1]?.path}
                          alt={tour.Name_Tour}
                        />
                        <img
                          src={tour.Image_Tour[2]?.path}
                          alt={tour.Name_Tour}
                          className={cx("content__home-image-w")}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    {/* </div> */}
                    <p className={cx("seeMore")} onClick={handleClick}>
                      {isExpanded ? "Thu gọn" : "Xem thêm"}
                    </p>
                  </div>
                ) : selectedTab === 1 ? (
                  <div>
                    {/* <div style={{ display: 'flex', justifyContent: 'space-around' }}> */}
                    <div className={cx("content__home-title")}>
                      <VerticalTimeline
                        style={{ height: "100px" }}
                        lineColor="#C0C0C0"
                      >
                        <VerticalTimelineElement
                          className="vertical-timeline-element--work"
                          contentStyle={{
                            background: "#a3cef1",
                            color: "black",
                          }}
                          contentArrowStyle={{
                            borderRight: "7px solid #a3cef1",
                          }}
                          date={`${Data_SheduleTourByid[0]?.Shedule_Morning[0]?.Time_Morning_Schedule}`}
                          iconStyle={{
                            background: "#a3cef1",
                            marginLeft: "-15px",
                            marginTop: "15px",
                            color: "#fff",
                            width: "30px",
                            height: "30px",
                          }}
                          icon={<FaBus />}
                        >
                          {/* <h3 className="vertical-timeline-element-title">Creative Director</h3> */}
                          <h4 className="vertical-timeline-element-subtitle">
                            Sáng
                          </h4>
                          <p>
                            {`${Data_SheduleTourByid[0]?.Shedule_Morning[0]?.Text_Schedule_Morning}`}
                          </p>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                          className="vertical-timeline-element--work"
                          contentStyle={{
                            background: "#fbd1a2",
                            color: "black",
                          }}
                          contentArrowStyle={{
                            borderRight: "7px solid  #fbd1a2",
                          }}
                          date={`${Data_SheduleTourByid[0]?.Shedule_Noon[0]?.Time_Noon_Schedule}`}
                          iconStyle={{
                            background: "#fbd1a2",
                            marginLeft: "-15px",
                            marginTop: "15px",
                            color: "#fff",
                            width: "30px",
                            height: "30px",
                          }}
                          icon={<MdLunchDining />}
                        >
                          {/* <h3 className="vertical-timeline-element-title">Creative Director</h3> */}
                          <h4 className="vertical-timeline-element-subtitle">
                            Trưa
                          </h4>
                          <p>
                            {`${Data_SheduleTourByid[0]?.Shedule_Noon[0]?.Text_Schedule_Noon}`}
                          </p>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                          className="vertical-timeline-element--work"
                          contentStyle={{
                            background: "#7dcfb6",
                            color: "black",
                          }}
                          contentArrowStyle={{
                            borderRight: "7px solid  #7dcfb6",
                          }}
                          date={`${Data_SheduleTourByid[0]?.Shedule_Afternoon[0]?.Time_Afternoon_Schedule}`}
                          iconStyle={{
                            background: "#7dcfb6",
                            marginLeft: "-15px",
                            marginTop: "15px",
                            color: "#fff",
                            width: "30px",
                            height: "30px",
                          }}
                          icon={<MdLocalHotel />}
                        >
                          {/* <h3 className="vertical-timeline-element-title">Creative Director</h3> */}
                          <h4 className="vertical-timeline-element-subtitle">
                            Chiều - Tối
                          </h4>
                          <p>
                            {`${Data_SheduleTourByid[0]?.Shedule_Afternoon[0]?.Text_Schedule_Afternoon}`}
                          </p>
                        </VerticalTimelineElement>
                      </VerticalTimeline>
                      {/* <span className={cx("content__home-desc")}>
                        {`${Data_SheduleTourByid[0]?.Shedule_Morning[0]?.Time_Morning_Schedule} : ${Data_SheduleTourByid[0]?.Shedule_Morning[0]?.Text_Schedule_Morning}`}
                      </span>
                      <span className={cx("content__home-desc")}>
                        {`${Data_SheduleTourByid[0]?.Shedule_Noon[0]?.Time_Noon_Schedule} : ${Data_SheduleTourByid[0]?.Shedule_Noon[0]?.Text_Schedule_Noon}`}
                      </span>
                      <span className={cx("content__home-desc")}>
                        {`${Data_SheduleTourByid[0]?.Shedule_Afternoon[0]?.Time_Afternoon_Schedule} : ${Data_SheduleTourByid[0]?.Shedule_Afternoon[0]?.Text_Schedule_Afternoon}`}
                      </span> */}
                    </div>

                    {/* </div> */}
                  </div>
                ) : (
                  <GoogleMap
                    mapContainerStyle={{ height: "400px", width: "100%" }}
                    center={{ lat: 16.04952236055185, lng: 108.07036972283223 }}
                    zoom={13}
                  >
                    <Marker
                    // key={location.id}
                    // position={{ lat: 16.04952236055185, lng: 108.07036972283223 }}
                    />
                  </GoogleMap>
                )}

                <div className={cx("reviews", "hide__mobile")}>
                  <h3 style={{ marginTop: 20 }}>Đánh giá chuyến đi</h3>
                  <div
                    className="slider-container"
                    style={{ padding: "20px 0" }}
                  >
                    {reviews?.length > 1 ? (
                      <Slider {...settings}>
                        {reviews?.map((review, index) => (
                          <div key={index} className={cx("slider-item")}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                              }}
                            >
                              {" "}
                              <Avatar
                                src={review ? review?.photoUrl : ""}
                                sx={{ width: 50, height: 50 }}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <h4
                                  style={{
                                    margin: 0,
                                  }}
                                >
                                  {review.userName}
                                </h4>
                                <Rating
                                  name="size-small"
                                  defaultValue={review.rating}
                                  size="small"
                                />
                                <span className="review-date">
                                  {formatDate(review.Create_At)}
                                </span>
                              </div>
                            </div>

                            <p className="review-content">
                              &quot;{review.content}&quot;
                            </p>
                          </div>
                        ))}
                      </Slider>
                    ) : reviews?.length === 1 ? (
                      <>
                        <div
                          key={reviews[0]?._id}
                          className={cx("slider-item")}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            {" "}
                            <Avatar
                              src={reviews[0] ? reviews[0]?.photoUrl : ""}
                              sx={{ width: 50, height: 50 }}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <h4
                                style={{
                                  margin: 0,
                                }}
                              >
                                {reviews[0]?.userName}
                              </h4>
                              <Rating
                                name="size-small"
                                defaultValue={reviews[0]?.rating}
                                size="small"
                              />
                              <span className="review-date">
                                {formatDate(reviews[0]?.Create_At)}
                              </span>
                            </div>
                          </div>

                          <p className="review-content">
                            &quot;{reviews[0]?.content}&quot;
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className={cx("slider-item")}>
                        Hiện tại không có đánh giá nào
                      </div>
                    )}
                  </div>
                  <SideBarComponent reviewButton={"right"} />
                </div>
              </div>
              <aside className={cx("aside")}>
                <div className={cx("aside__account")}>
                  {isAuth ? (
                    <>
                      <img
                        src={photoUrl_user}
                        alt=""
                        className={cx("account__img")}
                      />
                      <h3 className={cx("account__name")}>{Name_user}</h3>
                      <LogoutIcon className={cx("account__icon")} />
                    </>
                  ) : (
                    <>
                   
                  </>
                  )}
                </div>

                <div className={cx(`${isAuth ? "aside__booking": "aside__booking_notauth"}`)}>
                  <div className={cx("aside__booking-action")}>
                    <div className={cx("heading")}>
                      <h5>{tour?.Name_Tour}</h5>
                      <span>{tour?.Title_Tour}</span>
                    </div>
                    <div className={cx("sub")}>
                      <div className={cx("heart")}>
                        {isAuth ? (
                          <>
                            {is_Loading ? (
                              <CircularProgress size={20} color="inherit" />
                            ) : (
                              <FavoriteIcon
                                fontSize="medium"
                                sx={
                                  ress
                                    ? { color: "red", cursor: "pointer" }
                                    : { color: "gray", cursor: "pointer" }
                                }
                                onClick={handleTourFavourite}
                              />
                            )}
                          </>
                        ) : (
                          <FavoriteIcon
                            fontSize="medium"
                            sx={{ color: "gray", cursor: "pointer" }}
                          />
                        )}
                      </div>
                      <div className={cx("share")}>
                        <ShareOutlinedIcon fontSize="small" />
                      </div>
                    </div>
                  </div>
                  <div className={cx("aside__date")}>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      locale="vi"
                    >
                      <DatePicker
                        onChange={(e) => setValueDate(e)}
                        name="Date_time"
                        ref={RefFocus}
                        minDate={dayjs()}
                        sx={{ width: "100%" }}
                      />
                    </LocalizationProvider>
                  </div>
                  <p style={{ marginLeft: "12px", color: "red" }}>
                    {validate === false && valueDate === undefined
                      ? "Bạn cần chọn ngày của chuyến đi"
                      : ""}
                  </p>
                  <div className={cx("aside__booking-list")}>
                    <Select
                      // {timeSchedule.map}
                      options={timeSchedule.map((timeSchedule) => ({
                        value: timeSchedule.TimeSchedule, // Giả sử có một thuộc tính id để làm giá trị
                        label: timeSchedule.TimeSchedule, // Giả sử có một thuộc tính time để làm nhãn
                      }))}
                      onChange={(event) => handleGetTimeSchedule(event)}
                      className={cx("aside__booking-select")}
                      placeholder="Chọn giờ"
                    />
                    <p style={{ marginTop: "12px", color: "red" }}>
                      {validate === false && valueTime === undefined
                        ? "Bạn cần chọn giờ của chuyến đi"
                        : ""}
                    </p>
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
                          value={
                            valueform.Adult <= 0
                              ? (valueform.Adult = 0)
                              : valueform.Adult
                          }
                          name="Adult"
                          onChange={handleGetvalueForm}
                        />
                        <div style={{ width: "110px" }} className={cx("rate")}>
                          <span className={cx("rate-text")}>
                            {valueform.Adult >= 1
                              ? adult.toLocaleString("vi-VN")
                              : 0}
                            VNĐ
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
                            marginLeft: "30px",
                            width: "40px",
                            textAlign: "center",
                          }}
                          value={
                            valueform.Children <= 0
                              ? (valueform.Children = 0)
                              : valueform.Children
                          }
                          name="Children"
                          onChange={handleGetvalueForm}
                        />
                        <div style={{ width: "110px" }} className={cx("rate")}>
                          <span className={cx("rate-text")}>
                            {valueform.Children >= 1
                              ? children.toLocaleString("vi-VN")
                              : 0}
                            VND
                          </span>
                        </div>
                      </div>
                      {dataHotel ? (
                        <div className={cx("children")}>
                          <span className="children-name">Khách sạn</span>
                          <TextField
                            id="standard-number"
                            type="number"
                            variant="standard"
                            style={{
                              marginTop: "-25px",
                              marginLeft: "10px",
                              width: "40px",
                            }}
                            value={
                              valueform.Hotel <= 0
                                ? (valueform.Hotel = 0)
                                : valueform.Hotel
                            }
                            name="Hotel"
                            onChange={handleGetvalueForm}
                          />
                          <div
                            style={{ width: "110px" }}
                            className={cx("rate")}
                          >
                            <span className={cx("rate-text")}>
                              {valueform.Hotel >= 1
                                ? Hotel.toLocaleString("vi-VN")
                                : 0}
                              VND
                            </span>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className={cx("total")}>
                        <span className="total-type">Tổng tiền</span>
                        <div className={cx("rate")}>
                          <span className={cx("rate-text")}>
                            {total.toLocaleString("vi-VN")}VNĐ
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      // LinkComponent={Link}
                      // to="/booking"
                      variant="outlined"
                      type="button"
                      disabled={!_id}
                      sx={{
                        borderColor: "#3fd0d4",
                        color: "#3fd0d4",
                        cursor: "pointer",
                        "&:hover": {
                          borderColor: "#3fd0d4",
                          color: "#3fd0d4",
                        },
                      }}
                      className={cx("aside__booking-btn")}
                      onClick={handleCreateTicket}
                    >
                      {!_id ? "Vui lòng đăng nhập để đặt tour" : " Đặt ngay"}
                    </Button>
                  </div>
                </div>
                {/* <ul className={cx("aside__list")}>
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
                </ul> */}
                <div className={cx("aside__list")}>
                  {/* <h3 style={{ textAlign: 'center' }} className={cx("aside__list-heding")}>
                    Lựa chọn đi kèm
                  </h3> */}
                  {HotelFilter?.slice(0, 1).map((hotel, index) => (
                    <div key={index} className={cx("hotels")}>
                      <img src={hotel.Image_Hotel[0].path} alt="" />
                      <div className={cx("hotel__content")}>
                        <h4
                          style={{ height: "30px" }}
                          className={cx("hotel__content-name")}
                        >
                          {hotel.Name_Hotel}
                        </h4>
                        <Rating defaultValue={5} readOnly size="small" />
                        <p className={cx("hotel__content-des")}>
                          {hotel.Description_Hotel}
                        </p>
                        <div className={cx("action")}>
                          <Button
                            className={cx("action-btn")}
                            variant="contained"
                            color="primary"
                            style={{ padding: 10, height: 28 }}
                            onClick={handleOpen}
                          >
                            Xem thêm
                          </Button>
                          <div className={cx("action-price")}>
                            <span style={{ fontSize: 14, marginRight: 5 }}>
                              Giá từ{" "}
                            </span>
                            <span className={cx("action-price-number")}>
                              {hotel.Price_Hotel.toLocaleString("vi-VN")} VND
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={cx("mobile_reviews")}>
                  <div className={cx("reviews")}>
                    <h3 style={{ marginTop: 20 }}>Đánh giá chuyến đi</h3>
                    <div
                      className="slider-container"
                      style={{ padding: "20px 0" }}
                    >
                      {reviews?.length > 1 ? (
                        <Slider {...settings}>
                          {reviews?.map((review, index) => (
                            <div key={index} className={cx("slider-item")}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "5px",
                                }}
                              >
                                {" "}
                                <Avatar
                                  src={review ? review?.photoUrl : ""}
                                  sx={{ width: 50, height: 50 }}
                                />
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <h4
                                    style={{
                                      margin: 0,
                                    }}
                                  >
                                    {review.userName}
                                  </h4>
                                  <Rating
                                    name="size-small"
                                    defaultValue={review.rating}
                                    size="small"
                                  />
                                  <span className="review-date">
                                    {formatDate(review.Create_At)}
                                  </span>
                                </div>
                              </div>

                              <p className="review-content">
                                &quot;{review.content}&quot;
                              </p>
                            </div>
                          ))}
                        </Slider>
                      ) : reviews?.length === 1 ? (
                        <>
                          <div
                            key={reviews[0]?._id}
                            className={cx("slider-item")}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                              }}
                            >
                              {" "}
                              <Avatar
                                src={reviews[0] ? reviews[0]?.photoUrl : ""}
                                sx={{ width: 50, height: 50 }}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <h4
                                  style={{
                                    margin: 0,
                                  }}
                                >
                                  {reviews[0]?.userName}
                                </h4>
                                <Rating
                                  name="size-small"
                                  defaultValue={reviews[0]?.rating}
                                  size="small"
                                />
                                <span className="review-date">
                                  {formatDate(reviews[0]?.Create_At)}
                                </span>
                              </div>
                            </div>

                            <p className="review-content">
                              &quot;{reviews[0]?.content}&quot;
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className={cx("slider-item")}>
                          Hiện tại không có đánh giá nào
                        </div>
                      )}
                    </div>
                    <SideBarComponent reviewButton={"right"} />
                  </div>
                </div>
              </aside>

              {/* Modal Dialog */}
              <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
                <DialogTitle
                  style={{ backgroundColor: "#3fd0d4", color: "#fff" }}
                >
                  Danh sách khách sạn {selectedHotel?.Name_Hotel}
                </DialogTitle>
                <DialogContent
                  dividers
                  style={{
                    padding: "20px 30px",
                    backgroundColor: "#f7f7f7",
                    // display: "flex",
                    // justifyContent: "space-evenly",
                  }}
                >
                  <Slider {...sliderSettings}>
                    {HotelFilter.map((hotel, index) => (
                      <div key={index} className={cx("hotels")}>
                        <img
                          src={hotel.Image_Hotel[0].path}
                          alt=""
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDetailOpen(hotel)}
                        />
                        <div className={cx("hotel__content")}>
                          <h4
                            className={cx("hotel__content-name")}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDetailOpen(hotel)}
                          >
                            {hotel.Name_Hotel.slice(0, 26)}
                          </h4>
                          <Rating defaultValue={5} readOnly size="small" />
                          <p className={cx("hotel__content-des")}>
                            {hotel.Description_Hotel}
                          </p>
                          <div className={cx("action")}>
                            <Button
                              className={cx("action-btn")}
                              variant="contained"
                              color="primary"
                              style={{ padding: 10, height: 28 }}
                              onClick={() => handleChoseHotel(hotel)}
                            >
                              Chọn
                            </Button>
                            <div className={cx("action-price")}>
                              <span style={{ fontSize: 14, marginRight: 5 }}>
                                Giá từ{" "}
                              </span>
                              <span className={cx("action-price-number")}>
                                {hotel.Price_Hotel.toLocaleString("vi-VN")} VND
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </DialogContent>
                <DialogActions style={{ backgroundColor: "#f7f7f7" }}>
                  <Button
                    onClick={handleClose}
                    color="primary"
                    variant="contained"
                    style={{ backgroundColor: "#3fd0d4", color: "#fff" }}
                  >
                    Đóng
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Detail Modal */}
              <Dialog
                open={detailOpen}
                onClose={handleDetailClose}
                maxWidth="md"
                fullWidth
              >
                {selectedHotel && (
                  <>
                    <DialogTitle
                      style={{ backgroundColor: "#3fd0d4", color: "#fff" }}
                    >
                      Chi tiết
                    </DialogTitle>
                    <DialogContent
                      dividers
                      style={{
                        backgroundColor: "#f7f7f7",
                        padding: "20px",
                        display: "flex",
                      }}
                    >
                      <div>
                        <h3>{selectedHotel.Name_Hotel}</h3>
                        <p>
                          {" "}
                          47 Sukhumvit Road, Sukhumvit 20, Klongtoey, Khlong
                          Toei, 10110 Bangkok, Thái Lan – Vị trí tuyệt vời -
                          Hiển thị bản đồ – Gần trạm xe lửa
                        </p>
                        <div>
                          <div style={{ display: "flex" }}>
                            <div>
                              <img
                                src={selectedHotel.Image_Hotel[0].path}
                                style={{ width: 280, height: 170 }}
                                alt=""
                              />{" "}
                              <br />
                              <img
                                src={selectedHotel.Image_Hotel[1].path}
                                style={{
                                  width: 280,
                                  height: 170,
                                  marginTop: 10,
                                }}
                                alt=""
                              />
                            </div>
                            <div>
                              <img
                                src={selectedHotel.Image_Hotel[2].path}
                                style={{
                                  width: 550,
                                  height: 350,
                                  marginLeft: 10,
                                }}
                                alt=""
                              />
                            </div>
                          </div>
                          <div style={{ marginTop: 10 }}>
                            <img
                              src={selectedHotel.Image_Hotel[3].path}
                              style={{ width: 160, height: 110 }}
                              alt=""
                            />
                            <img
                              src={selectedHotel.Image_Hotel[4].path}
                              style={{
                                width: 160,
                                height: 110,
                                marginLeft: 10,
                              }}
                              alt=""
                            />
                            <img
                              src={selectedHotel.Image_Hotel[5].path}
                              style={{
                                width: 160,
                                height: 110,
                                marginLeft: 10,
                              }}
                              alt=""
                            />
                            <img
                              src={selectedHotel.Image_Hotel[6].path}
                              style={{
                                width: 160,
                                height: 110,
                                marginLeft: 10,
                              }}
                              alt=""
                            />
                            <img
                              src={selectedHotel.Image_Hotel[7].path}
                              style={{
                                width: 160,
                                height: 110,
                                marginLeft: 10,
                              }}
                              alt=""
                            />
                          </div>
                        </div>
                        <ul className={cx("list-service")}>
                          <li className={cx("item-service")}>
                            <HouseOutlinedIcon fontSize="large" />
                            <span>Căn hộ</span>
                          </li>
                          <li className={cx("item-service")}>
                            <WifiOutlinedIcon fontSize="large" />
                            <span>WiFi miễn phí</span>
                          </li>
                          <li className={cx("item-service")}>
                            <Diversity3OutlinedIcon fontSize="large" />
                            <span>Phòng gia đình</span>
                          </li>
                          <li className={cx("item-service")}>
                            <DeckOutlinedIcon fontSize="large" />
                            <span>Ban công</span>
                          </li>
                          <li className={cx("item-service")}>
                            <AcUnitOutlinedIcon fontSize="large" />
                            <span>Điều hòa</span>
                          </li>
                          <li className={cx("item-service")}>
                            <BathtubOutlinedIcon fontSize="large" />
                            <span>Phòng tắm riêng</span>
                          </li>
                          <li className={cx("item-service")}>
                            <RemoveRedEyeOutlinedIcon fontSize="large" />
                            <span>Tầm nhìn ra khung cảnh</span>
                          </li>
                        </ul>
                        <p style={{ marginTop: 10 }}>
                          {selectedHotel.Description_Hotel}
                        </p>
                      </div>
                      {/* <img
                        src={selectedHotel.image}
                        alt={selectedHotel.name}
                        style={{ width: "100%", borderRadius: 8 }}
                      />
                    
                      <p style={{ marginTop: 20 }}>
                        {selectedHotel.description}
                      </p>
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: "16px",
                          color: "#3fd0d4",
                        }}
                      >
                        Giá từ: {selectedHotel.price}
                      </p> */}
                    </DialogContent>
                    <DialogActions style={{ backgroundColor: "#f7f7f7" }}>
                      <Button
                        onClick={handleDetailClose}
                        color="primary"
                        variant="contained"
                        style={{ backgroundColor: "#3fd0d4", color: "#fff" }}
                      >
                        Đóng
                      </Button>
                    </DialogActions>
                  </>
                )}
              </Dialog>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
