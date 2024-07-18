import classNames from 'classnames/bind';
import styles from './footer.module.scss'

const cx = classNames.bind(styles);

function Footer() {
    return ( 
        <>
          <h1 className={cx('h1ne')}></h1>
        </>
     );
}

export default Footer;