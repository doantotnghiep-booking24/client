import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Button } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import classNames from 'classnames/bind';
import styles from './header.module.scss';

import Swal from 'sweetalert2';

const cx = classNames.bind(styles);

function Header() {
  const showSwal = () => {
    Swal.fire({
      title: 'Đặt vé thành công!',
      text: 'Cảm ơn bạn đã đặt vé',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  return (
    <div className={cx('wrap')}>
      <nav className={cx('navbar')}>
        <div className={cx('navbar__location')}>
          <a href="#" className={cx('navbar__email')}>
            <EmailOutlinedIcon fontSize="small" className={cx('navbar__location-icon')} />
            <span className={cx('navbar__email-text', 'navbar__location-title')}>Foly@booking.com</span>
          </a>
          <a href="#" className={cx('navbar__phone')}>
            <PhoneIcon fontSize="small" className={cx('navbar__location-icon')} />
            <span className={cx('navbar__phone-text', 'navbar__location-title')}>0357325956</span>
          </a>
          <a href="#" className={cx('navbar__address')}>
            <LocationOnOutlinedIcon fontSize="small" className={cx('navbar__location-icon')} />
            <span className={cx('navbar__address-text', 'navbar__location-title')}>Nguyễn Huy Tưởng, Đà Nẵng</span>
          </a>
        </div>
        <div className={cx('navbar__action')}>
          <div className={cx('navbar__social')}>
            <FacebookIcon fontSize="small" className={cx('navbar__social-icon')} />
            <InstagramIcon fontSize="small" className={cx('navbar__social-icon')} />
            <LinkedInIcon fontSize="small" className={cx('navbar__social-icon')} />
            <PinterestIcon fontSize="small" className={cx('navbar__social-icon')} />
          </div>
          <div className={cx('navbar__avatar')}>
            <AccountCircleOutlinedIcon fontSize="medium" className={cx('navbar__avatar-icon')} />
          </div>
        </div>
      </nav>
      <header className={cx('header')}>
        <img
          src="https://apps.odoo.com/web/image/loempia.module/31305/icon_image?unique=4696166"
          alt=""
          className={cx('logo__img')}
        />
        <ul className={cx('header__list')}>
          <li className={cx('header__item')}>
            <a href="#" className={cx('header__link')}>Trang chủ</a>
          </li>
          <li className={cx('header__item')}>
            <a href="#" className={cx('header__link')}>Giới thiệu</a>
          </li>
          <li className={cx('header__item')}>
            <a href="#" className={cx('header__link')}>Khám phá</a>
          </li>
          <li className={cx('header__item')}>
            <a href="#" className={cx('header__link')}>Lịch sử đặt vé</a>
          </li>
          <li className={cx('header__item')}>
            <a href="#" className={cx('header__link')}>Tài khoản</a>
          </li>
        </ul>
        <div className={cx('header__sub')}>
          <Button
            onClick={showSwal}
            className={cx('header__sub-btn')}
            variant="contained"
            color="primary"
          >
            Đặt vé
          </Button>
        </div>
      </header>
    </div>
  );
}

export default Header;
