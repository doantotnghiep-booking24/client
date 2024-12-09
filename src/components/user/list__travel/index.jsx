import classNames from "classnames/bind";
import styles from "./list-travel.module.scss";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Link } from "react-router-dom";

import { fetchNewsData } from "../../../services/fetchNews.js";
import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedLocationData } from "../../../services/fetchFeaturedLocation.js";

const cx = classNames.bind(styles);

function ListTravel() {
  const querynews = useQuery({ queryKey: ["news"], queryFn: fetchNewsData });
  const queryfeatured = useQuery({
    queryKey: ["featured"],
    queryFn: fetchFeaturedLocationData,
  });

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
        <img
          src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/09/blog-title-img-2.jpg"
          alt=""
          className={cx("banner__img")}
        />
        <h2 className={cx("banner__title")}>Tin tức</h2>
      </div>

      <div className={cx("container")}>
        <div className={cx("content")}>
          <div className={cx("content__main")}>
            <div className={cx("content__main-text")}>
              <h2 className={cx("content__main-name")}>Các bài viết mới</h2>
              <span className={cx("content__main-title")}>
                Luôn dẫn đầu và nắm bắt những cảm hứng mới mẻ
              </span>
            </div>
            {querynews.data && (
              <div className={cx("content__first")}>
                <div className={cx("content__home")}>
                  <div className={cx("content__home-outstanding")}>
                    {querynews.data.slice(4, 5).map((item) => (
                      <div className={cx("outstanding__list")} key={item._id}>
                        <Link
                          to={`/detail/${item._id}`}
                          className={cx("outstanding__item")}
                          style={{
                            backgroundImage: `url(${item.Image[0]?.path})`,
                          }}
                        >
                          <div className={cx("outstanding__item-heading")}>
                            <span>Bài viết nổi bật</span>
                          </div>
                          <div className={cx("outstanding__item-text")}>
                            <span>{item.Name}</span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                <aside className={cx("aside")}>
                  <div className={cx("aside__outstanding")}>
                    {querynews.data.slice(7, 9).map((item) => (
                      <div
                        className={cx("outstanding__list")}
                        key={item._id}
                        style={{ marginTop: 10 }}
                      >
                        <Link
                          to={`/detail/${item._id}`}
                          className={cx("outstanding__item")}
                          style={{
                            backgroundImage: `url(${item.Image[0]?.path})`,
                          }}
                        >
                          <div className={cx("outstanding__item-heading")}>
                            <span>Nổi bật</span>
                          </div>
                          <div className={cx("outstanding__item-text")}>
                            <span>{item.Name}</span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </aside>
              </div>
            )}
            <div className={cx("content__list")}>
              <h3 className={cx("content__list-heading")}>
                Địa danh nổi tiếng
              </h3>
              <Slider {...settings}>
                {queryfeatured.data?.map((item) => (
                  <Link
                    to={`/detail/${item._id}`}
                    className={cx("outstanding__item")}
                    key={item._id}
                  >
                    <img
                      src={
                        item.Image_Location[0]?.path
                          ? item.Image_Location[0].path
                          : "https://gachtrangtri.vn/site/upload/generals/noimg.jpg"
                      }
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
            </div>

            <div className={cx("content__list")}>
              <h3 className={cx("content__list-heading")}>Khám phá Việt Nam</h3>
              <Slider {...settings}>
                {querynews.data?.map((item) => (
                  <Link
                    to={`/detail/${item._id}`}
                    className={cx("outstanding__item")}
                    key={item.id}
                  >
                    <img
                      src={item.Image[0]?.path}
                      alt={item.Name}
                      className={cx("outstanding__item-img")}
                    />
                    <div className={cx("outstanding__item-text")}>
                      <span className={cx("outstanding__item-name")}>
                        {item.Name}
                      </span>
                      <p className={cx("outstanding__item-price")}>
                        {item.Title}
                      </p>
                    </div>
                  </Link>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListTravel;
