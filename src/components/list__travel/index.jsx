
import classNames from "classnames/bind";
import styles from "./list-travel.module.scss";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const cx = classNames.bind(styles);

function ListTravel() {

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
        <h2 className={cx("banner__title")}>Khám phá</h2>
      </div>
      <div className={cx("content")}>
        <div className={cx("content__main")}>
          <div className={cx("content__main-text")}>
            <h2 className={cx("content__main-name")}>Các bài viết mới</h2>
            <span className={cx("content__main-title")}>Luôn dẫn đầu và nắm bắt những cảm hứng mới mẻ</span>
          </div>
          <div className={cx('content__first')}>
            <div className={cx("content__home")}>
            <div className={cx("content__home-outstanding")}>
                <div className={cx('outstanding__list')}>
                  <div  className={cx('outstanding__item')}>
                    <div className={cx('outstanding__item-heading')}>
                      <span>Giảm giá</span>
                    </div>
                    <div className={cx('outstanding__item-text')}>
                      <span>Đảo Lý Sơn</span>
                      <p>1.500.000 VNĐ</p>
                    </div>
                  </div>
            
                  
                </div>
              </div>
            </div>
            <aside className={cx("aside")}>
            <div className={cx("aside__outstanding")}>
                <div className={cx('outstanding__list')}>
                  <div className={cx('outstanding__item')}>
                    <div className={cx('outstanding__item-heading')}>
                      <span>Giảm giá</span>
                    </div>
                    <div className={cx('outstanding__item-text')}>
                      <span>Đảo Lý Sơn</span>
                      <p>1.500.000 VNĐ</p>
                    </div>
                  </div>
                  <div className={cx('outstanding__item')}>
                    <div className={cx('outstanding__item-heading')}>
                      <span>Giảm giá</span>
                    </div>
                    <div className={cx('outstanding__item-text')}>
                      <span>Đảo Lý Sơn</span>
                      <p>1.500.000 VNĐ</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        <div className={cx("content__list")}>
          <h3 className={cx("content__list-heading")}>Địa danh nổi tiếng</h3>
          <Slider {...settings}>
          <div className={cx('outstanding__item')}>
            <img src="https://imgcdn.tapchicongthuong.vn/tcct-media/20/5/20/daot_ly_son.jpg" alt=""  className={cx('outstanding__item-img')}/>
                  <div className={cx('outstanding__item-text')}>
                    <span className={cx('outstanding__item-name')}>Tham gia bến nhà rồng quận 4, Thành Phố Hồ Chí Minh</span>
                    <p className={cx('outstanding__item-price')}>1.500.000 VNĐ</p>
                  </div>
          </div>

          <div className={cx('outstanding__item')}>
            <img src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/10/tour-featured-img-14.jpg" alt=""  className={cx('outstanding__item-img')}/>
                  <div className={cx('outstanding__item-text')}>
                    <span className={cx('outstanding__item-name')}>Tham gia bến nhà rồng quận 4, Thành Phố Hồ Chí Minh</span>
                    <p className={cx('outstanding__item-price')}>1.500.000 VNĐ</p>
                  </div>
          </div>
          <div className={cx('outstanding__item')}>
            <img src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/10/tour-featured-img-51-1100x650.jpg" alt=""  className={cx('outstanding__item-img')}/>
                  <div className={cx('outstanding__item-text')}>
                    <span className={cx('outstanding__item-name')}>Tham gia bến nhà rồng quận 4, Thành Phố Hồ Chí Minh</span>
                    <p className={cx('outstanding__item-price')}>1.500.000 VNĐ</p>
                  </div>
          </div>
          
          </Slider>
        </div>

        <div className={cx("content__list")}>
          <h3 className={cx("content__list-heading")}>Địa danh nổi tiếng</h3>
          <Slider {...settings}>
          <div className={cx('outstanding__item')}>
            <img src="https://imgcdn.tapchicongthuong.vn/tcct-media/20/5/20/daot_ly_son.jpg" alt=""  className={cx('outstanding__item-img')}/>
                  <div className={cx('outstanding__item-text')}>
                    <span className={cx('outstanding__item-name')}>Tham gia bến nhà rồng quận 4, Thành Phố Hồ Chí Minh</span>
                    <p className={cx('outstanding__item-price')}>1.500.000 VNĐ</p>
                  </div>
          </div>

          <div className={cx('outstanding__item')}>
            <img src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/10/tour-featured-img-14.jpg" alt=""  className={cx('outstanding__item-img')}/>
                  <div className={cx('outstanding__item-text')}>
                    <span className={cx('outstanding__item-name')}>Tham gia bến nhà rồng quận 4, Thành Phố Hồ Chí Minh</span>
                    <p className={cx('outstanding__item-price')}>1.500.000 VNĐ</p>
                  </div>
          </div>
          <div className={cx('outstanding__item')}>
            <img src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/10/tour-featured-img-51-1100x650.jpg" alt=""  className={cx('outstanding__item-img')}/>
                  <div className={cx('outstanding__item-text')}>
                    <span className={cx('outstanding__item-name')}>Tham gia bến nhà rồng quận 4, Thành Phố Hồ Chí Minh</span>
                    <p className={cx('outstanding__item-price')}>1.500.000 VNĐ</p>
                  </div>
          </div>
          
          </Slider>
        </div>

        <div className={cx("content__list")}>
          <h3 className={cx("content__list-heading")}>Địa danh nổi tiếng</h3>
          <Slider {...settings}>
          <div className={cx('outstanding__item')}>
            <img src="https://imgcdn.tapchicongthuong.vn/tcct-media/20/5/20/daot_ly_son.jpg" alt=""  className={cx('outstanding__item-img')}/>
                  <div className={cx('outstanding__item-text')}>
                    <span className={cx('outstanding__item-name')}>Tham gia bến nhà rồng quận 4, Thành Phố Hồ Chí Minh</span>
                    <p className={cx('outstanding__item-price')}>1.500.000 VNĐ</p>
                  </div>
          </div>

          <div className={cx('outstanding__item')}>
            <img src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/10/tour-featured-img-14.jpg" alt=""  className={cx('outstanding__item-img')}/>
                  <div className={cx('outstanding__item-text')}>
                    <span className={cx('outstanding__item-name')}>Tham gia bến nhà rồng quận 4, Thành Phố Hồ Chí Minh</span>
                    <p className={cx('outstanding__item-price')}>1.500.000 VNĐ</p>
                  </div>
          </div>
          <div className={cx('outstanding__item')}>
            <img src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/10/tour-featured-img-51-1100x650.jpg" alt=""  className={cx('outstanding__item-img')}/>
                  <div className={cx('outstanding__item-text')}>
                    <span className={cx('outstanding__item-name')}>Tham gia bến nhà rồng quận 4, Thành Phố Hồ Chí Minh</span>
                    <p className={cx('outstanding__item-price')}>1.500.000 VNĐ</p>
                  </div>
          </div>
          
          </Slider>
        </div>

       



        
        </div>
      </div>
    </div>
  );
}

export default ListTravel;
