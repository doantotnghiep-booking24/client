import { useState, useEffect } from "react";
import styles from "./tours.module.scss";
import classNames from "classnames/bind";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import Rating from "@mui/material/Rating";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button, Tabs, Tab } from "@mui/material";
import { fetchToursData } from "../../../services/fetchTours";
import { fetchCategories } from "../../../services/fetchCategory";
import { fetchTypeTours } from "../../../services/fetchTypeTours";

const cx = classNames.bind(styles);

function Tour() {
  const { data: tours } = useQuery({
    queryKey: ["tours"],
    queryFn: fetchToursData,
    initialData: [],
  });

  const { data: categories } = useQuery({
    queryKey: ["cate"],
    queryFn: fetchCategories,
    initialData: [],
  });

  const { data: type } = useQuery({
    queryKey: ["type"],
    queryFn: fetchTypeTours,
    initialData: [],
  });

  const [minPrice, setMinPrice] = useState(1000000);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [selectedTourNames, setSelectedTourNames] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRating, setSelectedRating] = useState(0);

  const [filteredTours, setFilteredTours] = useState([]);

  const filterTours = () => {
    return tours.filter((tour) => {
      const checkPrice =
        tour.Price_Tour >= minPrice && tour.Price_Tour <= maxPrice;
      const checkTourName =
        selectedTourNames.length === 0 ||
        selectedTourNames.includes(tour.Name_Tour);
      const checkCategory =
        selectedCategory === "all" || tour.id_Category === selectedCategory;
      const checkRating =
        selectedRating === 0 || tour.totalReview >= selectedRating;

      return checkPrice && checkTourName && checkCategory && checkRating;
    });
  };

  const [selectedTab, setSelectedTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    const selectedCategoryId =
      newValue === 0 ? "all" : categories[newValue - 1]?._id;
    setSelectedCategory(selectedCategoryId);
  };

  const handleTourNameChange = (event) => {
    const { name, checked } = event.target;
    setSelectedTourNames((prev) =>
      checked ? [...prev, name] : prev.filter((tourName) => tourName !== name)
    );
  };

  useEffect(() => {
    const filtered = filterTours();
    setFilteredTours(filtered);
    setCurrentPage(1);
  }, [
    minPrice,
    maxPrice,
    selectedTourNames,
    selectedCategory,
    selectedRating,
    tours,
  ]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedTours = filteredTours.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className={cx("wrap")}>
      <div className={cx("banner")}>
        <img
          src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/09/tour-list-title-img.jpg"
          alt=""
          className={cx("banner__img")}
        />
        <h2 className={cx("banner__title")}>Chuyến đi</h2>
      </div>

      <div className={cx("container")}>
        <div className={cx("content")}>
          <div className={cx("content__main")}>
            <div className={cx("aside")}>
              <div className={cx("filter-header")}>
                <h4 className={cx("filter-title")}>Lọc theo</h4>
              </div>

              <div className={cx("price", "filter-section")}>
                <h5 className={cx("section-heading")}>Giá</h5>
                <Slider
                  size="small"
                  value={[minPrice, maxPrice]}
                  onChange={(e, newValue) => {
                    setMinPrice(newValue[0]);
                    setMaxPrice(newValue[1]);
                  }}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value.toLocaleString()} VND`}
                  min={1000000}
                  max={10000000}
                  className={cx("price-slider")}
                  sx={{
                    color: "#3fd0d4",
                    "& .MuiSlider-thumb": {
                      borderRadius: "50%",
                    },
                  }}
                />
                <span className={cx("price-range")}>
                  {minPrice.toLocaleString()} đ - {maxPrice.toLocaleString()} đ
                </span>
              </div>

              <div className={cx("type", "filter-section")}>
                <h5 className={cx("section-heading")}>Loại tour</h5>
                {type.map((type) => (
                  <div key={type._id} className={cx("type-item")}>
                    <Checkbox
                      name={type.Name_Type}
                      onChange={(e) => handleTourNameChange(e)}
                      sx={{
                        color: "#3fd0d4",
                        "&.Mui-checked": {
                          color: "#3fd0d4",
                        },
                      }}
                    />
                    <label
                      htmlFor={type.Name_Type}
                      className={cx("type-label")}
                    >
                      {type.Name_Type}
                    </label>
                  </div>
                ))}
              </div>

              <div className={cx("location", "filter-section")}>
                <h5 className={cx("section-heading")}>Điểm đến</h5>
                <h6 className={cx("sub-heading")}>Việt Nam</h6>
                {tours.map((tour) => (
                  <div key={tour._id} className={cx("location-item")}>
                    <Checkbox
                      name={tour.Name_Tour}
                      onChange={handleTourNameChange}
                      sx={{
                        color: "#3fd0d4",
                        "&.Mui-checked": {
                          color: "#3fd0d4",
                        },
                      }}
                    />
                    <label
                      htmlFor={tour.Name_Tour}
                      className={cx("location-label")}
                    >
                      {tour.Name_Tour}
                    </label>
                  </div>
                ))}
              </div>

              <div className={cx("evaluate", "filter-section")}>
                <h5 className={cx("section-heading")}>Đánh giá</h5>
                <Rating
                  name="rating"
                  value={selectedRating}
                  onChange={(event, newValue) => setSelectedRating(newValue)}
                  sx={{
                    color: "#3fd0d4",
                  }}
                />
              </div>
            </div>

            <div className={cx("content__home")}>
              <div className={cx("category")}>
                <Tabs
                  value={selectedTab}
                  onChange={handleTabChange}
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "#3fd0d4",
                    },
                  }}
                >
                  <Tab
                    label="Tất cả"
                    sx={{
                      color: selectedTab === 0 ? "#3fd0d4" : "inherit",
                      "&.Mui-selected": {
                        color: "#3fd0d4",
                      },
                    }}
                  />
                  {categories.map((category, index) => (
                    <Tab
                      key={category._id}
                      label={category.Name_Cate}
                      sx={{
                        color:
                          selectedTab === index + 1 ? "#3fd0d4" : "inherit",
                        "&.Mui-selected": {
                          color: "#3fd0d4",
                        },
                      }}
                    />
                  ))}
                </Tabs>
              </div>
              <ul className={cx("content__home-list")}>
                {displayedTours.map((tour) => (
                  <li key={tour._id} className={cx("content__home-item")}>
                    <img
                      className={cx("content__home-img")}
                      src={tour.Image_Tour[0].path}
                      alt={tour.Name_Tour}
                    />
                    <div className={cx("section")}>
                      <div className={cx("section__heading")}>
                        <h5 className={cx("section__heading-title")}>
                          {tour.Title_Tour}
                        </h5>
                        <div className={cx("section__heading-good")}>Tốt</div>
                      </div>
                      {tour.totalReview > 0 && (
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
                      )}
                      <p className={cx("section-content")}>
                        {tour.Description_Tour}
                      </p>
                      <span className={cx("endow")}>Ưu Đãi Mùa Du Lịch</span>
                      <div className={cx("bottom")}>
                        <div>
                          <p className={cx("outstanding")}>
                            Tour du lịch nổi bật nhất
                          </p>
                        </div>
                        <div className={cx("action")}>
                          {tour.Price_Tour && tour.After_Discount > 0 ? (
                            <div>
                              <span className={cx("action__price-discount")}>
                                {tour.Price_Tour.toLocaleString("vi-VN")}{" "}
                                VND
                              </span>
                              <h4 className={cx("action__price")}>
                                {tour.After_Discount.toLocaleString("vi-VN")} VND
                              </h4>
                            </div>
                          ) : (
                            <h4 className={cx("action__price")}>
                              {tour.Price_Tour.toLocaleString("vi-VN")} VND
                            </h4>
                          )}
                          <Button
                            LinkComponent={Link}
                            to={`/tours/${tour._id}`}
                            variant="contained"
                            color="primary"
                            className={cx("vacation__item-btn")}
                          >
                            Xem chi tiết
                          </Button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {filteredTours.length > itemsPerPage && (
                <div className={cx("pagination")}>
                  <Stack spacing={2}>
                    <Pagination
                      count={Math.ceil(filteredTours.length / itemsPerPage)}
                      page={currentPage}
                      onChange={handlePageChange}
                      variant="outlined"
                      sx={{
                        "& .MuiPaginationItem-root": {
                          color: "#3fd0d4",
                          borderColor: "#3fd0d4",
                          "&:hover": {
                            backgroundColor: "#3fd0d4",
                            color: "#fff",
                          },
                        },
                        "& .MuiPaginationItem-root.Mui-selected": {
                          backgroundColor: "#3fd0d4",
                          color: "#fff",
                          borderColor: "#3fd0d4",
                          "&:hover": {
                            backgroundColor: "#3fd0d4",
                          },
                        },
                      }}
                    />
                  </Stack>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tour;