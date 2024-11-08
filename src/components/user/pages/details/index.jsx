import LogoutIcon from "@mui/icons-material/Logout";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { TextField, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CreateTicket } from "../../../../services/PostTicket";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
// import { fetchTourDetails } from "../../../../redux/features/tourSlice";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Cookies from "js-cookie";
import classNames from "classnames/bind";
import styles from "./details.module.scss";
import Slider from "react-slick";
import SideBarComponent from "./sidebar/SideBarComment";
import { Tabs, Tab } from "@mui/material";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { fetchTourDetails } from "../../../../services/fetchTourDetails";
import dayjs from "dayjs";
import axios from "axios";
import { GetTours_Related } from "../../../../services/getTours_Related";
import { ToursRelateds, Shedule_tour_Byid, TourFavourite } from "../../../../redux/features/Tour_RelatedDetailSlice";
import { getScheduleByid } from "../../../../services/GetSchedule_Travel";
import { CreateTourFavourite, CancleTourFavourite, GetToursFavourite } from "../../../../services/Tour_Favourite";
const cx = classNames.bind(styles);

function Details() {
  const dispatch = useDispatch()
  let resultcheckTourFavourite = localStorage.getItem('isCheckTourFavourite')

  const { Data_ToursRelated, Data_SheduleTourByid, Data_TourFavourite } = useSelector((state) => state.ToursRelated)
  const { id } = useParams();
  const Name_user = JSON.parse(Cookies.get('auth')).Name
  const [reviews, setReviews] = useState([]);
  const id_user = JSON.parse(Cookies.get('auth'))._id
  const navigate = useNavigate();
  const [valueDate, setValueDate] = useState()
  const [validate, setValidate] = useState(true)
  const [selectedTab, setSelectedTab] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [is_Loading, setIs_Loading] = useState(false);
  const [result_TourFavourite, setResult_TourFavourite] = useState()
  const [tour_TourFav, setTour_TourFav] = useState([])
  const [ischeckTourFav, setIscheckTourFav] = useState([])
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCRpDqXA3ZGykElXufSRdv-D197WGBoLjc',
  });


  const [valueform, setValueform] = useState({
    Adult: 1,
    Children: 1,
  })
  const RefScroll = useRef(null)
  const RefFocus = useRef(null)
  const handleSelected = (e) => {
    setSelectedTab(parseInt(e.target.dataset.id))

  }
  const handleClick = () => {
    setIsExpanded(!isExpanded)
  }
  useEffect(() => {

    const handleGetSchedule = async () => {
      const res = await getScheduleByid(tour.id_Schedule_Travel)

      dispatch(Shedule_tour_Byid(res.Schedule_Travelbyid))
    }
    handleGetSchedule()
  }, [selectedTab])

  const result = Data_ToursRelated.filter(toursRelated => toursRelated._id !== id)
  

  useEffect(() => {
    if (RefScroll) {
      RefScroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const { data: tour, isLoading } = useQuery({
    queryKey: ["Tour", id],
    queryFn: () => fetchTourDetails(id),
  });
  useEffect(() => {
    const Tour_Related = async () => {
      const res = await GetTours_Related()
      dispatch(ToursRelateds(res.data.Tours_Related))
    }
    Tour_Related()
  }, [])
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
  let total = adult + children;

  if (valueform.Adult <= 0) {
    total = total - adult;
  } else if (valueform.Children <= 0) {
    total = total - children;
  }

  const ress = Data_TourFavourite?.some(tour_Fav => tour_Fav.id_User.includes(id_user) && tour_Fav.id_Tour.includes(id))

  const handleGetTourFavourite = async () => {
    const res = await GetToursFavourite()
    dispatch(TourFavourite(res.TourFavourite))
  }

  useEffect(() => {
    handleGetTourFavourite()
  }, [])

  const handleTourFavourite = async () => {
    const data = { id_user, id }
    setIs_Loading(true)
    const res = await CreateTourFavourite(data)
    if (res) {
      dispatch(TourFavourite(res.CheckIsTourFav))
      handleGetTourFavourite()
      setTimeout(() => {
        setIs_Loading(false)
      }, 1500)
    }
  }

  const handleCreateTicket = async () => {
    if (valueDate) {
      setValidate(true);
      const ResponseTicket = async () => {
        const data = {
          id_tour: tour?._id,
          id_user: id_user,
          id_Service: null,
          id_Custommer: null,
          id_Voucher: null,
          Departure_Location: tour?.Start_Tour,
          Destination: tour?.End_Tour,
          Title_Tour: tour?.Title_Tour,
          Price_Tour: tour?.Price_Tour,
          After_Discount: tour?.After_Discount,
          Departure_Date: valueDate,
          Departure_Time: "8:00",
          Total_DateTrip: tour?.total_Date,
          Adult_fare: adult,
          Children_fare: children,
          Adult: valueform.Adult,
          Children: valueform.Children,
          Total_price: total,
          Created_at_Booking: new Date(),
          Status_Payment: "Chưa Thanh Toán",
          Payment_Method: "",
        };
        setTimeout(async () => {
          const res = await CreateTicket(data);
          if (res.status === 200 && res.statusText === "OK") {
            navigate(`/booking/${res.data.ticKetId.insertedId}`);
          }
        }, 2000);
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

  useEffect(() => {
    // dispatch(fetchTourDetails(id));
    getCommentRating();
  }, [id]);

  const getCommentRating = async () => {
    const api = "http://localhost:3001/V1/Tours/AllComment";
    try {
      const res = await axios.get(`${api}/${id}`);
      // console.log(res.data);

      const data = await res.data;
      // console.log(data.data);
      setReviews(data.data)
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
                      data-id='0'
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
                      data-id='1'
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
                      data-id='2'
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
                {selectedTab === 0 ? <div className={cx(`content__home-text `)}>
                  {/* <h1 className={cx("content__home-name")}>{tour.Name_Tour}</h1> */}
                  <div className={cx("content__home-title")}>
                    <p className={cx("content__home-heading")}>
                      {tour.Title_Tour}
                    </p>
                    <span className={cx("content__home-desc")}>
                      {tour.Description_Tour.slice(0, `${isExpanded ? tour.Description_Tour.length : 300}`)}
                    </span>
                  </div>
                  {/* <div className={cx("content__home-image")}> */}
                  {isExpanded ? <div className={cx("content__home-image")}>
                    <img
                      src={tour.Image_Tour[1]?.path} alt={tour.Name_Tour}
                    />
                    <img
                      src={tour.Image_Tour[2]?.path}
                      alt={tour.Name_Tour}
                      className={cx("content__home-image-w")}
                    />
                  </div> : ''}
                  {/* </div> */}
                  <p className={cx("seeMore")} onClick={handleClick}>{isExpanded ? 'Thu gọn' : 'Xem thêm'}</p>

                </div> : (selectedTab === 1 ? <div>
                  {/* <div style={{ display: 'flex', justifyContent: 'space-around' }}> */}
                  <div className={cx("content__home-title")}>
                    <span className={cx("content__home-desc")}>
                      {`${Data_SheduleTourByid[0]?.Shedule_Morning[0]?.Time_Morning_Schedule} : ${Data_SheduleTourByid[0]?.Shedule_Morning[0]?.Text_Schedule_Morning}`}
                    </span>
                    <span className={cx("content__home-desc")}>
                      {`${Data_SheduleTourByid[0]?.Shedule_Noon[0]?.Time_Noon_Schedule} : ${Data_SheduleTourByid[0]?.Shedule_Noon[0]?.Text_Schedule_Noon}`}
                    </span>
                    <span className={cx("content__home-desc")}>
                      {`${Data_SheduleTourByid[0]?.Shedule_Afternoon[0]?.Time_Afternoon_Schedule} : ${Data_SheduleTourByid[0]?.Shedule_Afternoon[0]?.Text_Schedule_Afternoon}`}
                    </span>
                  </div>

                  {/* </div> */}
                </div> : <GoogleMap
                  mapContainerStyle={{ height: '400px', width: '100%' }}
                  center={{ lat: 16.04952236055185, lng: 108.07036972283223 }}
                  zoom={13}
                >
                  <Marker
                  // key={location.id}
                  // position={{ lat: 16.04952236055185, lng: 108.07036972283223 }}
                  /></GoogleMap>)}

                <div className="reviews">
                  <h3 style={{ marginTop: 20 }}>Đánh giá chuyến đi</h3>
                  <div
                    className="slider-container"
                    style={{ padding: "20px 0" }}
                  >
                    <Slider {...settings}>
                      {reviews.map((review, index) => (
                        <div key={index} className={cx("slider-item")}>
                          <h3>{review.name}</h3>
                          <p className="review-date">{review.date}</p>
                          <p className="review-content">{review.content}</p>
                          <a className={cx("read-more-button")}>Read more</a>
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
                  <h3 className={cx("account__name")}>{Name_user}</h3>
                  <LogoutIcon className={cx("account__icon")} />
                </div>

                <div className={cx("aside__booking")}>
                  <div className={cx("aside__booking-action")}>
                    <div className={cx("heading")}>
                      <h5>{tour.Name_Tour}</h5>
                      <span>{tour.Title_Tour}</span>
                    </div>
                    <div className={cx("sub")}>
                      <div className={cx("heart")}>
                        {is_Loading ? <CircularProgress size={20} color="inherit" /> : <FavoriteIcon
                          fontSize="medium"
                          sx={ress ? { color: "red", cursor: 'pointer' } : { color: "gray", cursor: 'pointer' }}
                          onClick={handleTourFavourite}
                        // ff1744 
                        />}
                      </div>
                      <div className={cx("share")}>
                        <ShareOutlinedIcon fontSize="small" />
                      </div>
                    </div>
                  </div>
                  <div st className={cx("aside__date")} >
                    <LocalizationProvider dateAdapter={AdapterDayjs} locale="vi">
                      <DatePicker onChange={(e) => setValueDate(e)} name="Date_time" ref={RefFocus} minDate={dayjs()} />

                    </LocalizationProvider>
                  </div>
                  <p style={{ marginLeft: '12px', color: 'red' }}>{validate === false && valueDate === undefined ? 'Bạn cần chọn ngày đi của tour' : ''}</p>
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
                          value={
                            valueform.Adult <= 0
                              ? (valueform.Adult = 0)
                              : valueform.Adult
                          }
                          name="Adult"
                          onChange={handleGetvalueForm}
                        />

                        <div className={cx("rate")}>
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
                            marginLeft: "10px",
                            width: "40px",
                          }}
                          value={
                            valueform.Children <= 0
                              ? (valueform.Children = 0)
                              : valueform.Children
                          }
                          name="Children"
                          onChange={handleGetvalueForm}
                        />
                        <div className={cx("rate")}>
                          <span className={cx("rate-text")}>
                            {valueform.Children >= 1
                              ? children.toLocaleString("vi-VN")
                              : 0}
                            VND
                          </span>
                        </div>
                      </div>
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
                      sx={{
                        borderColor: "#3fd0d4",
                        color: "#3fd0d4",
                        "&:hover": {
                          borderColor: "#3fd0d4",
                          color: "#3fd0d4",
                        },
                      }}
                      className={cx("aside__booking-btn")}
                      onClick={handleCreateTicket}
                    >
                      Đặt ngay
                    </Button>
                  </div>
                </div>
                <ul className={cx("aside__list")}>
                  <h4 className={cx("aside__list-heding")}>Chuyến đi liên quan</h4>
                  {result.map(tour_Related => (
                    <li className={cx("aside__item")}>
                      <img
                        src={tour_Related.Image_Tour[0].path}
                        alt=""
                        className={cx("aside__item-img")}
                      />
                      <div className={cx("aside__item-text")}>
                        <Link to={`/tours/${tour_Related._id}`} className={cx("aside__item-text-name")}>
                          {`${tour_Related.Start_Tour} - ${tour_Related.End_Tour}`}
                        </Link>
                        <div>
                          <Rating
                            name="size-small"
                            value={tour_Related.totalReview}
                            size="small"
                            precision={0.1}
                            readOnly
                            sx={{
                              color: "#FFC300",
                            }}
                          />
                        </div>
                        <div className={cx("aside__item-text-price")}>
                          <LocalOfferOutlinedIcon fontSize="small" />
                          <span style={{ color: ' #3fd0d4' }}>~ {tour_Related.After_Discount > 0 ? tour_Related.After_Discount.toLocaleString("vi-VN") + ' VND' : tour_Related.Price_Tour.toLocaleString("vi-VN") + ' VND'}</span>
                        </div>
                      </div>
                    </li>
                  ))}
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
