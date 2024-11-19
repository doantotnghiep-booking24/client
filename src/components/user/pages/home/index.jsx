import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";

import { MenuItem, Select } from "@mui/material";

import { useState } from "react";

import { useQuery, useMutation } from "@tanstack/react-query";

import axios from "axios";

import SlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classNames from "classnames/bind";
import styles from "./home.module.scss";
import { Link } from "react-router-dom";
import Slider from "@mui/material/Slider";

import { fetchToursData } from "../../../../services/fetchTours";
import { fetchTypeTours } from "../../../../services/fetchTypeTours";

const cx = classNames.bind(styles);

const BASE_URL = "http://localhost:3001/V1/Tours";

const fetchRandomTours = async () => {
  const response = await axios.get(`${BASE_URL}/GetTours?page=1&limit=3`);
  return response.data.Tours.datas;
};

const searchTours = async ({ name, price }) => {
  const response = await axios.get(`${BASE_URL}/SearchTour`, {
    params: {
      NameSearch: name,
      PriceSearch: price,
      page: 1,
      limit: 3,
    },
  });
  return response.data.search.datas;
};

function Home() {
  const [searchName, setSearchName] = useState("");
  const [searchType, setSeatchType] = useState("");
  const [searchPrice, setSearchPrice] = useState(0);
  const [filteredTours, setFilteredTours] = useState(null);

  const { data: selectTours } = useQuery({
    queryKey: ["tours"],
    queryFn: fetchToursData,
    initialData: [],
  });
  console.log(selectTours)
  const tourNames = Array.from(
    new Set(selectTours.map((tour) => tour.Name_Tour))
  );
  const { data: TypeTours } = useQuery({
    queryKey: ["typeTours"],
    queryFn: fetchTypeTours,
    initialData: [],
  });

  const { data: initialTours, isLoading } = useQuery({
    queryKey: ["randomTours"],
    queryFn: fetchRandomTours,
  });

  const { mutate: searchTour } = useMutation({
    mutationFn: searchTours,
    onSuccess: (data) => {
      setFilteredTours(data);
    },
  });

  const handleSearch = () => {
    searchTour({ name: searchName, price: searchPrice, type: searchType });
  };

  if (isLoading) return <p>Loading tours...</p>;

  const toursToDisplay = filteredTours || initialTours;
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
              <span>Gói của chúng tôi</span>
              <h1>Hãy tìm kiếm kỳ nghỉ của bạn</h1>
            </div>

            <div className={cx("banner__section")}>
              <div className={cx("banner__section-search")}>
                <Select
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  displayEmpty
                  className={cx("banner__section-search-select")}
                >
                  <MenuItem value="">Chuyến đi</MenuItem>
                  {tourNames.map((name, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className={cx("banner__section-type")}>
                <Select
                  value={searchType}
                  onChange={(e) => setSeatchType(e.target.value)}
                  displayEmpty
                  className={cx("banner__section-type-select")}
                >
                  <MenuItem value="">Loại tour</MenuItem>
                  {TypeTours.map((type) => (
                    <MenuItem key={type._id} value={type.Name_Type}>
                      {type.Name_Type}
                    </MenuItem>
                  ))}
                </Select>
              </div>

              <div className={cx("banner__section-price")}>
                <div className={cx("price-range-container")}>
                  <Slider
                    size="large"
                    value={searchPrice}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) =>
                      `${value.toLocaleString()} VND`
                    }
                    min={1000000}
                    max={10000000}
                    onChange={(e) => setSearchPrice(Number(e.target.value))}
                    className={cx("price-slider")}
                    sx={{
                      color: "#3fd0d4",
                      "& .MuiSlider-thumb": {
                        borderRadius: "50%",
                      },
                    }}
                  />
                </div>
              </div>

              <div className={cx("banner__section-btn")}>
                <Button
                  onClick={handleSearch}
                  className={cx("banner__section-btn-main")}
                  variant="contained"
                  color="primary"
                >
                  Tìm kiếm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("content")}>
        <div className={cx("container")}>
          <div className={cx("vacation")}>
            <div className={cx("vacation__list")}>
              {toursToDisplay && toursToDisplay.length > 0 ? (
                toursToDisplay.map((tour) => (
                  <div key={tour._id} className={cx("vacation__item")}>
                    <img
                      src={tour?.Image_Tour[0]?.path}
                      alt={tour.Name_Tour}
                      className={cx("vacation__item-img")}
                    />
                    <div className={cx("vacation__item-text")}>
                      <h4 className={cx("vacation__item-name")}>
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
                ))
              ) : (
                <p>No tours found</p>
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
                    .filter((tour) => tour.totalReview === 5)
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
                          <p className={cx("location")}>{tour.Start_Tour}</p>
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
                <Link to="details" className={cx("blog-item-hed")}>
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
                <Link to="details" className={cx("blog-item-hed")}>
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
