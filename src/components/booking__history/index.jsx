import QRCode from "qrcode.react";
import Barcode from "react-barcode";

import { Button } from "@mui/material";

import Swal from "sweetalert2";

import classNames from "classnames/bind";
import styles from "./booking__history.module.scss";

const cx = classNames.bind(styles);

function BookingHistory() {
  const qrValue = "https://example.com";
  const barcodeValue = "88888888";

  const handleCancelClick = () => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn hủy vé không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Có, hủy vé!",
      cancelButtonText: "Không, giữ lại",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Vé đã được hủy");
        Swal.fire("Đã hủy!", "Vé của bạn đã được hủy.", "success");
      }
    });
  };
  return (
    <div className={cx("wrap", "container")}>
      <div className={cx("booking__history")}>
        <h1>Lịch sử đặt vé</h1>
        <ul className={cx("booking__history-list")}>
          <div className="booking__history-main__item">
            <li className={cx("booking__history-item")}>
              <div className={cx("booking__history-top")}>
                <h4>Booking Travel</h4>
              </div>
              <div className={cx("ticket")}>
                <div className={cx("ticket__content")}>
                  <div className={cx("ticket__barcode")}>
                    <Barcode
                      value={barcodeValue}
                      width={2}
                      height={40}
                      format="CODE128"
                      displayValue={false}
                    />
                  </div>
                  <div className={cx("ticket__location")}>
                    <div className={cx("ticket__location-to")}>
                      <span>Địa điểm đi: </span>
                      <p>Thành phố Hà Nội</p>
                    </div>
                    <div className={cx("ticket__location-from")}>
                      <span>Địa điểm đến: </span>
                      <p>Lý Sơn, Quảng Ngãi</p>
                    </div>
                    <div className={cx("ticket__location-live")}>
                      <span>Thời gian: </span>
                      <p>2 ngày 3 đêm</p>
                    </div>
                  </div>
                  <div className={cx("ticket__time")}>
                    <div className={cx("ticket__time-date")}>
                      <span>Ngày đặt vé: </span>
                      <p>28 - 08 - 2024</p>
                    </div>
                    <div className={cx("ticket__time-date-departure ")}>
                      <span>Ngày khởi hành: </span>
                      <p>28 - 08 - 2024</p>
                      <div className={cx("ticket__time-departure ")}>
                        <span>Giờ khởi hành: </span>
                        <p>7h30</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx("ticket__qrcode")}>
                  <QRCode value={qrValue} size={150} level="H" />
                </div>
              </div>
              <div className={cx("booking__history-bottom")}></div>
            </li>
            <div className={cx("booking__history-cancel")}>
              <Button
                onClick={handleCancelClick}
                variant="outlined"
                color="error"
                style={{ marginTop: "20px" }}
              >
                Hủy vé
              </Button>
            </div>
          </div>
          <div className="booking__history-main__item">
            <li className={cx("booking__history-item")}>
              <div className={cx("booking__history-top")}>
                <h4>Booking Travel</h4>
              </div>
              <div className={cx("ticket")}>
                <div className={cx("ticket__content")}>
                  <div className={cx("ticket__barcode")}>
                    <Barcode
                      value={barcodeValue}
                      width={2}
                      height={40}
                      format="CODE128"
                      displayValue={false}
                    />
                  </div>
                  <div className={cx("ticket__location")}>
                    <div className={cx("ticket__location-to")}>
                      <span>Địa điểm đi: </span>
                      <p>Thành phố Hà Nội</p>
                    </div>
                    <div className={cx("ticket__location-from")}>
                      <span>Địa điểm đến: </span>
                      <p>Lý Sơn, Quảng Ngãi</p>
                    </div>
                    <div className={cx("ticket__location-live")}>
                      <span>Thời gian: </span>
                      <p>2 ngày 3 đêm</p>
                    </div>
                  </div>
                  <div className={cx("ticket__time")}>
                    <div className={cx("ticket__time-date")}>
                      <span>Ngày đặt vé: </span>
                      <p>28 - 08 - 2024</p>
                    </div>
                    <div className={cx("ticket__time-date-departure ")}>
                      <span>Ngày khởi hành: </span>
                      <p>28 - 08 - 2024</p>
                      <div className={cx("ticket__time-departure ")}>
                        <span>Giờ khởi hành: </span>
                        <p>7h30</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx("ticket__qrcode")}>
                  <QRCode value={qrValue} size={150} level="H" />
                </div>
              </div>
              <div className={cx("booking__history-bottom")}></div>
            </li>
            <div className={cx("booking__history-cancel")}>
              <Button
                onClick={handleCancelClick}
                variant="outlined"
                color="error"
                style={{ marginTop: "20px" }}
              >
                Hủy vé
              </Button>
            </div>
          </div>
          <div className="booking__history-main__item">
            <li className={cx("booking__history-item")}>
              <div className={cx("booking__history-top")}>
                <h4>Booking Travel</h4>
              </div>
              <div className={cx("ticket")}>
                <div className={cx("ticket__content")}>
                  <div className={cx("ticket__barcode")}>
                    <Barcode
                      value={barcodeValue}
                      width={2}
                      height={40}
                      format="CODE128"
                      displayValue={false}
                    />
                  </div>
                  <div className={cx("ticket__location")}>
                    <div className={cx("ticket__location-to")}>
                      <span>Địa điểm đi: </span>
                      <p>Thành phố Hà Nội</p>
                    </div>
                    <div className={cx("ticket__location-from")}>
                      <span>Địa điểm đến: </span>
                      <p>Lý Sơn, Quảng Ngãi</p>
                    </div>
                    <div className={cx("ticket__location-live")}>
                      <span>Thời gian: </span>
                      <p>2 ngày 3 đêm</p>
                    </div>
                  </div>
                  <div className={cx("ticket__time")}>
                    <div className={cx("ticket__time-date")}>
                      <span>Ngày đặt vé: </span>
                      <p>28 - 08 - 2024</p>
                    </div>
                    <div className={cx("ticket__time-date-departure ")}>
                      <span>Ngày khởi hành: </span>
                      <p>28 - 08 - 2024</p>
                      <div className={cx("ticket__time-departure ")}>
                        <span>Giờ khởi hành: </span>
                        <p>7h30</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx("ticket__qrcode")}>
                  <QRCode value={qrValue} size={150} level="H" />
                </div>
              </div>
              <div className={cx("booking__history-bottom")}></div>
            </li>
            <div className={cx("booking__history-cancel")}>
              <Button
                onClick={handleCancelClick}
                variant="outlined"
                color="error"
                style={{ marginTop: "20px" }}
              >
                Hủy vé
              </Button>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default BookingHistory;
