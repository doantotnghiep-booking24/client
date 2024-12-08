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
import { Update_StatusCancelTicketsByClient } from '../../../services/RequestCancleTicket';
const cx = classNames.bind(styles);
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '10px',
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
  const handleCancelClick = (id_Ticket) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn hủy vé không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Có, hủy vé!",
      cancelButtonText: "Không, giữ lại",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(id_Ticket);

        const res = await Update_StatusCancelTicketsByClient(id_Ticket)
        console.log(res);

        Swal.fire("Đã gửi yêu cầu hủy vé!", "Vui lòng chờ trong lúc xác nhận", "success");
      }
    });
  };
  return (
    <div className={cx("wrap", "container")}>
      <div className={cx("booking__history")}>
        <div className={cx("container")}>
          <h1>Lịch sử đặt vé</h1>
          <ul className={cx("booking__history-list")}>
            {Ticket_Filter && Ticket_Filter.filter(ticket_history => ticket_history.Status !== 'Đã Hoàn Thành' || ticket_history.Status === 'Đã Hủy').map((ticket_history, index) => (
              <div key={index} className="booking__history-main__item">
                <li className={cx("booking__history-item")}>
                  <div className={cx("booking__history-top")}>
                    <div className={cx("status__booking")} style={{ display: 'flex', justifyContent: 'space-around' }}>
                      <div style={{ display: 'flex' }}>
                        <div className={cx("status__child")} style={ticket_history.Status_Payment === 'Chưa Thanh Toán' ? { background: '#1E90FF', } : { background: '#F5F5F5', }}>
                          <span style={ticket_history.Status_Payment === 'Chưa Thanh Toán' ? { color: 'white' } : { color: 'black' }}>1</span>
                        </div>
                        <span style={{ lineHeight: '30px', marginLeft: '10px' }}>Đặt vé</span>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <div className={cx("status__child")} style={ticket_history.Status_Payment === 'Đã Thanh Toán' && ticket_history.Status === 'Tiếp nhận' ? { background: '#1E90FF', } : { background: '#F5F5F5', }}>
                          <span style={ticket_history.Status_Payment === 'Đã Thanh Toán' && ticket_history.Status === 'Tiếp nhận' ? { color: 'white' } : { color: 'black' }}>2</span>
                        </div>
                        <span style={{ lineHeight: '30px', marginLeft: '10px' }}>Thanh toán</span>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <div className={cx("status__child")} style={ticket_history.Status_Payment === 'Đã Thanh Toán' && ticket_history.Status === 'Đã Xác Nhận' ? { background: '#1E90FF', } : { background: '#F5F5F5', }}>
                          <span style={ticket_history.Status_Payment === 'Đã Thanh Toán' && ticket_history.Status === 'Đã Xác Nhận' ? { color: 'white' } : { color: 'black' }}>3</span>
                        </div>
                        <span style={{ lineHeight: '30px', marginLeft: '10px' }}>Xác nhận</span>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <div className={cx("status__child")} style={ticket_history.Status_Payment === 'Đã Thanh Toán' && ticket_history.Status === 'Đã Hoàn Thành' ? { background: '#1E90FF', } : { background: '#F5F5F5', }}>
                          <span style={ticket_history.Status_Payment === 'Đã Thanh Toán' && ticket_history.Status === 'Đã Hoàn Thành' ? { color: 'white' } : { color: 'black' }}>4</span>
                        </div>
                        <span style={{ lineHeight: '30px', marginLeft: '10px' }}>Hoàn thành</span>
                      </div>
                    </div>
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
                          <span>Địa điểm đi : </span>
                          <p>{ticket_history.Departure_Location}</p>
                        </div>
                        <div className={cx("ticket__location-from")}>
                          <span>Địa điểm đến : </span>
                          <p>{ticket_history.Destination}</p>
                        </div>
                        <div className={cx("ticket__location-live")}>
                          <span>Thời gian : </span>
                          <p>{ticket_history.Total_DateTrip}</p>
                        </div>
                        {/* <div className={cx("ticket__location-live")}>
                        <span>Giá vé : </span>
                        <p>{ticket_history.Total_price.toLocaleString("vi-VN")} đ</p>
                      </div> */}
                      </div>
                      <div className={cx("ticket__time")}>
                        <div className={cx("ticket__time-date")}>
                          <span>Ngày đặt vé : </span>
                          <p>{ticket_history.Created_at_Booking?.slice(0, 10)}</p>
                        </div>
                        <div className={cx("ticket__time-date-departure ")}>
                          <span>Ngày khởi hành : </span>
                          <p>{ticket_history.Departure_Date.slice(0, 10)}</p>
                          <div className={cx("ticket__time-departure ")}>
                            <span>Giờ khởi hành : </span>
                            <p>{ticket_history.Departure_Time}</p>
                          </div>
                        </div>
                        {/* <div className={cx("ticket__time-departure ")}>
                        <span>Trạng thái thanh toán : </span>
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
                  {/* <button>Hủy vé</button> */}
                  <div className={cx("booking__history-bottom")}></div>
                </li>

                <div style={{ marginLeft: '' }} className={cx("booking__history-cancel")}>
                  {ticket_history.Status_Payment === 'Chưa Thanh Toán' ? <Button
                    href={`/booked/${ticket_history._id}`}
                    variant="outlined"
                    color="error"
                    style={{ marginTop: "20px" }}
                  >
                    Tiến hành thanh toán
                  </Button> : ticket_history.Status === 'Đã Hoàn Thành' ? '' : <Button
                    onClick={() => handleCancelClick(ticket_history._id)}
                    variant="outlined"
                    color="error"
                    style={{ marginTop: "20px" }}
                  >
                    Hủy vé
                  </Button>}

                </div>
              </div>
            ))}
          </ul>
        </div>
      </div >
    </div >
  );
}

export default BookingHistory;
