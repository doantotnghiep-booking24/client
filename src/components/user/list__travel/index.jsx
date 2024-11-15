import classNames from "classnames/bind";
import styles from "./list-travel.module.scss";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Link } from "react-router-dom";

import { fetchNewsData } from '../../../services/fetchNews.js'
import {  useQuery } from '@tanstack/react-query';
import { fetchFeaturedLocationData } from "../../../services/fetchFeaturedLocation.js";
import Skeleton from "@mui/material/Skeleton";
import { Grid } from "@mui/material";

const cx = classNames.bind(styles);

function ListTravel() {
  const querynews = useQuery({ queryKey: ['news'], queryFn: fetchNewsData, initialData: [] })
  const queryfeatured = useQuery({ queryKey: ['featured'], queryFn: fetchFeaturedLocationData, initialData: [] })

  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: "0",
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={cx("wrap")}>
      <div className={cx("banner")}>
        {querynews.isLoading && queryfeatured.isLoading ? (
          <Skeleton variant="rectangular" width="100%" height={250} />
        ) : (
          <img
            src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/09/blog-title-img-2.jpg"
            alt=""
            className={cx("banner__img")}
          />

        )}
        {querynews.isLoading && queryfeatured.isLoading ? (
          <Skeleton variant="rectangular" width="100%" height={250} />
        ) : (
          <h2 className={cx("banner__title")}>Tin tức</h2>

        )}
      </div>

      <div className={cx("container")}>
        <div className={cx("content")}>
          <div className={cx("content__main")}>

            {querynews.isLoading && queryfeatured.isLoading ? (
              <>
                <Skeleton width={200} height={50} />
                <Skeleton width={150} height={30} />
              </>
            ) : (
              <div className={cx("content__main-text")}>
                <h2 className={cx("content__main-name")}>Các bài viết mới</h2>
                <span className={cx("content__main-title")}>
                  Luôn dẫn đầu và nắm bắt những cảm hứng mới mẻ
                </span>

              </div>
            )}

            <div className={cx("content__first")}>
              <div className={cx("content__home")}>
                <div className={cx("content__home-outstanding")}>
                  <div className={cx("outstanding__list")}>
                    {querynews.isLoading && queryfeatured.isLoading ? (
                      <Grid container spacing={2}>
                        <Skeleton width={700} height={300} />
                      </Grid>
                    ) : (
                      <Link to="/details" className={cx("outstanding__item")}>
                        <div className={cx("outstanding__item-heading")}>
                          <span>Bài viết nổi bật</span>
                        </div>
                        <div className={cx("outstanding__item-text")}>
                          <span>Đảo Lý Sơn</span>
                          <p>1.550.000 VNĐ</p>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <aside className={cx("aside")}>
                <div className={cx("aside__outstanding")}>
                  {querynews.isLoading && queryfeatured.isLoading ? (
                    <Grid container spacing={2}>
                      <Skeleton width={300} height={150} />
                      <Skeleton width={300} height={150} />
                    </Grid>
                  ) : (
                    <div className={cx("outstanding__list")}>
                      <Link to="/details" className={cx("outstanding__item")}>
                        <div className={cx("outstanding__item-heading")}>
                          <span>Giảm giá</span>
                        </div>
                        <div className={cx("outstanding__item-text")}>
                          <span>Đảo Lý Sơn</span>
                          <p>1.500.000 VNĐ</p>
                        </div>
                      </Link>
                      <Link to="/details" className={cx("outstanding__item")}>
                        <div className={cx("outstanding__item-heading")}>
                          <span>Giảm giá</span>
                        </div>
                        <div className={cx("outstanding__item-text")}>
                          <span>Đảo Lý Sơn</span>
                          <p>1.500.000 VNĐ</p>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </aside>
            </div>

            <div className={cx("content__list")}>
              {querynews.isLoading && queryfeatured.isLoading ? (
                <Skeleton variant="rectangular" width="100%" height={250} />
              ) : (
                <h3 className={cx("content__list-heading")}>
                  Địa danh nổi tiếng
                </h3>
              )}
              {querynews.isLoading && queryfeatured.isLoading ? (
                <Grid container spacing={2}>
                  {Array.from(new Array(3)).map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Skeleton width="60%" />
                      <Skeleton width="80%" />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Slider {...settings}>
                  {queryfeatured.data.map((item) => (
                    <Link to="/details" key={item.id} className={cx("outstanding__item")}>
                      <img key={item._id}
                        src={item.Image_Location[0] && item.Image_Location[0].path ? item.Image_Location[0].path : 'https://gachtrangtri.vn/site/upload/generals/noimg.jpg'}
                        alt={item.Name_Location}
                        className={cx("outstanding__item-img")}
                      />
                      <div className={cx("outstanding__item-text")}>
                        <span className={cx("outstanding__item-name")}>
                          {item.Name_Location}
                        </span>
                        <p className={cx("outstanding__item-price")}>
                          {item.Address_Location}
                        </p>
                      </div>
                    </Link>
                  ))}
                </Slider>
              )}
            </div>

            <div className={cx("content__list")}>
              {querynews.isLoading && queryfeatured.isLoading ? (
                <Skeleton variant="rectangular" width="100%" height={250} />
              ) : (
                <h3 className={cx("content__list-heading")}>Ưu đãi</h3>
              )}
              {querynews.isLoading && queryfeatured.isLoading ? (
                <Grid container spacing={2}>
                  {Array.from(new Array(3)).map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Skeleton width="60%" />
                      <Skeleton width="80%" />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Slider {...settings}>
                  <Link to="/details" className={cx("outstanding__item")}>
                    <img
                      src="https://imgcdn.tapchicongthuong.vn/tcct-media/20/5/20/daot_ly_son.jpg"
                      alt=""
                      className={cx("outstanding__item-img")}
                    />
                    <div className={cx("outstanding__item-text")}>
                      <span className={cx("outstanding__item-name")}>
                        Tham gia bến nhà rồng quận 4, Thành Phố Hồ Chí Minh
                      </span>
                      <p className={cx("outstanding__item-price")}>
                        1.500.000 VNĐ
                      </p>
                    </div>
                  </Link>
                  <Link to="/details" className={cx("outstanding__item")}>
                    <img
                      src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/10/tour-featured-img-14.jpg"
                      alt=""
                      className={cx("outstanding__item-img")}
                    />
                    <div className={cx("outstanding__item-text")}>
                      <span className={cx("outstanding__item-name")}>
                        Tham gia bến nhà rồng quận 4, Thành Phố Hồ Chí Minh
                      </span>
                      <p className={cx("outstanding__item-price")}>
                        1.500.000 VNĐ
                      </p>
                    </div>
                  </Link>
                  <Link to="/details" className={cx("outstanding__item")}>
                    <img
                      src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/10/tour-featured-img-51-1100x650.jpg"
                      alt=""
                      className={cx("outstanding__item-img")}
                    />
                    <div className={cx("outstanding__item-text")}>
                      <span className={cx("outstanding__item-name")}>
                        Tham gia bến nhà rồng quận 4, Thành Phố Hồ Chí Minh
                      </span>
                      <p className={cx("outstanding__item-price")}>
                        1.500.000 VNĐ
                      </p>
                    </div>
                  </Link>
                </Slider>
              )}
            </div>

            <div className={cx("content__list")}>
              {querynews.isLoading && queryfeatured.isLoading ? (
                <Skeleton variant="rectangular" width="100%" height={250} />
              ) : (
                <h3 className={cx("content__list-heading")}>Khám phá Việt Nam</h3>
              )}
              {querynews.isLoading && queryfeatured.isLoading ? (
                <Grid container spacing={2}>
                  {Array.from(new Array(3)).map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Skeleton width="60%" />
                      <Skeleton width="80%" />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Slider {...settings}>
                  {querynews.data.map((item) => (
                    <Link to={`/news-detail/${item._id}`} className={cx("outstanding__item")} key={item.id}>
                      <img key={item._id}
                        src={item?.Image[0]?.path}
                        alt={item.Name}
                        className={cx("outstanding__item-img")}
                      />
                      <div className={cx("outstanding__item-text")}>
                        <span className={cx("outstanding__item-name")}>{item.Name}</span>
                        <p className={cx("outstanding__item-price")}>{item.Title}</p>
                      </div>
                    </Link>
                  ))}
                </Slider>
              )}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default ListTravel;
