import QRCode from "qrcode.react";
import Barcode from "react-barcode";

import { Button } from "@mui/material";

import Swal from "sweetalert2";
import classNames from "classnames/bind";
import styles from "./booking__history.module.scss";
import { useEffect } from "react";
import { GetAllTicket } from "../../../services/getTicketsHistory";
import { Tickets_History } from "../../../redux/features/TicketSlice";
import { useDispatch, useSelector } from "react-redux";
const cx = classNames.bind(styles);
function BookingHistory() {
  const { Ticket_Filter } = useSelector((state) => state.ticket)
  const dispatch = useDispatch()
  const qrValue = "https://example.com";
  const barcodeValue = "88888888";

  useEffect(() => {
    const handleCallTickets = async () => {
      const res = await GetAllTicket()
      dispatch(Tickets_History(res.data.Tickets))
    }
    handleCallTickets()
  }, [])
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
        <div className={cx("container")}>
          <h1>Lịch sử đặt vé</h1>
          <ul className={cx("booking__history-list")}>
            {Ticket_Filter && Ticket_Filter.map(ticket_history => (
              <div style={{display : 'flex', alignItems : 'center'}} className="booking__history-main__item">
                <li className={cx("booking__history-item")}>
                  <div className={cx("booking__history-top")}>
                    <h4>Booking Travel</h4>
                  </div>
                  <div className={cx("ticket")}>
                    <div className={cx("ticket__barcode")}>
                      <Barcode
                        className={cx("ticket__barcode-main")}
                        value={barcodeValue}
                        width={2}
                        height={40}
                        format="CODE128"
                        displayValue={false}
                      />
                    </div>
                    <div className={cx("ticket__content")}>
                      <div className={cx("ticket__location")}>
                        <div className={cx("ticket__location-to")}>
                          <span>Địa điểm đi: </span>
                          <p>{ticket_history.Departure_Location}</p>
                        </div>
                        <div className={cx("ticket__location-from")}>
                          <span>Địa điểm đến: </span>
                          <p>{ticket_history.Destination}</p>
                        </div>
                        <div className={cx("ticket__location-live")}>
                          <span>Thời gian: </span>
                          <p>{ticket_history.Total_DateTrip}</p>
                        </div>
                        <div className={cx("ticket__location-live")}>
                          <span>Tên chuyến đi: </span>
                          <p>{ticket_history.Title_Tour}</p>
                        </div>
                      </div>
                      <div className={cx("ticket__time")}>
                        <div className={cx("ticket__time-date")}>
                          <span>Ngày đặt vé: </span>
                          <p>{ticket_history.Created_at_Booking.slice(0,10)}</p>
                        </div>
                        <div className={cx("ticket__time-date-departure ")}>
                          <span>Ngày khởi hành: </span>
                          <p>{ticket_history.Departure_Date.slice(0,10)}</p>
                          <div className={cx("ticket__time-departure ")}>
                            <span>Giờ khởi hành: </span>
                            <p>{ticket_history.Departure_Time}</p>
                          </div>
                        </div>
                        <div className={cx("ticket__time-departure ")}>
                            <span>Trạng thái thanh toán: </span>
                            <p>{ticket_history.Status_Payment}</p>
                          </div>
                      </div>
                    </div>
                    <div className={cx("ticket__qrcode")}>
                      <QRCode
                        className={cx("ticket__qrcode-main")}
                        value={qrValue}
                        size={150}
                        level="H"
                      />
                    </div>
                  </div>
                  <div className={cx("booking__history-bottom")}></div>
                </li>
                <div style={{marginLeft : '40px'}} className={cx("booking__history-cancel")}>
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
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BookingHistory;
