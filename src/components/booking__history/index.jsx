import QRCode from "qrcode.react";
import Barcode from "react-barcode";

import classNames from "classnames/bind";
import styles from "./booking__history.module.scss";

const cx = classNames.bind(styles);

function BookingHistory() {
  const qrValue = "https://example.com";
  const barcodeValue = "88888888";
  return (
    <div className={cx("wrap", "container")}>
      <div className={cx("booking__history")}>
        <h1>Lịch sử đặt vé</h1>
        <ul className={cx("booking__history-list")}>
          <li className={cx("booking__history-item")}>
            <div className={cx("ticket")}>
              <div className={cx("ticket__content")}>
              <div className={cx("ticket__barcode")}>
                <Barcode
                  value={barcodeValue}
                  width={1.7}
                  height={40}
                  format="CODE128"
                  displayValue={false}
                />
              </div>
                <div className={cx("ticket__location")}>
                  <div className={cx("ticket__location-to")}>
                    <span>Địa điểm đi: </span>
                    <span>Thành phố Hà Nội</span>
                  </div>
                  <div className={cx("ticket__location-from")}>
                    <span>Địa điểm đến: </span>
                    <span>Lý Sơn, Quảng Ngãi</span>
                  </div>
                  <div className={cx("ticket__location-live")}>
                    <span>Thời gian: </span>
                    <span>2 ngày 3 đêm</span>
                  </div>
                </div>
                <div className={cx("ticket__time")}>
                  <div className={cx("ticket__time-date")}>
                    <span>Ngày đặt vé: </span>
                    <span>28 - 08 - 2024</span>
                  </div>
                  <div className={cx("ticket__time-departure ")}>
                    <span>Giờ khởi hành: </span>
                    <span>7h30</span>
                  </div>
                  <div className={cx("ticket__time-date-departure ")}>
                    <span>Ngày khởi hành: </span>
                    <span>28 - 08 - 2024</span>
                  </div>
                </div>
              </div>
              <div className={cx("ticket__qrcode")}>
                <QRCode
                  value={qrValue}
                  size={128}
                  level="H"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BookingHistory;
