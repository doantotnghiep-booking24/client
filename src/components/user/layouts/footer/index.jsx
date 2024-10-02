import classNames from "classnames/bind";
import styles from "./footer.module.scss";

const cx = classNames.bind(styles);

function Footer() {
  return (
    <>
      <footer className={cx("footer")}>
        <div className={cx("footer-home", "container")}>
          <ul className={cx("footer-list")}>
            <li className={cx("footer-item")}>
              <a href="" className={cx("footer-link", "footer-link-hed")}>
                VỀ CHÚNG TÔI
              </a>
            </li>

            <li className={cx("footer-item")}>
              <a href="" className={cx("footer-link")}>
                +0357325956
              </a>
            </li>

            <li className={cx("footer-item")}>
              <a href="" className={cx("footer-link")}>
                Foly@booking.com
              </a>
            </li>

            <li className={cx("footer-item")}>
              <a href="" className={cx("footer-link")}>
                Nguyễn Huy Tưởng, Đà Nẵng
              </a>
            </li>
          </ul>

          <ul className={cx("footer-list")}>
            <li className={cx("footer-item")}>
              <a href="" className={cx("footer-link", "footer-link-hed")}>
                THỂ LOẠI
              </a>
            </li>

            <li className={cx("footer-item")}>
              <a href="" className={cx("footer-link")}>
                Ưu đãi lớn
              </a>
            </li>

            <li className={cx("footer-item")}>
              <a href="" className={cx("footer-link")}>
                Du lịch
              </a>
            </li>

            <li className={cx("footer-item")}>
              <a href="" className={cx("footer-link")}>
                Khách sạn
              </a>
            </li>

            <li className={cx("footer-item")}>
              <a href="" className={cx("footer-link")}>
                Địa chỉ
              </a>
            </li>
          </ul>

          <ul className={cx("footer-list")}>
            <li className={cx("footer-item")}>
              <a href="" className={cx("footer-link", "footer-link-hed")}>
                THÔNG TIN
              </a>
            </li>

            <li className={cx("footer-item")}>
              <a href="" className={cx("footer-link")}>
                Về chúng tôi
              </a>
            </li>

            <li className={cx("footer-item")}>
              <a href="" className={cx("footer-link")}>
                Liên hệ chúng tôi
              </a>
            </li>

            <li className={cx("footer-item")}>
              <a href="" className={cx("footer-link")}>
                Chính sách bảo mật
              </a>
            </li>

            <li className={cx("footer-item")}>
              <a href="" className={cx("footer-link")}>
                Đơn đặt hàng và trả lại
              </a>
            </li>

            <li className={cx("footer-item")}>
              <a href="" className={cx("footer-link")}>
                Điều khoản và điều kiện
              </a>
            </li>
          </ul>

          <ul className={cx("footer-list")}>
            <li className={cx("footer-item")}>
              <a href="" className={cx("footer-link", "footer-link-hed")}>
                DỊCH VỤ
              </a>
            </li>

            <li className={cx("footer-item")}>
              <a href="" className={cx("footer-link")}>
                Tài khoản
              </a>
            </li>

            <li className={cx("footer-item")}>
              <a href="" className={cx("footer-link")}>
                Bài viết
              </a>
            </li>

            <li className={cx("footer-item")}>
              <a href="" className={cx("footer-link")}>
                Danh sách yêu thích
              </a>
            </li>

            <li className={cx("footer-item")}>
              <a href="" className={cx("footer-link")}>
                Theo dõi lịch trình
              </a>
            </li>

            <li className={cx("footer-item")}>
              <a href="" className={cx("footer-link")}>
                Giúp đỡ
              </a>
            </li>
          </ul>
        </div>
      </footer>
      <div className={cx("sub-footer")}>
        <p className={cx("")}>Copyright ©2024 Trương Văn Lượng</p>
      </div>
    </>
  );
}

export default Footer;
