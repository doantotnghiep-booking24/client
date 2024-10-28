import { useEffect, useRef, useState } from "react";
import styles from "./tours.module.scss";
import classNames from "classnames/bind";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import Rating from "@mui/material/Rating";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

import { Button, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import { fetchToursData } from "../../../services/fetchTours";

import { useQuery } from "@tanstack/react-query";

const cx = classNames.bind(styles);

function Tour() {
  const { data: tours = [], isLoading } = useQuery({
    queryKey: ["tours"],
    queryFn: fetchToursData,
    initialData: [],
  });
if(isLoading){
  console.log('đang tải dữ liệu');
}else{
  console.log(' tải dữ liệu thành công');
}

  const [selectedTab, setSelectedTab] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
const refScroll = useRef(null)
useEffect(() => {
  if (refScroll) {
    refScroll.current.scrollIntoView({ behavior: 'smooth' })
  }
}, [currentPage])
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedTours = tours.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={cx("wrap")}>
      <div className={cx("banner")}>
        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height={250} />
        ) : (
          <img
            src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/09/tour-list-title-img.jpg"
            alt=""
            className={cx("banner__img")}
          />
        )}
        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height={250} />
        ) : (
          <h2 className={cx("banner__title")}>Chuyến đi</h2>
        )}
      </div>
      <div className={cx("container")}>
        <div className={cx("content")}>
          <div className={cx("content__main")}>
            <div className={cx("aside")}>
              {isLoading ? (
                <>
                  <Skeleton width={200} height={50} />
                  <Skeleton width={150} height={30} />
                  <Skeleton width={150} height={30} />
                  <Skeleton width={150} height={30} />
                </>
              ) : (
                <>
                  <div className={cx("filter")}>
                    <h4>Lọc theo</h4>
                  </div>
                  <div className={cx("price")}>
                    <h5 className={cx("price__heading")}>Giá</h5>
                    <Slider
                      size="small"
                      defaultValue={70}
                      aria-label="Small"
                      valueLabelDisplay="auto"
                      className={cx("price__range")}
                    />
                    <span className={cx("price__number")}>
                      5000000đ - 65000000đ
                    </span>
                  </div>
                  <div className={cx("type")}>
                    <h5 className={cx("type__heading")}>Loại tour</h5>
                    <div className={cx("type__wrap")}>
                      <Checkbox />
                      <label htmlFor="tour">Tour hàng ngày</label>
                    </div>
                  </div>
                  <div className={cx("location")}>
                    <h5 className={cx("location__heading")}>Điểm đến</h5>
                    <h6 className={cx("location__sub")}>Việt Nam</h6>

                    <div className={cx("location__wrap")}>
                      <Checkbox />
                      <label htmlFor="qn">Quảng Ngãi</label>
                    </div>
                    <div className={cx("location__wrap")}>
                      <Checkbox />
                      <label htmlFor="dn">Đà Nẵng</label>
                    </div>
                    <div className={cx("location__wrap")}>
                      <Checkbox />
                      <label htmlFor="hn">Hà Nội</label>
                    </div>
                    <div className={cx("location__wrap")}>
                      <Checkbox />
                      <label htmlFor="na">Nghệ An</label>
                    </div>
                  </div>
                  <div className={cx("evaluate")}>
                    <h5 className={cx("evaluate__heading")}>Đánh giá</h5>
                    <div className={cx("evaluate__wrap")}>
                      <Rating name="size-medium" defaultValue={0} max={5} />{" "}
                      <br />
                      <Rating
                        name="size-medium"
                        defaultValue={0}
                        max={4}
                      />{" "}
                      <br />
                      <Rating
                        name="size-medium"
                        defaultValue={0}
                        max={3}
                      />{" "}
                      <br />
                      <Rating
                        name="size-medium"
                        defaultValue={0}
                        max={2}
                      />{" "}
                      <br />
                      <Rating name="size-medium" defaultValue={0} max={1} />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className={cx("content__home")}>
              {isLoading ? (
                <>
                  {Array.from(new Array(itemsPerPage)).map((_, index) => (
                    <div key={index} className={cx("content__home-item")}>
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={200}
                      />
                      <div className={cx("section")}>
                        <Skeleton width="60%" height={30} />
                        <Skeleton width="40%" height={20} />
                        <Skeleton width="90%" height={20} />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div ref={refScroll} className={cx("category")}>
                    <Tabs
                      value={selectedTab}
                      onChange={handleTabChange}
                      sx={{
                        "& .MuiTabs-indicator": {
                          backgroundColor: "#3fd0d4",
                        },
                      }}
                    >
                      <Tab
                        label="Quảng Ngãi"
                        sx={{
                          color: selectedTab === 0 ? "#3fd0d4" : "inherit",
                          "&.Mui-selected": {
                            color: "#3fd0d4",
                          },
                        }}
                      />
                      <Tab
                        label="Đà Nẵng"
                        sx={{
                          color: selectedTab === 1 ? "#3fd0d4" : "inherit",
                          "&.Mui-selected": {
                            color: "#3fd0d4",
                          },
                        }}
                      />
                      <Tab
                        label="Hà Nội"
                        sx={{
                          color: selectedTab === 2 ? "#3fd0d4" : "inherit",
                          "&.Mui-selected": {
                            color: "#3fd0d4",
                          },
                        }}
                      />
                      <Tab
                        label="Hải Phòng"
                        sx={{
                          color: selectedTab === 3 ? "#3fd0d4" : "inherit",
                          "&.Mui-selected": {
                            color: "#3fd0d4",
                          },
                        }}
                      />
                    </Tabs>
                  </div>
                  <ul  className={cx("content__home-list")}>
                    {selectedTours.map((tour) => (
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
                            <div className={cx("section__heading-good")}>
                              Tốt
                            </div>
                          </div>
                          <Rating
                            name="size-small"
                            defaultValue={5}
                            size="small"
                          />
                          <p className={cx("section-content")}>
                            {tour.Description_Tour}
                          </p>
                          <span className={cx("endow")}>
                            Ưu Đãi Mùa Du Lịch
                          </span>
                          <div className={cx("bottom")}>
                            <div>
                              <p className={cx("outstanding")}>
                                Tour du lịch nổi bật nhất
                              </p>
                            </div>
                            <div className={cx("action")}>
                            {tour.Price_Tour && tour.After_Discount > 0 ? <div>
                                <span className={cx("action__price-discount")}>
                                  {tour.Price_Tour.toLocaleString('vi-VN')+'VND'}
                                </span>
                                <h4 className={cx("action__price")}>
                                  {tour.After_Discount.toLocaleString('vi-VN')}VND
                                </h4>
                              </div> : <h4 className={cx("action__price")}>
                                {tour.Price_Tour.toLocaleString('vi-VN')}VND
                              </h4>}
                              <Button
                                LinkComponent={Link}
                                to={`/tours/${tour._id}`}
                                className={cx("vacation__item-btn")}
                                variant="contained"
                                color="primary"
                              >
                                Xem chi tiết
                              </Button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {!isLoading && (
                <div className={cx("pagination")}>

                  <Stack spacing={10}>
                    <Pagination
                      count={Math.ceil(tours.length / itemsPerPage)}
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
                        }
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
