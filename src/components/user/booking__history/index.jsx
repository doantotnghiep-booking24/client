import * as React from 'react';
import QRCode from "qrcode.react";
import Barcode from "react-barcode";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import classNames from "classnames/bind";
import styles from "./booking__history.module.scss";
import { useEffect } from "react";
import { GetAllTicket } from "../../../services/getTicketsHistory";
import { Tickets_History, Ticket_Modal } from "../../../redux/features/TicketSlice";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
const cx = classNames.bind(styles);
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius : '10px',
  p: 4,
};
function BookingHistory() {
  const { Ticket_Filter, Data_TicketModal } = useSelector((state) => state.ticket)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const qrValue = "http://localhost:5173/booking-history";
  const barcodeValue = "88888888";

  useEffect(() => {
    const handleCallTickets = async () => {
      const res = await GetAllTicket()
      
      dispatch(Tickets_History(res.data.Tickets))
    }
    handleCallTickets()
  }, [])
  // console.log(Ticket_Filter);
  
  const handleOpenticket = (ticket) => {
    setOpen(!open)
    dispatch(Ticket_Modal(ticket))

  }
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
            {Ticket_Filter && Ticket_Filter.map((ticket_history, index) => (
              <div  key={index} onClick={() => handleOpenticket(ticket_history)}  style={open ? {opacity : '0.3'} : {display: 'flex', alignItems: 'center', cursor: 'pointer'}} className="booking__history-main__item">
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
                        {/* <div className={cx("ticket__location-live")}>
                          <span>Tên chuyến đi: </span>
                          <p>{ticket_history.Title_Tour}</p>
                        </div> */}
                      </div>
                      <div className={cx("ticket__time")}>
                        <div className={cx("ticket__time-date")}>
                          <span>Ngày đặt vé: </span>
                          <p>{ticket_history.Created_at_Booking?.slice(0, 10)}</p>
                        </div>
                        <div className={cx("ticket__time-date-departure ")}>
                          <span>Ngày khởi hành: </span>
                          <p>{ticket_history.Departure_Date.slice(0, 10)}</p>
                          <div className={cx("ticket__time-departure ")}>
                            <span>Giờ khởi hành: </span>
                            <p>{ticket_history.Departure_Time}</p>
                          </div>
                        </div>
                        {/* <div className={cx("ticket__time-departure ")}>
                            <span>Trạng thái thanh toán: </span>
                            <p>{ticket_history.Status_Payment}</p>
                          </div> */}
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
                {/* <div style={{ marginLeft: '40px' }} className={cx("booking__history-cancel")}>
                  <Button
                    onClick={handleCancelClick}
                    variant="outlined"
                    color="error"
                    style={{ marginTop: "20px" }}
                  >
                    Hủy vé
                  </Button>
                </div> */}
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <Modal
          keepMounted
          open={open}
          onClose={() => setOpen(!open)}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
              <div  style={{  }} className="booking__history-main__item">
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
                          <p>{Data_TicketModal.Departure_Location}</p>
                        </div>
                        <div className={cx("ticket__location-from")}>
                          <span>Địa điểm đến: </span>
                          <p>{Data_TicketModal.Destination}</p>
                        </div>
                        <div className={cx("ticket__location-live")}>
                          <span>Thời gian: </span>
                          <p>{Data_TicketModal.Total_DateTrip}</p>
                        </div>
                        {/* <div className={cx("ticket__location-live")}>
                          <span>Tên chuyến đi: </span>
                          <p>{Data_TicketModal.Title_Tour}</p>
                        </div> */}
                      </div>
                      <div className={cx("ticket__time")}>
                        <div className={cx("ticket__time-date")}>
                          <span>Ngày đặt vé: </span>
                          <p>{Data_TicketModal.Created_at_Booking}</p>
                        </div>
                        <div className={cx("ticket__time-date-departure ")}>
                          <span>Ngày khởi hành: </span>
                          <p>{Data_TicketModal.Departure_Date}</p>
                          <div className={cx("ticket__time-departure ")}>
                            <span>Giờ khởi hành: </span>
                            <p>{Data_TicketModal.Departure_Time}</p>
                          </div>
                        </div>
                        {/* <div className={cx("ticket__time-departure ")}>
                            <span>Trạng thái thanh toán: </span>
                            <p>{ticket_history.Status_Payment}</p>
                          </div> */}
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
                <div style={{ marginLeft: '40px' }} className={cx("booking__history-cancel")}>
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
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default BookingHistory;
