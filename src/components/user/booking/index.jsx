import { Button, MenuItem, Select } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./booking.module.scss";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServicesData } from "../../../redux/features/serviceSlice";
import { getTicket } from "../../../services/getTicket";
import { Ticket } from "../../../redux/features/TicketSlice";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CreateUrlZalopay } from "../../../services/CreateUrlZalopay";
import { CreateUrlVnpay } from "../../../services/CreateUrlVnpay";
import { CreatePayment_Direct } from "../../../services/CreatePayment_Direct";
import Swal from "sweetalert2";
const cx = classNames.bind(styles);

function Booking() {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.services);
  const { Data_ticket } = useSelector((state) => state.ticket)
  const [paymentMethod, setPaymentMethod] = useState("");
  const [value_CusNearest, setvalue_CusNearest] = useState('')
  const [getFormValue, setGetFormValue] = useState({
    Name_Custommer: '',
    Date_Of_Birth: '',
    Sex_Custommer: '',
    Phone_Number: '',
    Citizen_Identification: '',
    Address: ''
  })
  const { id } = useParams()
  const reftFocus = useRef(null)
  const handleGetvalueformSelect = (e) => {
    setGetFormValue({ ...getFormValue, Sex_Custommer: e.target.value })
  }
  const handleGetvalueform = (e) => {
    const { name, value } = e.target
    setGetFormValue({ ...getFormValue, [name]: value })
  }
  useEffect(() => {
    dispatch(fetchServicesData());
  }, [dispatch])

  useEffect(() => {
    const CallTicket = async () => {
      const res = await getTicket(id)
      dispatch(Ticket(res.data.Ticket))
    }
    CallTicket()
  }, [])

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const handlePayZaloPay = () => {
    if (getFormValue['Name_Custommer'] !== '' && getFormValue['Date_Of_Birth'] !== '' && getFormValue['Sex_Custommer'] !== '' && getFormValue['Phone_Number'] !== '' && getFormValue['Citizen_Identification'] !== '') {
      const postZalopay = async () => {
        const data = {
          id_Ticket: Data_ticket[0]._id,
          total_Price: Data_ticket[0].Departure_Location,
          Destination: Data_ticket[0].Destination,
          Departure_Date: Data_ticket[0].Departure_Date,
          Departure_Time: Data_ticket[0].Departure_Time,
          Total_DateTrip: Data_ticket[0].Total_DateTrip,
          Adult_fare: Data_ticket[0].Adult_fare,
          Children_fare: Data_ticket[0].Children_fare,
          Adult: Data_ticket[0].Adult,
          Children: Data_ticket[0].Children,
          Total_price: Data_ticket[0].Total_price,
          id_tour: Data_ticket[0].id_tour,
          id_user: Data_ticket[0].id_user,
          id_Service: Data_ticket[0].id_Service,
          id_Voucher: Data_ticket[0].id_Voucher,
          ...getFormValue
        }
        const res = await CreateUrlZalopay(data)
        if (res.status === 200 && res.statusText === 'OK') {
          window.location.href = `${res.data.Message.order_url}`
        }

      }
      postZalopay()
    } else {
      reftFocus.current.focus()
    }
  }
  const handlePayVnPay = () => {
    if (getFormValue['Name_Custommer'] !== '' && getFormValue['Date_Of_Birth'] !== '' && getFormValue['Sex_Custommer'] !== '' && getFormValue['Phone_Number'] !== '' && getFormValue['Citizen_Identification'] !== '') {
      const postVnpay = async () => {
        const data = {
          amount: Data_ticket[0].Total_price,
          bankCode: 'NCB',
          language: 'vn',
          ticket_id: Data_ticket[0]._id,
          id_tour: Data_ticket[0].id_tour,
          id_user: Data_ticket[0].id_user,
          id_Service: Data_ticket[0].id_Service,
          id_Voucher: Data_ticket[0].id_Voucher,
          ...getFormValue
        }
        const res = await CreateUrlVnpay(data)
        if (res.status === 200 && res.statusText === 'OK') {
          window.location.href = `${res.data}`
        }
      }
      postVnpay()
    } else {
      reftFocus.current.focus()
    }
  }
  const handlePaymentDirect = () => {
    if (getFormValue['Name_Custommer'] !== '' && getFormValue['Date_Of_Birth'] !== '' && getFormValue['Sex_Custommer'] !== '' && getFormValue['Phone_Number'] !== '' && getFormValue['Citizen_Identification'] !== '') {
      Swal.fire({
        title: "Bạn có chắc chắn muốn đặt vé không?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Có, đặt vé!",
        cancelButtonText: "Không, hủy vé",
      }).then((result) => {
        if (result.isConfirmed) {
          const postPaymentDirect = async () => {
            const data = {
              ticket_id: Data_ticket[0]._id,
              id_tour: Data_ticket[0].id_tour,
              id_user: Data_ticket[0].id_user,
              id_Service: Data_ticket[0].id_Service,
              id_Voucher: Data_ticket[0].id_Voucher,
              ...getFormValue
            }
            const res = await CreatePayment_Direct(data)
            console.log(res);
            if (res.status === 200 && res.statusText === 'OK') {
              Swal.fire('Thành công!', 'Đặt vé thành công.', 'success');

              window.location.href = 'http://localhost:5173/booking-history'

            }
          }
          postPaymentDirect()
        }
      });
    }
  }
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={cx("wrap", "container")}>
      <div className={cx("booking__container")}>
        <h1>Thông tin đặt vé</h1>
        {Data_ticket?.map((ticket_info, index) => (
          <form key={index} className={cx("booking__form")}>
            <div className={cx("info")}>
              <div className={cx("info__heading")}>
                <div className={cx("info__heading-name")}>
                  Tên tour:
                  <span>{ticket_info.Title_Tour}</span>
                </div>
                <div className={cx("info__heading-departure")}>
                  Điểm đi:
                  <span>{ticket_info.Departure_Location}</span>
                </div>
                <div className={cx("info__heading-destination")}>
                  Điểm đến:
                  <span>{ticket_info.Destination}</span>
                </div>
              </div>
              <div className={cx("info__sub")}>
                <div className={cx("info__sub-transport")}>
                  Phương tiện di chuyển:
                  <span> Máy bay, xe du lịch</span>
                </div>
                <div className={cx("info__sub-time")}>
                  Thời gian:
                  <span>{ticket_info.Total_DateTrip}</span>
                </div>
                <div className={cx("info__sub-departure-time")}>
                  Giờ khởi hành:
                  <span>{ticket_info.Departure_Time}</span>
                </div>
                <div className={cx("info__sub-departure-day")}>
                  Ngày khởi hành:
                  <span>{ticket_info.Departure_Date.slice(0, 10)}</span>
                </div>
              </div>

            </div>
            <div className={cx("information")}>
              <div className={cx("booking__form-adult")}>
                <span>Thông tin người đại diện</span>
              </div>

              <div className={cx("information-adult")}>
                <div className={cx("information-adult-hed")}>
                  <div className={cx("information-adult__name")}>
                    Họ và tên:
                    <input type="text" placeholder="Họ và tên" name="Name_Custommer" onChange={handleGetvalueform} ref={reftFocus} />
                  </div>
                  <div className={cx("information-adult__birth")}>
                    Ngày sinh:
                    <input type="date" name="Date_Of_Birth" onChange={handleGetvalueform} />
                  </div>
                  <div className={cx("information-adult__sect")}>
                    Giới tính:
                    <select name="Sex_Custommer" onChange={handleGetvalueformSelect}>
                      <option data-sex={"Nam"} value="Nam">Nam</option>
                      <option data-sex={"Nữ"} value="Nữ">Nữ</option>
                    </select>
                  </div>
                </div>
                <div className={cx("information-adult-sub")}>
                  <div className={cx("information-adult__phone")}>
                    Số điện thoại:
                    <input type="text" placeholder="Số điện thoại" name="Phone_Number" onChange={handleGetvalueform} />
                  </div>
                  <div className={cx("information-adult__cccd")}>
                    Căn cước:
                    <input type="text" placeholder="CCCD" name="Citizen_Identification" onChange={handleGetvalueform} />
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("pay")}>
              <h4 className={cx("pay__heading")}>Xác nhận thanh toán</h4>
              <div className={cx("pay__sub")}>
                <div className={cx("pay__sub-adult")}>
                  Người lớn:
                  <span>{ticket_info.Adult}</span>
                </div>
                <div className={cx("pay__sub-children")}>
                  Trẻ em:
                  <span>{ticket_info.Children}</span>
                </div>
                <div className={cx("pay__sub-total")}>
                  Tạm tính:
                  <span>{ticket_info.Total_price.toLocaleString('vi-VN')}VND</span>
                </div>
                <div className={cx("pay__sub-discount")}>
                  Ưu đãi:
                  <span>0 đ</span>
                </div>
                <div className={cx("pay__sub-total-pay")}>
                  Tổng tiền thanh toán:
                  <span>{ticket_info.Total_price.toLocaleString('vi-VN')}VND</span>
                </div>
                <div className={cx("pay__sub-code")}>
                  Nhập mã:
                  <input type="text" placeholder="Nhập mã giảm giá" />
                </div>
              </div>
              <div className={cx("booking__services")}>
                <h4>Dịch vụ đi kèm</h4>
                <ul className={cx("booking__services-list")}>
                  {services.map((service) => (
                    <li key={service._id}>{service.NameService}</li>
                  ))}
                </ul>
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
                  onClick={handlePaymentDirect}
                >
                  Thanh toán trực tiếp
                </Button> <br />
                <Select
                  value={paymentMethod}
                  onChange={handlePaymentChange}
                  displayEmpty
                  variant="outlined"
                  sx={{
                    width: 300,
                    textTransform: "uppercase",
                    marginTop: 1,
                    textAlign: "center",
                    fontWeight: 600,
                    backgroundColor: "#fff",
                    fontSize: 12,
                    borderColor: "#3fd0d4",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#3fd0d4",
                    },
                    "& .MuiSelect-icon": {
                      color: "#3fd0d4",
                    },
                  }}
                  className={cx("select-payment")}
                >
                  <MenuItem value="" disabled >
                    Chọn phương thức thanh toán
                  </MenuItem>
                  <MenuItem onClick={handlePayZaloPay} value="zalopay"> <img style={{ width: '40px', height: '40px', marginRight: '5px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe6SEQ293X0nfFojf6nsCWKA8dNGOrqn21jg&s" alt="" />ZaloPay</MenuItem>
                  <MenuItem onClick={handlePayVnPay} value="vnpay"> <img style={{ width: '40px', height: '25px', marginRight: '5px' }} src="https://i.pinimg.com/1200x/f9/5e/a2/f95ea23c297af3170d9d75173bed9d7e.jpg" alt="" />VNPay</MenuItem>
                </Select>


              </div>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}

export default Booking;
