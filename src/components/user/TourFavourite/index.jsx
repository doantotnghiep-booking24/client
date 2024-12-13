import { useState, useEffect, useRef } from "react";
import styles from "./tourFavourite.module.scss";
import classNames from "classnames/bind";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import Rating from "@mui/material/Rating";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button, Tabs, Tab } from "@mui/material";
// import { fetchToursData } from "../../../services/fetchTours";
import { fetchCategories } from "../../../services/fetchCategory";
import { fetchTypeTours } from "../../../services/fetchTypeTours";
import { GetAllTicket } from "../../../services/getTicketsHistory";
import { useLocation } from "react-router-dom";
import { GetToursFavourite } from "../../../services/Tour_Favourite";
import { fetchToursData } from "../../../services/fetchTours";
import Cookies from "js-cookie";
const cx = classNames.bind(styles);
function Tour_Demo() {
    const [tourFavourites, setTourFavourites] = useState([])
    const [tourFavouritesFilter, setTourFavouritesFilter] = useState([])
    const [tours, setTours] = useState([])
    const Cookie = Cookies.get("auth")
    const id_User = JSON.parse(Cookie)._id

    const handleGetTour = async () => {
        const res = await fetchToursData()
        setTours(res)
    }
    const handleGetTourFavourite = async () => {
        const res = await GetToursFavourite()
        setTourFavourites(res.TourFavourite)
    }
    useEffect(() => {
        handleGetTour()
        handleGetTourFavourite()
    }, [])
    const result = tourFavourites?.filter((tourFav => tourFav.id_User.includes(id_User)))

    return (
        <div className={cx("wrap")}>
            <div className={cx("banner")}>
                <img
                    src="https://setsail.qodeinteractive.com/wp-content/uploads/2018/09/tour-list-title-img.jpg"
                    alt=""
                    className={cx("banner__img")}
                />
                <h2 className={cx("banner__title")}>Tour yêu thích</h2>
            </div>
            <div className={cx("container")}>
                <div className={cx("content")}>
                    <div className={cx("content__main")}>
                        <div className={cx("content__home")}>
                            <ul className={cx("content__home-list")}>
                                {tours?.map((tour) => (
                                    <>
                                        {result?.filter(tourFav => tourFav.id_Tour === tour._id).map(tourFav => (
                                            <Link key={tour._id} to={`/tours/${tour._id}`} style={{ textDecoration: 'none' }} className={cx("content__home-item")}>
                                                <div style={{ position: 'relative' }}>

                                                    <img
                                                        className={cx("content__home-img")}
                                                        src={tour.Image_Tour[0]?.path}
                                                        alt={tour.Name_Tour}
                                                    />
                                                    <div style={{ position: 'absolute', width: '100px', height: '30px', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '4px', margin: '8px 166px', top: 0 }}>
                                                        <p style={{ textAlign: 'center', lineHeight: '30px', color: '#fff' }}>{tour.End_Tour}</p>
                                                    </div>
                                                </div>
                                                <div className={cx("section")}>
                                                    {/* <h6 style={{ color: 'rgb(117, 117, 117)' }}>{tour.End_Tour}</h6> */}
                                                    <div className={cx("section__heading")}>
                                                        <h5 style={{ width: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} className={cx("section__heading-title")}>
                                                            {tour.Start_Tour} - {tour.Name_Tour}
                                                        </h5>
                                                        {tour.totalReview >= 4 && tour.totalReview <= 5 ? <div className={cx("section__heading-good")}>Tốt</div> : (tour.totalReview >= 3 && tour.totalReview < 4 ? <div className={cx("section__heading-good")}>Tb</div> : <div className={cx("section__heading-good")}>Tệ</div>)}
                                                    </div>
                                                    {tour.totalReview > 0 && (
                                                        <Rating style={{ marginTop: '0px', color: '#f09b0a', }}
                                                            name="size-small"
                                                            value={tour.totalReview}
                                                            size="small"
                                                            precision={0.1}
                                                            readOnly
                                                        // emptyIcon
                                                        />
                                                    )}
                                                    {tour.After_Discount > 0 ? <p className={cx("section-content")}>
                                                        {tour.Description_Tour}
                                                    </p> : <p className={cx("section-contents")}>
                                                        {tour.Description_Tour}
                                                    </p>}
                                                    {tour.After_Discount > 0 && <span className={cx("endow")}>Ưu Đãi Mùa Du Lịch</span>}
                                                    {/* <span className={cx("endow")}>{tour.After_Discount > 0 ? 'Ưu Đãi Mùa Du Lịch' : <span></span>}</span> */}
                                                    {/* <div className={cx("bottom")}>
                        <div>
                          <p className={cx("outstanding")}>
                            Tour du lịch nổi bật nhất
                          </p>
                        </div>
                      </div> */}

                                                    <div style={{ marginTop: '10px' }} className={cx("action")}>
                                                        {tour.Price_Tour && tour.After_Discount > 0 ? (
                                                            <div style={{ display: 'flex', gap: 5, lineHeight: '22px' }}>
                                                                <h4 className={cx("action__price")}>
                                                                    {tour.After_Discount.toLocaleString("vi-VN")}₫
                                                                </h4>
                                                                <span className={cx("action__price-discount")}>
                                                                    {tour.Price_Tour.toLocaleString("vi-VN")} ₫
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <h4 className={cx("action__price")}>
                                                                {tour.Price_Tour.toLocaleString("vi-VN")} ₫
                                                            </h4>
                                                        )}
                                                        {/* <Button
                          LinkComponent={Link}
                          to={`/tours/${tour._id}`}
                          variant="contained"
                          color="primary"
                          className={cx("vacation__item-btn")}
                        >
                          Xem chi tiết
                        </Button> */}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tour_Demo;
