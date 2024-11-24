import './BookingForm.scss';
import { Select, MenuItem, Grid } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServicesData } from "../../../redux/features/serviceSlice";
import { getTicket } from "../../../services/getTicket";
import { Ticket } from "../../../redux/features/TicketSlice";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CreateUrlZalopay } from "../../../services/CreateUrlZalopay";
import { CreateUrlVnpay } from "../../../services/CreateUrlVnpay";
import { CreatePayment_Direct } from "../../../services/CreatePayment_Direct";
import { ThreeDots } from 'react-loader-spinner';
import CircularProgress from '@mui/material/CircularProgress';
function BookingForm() {
  const RefScroll = useRef(null);
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.services);
  const { Data_ticket } = useSelector((state) => state.ticket)
  const [paymentMethod, setPaymentMethod] = useState("");
  const [value_CusNearest, setvalue_CusNearest] = useState('')
  const [isloadings, setIsLoadings] = useState(false)
  const [getFormValue, setGetFormValue] = useState({
    Name_Custommer: '',
    Date_Of_Birth: '',
    Sex_Custommer: 'Nam',
    Phone_Number: '',
    Citizen_Identification: '',
    Address: ''
  })
  // console.log(getFormValue);
  useEffect(() => {
    if (RefScroll) {
      RefScroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

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
  console.log(isloadings);

  const handleBookingTicket = () => {

    if (paymentMethod === 'vnpay' && getFormValue['Name_Custommer'] !== '' && getFormValue['Date_Of_Birth'] !== '' && getFormValue['Sex_Custommer'] !== '' && getFormValue['Phone_Number'] !== '' && getFormValue['Citizen_Identification'] !== '') {
      setIsLoadings(true)
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
          setTimeout(() => {
            window.location.href = `${res.data}`
          }, 1000)
          setTimeout(() => {
            setIsLoadings(false)
          }, 2000)
        }
      }
      postVnpay()
    } else if (paymentMethod === 'zalopay' && getFormValue['Name_Custommer'] !== '' && getFormValue['Date_Of_Birth'] !== '' && getFormValue['Sex_Custommer'] !== '' && getFormValue['Phone_Number'] !== '' && getFormValue['Citizen_Identification'] !== '') {
      setIsLoadings(true)
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
          setTimeout(() => {
            window.location.href = `${res.data.Message.order_url}`
          }, 1000)
          setTimeout(() => {
            setIsLoadings(false)
          }, 2000)
        }

      }
      postZalopay()
    } else {
      reftFocus.current.focus()
    }

  }
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
  // const handlePayVnPay = () => {
  //   if (getFormValue['Name_Custommer'] !== '' && getFormValue['Date_Of_Birth'] !== '' && getFormValue['Sex_Custommer'] !== '' && getFormValue['Phone_Number'] !== '' && getFormValue['Citizen_Identification'] !== '') {
  //     const postVnpay = async () => {
  //       const data = {
  //         amount: Data_ticket[0].Total_price,
  //         bankCode: 'NCB',
  //         language: 'vn',
  //         ticket_id: Data_ticket[0]._id,
  //         id_tour: Data_ticket[0].id_tour,
  //         id_user: Data_ticket[0].id_user,
  //         id_Service: Data_ticket[0].id_Service,
  //         id_Voucher: Data_ticket[0].id_Voucher,
  //         ...getFormValue
  //       }
  //       const res = await CreateUrlVnpay(data)
  //       if (res.status === 200 && res.statusText === 'OK') {
  //         window.location.href = `${res.data}`
  //       }
  //     }
  //     postVnpay()
  //   } else {
  //     reftFocus.current.focus()
  //   }
  // }
  // const handlePaymentDirect = () => {
  //   if (getFormValue['Name_Custommer'] !== '' && getFormValue['Date_Of_Birth'] !== '' && getFormValue['Sex_Custommer'] !== '' && getFormValue['Phone_Number'] !== '' && getFormValue['Citizen_Identification'] !== '') {
  //     Swal.fire({
  //       title: "Bạn có chắc chắn muốn đặt vé không?",
  //       icon: "question",
  //       showCancelButton: true,
  //       confirmButtonText: "Có, đặt vé!",
  //       cancelButtonText: "Không, hủy vé",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         const postPaymentDirect = async () => {
  //           const data = {
  //             ticket_id: Data_ticket[0]._id,
  //             id_tour: Data_ticket[0].id_tour,
  //             id_user: Data_ticket[0].id_user,
  //             id_Service: Data_ticket[0].id_Service,
  //             id_Voucher: Data_ticket[0].id_Voucher,
  //             ...getFormValue
  //           }
  //           const res = await CreatePayment_Direct(data)
  //           console.log(res);
  //           if (res.status === 200 && res.statusText === 'OK') {
  //             Swal.fire('Thành công!', 'Đặt vé thành công.', 'success');

  //             window.location.href = 'http://localhost:5173/booking-history'

  //           }
  //         }
  //         postPaymentDirect()
  //       }
  //     });
  //   }
  // }
  return (
    <div ref={RefScroll} className="containers">
      <div className="booking-form">
        <h2>Thông tin khách hàng</h2>
        <form>
          <div className="form-group half">
            <label>Họ Và Tên*</label>
            <input type="text" placeholder="Tên" name="Name_Custommer" onChange={handleGetvalueform} ref={reftFocus} />
          </div>
          <div className="form-group half">
            <label>Giới tính</label>
            <select name="Sex_Custommer" onChange={handleGetvalueformSelect}>
              <option data-sex={"Nam"} value="Nam">Nam</option>
              <option data-sex={"Nữ"} value="Nữ">Nữ</option>
            </select>
          </div>
          <div className="form-group">
            <label>Ngày Sinh</label>
            <input type="date" name="Date_Of_Birth" onChange={handleGetvalueform} />
          </div>
          <div className="form-group">
            <label>Số điện thoại *</label>
            <input type="text" placeholder="Số điện thoại" name="Phone_Number" onChange={handleGetvalueform} />
          </div>
          <div className="form-group">
            <label>CMND/CCCD</label>
            <input type="text" placeholder="Căn Cước Công Dân & Chứng Minh Nhân Dân" name="Citizen_Identification" onChange={handleGetvalueform} />
          </div>

          <div className="payment-method">
            <h3>Phương thức thanh toán</h3>
            <label>
              <Select
                value={paymentMethod}
                onChange={handlePaymentChange}
                displayEmpty
                variant="outlined"
                sx={{
                  width: "100%",
                  height: 40,
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
              // className={cx("select-payment")}
              >
                <MenuItem value="Chọn phương thức thanh toán" disabled >
                  Chọn phương thức thanh toán
                </MenuItem>
                <MenuItem value="zalopay"> <img style={{ width: '40px', height: '40px', marginRight: '5px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe6SEQ293X0nfFojf6nsCWKA8dNGOrqn21jg&s" alt="" />ZaloPay</MenuItem>
                <MenuItem value="vnpay"> <img style={{ width: '40px', height: '25px', marginRight: '5px' }} src="https://i.pinimg.com/1200x/f9/5e/a2/f95ea23c297af3170d9d75173bed9d7e.jpg" alt="" />VNPay</MenuItem>
              </Select>
            </label>
            <li>Khi bạn thành toán với VNPAY, bạn xác nhận rằng bạn đã đọc về các ràng buộc thanh toán của VNPAY</li>
            <li>Điều khoản Sử dụng, Chính sách Bảo mật của Khách hàng, cùng với các quy tác của nhà điều hành tour & quy định (xem danh sách để biết thêm chi tiết).</li>
          </div>
        </form>
        {/* <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }} className="submit-btn" onClick={handleBookingTicket}>Đang xử lý, vui lòng chờ! <CircularProgress style={{ width: '20px', height: '20px', marginLeft: '7px' }} /> </button> */}
        {isloadings ? <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }} className="submit-btn" onClick={handleBookingTicket}>Đang xử lý, vui lòng chờ! <CircularProgress style={{ width: '20px', height: '20px', marginLeft: '7px' }} /> </button> : <button className="submit-btn" onClick={handleBookingTicket}>Đặt tour</button>}
      </div>
      {Data_ticket?.map((ticket_info, index) => (
        <div key={index} className="summary-card">
          <div style={{ display: 'flex' }}>
            <h3 style={{ width: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ticket_info.Title_Tour}</h3>
            <div style={{ position: 'absolute', right: 0, marginRight: '63px' }} className='name-tour'>
              <RoomIcon className="icon" />
              <label>{ticket_info.Destination}</label>
            </div>
          </div>
          <h5>Dịch vụ</h5>
          <div className="tour-info">
            <p><strong>Phương tiện :</strong> Máy bay-Xe khách</p>
            <p><strong>Thời gian :</strong> {ticket_info.Total_DateTrip}</p>
            <p><strong>Điểm đi :</strong> {ticket_info.Departure_Location}</p>
            <p><strong>Điểm đến :</strong> {ticket_info.Destination}</p>

          </div>
          <div className="form-group">
            <label>Giờ khởi hành : <strong>{ticket_info.Departure_Time}</strong></label>
          </div>
          <div className="form-group">
            <label>Ngày khởi hành : <strong>{ticket_info.Departure_Date.slice(0, 10)}</strong></label>
          </div>
          <div className="form-group">
            <label>Số người</label>
            <div className="tour-info">
              <p><strong>Trẻ em :</strong> {ticket_info.Children}</p>
              <p><strong>Người lớn :</strong> {ticket_info.Adult}</p>
            </div>
          </div>
          <div className="room-type">
            <p>Khách Sạn : <strong>{ticket_info?.Name_Hotel}</strong></p>
            <div className="room-option">
              <span>Số Lượng Phòng : <strong>{ticket_info?.Number_Of_Hotel}</strong></span>
            </div>
          </div>
          <div className="form-group">
            <label>Voucher Code</label>
            <input type="text" placeholder="Nhập Voucher" />
            <button className="apply-btn">Xác nhận</button>
          </div>
          <div className="form-group">
            <label>Ưu đãi</label>
            <div className="tour-info">
              <p><strong>Tổng : </strong> {ticket_info.Total_price.toLocaleString('vi-VN')}VND</p>
              <p><strong>Tạm tính : </strong> {ticket_info.Total_price.toLocaleString('vi-VN')}VND</p>
            </div>
          </div>
          {/* <div className="form-group">
            <label>Dịch vụ đi kèm</label>

            <div className="tour-info">
            {services.map((service) => (
                <p>{service.NameService}</p>
              ))}
              </div>
          </div> */}
          <div className="total">
            <p>Tổng</p>
            <strong>{ticket_info.Total_price.toLocaleString('vi-VN')}VND</strong>
          </div>
        </div>
      ))}
    </div>

  );
}


export default BookingForm;