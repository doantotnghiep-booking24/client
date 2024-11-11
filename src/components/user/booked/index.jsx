
import './BookingForm.scss';
import RoomIcon from '@mui/icons-material/Room';
function App() {
  return (
    <div className="app">
     
      <div className="container">
        <BookingForm />
        <SummaryCard />
      </div>
    </div>
  );
}

function BookingForm() {
  return (
    <div className="booking-form">
      <h2>Thông tin khách hàng</h2>
      <form>
        <div className="form-group half">
          <label>Họ Và Tên*</label>
          <input type="text" placeholder="Tên" />
        </div>
        <div className="form-group half">
          <label>Giới tính</label>
          <select>
          <option>Nam</option>
          <option>Nữ</option>
        </select>
        </div>
        <div className="form-group">
          <label>Ngày Sinh</label>
          <input type="date" />
        </div>
        <div className="form-group">
          <label>Số điện thoại *</label>
          <input type="text" placeholder="Số điện thoại" />
        </div>
        <div className="form-group">
          <label>CMND/CCCD</label>
          <input type="text" placeholder="" />
        </div>
      
        <div className="payment-method">
          <h3>Phương thức thanh toán</h3>
          <label>
          <input type="checkbox" />
          VNPAY
          <img src="https://vnsky.vn/img/vnpay.e8be1426.png" alt="Momo" className="icon" />
          </label>
          <label>
          <input type="checkbox" />
          ZaloPay
          <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay.png" alt="Cash" className="icon" />
          </label>
          <label>
          <input type="checkbox" />
          Bằng tiền mặt
          <img src="https://theoldschool.vn/wp-content/uploads/2024/03/dollars.png" alt="Cash" className="icon" />
          </label>
          STK: 0011004400422.Ngân hàng VCB -Chỉ nhánh Thường Tín
          
          <li>Bạn sẽ bị tinh tổng số tiền sau khi đơn đặt hàng của ban được xác nhận.</li>
          <li>Khi bạn thành toán với VNPAY, bạn xác nhận rằng bạn đã đọc về các ràng buộc thanh toán của VNPAY</li>
          <li>Điều khoản Sử dụng, Chính sách Bảo mật của Khách hàng, cùng với các quy tác của nhà điều hành tour & quy định (xem danh sách để biết thêm chi tiết).</li>
          <li>Điều khoản Sử dụng, Chính sách Bảo mật của Khách hàng, cùng với các quy tác của nhà điều hành tour & quy định (xem danh sách để biết thêm chi tiết).</li>
          <li>Điều khoản Sử dụng, Chính sách Bảo mật của Khách hàng, cùng với các quy tác của nhà điều hành tour & quy định (xem danh sách để biết thêm chi
             tiết).</li>
        </div>
        <button type="submit" className="submit-btn">Đặt tour</button>
      </form>
    </div>
  );
}

function SummaryCard() {
  return (
    <div className="summary-card">
      <h3>Hà Giang - Lũng Cú - Đồng Văn - Nơi đá nở hoa</h3>
      <div className='name-tour'>
      <RoomIcon className="icon" />
        <label>Hà Giang</label>
      </div>
     <h5>Dịch vụ</h5>
      <div className="tour-info">
        <p><strong>Phương tiện:</strong> Máy bay-Xe khách</p> 
        <p><strong>Thời gian:</strong> 4 ngày, 3 đêm</p>
        <p><strong>Điểm đi:</strong> Hà Nội</p>
        <p><strong>Điểm đến:</strong> Hà Giang</p>
     
      </div>
      <div className="form-group">
        <label>Giờ khởi hành</label>
        <strong>8:00 AM</strong>
      </div>
      <div className="form-group">
        <label>Số người</label>
        <div className="tour-info">
        <p><strong>Trẻ em:</strong> 1</p> 
        <p><strong>Người lớn:</strong> 4</p>
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
        <p><strong>Tổng: </strong>100 đ</p> 
        <p><strong>Tạm tính: </strong>1000 VND</p> 
      </div>
      </div>
      <div className="room-type">
        <h4>Khách Sạn</h4>
        <strong>Mường Thanh</strong>
        <div className="room-option">
          <span>Phòng đơn - 500,000đ</span>
          <input type="number" min="0" defaultValue="1" />
        </div>
        <div className="room-option">
          <span>Phòng đôi - 250,000đ</span>
          <input type="number" min="0" defaultValue="0" />
        </div>
      </div>
      <div className="form-group">
        <label>Dịch vụ đi kèm</label>
        <div className="tour-info">
        <p>Hướng Dẫn Viên</p>
        <p>Đưa Đón</p>
        <p>Buffet trưa tại nhà hàng</p>
        <p>Khách sạn</p>
       
      </div>
      </div>
      <div className="total">
        <p>Tổng</p>
        <strong>3,990,000 VND</strong>
      </div>
    </div>
  );
}

export default App;
