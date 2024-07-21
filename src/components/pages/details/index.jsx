import LogoutIcon from "@mui/icons-material/Logout";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { TextField, Button } from "@mui/material";

import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import classNames from "classnames/bind";
import styles from "./details.module.scss";

const cx = classNames.bind(styles);

function Details() {
  return (
    <div className={cx("wrap")}>
      <div className={cx("banner")}>
        <img
          src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/09/blog-title-img-2.jpg"
          alt=""
          className={cx("banner__img")}
        />
        <h2 className={cx("banner__title")}>Chi Tiết</h2>
      </div>
      <div className={cx("content")}>
        <div className={cx("content__main")}>
          <div className={cx("content__home")}>
            <img
              src="https://imgcdn.tapchicongthuong.vn/tcct-media/20/5/20/daot_ly_son.jpg"
              alt=""
              className={cx("content__home-img")}
            />
            <div className={cx("content__home-text")}>
              <h1 className={cx("content__home-name")}>Lý Sơn</h1>
              <div className={cx("content__home-title")}>
                <p className={cx("content__home-heading")}>
                  Đảo Lý Sơn hay còn gọi là Cù Lao Ré. Đây là huyện đảo thuộc
                  địa phận tỉnh Quảng Ngãi, cách đất liền 15 hải lý theo hướng
                  Đông Bắc.
                </p>
                <span className={cx("content__home-desc")}>
                  Phương tiện để đi du lịch Lý Sơn tự túc là tàu biển. Trước đó
                  bạn cần đặt vé máy bay đi Chu Lai để đến Quảng Ngãi, sau đó di
                  chuyển tới cảng Sa Kỳ và mua vé tàu ra đảo. Vé máy bay đi Chu
                  Lai có giá rất rẻ, chỉ dao động trong khoảng 59.000đ -
                  159.000đ (giá vé chưa bao gồm thuế phí), tùy vào nơi bạn khởi
                  hành từ Hà Nội hay Tp.Hồ Chí Minh, thời gian bay trong khoảng
                  1h20p.
                </span>
                <div className={cx("content__home-sub-heading")}>
                  Tàu biển từ cảng Sa Kỳ ra đảo Lý Sơn có giá 150.000đ -
                  200.000đ/lượt tùy vào loại tàu thường hay tàu cao tốc, thời
                  gian di chuyển sẽ mất 2 tiếng. Bạn có thể đặt mua vé tàu
                  online hoặc mua vé tại cảng đều được.
                </div>
                <span className={cx("content__home-sub-desc")}>
                  Phương tiện di chuyển chủ yếu khi đi du lịch Lý Sơn tự túc là
                  xe máy, có rất nhiều điểm thuê xe máy trên đảo với mức giá từ
                  120.000đ - 200.000đ/ngày/xe. Bên cạnh đó, đa phần các khách
                  sạn trên đảo đều có dịch vụ cho thuê xe nên bạn cũng có thể
                  thuê luôn ở khách sạn mình đặt mà không cần để lại CMND hay
                  cọc tiền thuê. Di chuyển giữa các đảo Lớn, đảo Bé và hòn Mù Cu
                  thì sẽ đi bằng tàu cao tốc với giá khoảng 35.000đ/lượt.
                </span>
              </div>
              <div className={cx("content__home-image")}>
                <img
                  src="https://image.baophapluat.vn/1200x630/Uploaded/2024/ycivoviu/2023_11_30/dao-ls-4996.jpg"
                  alt=""
                />
                <img
                  src="https://owa.bestprice.vn/images/articles/uploads/review-lich-trinh-du-lich-ly-son-tu-tuc-4-ngay-3-dem-cuc-chi-tiet-5fed4ed4986df.jpg"
                  alt=""
                  className={cx("content__home-image-w")}
                />
              </div>
              <p className={cx("content__home-desc")}>
                Ngoài ra, mình sẽ gợi ý thêm cho các bạn một số địa chỉ lưu trú
                tại đảo như Mường Thanh Holiday Lý Sơn với giá từ
                1.400.000đ/đêm, khách sạn Biển Ngọc Lý Sơn có giá từ
                300.000đ/đêm, Hoàng Sa Resort giá từ 400.000đ/đêm,... đều là
                những khách sạn được rất nhiều khách du lịch Lý Sơn tự túc yêu
                thích.
              </p>
            </div>

            <div className={cx("content__home-comment")}>
              <h2 className={cx("content__home-comment-title")}>Bình Luận</h2>
              <ul className={cx("content__home-comment-list")}>
                <li className={cx("content__home-comment-item")}>
                  <img
                    src="https://randomuser.me/api/portraits/women/60.jpg"
                    alt=""
                    className={cx("content__home-comment-img")}
                  />
                  <div className={cx("content__home-comment-content")}>
                    <p className={cx("content__home-comment-name")}>John Doe</p>
                    <p className={cx("content__home-comment-text")}>
                      Trời ơi quá đẹp , tôi muốn trải nghiệm thêm nhiều lần nữa
                    </p>
                    <span className={cx("content__home-comment-date")}>
                      12/12/2022, 2024, 8:09 giờ
                    </span>
                  </div>
                </li>
                <li className={cx("content__home-comment-item")}>
                  <img
                    src="https://randomuser.me/api/portraits/women/60.jpg"
                    alt=""
                    className={cx("content__home-comment-img")}
                  />
                  <div className={cx("content__home-comment-content")}>
                    <p className={cx("content__home-comment-name")}>John Doe</p>
                    <p className={cx("content__home-comment-text")}>
                      Trời ơi quá đẹp , tôi muốn trải nghiệm thêm nhiều lần nữa
                    </p>
                    <span className={cx("content__home-comment-date")}>
                      12/12/2022, 2024, 8:09 giờ
                    </span>
                  </div>
                </li>
              </ul>
              <form className={cx('content__home-comment-form')}>
              <TextField fullWidth id="standard-basic" label="Bình luận" variant="standard" />
                <Button className={cx('btn')} variant="contained" color="primary" size="small" type="submit">
                  Gửi
                </Button>
              </form>
            </div>
          </div>
          <aside className={cx("aside")}>
            <div className={cx("aside__account")}>
              <img
                src="https://apps.odoo.com/web/image/loempia.module/31305/icon_image?unique=4696166"
                alt=""
                className={cx("account__img")}
              />
              <h3 className={cx("account__name")}>Van Luong</h3>
              <LogoutIcon className={cx("account__icon")}/>
            </div>
            <div className={cx("aside__date")}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker />
              </LocalizationProvider>
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
                  <a href="#" className={cx("aside__item-text-name")}>
                    Cảm nhận của khách hàng
                  </a>
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
                  <a href="#" className={cx("aside__item-text-name")}>
                    Cảm nhận của khách hàng
                  </a>
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
                  <a href="#" className={cx("aside__item-text-name")}>
                    Cảm nhận của khách hàng
                  </a>
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
                  <a href="#" className={cx("aside__item-text-name")}>
                    Cảm nhận của khách hàng
                  </a>
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
  );
}

export default Details;
