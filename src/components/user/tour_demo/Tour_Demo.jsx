import { useState, useEffect, useRef } from "react";
import styles from "./tour_demo.module.scss";
import classNames from "classnames/bind";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import Rating from "@mui/material/Rating";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button, Tabs, Tab } from "@mui/material";
// import { fetchToursData } from "../../../services/fetchTours";
import { fetchCategories } from "../../../services/fetchCategory";
import { fetchTypeTours } from "../../../services/fetchTypeTours";
import { GetAllTicket } from "../../../services/getTicketsHistory";
import RoomIcon from '@mui/icons-material/Room';
import { useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
const cx = classNames.bind(styles);

const BASE_URL = "http://localhost:3001/V1/Tours";

const searchTours = async (name) => {
  const response = await axios.get(`${BASE_URL}/SearchTour`, {
    params: {
      NameSearch: name,
    },
  });
  return response.data.search.datas.filter((tour) => !tour.isDeleted);
};
function Tour_Demo() {
  const refScroll = useRef(null)
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  const { data: tours } = useQuery({
    queryKey: ["tours", searchQuery],
    queryFn: () => searchTours(searchQuery),
    initialData: [],
  });
  // const { data: tours } = useQuery({
  //   queryKey: ["tours"],
  //   queryFn: fetchToursData,
  //   initialData: [],
  // });

  const tourNames = Array.from(
    new Set(
      tours.filter((tour) => !tour.isDeleted).map((tour) => tour.End_Tour)
    )
  );
  console.log(tourNames);

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

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [selectedTourNames, setSelectedTourNames] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRating, setSelectedRating] = useState(0);
  const [filteredTours, setFilteredTours] = useState([]);
  const [bookedTickets, setBookedTickets] = useState([])
  useEffect(() => {
    const handleGetTickets = async () => {
      const res = await GetAllTicket()
      setBookedTickets(res.data.Tickets)
    }
    handleGetTickets()
  }, [])

  const filterTours = () => {
    return tours.filter((tour) => {
      console.log('tour', tour.Name_Tour);

      const checkPrice =
        tour.Price_Tour >= minPrice && tour.Price_Tour <= maxPrice;
      const checkTourName =
        selectedTourNames.length === 0 ||
        tour.End_Tour.toLowerCase().includes(selectedTourNames.toLowerCase());
      const checkCategory =
        selectedCategory === "all" || tour.id_Category === selectedCategory;
      const checkRating =
        selectedRating === 0 || tour.totalReview >= selectedRating;
      // console.log(tour);
      return checkPrice && checkTourName && checkCategory && checkRating;
    });
  };
  const [selectedTab, setSelectedTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    if (refScroll) {
      refScroll.current?.scrollIntoView();
    }
  }, [selectedCategory, currentPage]);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    const selectedCategoryId =
      newValue === 0 ? "all" : categories[newValue - 1]?._id;
    setSelectedCategory(selectedCategoryId);
  };

  const handleTourNameChange = (event) => {
    const { name, checked } = event.target;

    setSelectedTourNames((prev) =>
      checked ? name : ''
    );
  };

  useEffect(() => {
    const filtered = filterTours();
    console.log('filtered', filtered);

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
  const displayedTours = filteredTours
    .filter((tour) => !tour.isDeleted)
    .slice(startIndex, startIndex + itemsPerPage);
  // console.log(tourNames);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
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
                  min={0}
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
                <h5 className={cx("section-heading")}>Điểm đến - Việt Nam</h5>
                {/* <h6 className={cx("sub-heading")}>Việt Nam</h6> */}
                {tourNames.map((name, index) => (
                  <div key={index} className={cx("location-item")}>
                    <Checkbox
                      name={name}
                      onChange={handleTourNameChange}
                      checked={selectedTourNames === name ? selectedTourNames : ''}
                      sx={{
                        opacity: "50%",
                        borderRadius: "20px",
                        color: "#a8a8a8",
                        "&.Mui-checked": {
                          color: "#3fd0d4",
                        },
                      }}
                    />
                    <label htmlFor={name} className={cx("location-label")}>
                      {name}
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
                />
              </div>
            </div>
    </Box>
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
            {screenWidth >= 300 && screenWidth <= 768  && <div style={{display : 'flex',}}>
                {['Filter'].map((anchor) => (
                  // <React.Fragment key={anchor}>
                  <>
                    <Button style={{  width : '150px', background : '#e6e6e6',borderRadius : '30px',margin : '7px 34px',color : '#3fd0d4'}}  onClick={toggleDrawer(anchor, true)}>{anchor} <span style={{marginLeft : '5px'}}><ArrowDownwardIcon style={{fontSize : '17px'}}/></span></Button>
                    <Drawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                    >
                      {list(anchor)}
                    </Drawer>
                  </>
                  // </React.Fragment>
                ))}
                
              </div>}
          {screenWidth >= 768  && <div className={cx("aside")}>
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
                  min={0}
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
                <h5 className={cx("section-heading")}>Điểm đến - Việt Nam</h5>
                {/* <h6 className={cx("sub-heading")}>Việt Nam</h6> */}
                {tourNames.map((name, index) => (
                  <div key={index} className={cx("location-item")}>
                    <Checkbox
                      name={name}
                      onChange={handleTourNameChange}
                      checked={selectedTourNames === name ? selectedTourNames : ''}
                      sx={{
                        opacity: "50%",
                        borderRadius: "20px",
                        color: "#a8a8a8",
                        "&.Mui-checked": {
                          color: "#3fd0d4",
                        },
                      }}
                    />
                    <label htmlFor={name} className={cx("location-label")}>
                      {name}
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
                />
              </div>
            </div>}
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
                    <Tab ref={refScroll}
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
                {displayedTours.filter(tour => tour.isDeleted === false).map((tour) => (
                  <Link key={tour._id} to={`/tours/${tour._id}`} style={{ textDecoration: 'none' }} className={cx("content__home-item")}>
                    <div style={{ position: 'relative' }}>
                      <img
                        className={cx("content__home-img")}
                        src={tour.Image_Tour[0]?.path}
                        alt={tour.Name_Tour}
                      />
                      <div style={{ position: 'absolute', width: '100px', height: '30px', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '4px', margin: '8px 166px', top: 0 }}>
                        <p style={{ textAlign: 'center', lineHeight: '30px', color: '#fff' }}>{tour.End_Tour}</p>
                      </div>
                    </div>
                    <div className={cx("section")}>
                      {/* <h6 style={{ color: 'rgb(117, 117, 117)' }}>{tour.End_Tour}</h6> */}
                      <div className={cx("section__heading")}>
                        <h5 style={{ width: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} className={cx("section__heading-title")}>
                          {tour.Start_Tour} - {tour.Name_Tour}
                        </h5>
                        {tour.totalReview >= 4 && tour.totalReview <= 5 ? <div className={cx("section__heading-good")}>Tốt</div> : (tour.totalReview >= 3 && tour.totalReview < 4 ? <div className={cx("section__heading-good")}>Tb</div> : <div className={cx("section__heading-good")}>Tệ</div>)}
                      </div>
                      {tour.totalReview > 0 && (
                        <Rating style={{ marginTop: '0px', color: '#f09b0a', }}
                          name="size-small"
                          value={tour.totalReview}
                          size="small"
                          precision={0.1}
                          readOnly
                        // emptyIcon
                        />
                      )}
                      {tour.After_Discount > 0 ? <p className={cx("section-content")}>
                        {tour.Description_Tour}
                      </p> : <p className={cx("section-contents")}>
                        {tour.Description_Tour}
                      </p>}
                      {tour.After_Discount > 0 && <span className={cx("endow")}>Ưu Đãi Mùa Du Lịch</span>}
                      {/* <span className={cx("endow")}>{tour.After_Discount > 0 ? 'Ưu Đãi Mùa Du Lịch' : <span></span>}</span> */}
                      {/* <div className={cx("bottom")}>
                        <div>
                          <p className={cx("outstanding")}>
                            Tour du lịch nổi bật nhất
                          </p>
                        </div>
                      </div> */}

                      <div style={{ marginTop: '10px' }} className={cx("action")}>
                        {tour.Price_Tour && tour.After_Discount > 0 ? (
                          <div style={{ display: 'flex', gap: 5, lineHeight: '22px' }}>
                            <h4 className={cx("action__price")}>
                              {tour.After_Discount.toLocaleString("vi-VN")}₫
                            </h4>
                            <span className={cx("action__price-discount")}>
                              {tour.Price_Tour.toLocaleString("vi-VN")} ₫
                            </span>
                          </div>
                        ) : (
                          <h4 className={cx("action__price")}>
                            {tour.Price_Tour.toLocaleString("vi-VN")} ₫
                          </h4>
                        )}
                        {/* <Button
                          LinkComponent={Link}
                          to={`/tours/${tour._id}`}
                          variant="contained"
                          color="primary"
                          className={cx("vacation__item-btn")}
                        >
                          Xem chi tiết
                        </Button> */}
                      </div>
                    </div>
                  </Link>
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

export default Tour_Demo;
