import SearchIcon from '@mui/icons-material/Search';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Button, Slider } from '@mui/material';



import classNames from 'classnames/bind';
import styles from './home.module.scss';

const cx = classNames.bind(styles)

function Home() {
    return ( 

        <div className={cx('main')}>
                <div className={cx('banner')}>
                    <div className={cx('banner__image')}>
                        <img src="https://www.nicdarkthemes.com/themes/travel/wp/demo/summer-holiday/wp-content/uploads/sites/4/2018/11/para-7.jpg?id=1814"  alt="booking" />
                    </div>
            <div className={cx('container')}>
                    <div className={cx('banner__heading')}>
                        <div className={cx('banner__text')}>
                            <span>Gói của chúng tôi</span>
                            <h1>Hãy tìm kiếm kỳ nghỉ của bạn</h1>
                        </div>
                        <div className={cx('banner__section')}>
                            <div className={cx('banner__section-search')}>
                                <span>Tìm kiếm kỳ nghỉ:</span> <br />
                                <input type="text" placeholder='Tìm kiếm' />
                                <SearchIcon className={cx('banner__section-search-btn')}/>
                                
                            </div>
                            <div className={cx('banner__section-date')}>
                                <span>Chọn ngày của bạn:</span> <br />
                                <input type="date" />
                            </div>
                            <div className={cx('banner__section-price')}>
                                <span>Lựa chọn số tiền:</span> <br />
                                <Slider
                                  size="small"
                                  defaultValue={70}
                                  aria-label="Small"
                                  valueLabelDisplay="auto"
                                  className={cx('banner__section-price-range')}
                                  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('content')}>
                <div className={cx('container')}>
                    <div className={cx('vacation')}>
                        <div className={cx('vacation__list')}>
                            <div className={cx('vacation__item')}>
                                <img src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/10/tour-featured-img-3.jpg" alt="" className={cx('vacation__item-img')} />
                                <div className={cx('vacation__item-text')}>
                                    <h4 className={cx('vacation__item-name')}>Đảo Lý Sơn</h4>
                                    <div className={cx('vacation__item-location')}>
                                        <LocationOnOutlinedIcon className={cx('icon')}/>
                                        <span>Lý Sơn</span>
                                    </div>
                                    <div className={cx('vacation__item-price')}>
                                        <span>2 ngày 1 đêm</span>
                                        <p>1.999.999 VNĐ</p>
                                    </div>
                                    <p className={cx('vacation__item-title')}>
                                    Lý Sơn giống như một ốc đảo thần tiên giấu mình trong vẻ đẹp hoang sơ giữa bao la đất trời. Hãy cùng Vietravel du lịch đảo Lý Sơn để khám phá những thú vị về “thiên đường giữa biển khơi” - một báu vật tự nhiên của Quảng Ngãi.
                                    </p>
                                    <Button
                                        className={cx('vacation__item-btn')}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Đặt vé
                                    </Button>
                                </div>
                            </div>
                            <div className={cx('vacation__item')}>
                                <img src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/10/tour-featured-img-3.jpg" alt="" className={cx('vacation__item-img')} />
                                <div className={cx('vacation__item-text')}>
                                    <h4 className={cx('vacation__item-name')}>Đảo Lý Sơn</h4>
                                    <div className={cx('vacation__item-location')}>
                                        <LocationOnOutlinedIcon className={cx('icon')}/>
                                        <span>Lý Sơn</span>
                                    </div>
                                    <div className={cx('vacation__item-price')}>
                                        <span>2 ngày 1 đêm</span>
                                        <p>1.999.999 VNĐ</p>
                                    </div>
                                    <p className={cx('vacation__item-title')}>
                                    Lý Sơn giống như một ốc đảo thần tiên giấu mình trong vẻ đẹp hoang sơ giữa bao la đất trời. Hãy cùng Vietravel du lịch đảo Lý Sơn để khám phá những thú vị về “thiên đường giữa biển khơi” - một báu vật tự nhiên của Quảng Ngãi.
                                    </p>
                                    <Button
                                        className={cx('vacation__item-btn')}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Đặt vé
                                    </Button>
                                </div>
                            </div>
                            <div className={cx('vacation__item')}>
                                <img src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/10/tour-featured-img-3.jpg" alt="" className={cx('vacation__item-img')} />
                                <div className={cx('vacation__item-text')}>
                                    <h4 className={cx('vacation__item-name')}>Đảo Lý Sơn</h4>
                                    <div className={cx('vacation__item-location')}>
                                        <LocationOnOutlinedIcon className={cx('icon')}/>
                                        <span>Lý Sơn</span>
                                    </div>
                                    <div className={cx('vacation__item-price')}>
                                        <span>2 ngày 1 đêm</span>
                                        <p>1.999.999 VNĐ</p>
                                    </div>
                                    <p className={cx('vacation__item-title')}>
                                    Lý Sơn giống như một ốc đảo thần tiên giấu mình trong vẻ đẹp hoang sơ giữa bao la đất trời. Hãy cùng Vietravel du lịch đảo Lý Sơn để khám phá những thú vị về “thiên đường giữa biển khơi” - một báu vật tự nhiên của Quảng Ngãi.
                                    </p>
                                    <Button
                                        className={cx('vacation__item-btn')}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Đặt vé
                                    </Button>
                                </div> 
                            </div>
                        </div>
                    </div>

                </div>

                <div className={cx('travel__review')}>
                    <img src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/09/h1-parallax-img-1.jpg" className={cx('travel__review-img')} alt=""/>
                    <div className={cx('travel__review-heading')}>
                        <div className={cx('travel__review-text')}>
                            <span>Bài viết nổi bật</span>
                            <h1>Đánh Giá Du Lịch</h1>
                            <p>Hãy trải nghiệm du lịch của chúng tôi, chúng tôi sẽ đêm lại một trải nghiệm tốt nhất cho bạn ! Vui lòng đặt vé ngay nào</p>
                        </div>
                        <div className={cx('container')}>
                            <div className={cx('travel__review-list')}>
                                <div className={cx('travel__review-item')}>
                                    <img src="	https://setsail.qodeinteractive.com/wp-content/uploads/2018/10/tour-featured-img-3.jpg" className={cx('travel__review-item-img')} alt="" />
                                    <div className={cx('travel__review-item-text')}>
                                        <h4 className={cx('name')}>Đảo Lý Sơn</h4>
                                        <div className={cx('star')}>
                                            <StarBorderOutlinedIcon className={cx('start-icon')}/>
                                            <StarBorderOutlinedIcon className={cx('start-icon')}/>
                                            <StarBorderOutlinedIcon className={cx('start-icon')}/>
                                            <StarBorderOutlinedIcon className={cx('start-icon')}/>
                                            <StarHalfOutlinedIcon className={cx('start-icon')}/>
                                        </div>
                                        <span className={cx('title')}>
                                        Lý Sơn giống như một ốc đảo thần tiên có vẻ đẹp hoang sơ giữa bao la đất trời
                                        </span>
                                        <p className={cx('location')}>Quảng Ngãi</p>
                                    </div>
                                </div>
                                <div className={cx('travel__review-item')}>
                                    <img src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/10/tour-featured-img-3.jpg" className={cx('travel__review-item-img')} alt="" />
                                    <div className={cx('travel__review-item-text')}>
                                        <h4 className={cx('name')}>Đảo Lý Sơn</h4>
                                        <div className={cx('star')}>
                                            <StarBorderOutlinedIcon className={cx('start-icon')}/>
                                            <StarBorderOutlinedIcon className={cx('start-icon')}/>
                                            <StarBorderOutlinedIcon className={cx('start-icon')}/>
                                            <StarBorderOutlinedIcon className={cx('start-icon')}/>
                                            <StarHalfOutlinedIcon className={cx('start-icon')}/>
                                        </div>
                                        <span className={cx('title')}>
                                        Lý Sơn giống như một ốc đảo thần tiên có vẻ đẹp hoang sơ giữa bao la đất trời
                                        </span>
                                        <p className={cx('location')}>Quảng Ngãi</p>
                                    </div>
                                </div>
                                <div className={cx('travel__review-item')}>
                                    <img src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/10/tour-featured-img-3.jpg" className={cx('travel__review-item-img')} alt="" />
                                    <div className={cx('travel__review-item-text')}>
                                        <h4 className={cx('name')}>Đảo Lý Sơn</h4>
                                        <div className={cx('star')}>
                                            <StarBorderOutlinedIcon className={cx('start-icon')}/>
                                            <StarBorderOutlinedIcon className={cx('start-icon')}/>
                                            <StarBorderOutlinedIcon className={cx('start-icon')}/>
                                            <StarBorderOutlinedIcon className={cx('start-icon')}/>
                                            <StarHalfOutlinedIcon className={cx('start-icon')}/>
                                        </div>
                                        <span className={cx('title')}>
                                        Lý Sơn giống như một ốc đảo thần tiên có vẻ đẹp hoang sơ giữa bao la đất trời
                                        </span>
                                        <p className={cx('location')}>Quảng Ngãi</p>
                                    </div>
                                </div>
                            
                        
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>

        </div>
     );
}

export default Home;