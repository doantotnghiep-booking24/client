import LogoutIcon from "@mui/icons-material/Logout";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { TextField, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Link, useNavigate } from "react-router-dom";
import { DatePicker, LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { fetchTourDetails } from "../../../../services/fetchTourDetails";
import { useQuery } from '@tanstack/react-query';
import Select from "react-select";
import classNames from "classnames/bind";
import styles from "./details.module.scss";
import Slider from "react-slick";
import SideBarComponent from "./sidebar/SideBarComment";
import { useEffect, useRef, useState } from "react";
import { CreateTicket } from "../../../../services/PostTicket";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Tab } from "@mui/material";
import Cookies from 'js-cookie'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
const cx = classNames.bind(styles);

function Details() {
  const { id } = useParams();
  const Name_user = JSON.parse(Cookies.get('auth')).Name

  const id_user = JSON.parse(Cookies.get('auth'))._id
  const navigate = useNavigate();
  const [valueDate, setValueDate] = useState()
  const [validate, setValidate] = useState(true)
  const [selectedTab, setSelectedTab] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
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
    if (RefScroll) {
      RefScroll.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const { data: tour, isLoading } = useQuery({
    queryKey: ["Tour", id],
    queryFn: () => fetchTourDetails(id),
  });

  let adult = tour?.Price_Tour && tour?.After_Discount > 0 ? tour?.After_Discount : tour?.Price_Tour
  adult = adult * valueform.Adult
  let children = tour?.Price_Tour && tour?.After_Discount > 0 ? tour?.After_Discount * (100 - 50) / 100 : tour?.Price_Tour * (100 - 50) / 100
  children = children * valueform.Children
  let total = adult + children
  if (valueform.Adult <= 0) {
    total = total - adult
  } else if (valueform.Children <= 0) {
    total = total - children
  }
  const handleCreateTicket = () => {
    if (valueDate) {
      setValidate(true)
      const ResponseTicket = async () => {
        const data = {
          id_tour: tour?._id,
          id_user: id_user,
          id_Service: 2,
          id_Custommer: 3,
          id_Voucher: 4,
          Departure_Location: tour?.Start_Tour,
          Destination: tour?.End_Tour,
          Title_Tour: tour?.Title_Tour,
          Departure_Date: valueDate,
          Departure_Time: '8 : 00',
          Total_DateTrip: tour?.total_Date,
          Adult_fare: adult,
          Children_fare: children,
          Adult: valueform.Adult,
          Children: valueform.Children,
          Total_price: total,
          Created_at_Booking: new Date(),
          Status_Payment: 'Chưa Thanh Toán',
          Payment_Method: ''
        }
        setTimeout(async () => {
          const res = await CreateTicket(data)
          // localStorage.setItem("ticKetId",`${res.data.ticKetId.insertedId}`);
          if (res.status === 200 && res.statusText === 'OK') {
            navigate(`/booking/${res.data.ticKetId.insertedId}`)
          }
        }, 2000)
      }
      ResponseTicket()
    } else {
      setValidate(false)
      RefFocus.current.focus()
      RefScroll.current.scrollIntoView({ behavior: 'smooth' })
    }

  }
  const handleGetvalueForm = (e) => {
    const { name, value } = e.target
    setValueform({ ...valueform, [name]: parseInt(value) })
  }
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

  const reviews = [
    {
      name: "Edward",
      date: "October 1, 2024",
      content:
        "“I was thoroughly impressed with the amenities in this serviced apartment. The infinity pool was a highlight, perfect for relaxation after a busy day exploring the city.”",
    },
    {
      name: "Alice",
      date: "October 2, 2024",
      content:
        "“The location was fantastic, and the staff were incredibly helpful throughout my stay.”",
    },
    {
      name: "John",
      date: "October 3, 2024",
      content:
        "“Clean, spacious, and very comfortable. I will definitely be coming back.”",
    },
    {
      name: "Maria",
      date: "October 4, 2024",
      content:
        "“A wonderful experience! The service was top-notch, and the breakfast was delightful.”",
    },
    {
      name: "David",
      date: "October 5, 2024",
      content: "“I loved the view from my room. It was breathtaking!”",
    },
    {
      name: "Sophia",
      date: "October 6, 2024",
      content:
        "“Absolutely perfect for a weekend getaway. Highly recommended!”",
    },
    {
      name: "Mike",
      date: "October 7, 2024",
      content:
        "“Great amenities and a beautiful room. I really enjoyed my stay.”",
    },
    {
      name: "Emma",
      date: "October 8, 2024",
      content: "“Wonderful stay! The staff went above and beyond.”",
    },
    {
      name: "James",
      date: "October 9, 2024",
      content: "“A perfect place for families. Very kid-friendly!”",
    },
  ];

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
                  src={tour.Image_Tour[0].path} alt={tour.Name_Tour}
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
                      {tour.Description_Tour.slice(0, isExpanded ? tour.Description_Tour.length : 300)}
                    </span>
                  </div>
                  {/* <div className={cx("content__home-image")}> */}
                  {isExpanded ? <div className={cx("content__home-image")}>
                    <img
                      src={tour.Image_Tour[1].path} alt={tour.Name_Tour}

                    />
                    <img
                      src={tour.Image_Tour[2].path} alt={tour.Name_Tour}
                      className={cx("content__home-image-w")}
                    />
                  </div> : ''}
                  {/* </div> */}
                  <p className={cx("seeMore")} onClick={handleClick}>{isExpanded ? 'Thu gọn' : 'Xem thêm'}</p>

                </div> : (selectedTab === 1 ? <div>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div>
                      <h4 style={{ marginTop: '15px', marginBottom: '20px' }}>8h30</h4>
                      <p>- Đón khách tại Nha Trang</p>
                      <p>- Đón khách tại Nha Trang</p>
                      <p>- Đón khách tại Nha Trang</p>
                    </div>
                    <div>
                      <h4 style={{ marginTop: '15px', marginBottom: '20px' }}>8h30</h4>
                      <p>- Đón khách tại Nha Trang</p>
                      <p>- Đón khách tại Nha Trang</p>
                      <p>- Đón khách tại Nha Trang</p>
                    </div>
                    <div>
                      <h4 style={{ marginTop: '15px', marginBottom: '20px' }}>8h30</h4>
                      <p>- Đón khách tại Nha Trang</p>
                      <p>- Đón khách tại Nha Trang</p>
                      <p>- Đón khách tại Nha Trang</p>
                    </div>
                  </div>
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
                  <div className="slider-container" style={{ padding: "20px 0" }}>
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

                          value={valueform.Adult <= 0 ? valueform.Adult = 0 : valueform.Adult}
                          name="Adult"
                          onChange={handleGetvalueForm}
                        />

                        <div className={cx("rate")}>
                          <span className={cx("rate-text")}>{valueform.Adult >= 1 ? adult.toLocaleString('vi-VN') : 0}VNĐ</span>
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
                          value={valueform.Children <= 0 ? valueform.Children = 0 : valueform.Children}
                          name="Children"
                          onChange={handleGetvalueForm}
                        />
                        <div className={cx("rate")}>
                          <span className={cx("rate-text")}>{valueform.Children >= 1 ? children.toLocaleString('vi-VN') : 0}VND</span>
                        </div>
                      </div>
                      <div className={cx("total")}>
                        <span className="total-type">Tổng tiền</span>
                        <div className={cx("rate")}>
                          <span className={cx("rate-text")}>{total.toLocaleString('vi-VN')}VNĐ</span>
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

