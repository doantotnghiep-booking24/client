// TicketHistoryDetail.jsx

import { Stepper, Step, StepLabel } from '@mui/material';
import './TicketDetails.scss';

const steps = [
  { label: 'Đặt vé' },
  { label: 'Thanh toán' },
  { label: 'Xác nhận'  },
  { label: 'Hoàn tất' },
];

const TicketHistoryDetail = () => {
  return (
    <div className="ticket-history-container">
      <div className="stepper-section">
        <Stepper activeStep={0} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>
                <div className="step-label">
                  <span className="label-text">{step.label}</span>
                  {step.description }
                </div>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      <div className="ticket-info-section">
        <h2>Chi tiết lịch sử đặt vé</h2>
        <div className="ticket-info">
          <p><strong>Tên tour:</strong> Tham quan Đà Nẵng</p>
          <p><strong>Điểm đi:</strong> Hà Nội</p>
          <p><strong>Điểm đến:</strong> Đà Nẵng</p>
          <p><strong>Phương tiện di chuyển:</strong> Máy bay, xe du lịch</p>
          <p><strong>Thời gian:</strong> 2 ngày 1 đêm</p>
          <p><strong>Giờ khởi hành:</strong> 8:00</p>
          <p><strong>Ngày khởi hành:</strong> 2024-11-09</p>
        </div>

        <div className="representative-info">
          <h3>Thông tin người đại diện</h3>
          <p><strong>Họ và tên:</strong> Mai Nguyên Qang</p>
          <p><strong>Ngày sinh:</strong> 18/05/2004</p>
          <p><strong>Giới tính:</strong> Nam</p>
          <p><strong>Số điện thoại:</strong> 0769668554</p>
          <p><strong>Căn cước:</strong> 0155446444555</p>
        </div>

        <div className="payment-confirmation">
          <h3>Xác nhận thanh toán</h3>
          <p><strong>Người lớn:</strong> 1</p>
          <p><strong>Trẻ em:</strong> 1</p>
          <p><strong>Tạm tính:</strong> 1.800.000 VND</p>
          <p><strong>Ưu đãi:</strong> 0 đ</p>
          <p><strong>Tổng tiền thanh toán:</strong> 1.800.000 VND</p>
          <p><strong>Nhập mã:</strong> TET2025</p>
        </div>

        <div className="additional-services">
          <h3>Dịch vụ đi kèm</h3>
          <ul>
            <li>Buffee</li>
            <li>HDV</li>
          </ul>
        </div>

        <div className="payment-method">
          <h3>Phương thức thanh toán</h3>
          <p>VNPAY</p>
        </div>
      </div>
    </div>
  );
};

export default TicketHistoryDetail;
