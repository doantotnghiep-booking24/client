import styles from "./tours.module.scss";
import classNames from "classnames/bind";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import Rating from "@mui/material/Rating";

import { Button } from "@mui/material";
const cx = classNames.bind(styles);

function Tour() {
  return (
    <div className={cx("wrap")}>
      <div className={cx("banner")}>
        <img
          src="	https://setsail.qodeinteractive.com/wp-content/uploads/2018/09/tour-list-title-img.jpg"
          alt=""
          className={cx("banner__img")}
        />
        <h2 className={cx("banner__title")}>Chuyến đi</h2>
      </div>
      <div className={cx("container")}>
        <div className={cx("content")}>
          <div className={cx("content__main")}>
            <div className={cx("aside")}>
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
                  <Rating name="size-medium" defaultValue={0} max={5} /> <br />
                  <Rating name="size-medium" defaultValue={0} max={4} /> <br />
                  <Rating name="size-medium" defaultValue={0} max={3} /> <br />
                  <Rating name="size-medium" defaultValue={0} max={2} /> <br />
                  <Rating name="size-medium" defaultValue={0} max={1} />
                </div>
              </div>
            </div>
            <div className={cx("content__home")}>
              <div className={cx("category")}></div>
              <ul className={cx("content__home-list")}>
                <li className={cx("content__home-item")}>
                  <img
                  className={cx("content__home-img")}
                    src="https://cf.bstatic.com/xdata/images/hotel/square600/560052722.webp?k=05fccc029f8bdb31835fe78676c123258a22b042b0260a45f4cce2adcf2bad76&o="
                    alt=""
                  />
                  <div className={cx("section")}>
                    <div className={cx("section__heading")}>
                      <h5 className={cx("section__heading-title")}>
                        Thành Phố Quảng Ngãi
                      </h5>
                      <div className={cx("section__heading-good")}>Tốt</div>
                    </div>
                    <Rating name="size-small" defaultValue={5} size="small" />
                    <p className={cx("section-content")}>
                      Bãi biển lý sơn, Quảng Ngãi
                    </p>
                    <span className={cx("endow")}>Ưu Đãi Mùa Du Lịch</span>
                    <div className={cx("bottom")}>
                    <div>
                    <p className={cx("outstanding")}>Tour du lịch nổi bật nhất</p>
                    </div>
                    <div className={cx("action")}>
                      <span className={cx("action__price-discount")}>
                        920000 VND
                      </span>
                      <h4 className={cx("action__price")}>250000 VND</h4>
                      <Button
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

                <li className={cx("content__home-item")}>
                  <img
                  className={cx("content__home-img")}
                    src="https://cf.bstatic.com/xdata/images/hotel/square600/560052722.webp?k=05fccc029f8bdb31835fe78676c123258a22b042b0260a45f4cce2adcf2bad76&o="
                    alt=""
                  />
                  <div className={cx("section")}>
                    <div className={cx("section__heading")}>
                      <h5 className={cx("section__heading-title")}>
                        Thành Phố Quảng Ngãi
                      </h5>
                      <div className={cx("section__heading-good")}>Tốt</div>
                    </div>
                    <Rating name="size-small" defaultValue={5} size="small" />
                    <p className={cx("section-content")}>
                      Bãi biển lý sơn, Quảng Ngãi
                    </p>
                    <span className={cx("endow")}>Ưu Đãi Mùa Du Lịch</span>
                    <div className={cx("bottom")}>
                    <div>
                    <p className={cx("outstanding")}>Tour du lịch nổi bật nhất</p>
                    </div>
                    <div className={cx("action")}>
                      <span className={cx("action__price-discount")}>
                        920000 VND
                      </span>
                      <h4 className={cx("action__price")}>250000 VND</h4>
                      <Button
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

                <li className={cx("content__home-item")}>
                  <img
                  className={cx("content__home-img")}
                    src="https://cf.bstatic.com/xdata/images/hotel/square600/560052722.webp?k=05fccc029f8bdb31835fe78676c123258a22b042b0260a45f4cce2adcf2bad76&o="
                    alt=""
                  />
                  <div className={cx("section")}>
                    <div className={cx("section__heading")}>
                      <h5 className={cx("section__heading-title")}>
                        Thành Phố Quảng Ngãi
                      </h5>
                      <div className={cx("section__heading-good")}>Tốt</div>
                    </div>
                    <Rating name="size-small" defaultValue={5} size="small" />
                    <p className={cx("section-content")}>
                      Bãi biển lý sơn, Quảng Ngãi
                    </p>
                    <span className={cx("endow")}>Ưu Đãi Mùa Du Lịch</span>
                    <div className={cx("bottom")}>
                    <div>
                    <p className={cx("outstanding")}>Tour du lịch nổi bật nhất</p>
                    </div>
                    <div className={cx("action")}>
                      <span className={cx("action__price-discount")}>
                        920000 VND
                      </span>
                      <h4 className={cx("action__price")}>250000 VND</h4>
                      <Button
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
        
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tour;
