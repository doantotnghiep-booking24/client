import { Button } from "@mui/material";

import classNames from "classnames/bind";
import styles from "./booking.module.scss";

const cx = classNames.bind(styles);

function Booking() {
  return (
    <div className={cx("wrap", "container")}>
      <div className={cx("booking__container")}>
        <h1>Thông tin đặt vé</h1>
        <form className={cx("booking__form")}>
          <div className={cx("info")}>
            <div className={cx("info__heading")}>
              <div className={cx("info__heading-name")}>
                Tên tour:
                <span>Hồ Chí Minh - Quảng Ngãi</span>
              </div>
              <div className={cx("info__heading-departure")}>
                Điểm đi:
                <span>Hồ Chí Minh </span>
              </div>
              <div className={cx("info__heading-destination")}>
                Điểm đến:
                <span>Quảng Ngãi</span>
              </div>
            </div>
            <div className={cx("info__sub")}>
              <div className={cx("info__sub-transport")}>
                Phương tiện di chuyển:
                <span>Máy bay, xe du lịch </span>
              </div>
              <div className={cx("info__sub-time")}>
                Thời gian:
                <span>2 ngày 3 đêm</span>
              </div>
              <div className={cx("info__sub-departure-time")}>
                Giờ khởi hành:
                <span>08h30p</span>
              </div>
              <div className={cx("info__sub-departure-day")}>
                Ngày khởi hành:
                <span>28-8-2024</span>
              </div>
            </div>
          </div>
          <div className={cx("information")}>
            <div className={cx("booking__form-adult")}>
              <span>Thông tin người lớn: 1</span>
            </div>

            <div className={cx("information-adult")}>
              <div className={cx("information-adult-hed")}>
                <div className={cx("information-adult__name")}>
                  Họ và tên:
                  <input type="text" placeholder="Họ và tên" />
                </div>
                <div className={cx("information-adult__birth")}>
                  Ngày sinh:
                  <input type="date" />
                </div>
                <div className={cx("information-adult__sect")}>
                  Phái:
                  <select>
                    <option value="">Nam</option>
                    <option value="">Nữ</option>
                  </select>
                </div>
              </div>
              <div className={cx("information-adult-sub")}>
                <div className={cx("information-adult__phone")}>
                  Số điện thoại:
                  <input type="text" placeholder="Số điện thoại" />
                </div>
                <div className={cx("information-adult__cccd")}>
                  Căn cước:
                  <input type="text" placeholder="CCCD" />
                </div>
              </div>
            </div>

            <div className={cx("booking__form-children")}>
              <span>Thông tin trẻ em: 1</span>
            </div>
            <div className={cx("information-children")}>
              <div className={cx("information-children__name")}>
                Họ và tên:
                <input type="text" placeholder="Họ và tên" />
              </div>
              <div className={cx("information-children__birth")}>
                Ngày sinh:
                <input type="date" />
              </div>
              <div className={cx("information-children__sect")}>
                Phái:
                <select>
                  <option value="">Nam</option>
                  <option value="">Nữ</option>
                </select>
              </div>
            </div>
          </div>
          <div className={cx("pay")}>
            <h4 className={cx("pay__heading")}>Xác nhận thanh toán</h4>
            <div className={cx("pay__sub")}>
              <div className={cx("pay__sub-adult")}>
                Người lớn:
                <span>2</span>
              </div>
              <div className={cx("pay__sub-children")}>
                Trẻ en:
                <span>1</span>
              </div>
              <div className={cx("pay__sub-total")}>
                Tạm tính:
                <span>8.000.000 đ</span>
              </div>
              <div className={cx("pay__sub-discount")}>
                Ưu đãi:
                <span>0 đ</span>
              </div>
              <div className={cx("pay__sub-total-pay")}>
                Tổng tiền thanh toán:
                <span>80.000.000 đ</span>
              </div>
              <div className={cx("pay__sub-code")}>
                Nhập mã:
                <input type="text" placeholder="Nhập mã giảm giá" />
              </div>
            </div>
            <div className={cx("pay__sub-payment")}>
              <h5>Phương thức thanh toán</h5>
              <Button
                variant="outlined"
                type="button"
                sx={{
                  borderColor: "#3fd0d4",
                  color: "#3fd0d4",
                  "&:hover": {
                    borderColor: "#3fd0d4",
                    color: "#3fd0d4",
                  },
                }}
                className={cx("btn")}
              >
                Thanh toán trực tuyến
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Booking;
