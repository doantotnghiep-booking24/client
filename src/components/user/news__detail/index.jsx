import classNames from "classnames/bind";
import styles from "./news__detail.module.scss";

const cx = classNames.bind(styles);
function NewsDetail() {
  return (
    <div className={cx("wrap")}>
      <div className={cx("banner")}>
        <img
          src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/09/destionations-1-title.jpg"
          alt=""
          className={cx("banner__img")}
        />
        <h2 className={cx("banner__title")}>Chi tiết</h2>
      </div>
      <div className={cx("container")}>
        <div className={cx("content")}>
            <div className={cx("content__main")}>
            <div className={cx("content__home")}>
                <div className={cx("list__image")}>
                    <div className={cx("image-heading")}>
                        <img
                            src="https://q-xx.bstatic.com/xdata/images/xphoto/max1200/153567371.jpg?k=f2b4c987d7d6beb2f7ca3b192b6c14df849043981adb02296f5eaae169d2deeb&o="
                            alt=""
                        />
                    </div>
                    <div className={cx("image-sub")}>
                        <img
                            src="https://r-xx.bstatic.com/xdata/images/xphoto/max1200/153567536.jpg?k=eac909f20d6b51476227c145a6963cd8a92cc661b7b6716af50122b72a3bd8f5&o="
                            alt=""
                        />
                         <img
                            src="https://q-xx.bstatic.com/xdata/images/xphoto/max1200/153567436.jpg?k=69ec9b62b347215a2c0caa9f810456aa0cc7bd32549b2619871a708714aa4eda&o="
                            alt=""
                            style={{marginTop: 10}}
                        />
                       
                    </div>
                </div>
                <h4 className={cx("name")}>Du lịch Đà Nẵng</h4>
                <h5 className={cx("title")}>Bà Nà Hills - Đà Nẵng có gì ?</h5>
                <p className={cx("description")}>Bà Nà Hills được xây dựng trên đỉnh núi Chúa, thuộc huyện Hòa Vang, cách trung tâm thành phố Đà Nẵng khoảng 25 km về phía Tây Nam, ở độ cao 1487 m so với mực nước biển. Đây là khu du lịch trên núi đầu tiên, được ví như “Đà Lạt của miền Trung” hay “ hòn ngọc khí hậu” của Viêt Nam. Cũng có người nó được lấy dựa theo nhà văn Nguyên Ngọc, theo tiếng Katy mang nghĩa “nhà của tôi”. Ý kiến khác lại cho rằng do người dân đặt tên mà thành, “Bà” ngụ chỉ những con vật linh thiêng và “Nà” là khoảng đất rộng trên núi.\r\n\r\nNhững địa điểm thú vị mà bạn có thể giải trí vui chơi khi đến Bà Nà hills:\r\n- Bảo tàng Sáp\r\n- Hầm rượu Debay\r\n- Thác Tóc Tiên\r\n- Tháp Nghinh Phong Tự\r\n- Ngôi làng Pháp\r\n- Chùa Linh Ứng\r\n- Vườn hoa Le Jardin d’Amour\r\n- Fantasy Park\r\n- Cầu vàng bà Nà hills\r\nWow! Thật nhiều địa điểm thú vị tại nơi đây. Chần chờ gì mà không đặt cho mình và người thân những chiếc vé đến Bà nà hills của Thành phố đáng sống nào !</p>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default NewsDetail;
