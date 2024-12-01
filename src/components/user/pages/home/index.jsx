import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { TextField, Box } from "@mui/material";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import axios from "axios";

import SlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classNames from "classnames/bind";
import styles from "./home.module.scss";
import { Link } from "react-router-dom";

import { fetchToursData } from "../../../../services/fetchTours";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const BASE_URL = "http://localhost:3001/V1/Tours";

const fetchRandomTours = async () => {
  const limit = 3;
  let tours = [];
  let page = 1;

  while (tours.length < limit) {
    const response = await axios.get(`${BASE_URL}/GetTours`, {
      params: { page, limit },
    });

    const availableTours = response.data.Tours.datas.filter(
      (tour) => !tour.isDeleted
    );

    tours = [...tours, ...availableTours];

    if (response.data.Tours.datas.length === 0) break;

    page++;
  }

  return tours.slice(0, limit);
};
const fetchMenuTours = async () => {
  const response = await axios.get(`${BASE_URL}/GetTours`, {
    params: { page: 1, limit: 10 },
  });
  const availableTours = response.data.Tours.datas.filter(
    (tour) => !tour.isDeleted
  );
  return availableTours;
};


function Home() {
  const [searchName, setSearchName] = useState("");
  const [filteredTours, setFilteredTours] = useState(null);
  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);

  const navigate = useNavigate();

  const { data: selectTours } = useQuery({
    queryKey: ["tours"],
    queryFn: fetchToursData,
    initialData: [],
  });

  const { data: initialTours, isLoading } = useQuery({
    queryKey: ["randomTours"],
    queryFn: fetchRandomTours,
  });
  const { data: menuTours } = useQuery({
    queryKey: ["menuTours"],
    queryFn: fetchMenuTours,
  });

  console.log(selectTours);
  console.log(menuTours);

  const handleNameInput = (event) => {
    const value = event.target.value;
    setSearchName(value);

    if (value.trim()) {
      const tourNames = selectTours
        .filter(
          (tour) =>
            !tour.isDeleted &&
            tour.Name_Tour.toLowerCase().includes(value.toLowerCase())
        )
        .map((tour) => tour.Name_Tour);
      setNameSuggestions([...new Set(tourNames)]);
      setIsSuggestionsVisible(true);
    } else {
      setNameSuggestions([]);
      setIsSuggestionsVisible(false);
    }
  };

  const handleSearch = () => {
    if (searchName.trim()) {
      navigate(`/tours?search=${encodeURIComponent(searchName)}`);
    }
  };
  console.log(searchName);

  const handleSuggestionClick = (value) => {
    setSearchName(value);
    setIsSuggestionsVisible(false);
    // handleSearch(value); 
  };

  const closeSuggestions = () => {
    setTimeout(() => setIsSuggestionsVisible(false), 300);
  };
  if (isLoading) return <p>Loading tours...</p>;

  // Lọc tour chưa bị xóa mềm
  const toursToDisplay = (filteredTours || initialTours)?.filter(
    (tour) => !tour.isDeleted
  );

  console.log(toursToDisplay);
  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 3,
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

  return (
    <div className={cx("main")}>
      <div className={cx("banner")}>
        <div className={cx("banner__image")}>
          <img
            src="https://www.nicdarkthemes.com/themes/travel/wp/demo/summer-holiday/wp-content/uploads/sites/4/2018/11/para-7.jpg?id=1814"
            alt="booking"
          />
        </div>
        <div className={cx("banner__heading")}>
          <div className={cx("container")}>
            <div className={cx("banner__text")}>
              <h1>Hãy tìm kiếm kỳ nghỉ</h1>
              <span>
                Khám phá niềm vui của bạn mọi lúc, mọi nơi - từ chuyến du lịch
                ngẫu hứng tới những cuộc phiêu lưu khắp thế giới
              </span>
            </div>

            <div className={cx("banner__section")}>
              <div className={cx("banner__section-search")}>
                <TextField
                  className={cx("banner__section-search-name")}
                  value={searchName}
                  onChange={handleNameInput}
                  placeholder="Tìm kiếm tên chuyến đi"
                  variant="outlined"
                  fullWidth
                  onBlur={closeSuggestions}
                  onFocus={() => setIsSuggestionsVisible(true)}
                  InputProps={{
                    endAdornment: (
                      <Button
                        onClick={handleSearch}
                        variant="contained"
                        color="primary"
                        size="large"
                        className={cx("banner__section-btn")}
                      >
                        Tìm kiếm
                      </Button>
                    ),
                  }}
                  sx={{
                    borderRadius: "12px",
                    height: "60px",
                    backgroundColor: "#fff",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      height: "60px",
                      "&:hover fieldset": {
                        borderColor: "#3fd0d4",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#3fd0d4",
                      },
                    },
                  }}
                />
                {isSuggestionsVisible && (
                  <Box
                    className={cx("suggestion-box")}
                    sx={{
                      position: "absolute",
                      backgroundColor: "#fff",
                      width: "100%",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                      borderRadius: "8px",
                      maxHeight: "400px",
                      overflowY: "auto",
                      zIndex: 1000,
                    }}
                  >
                    {searchName.trim() === "" && (
                      <ul className={cx("search__menu-list")}>
                        <span className={cx("heading")}>Top tìm kiếm</span>
                        {menuTours?.map((tour) => (
                          <Link
                            to={`/tours/${tour._id}`}
                            key={tour._id}
                            className={cx("search__menu-item")}
                          >
                            <img
                              src={tour?.Image_Tour[0]?.path}
                              alt=""
                              className={cx("search__menu-image")}
                            />
                            <div className={cx("search__menu-heding")}>
                              <p className={cx("name")}>{tour.Name_Tour}</p>
                              <div className={cx("search__menu-sub")}>
                                <span className={cx("end")}>
                                  {tour.End_Tour}
                                </span>
                                <span className={cx("price")}>
                                  {tour.Price_Tour.toLocaleString("vi-VN")} VND
                                </span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </ul>
                    )}
                    {searchName.trim() !== "" &&
                      nameSuggestions.map((name, index) => (
                        <Box
                          key={index}
                          onClick={() => handleSuggestionClick(name)}
                          className={cx("suggestion-item")}
                          sx={{
                            padding: "10px",
                            cursor: "pointer",
                            "&:hover": {
                              backgroundColor: "#f0f0f0",
                            },
                          }}
                        >
                           <SearchIcon
                            sx={{ marginRight: "10px", color: "#3fd0d4" }}
                          />
                          <span
                            dangerouslySetInnerHTML={{
                              __html: name.replace(
                                new RegExp(searchName, "gi"),
                                (match) =>
                                  `<span style="color: #3fd0d4">${match}</span>`
                              ),
                            }}
                          />
                        </Box>
                      ))}
                  </Box>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("content")}>
        <div className={cx("container")}>
          <div className={cx("vacation")}>
            <div className={cx("vacation__list")}>
                {toursToDisplay.map((tour) => (
                  <div key={tour._id} className={cx("vacation__item")}>
                    <img
                      src={tour?.Image_Tour[0]?.path}
                      alt={tour.Name_Tour}
                      className={cx("vacation__item-img")}
                    />
                    <div className={cx("vacation__item-text")}>
                      <h4 className={cx("vacation__item-name")} style={{ width: '340px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {tour.Name_Tour}
                      </h4>
                      <div className={cx("vacation__item-location")}>
                        <LocationOnOutlinedIcon className={cx("icon")} />
                        <span>{tour.Start_Tour}</span>
                      </div>
                      <div className={cx("vacation__item-price")}>
                        <span>{tour.total_Date}</span>
                        <p> {tour.Price_Tour.toLocaleString("vi-VN")} VND</p>
                      </div>
                      <p className={cx("vacation__item-title")}>
                        {tour.Description_Tour}
                      </p>
                      <Button
                        LinkComponent={Link}
                        to={`/tours/${tour._id}`}
                        className={cx("vacation__item-btn")}
                        variant="contained"
                        color="primary"
                      >
                        Khám phá
                      </Button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className={cx("travel__review")}>
          <img
            src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/09/h1-parallax-img-1.jpg"
            className={cx("travel__review-img")}
            alt=""
          />
          <div className={cx("travel__review-heading")}>
            <div className={cx("travel__review-text")}>
              <span>Bài viết nổi bật</span>
              <h1>Đánh Giá Du Lịch</h1>
              <p>
                Hãy trải nghiệm du lịch của chúng tôi, chúng tôi sẽ đêm lại một
                trải nghiệm tốt nhất cho bạn ! Vui lòng đặt vé ngay nào
              </p>
            </div>
            <div className={cx("container")}>
              <div className={cx("travel__review-list")}>
                <SlickSlider {...settings}>
                  {selectTours
                    .filter((tour) => !tour.isDeleted && tour.totalReview === 5)
                    .map((tour) => (
                      <Link
                        to={`/tours/${tour._id}`}
                        key={tour._id}
                        className={cx("travel__review-item")}
                      >
                        <img
                          src={tour?.Image_Tour[0]?.path}
                          alt={tour.Name_Tour}
                          className={cx("travel__review-item-img")}
                        />
                        <div className={cx("travel__review-item-text")}>
                          <h4 className={cx("name")}>{tour.Name_Tour}</h4>
                          <div className={cx("star")}>
                            <Rating
                              name="size-small"
                              value={tour.totalReview}
                              size="small"
                              precision={0.1}
                              readOnly
                              sx={{
                                color: "#3fd0d4",
                              }}
                            />
                          </div>
                          <span className={cx("title")}>
                            {tour.Description_Tour}
                          </span>
                          <p className={cx("location")}>{tour.End_Tour}</p>
                        </div>
                      </Link>
                    ))}
                </SlickSlider>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cx("blog", "container")}>
        <div className={cx("blog-main")}>
          <h2 className={cx("blog-hed")}>Blog của chúng tôi</h2>
          <span className={cx("blog-sub")}>
            Điều quan trọng là phải có một dịch vụ khách hàng tốt, một nhà cung
            cấp dịch vụ khách hàng. Đó có phải là một điều tốt mà nỗi đau cần?
            Khối hoa nhài. Với các đối tác
          </span>
          <ul className={cx("blog-list")}>
            <li className={cx("blog-item")}>
              <img
                className={cx("blog-item-img")}
                src="https://setsail.qodeinteractive.com/wp-content/uploads/2016/09/blog-img-12.jpg"
                alt=""
              />
              <div className={cx("blog-item-title")}>
                <Link to="#" className={cx("blog-item-hed")}>
                  Chuyến tham quan tuyệt vời
                </Link>
                <span className={cx("blog-item-sub")}>
                  Lắng nghe để tìm thấy sức mạnh của niềm đam mê. Hay tôi nói
                  điều đó và những điều tương tự, rằng họ có thể
                </span>
                <div className={cx("blog-item-action")}>
                  <span className={cx("blog-item-action-year")}>
                    Tháng 11, 2024
                  </span>
                  <div className={cx("blog-item-action-cmt")}>
                    <i className={cx("blog-item-action-cmt-icon")}></i>
                    <span className={cx("blog-item-action-cmt-span")}>
                      Bình luận
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <ul className={cx("blog-list")}>
            <li className={cx("blog-item")}>
              <img
                className={cx("blog-item-img")}
                src="https://setsail.qodeinteractive.com/wp-content/uploads/2016/09/blog-img-13.jpg"
                alt=""
              />
              <div className={cx("blog-item-title")}>
                <Link to="#" className={cx("blog-item-hed")}>
                  Chuyến tham quan tuyệt vời
                </Link>
                <span className={cx("blog-item-sub")}>
                  Lắng nghe để tìm thấy sức mạnh của niềm đam mê. Hay tôi nói
                  điều đó và những điều tương tự, rằng họ có thể
                </span>
                <div className={cx("blog-item-action")}>
                  <span className={cx("blog-item-action-year")}>
                    Tháng 11, 2024
                  </span>
                  <div className={cx("blog-item-action-cmt")}>
                    <i className={cx("blog-item-action-cmt-icon")}></i>
                    <span className={cx("blog-item-action-cmt-span")}>
                      Bình luận
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className={cx("blog-sale")}>
          <img
            className={cx("blog-sale-img")}
            src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/09/h1-banner-img-1.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
