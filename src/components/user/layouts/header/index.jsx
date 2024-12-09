import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import { Box, Button, TextField } from "@mui/material";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import PinterestIcon from "@mui/icons-material/Pinterest";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import ReorderIcon from "@mui/icons-material/Reorder";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import classNames from "classnames/bind";
import styles from "./header.module.scss";
import { addAuth, logoutAuth } from "../../../../redux/features/AuthSlice";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { fetchToursData } from "../../../../services/fetchTours";
import { useQuery } from "@tanstack/react-query";
import Rating from "@mui/material/Rating";

const cx = classNames.bind(styles);
const BASE_URL = "http://localhost:3001/V1/Tours";

const fetchMenuTours = async () => {
  const response = await axios.get(`${BASE_URL}/GetTours`, {
    params: { page: 1, limit: 10 },
  });
  const availableTours = response.data.Tours.datas.filter(
    (tour) => !tour.isDeleted
  );
  return availableTours;
};

function Header() {
  const { data: selectTours } = useQuery({
    queryKey: ["tours"],
    queryFn: fetchToursData,
    initialData: [],
  });
  const { data: menuTours } = useQuery({
    queryKey: ["menuTours"],
    queryFn: fetchMenuTours,
  });

  const [searchName, setSearchName] = useState("");
  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState("");
  const navigate = useNavigate();
  const handleNameInput = (event) => {
    const value = event.target.value;
    setSearchName(value);
    if (value.trim() || event.key === "Enter") {
      const tourNames = selectTours
        .filter(
          (tour) =>
            !tour.isDeleted &&
            tour.Name_Tour.toLowerCase().includes(value.toLowerCase())
        )
        .map((tour) => tour.Name_Tour);
      setNameSuggestions([...new Set(tourNames)]);
      setIsSuggestionsVisible(true);
    } else {
      setNameSuggestions([]);
      setIsSuggestionsVisible(true);
    }
  };

  const handleSearch = (name) => {
    if (searchName.trim()) {
      navigate(`/tours?search=${encodeURIComponent(name)}`);
      setSearchName("");
    }
  };
  const handleSuggestionClick = (value) => {
    setSearchName(value);
    setIsSuggestionsVisible(false);
    handleSearch(value);
  };

  const closeSuggestions = (e) => {
    setTimeout(() => setIsSuggestionsVisible(false), 300);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const dataAuth = useSelector((state) => state.auth);
  // console.log(dataAuth);

  const user = (() => {
    try {
      const authCookie = Cookies.get("auth");

      if (!authCookie) {
        console.error("No 'auth' cookie found.");
        return null;
      }

      return JSON.parse(authCookie) || {}; // Parse the cookie, fallback to empty object if parsing fails
    } catch (error) {
      console.error("Lỗi khi parse JSON từ cookie:", error);
      return null; // Return an empty object if any error occurs during parsing
    }
  })();

  // Lấy thông tin auth từ cookie
  const getDataFromCookies = () => {
    const res = Cookies.get("auth");
    if (res) {
      try {
        const tokenObject = JSON.parse(res);
        dispatch(addAuth(tokenObject));
      } catch (error) {
        console.error("Error parsing auth cookie:", error);
      }
    }
  };

  const handleLogout = () => {
    dispatch(logoutAuth());
    setTimeout(() => {
      navigate("/");
    }, 500)
  };
  const isTokenExpired = (token) => {
    if (!token) return true;
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    return decoded.exp < currentTime;
  };

  const refreshAccessToken = async () => {
    const api = "http://localhost:3001/User/RefreshToken";

    try {
      const res = await axios.post(
        api,
        { token: user.RefreshToken },
        { withCredentials: true }
      );
      const data = await res.data;

      if (data.NewAccessToken) {
        dispatch(
          addAuth({
            ...dataAuth,
            AccessToken: data.NewAccessToken,
            RefreshToken: user.RefreshToken,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataFromCookies();
  }, []);

  useEffect(() => {
    if (user?.AccessToken) {
      if (isTokenExpired(user?.AccessToken)) {
        console.log("Token đã hết hạn, cố gắng refresh lại token.");
        refreshAccessToken();
      }
    } else {
      console.log("Không có Access Token, kiểm tra cookie.");
      const res = Cookies.get("auth");
      if (!res) {
        console.log("Không có token.");
      }
    }
  }, [dataAuth.AccessToken]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={cx("wrap")}>
      <nav className={cx("nav__main")}>
        <div className={cx("container")}>
          <div className={cx("navbar")}>
            <div className={cx("navbar__location")}>
              <a href="#" className={cx("navbar__email")}>
                <EmailOutlinedIcon
                  fontSize="small"
                  className={cx("navbar__location-icon")}
                />
                <span
                  className={cx("navbar__email-text", "navbar__location-title")}
                >
                  Foly@booking.com
                </span>
              </a>
              <a href="#" className={cx("navbar__phone")}>
                <PhoneIcon
                  fontSize="small"
                  className={cx("navbar__location-icon")}
                />
                <span
                  className={cx("navbar__phone-text", "navbar__location-title")}
                >
                  0357325956
                </span>
              </a>
              <a href="#" className={cx("navbar__address")}>
                <LocationOnOutlinedIcon
                  fontSize="small"
                  className={cx("navbar__location-icon")}
                />
                <span
                  className={cx(
                    "navbar__address-text",
                    "navbar__location-title"
                  )}
                >
                  Nguyễn Huy Tưởng - TP Đà Nẵng
                </span>
              </a>
              <a href="#" className={cx("navbar__help")}>
                <HelpCenterIcon
                  fontSize="small"
                  className={cx("navbar__location-icon")}
                />
                <span
                  className={cx(
                    "navbar__address-text",
                    "navbar__location-title"
                  )}
                >
                  Trợ giúp
                </span>
              </a>
            </div>
            <div className={cx("navbar__action")}>
              {/* <div className={cx("navbar__social")}>
                <FacebookIcon
                  fontSize="small"
                  className={cx("navbar__social-icon")}
                />
                <InstagramIcon
                  fontSize="small"
                  className={cx("navbar__social-icon")}
                />
                <LinkedInIcon
                  fontSize="small"
                  className={cx("navbar__social-icon")}
                />
                <PinterestIcon
                  fontSize="small"
                  className={cx("navbar__social-icon")}
                />
              </div> */}

              {user ? (
                <div
                  onClick={handleClick}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <Tooltip title="Account settings">
                    <IconButton
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar
                        sx={{ width: 32, height: 32 }}
                        alt={dataAuth.Name}
                        src={dataAuth.photoUrl ? dataAuth.photoUrl : "L"}
                      ></Avatar>
                    </IconButton>
                  </Tooltip>
                  <label
                    htmlFor=""
                    style={{ cursor: "pointer", fontSize: "14px" }}
                  >
                    {dataAuth && dataAuth.Name}
                  </label>

                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem
                      component={Link}
                      to="/edit-profile"
                      onClick={handleClose}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <PermIdentityIcon />
                      Quản lý tài khoản
                    </MenuItem>
                    <Divider />

                    <MenuItem>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                        onClick={() => {
                          handleLogout();
                          handleClose();
                        }}
                      >
                        <Logout fontSize="small" />
                        Đăng xuất
                      </div>
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
                  <Button
                    component={Link}
                    to="/auth"
                    sx={{
                      color : '#fff' ,
                      bgcolor: "#3fd0d4",
                      borderRadius : '30px',
                      width : '85px',
                      fontWeight: "600",
                      textTransform: "inherit",
                      "&:hover": {
                        bgcolor: "#3fd0d4",
                      },
                    }}
                  >
                    Đăng nhập
                  </Button>
                </Box>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className={cx("header__bg")}>
        <div className={cx("container")}>
          <header className={cx("header")}>
            <label
              htmlFor="mobile__menu-checkbox"
              className={cx("header__menu-mobile")}
            >
              <ReorderIcon sx={{ color: "#fff" }} />
            </label>
            <Link style={{cursor : 'pointer'}} to="/" className={cx("logo")}>
              <img
                src="https://i.pinimg.com/736x/18/c3/34/18c33493ba7ed7d680e0987855986225.jpg"
                alt=""
                className={cx("logo__img")}
              />
            </Link>
            <input
              type="checkbox"
              hidden
              id="mobile__menu-checkbox"
              className={cx("header__menu-checkbox")}
            ></input>
            <div className={cx("banner__section-search")}>
              <TextField
                className={cx("banner__section-search-name")}
                value={searchName}
                color="secondary"
                onChange={handleNameInput}
                placeholder="Tìm kiếm điểm đến"
                onBlur={(e) => closeSuggestions(e)}
                onFocus={() => setIsSuggestionsVisible(true)}
                sx={{
                  width: '280px',
                  borderRadius: "18px",
                  backgroundColor: "#f5f5f5",
                  border: "none",
                    borderColor: 'transparent',
                    outline : 'none',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: "18px",
                    height: "40px",
                    border: "none",
                    borderColor: 'transparent',
                    outline : 'none',
                    '& input': {
                      lineHeight: "1.5",
                      height: '100px',
                      outline: "none", // Remove outline from the input itself
                    },
                    '&:hover fieldset': {
                      borderColor: 'transparent', // Remove the border color on hover
                    },
                    '&.Mui-focused fieldset': {
                      border: 'none', // Border color on focus
                      outline: "none", // Remove the outline on focus

                    },
                  },
                  '& .MuiInputBase-root': {
                    border: 'none', // Loại bỏ viền của InputBase
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <SearchIcon
                      sx={{
                        color: "#757575",
                        marginRight: "8px",
                      }}
                    />
                  ),
                }}
              />
              {isSuggestionsVisible && (
                <Box
                  className={cx("suggestion-box")}
                  sx={{
                    position: "absolute",
                    backgroundColor: "#fff",
                    // width: "580px",
                    padding:"0 10px 0 10px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    borderRadius: "8px",
                    marginTop: "10px",
                    maxHeight: "500px",
                    overflowX: "hidden",
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                    overflowY: "scroll",
                    color: "#212121",
                    zIndex: 1000,
                    backgroundImage:
                      "https://res.klook.com/image/upload/v1639474405/osl4fpo0fblk5tgsgfmd.png",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                  }}
                >
                  {searchName.trim() === "" && (
                    <ul className={cx("search__menu-list")}>
                      {/* <p className={cx("heading")}>Lịch sử tìm kiếm</p> */}
                      <div style={{ display: "flex", gap: "15px" }}>
                        {/* {resultValueHistory?.map(history => ( 
                        <p style={{ background: '#f5f5f5', borderRadius: '99rem', width: '100%', height: '30px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', fontSize: '14px', lineHeight: '30px', textAlign: 'center' }}>{history}</p>
                      ))} */}
                      </div>

                      <span className={cx("heading")}>
                        Top tìm kiếm và đánh giá cao
                      </span>
                      {menuTours
                        ?.filter(
                          (tour) =>
                            tour.totalReview >= 4 && tour.totalReview <= 5
                        )
                        ?.map((tour) => (
                          <Link
                            to={`/tours/${tour._id}`}
                            key={tour._id}
                            className={cx("search__menu-item")}
                          >
                            <img
                              src={tour?.Image_Tour[0]?.path}
                              alt=""
                              className={cx("search__menu-image")}
                            />
                            <div className={cx("search__menu-heding")}>
                              <p className={cx("name")}>{tour.Name_Tour}</p>
                              {tour.totalReview > 0 && (
                                <Rating
                                  style={{ marginTop: "2px", color: "#f09b0a" }}
                                  name="size-small"
                                  value={tour.totalReview}
                                  size="small"
                                  precision={0.1}
                                  readOnly
                                  // emptyIcon
                                />
                              )}
                              <div className={cx("search__menu-sub")}>
                                <span className={cx("end")}>
                                  {tour.End_Tour}
                                </span>
                                <span className={cx("price")}>
                                  {tour.After_Discount > 0
                                    ? tour.After_Discount.toLocaleString(
                                        "vi-VN"
                                      )
                                    : tour.Price_Tour.toLocaleString("vi-VN")}
                                  đ
                                </span>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </ul>
                  )}
                  {searchName.trim() !== "" &&
                    nameSuggestions.map((name, index) => (
                      <Box
                        key={index}
                        onClick={() => handleSuggestionClick(name)}
                        className={cx("suggestion-item")}
                        sx={{
                          padding: "10px",
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "#f0f0f0",
                          },
                        }}
                      >
                        <SearchIcon
                          sx={{ marginRight: "10px", color: "#757575" }}
                        />
                        <span
                          dangerouslySetInnerHTML={{
                            __html: name.replace(
                              new RegExp(searchName, "gi"),
                              (match) =>
                                `<span style="color: #3fd0d4">${match}</span>`
                            ),
                          }}
                        />
                      </Box>
                    ))}
                </Box>
              )}
            </div>
            <ul className={cx("header__list")}>
              <li className={cx("header__item")}>
                <Link to="/" className={cx("header__link")}>
                  Trang chủ
                </Link>
              </li>
              {/* <li className={cx("header__item")}>
                <Link to="/details" className={cx("header__link")}>
                  Chi tiết
                </Link>
              </li> */}
              <li className={cx("header__item")}>
                <Link to="/list" className={cx("header__link")}>
                  Tin tức
                </Link>
              </li>
              <li className={cx("header__item")}>
                <Link to="/tours" className={cx("header__link")}>
                  Tour & Trải nghiệm
                </Link>
              </li>
              {/* <li className={cx("header__item")}>
                <Link to="/booking" className={cx("header__link")}>
                  Đặt vé
                </Link>
              </li> */}
              {/* <li className={cx("header__item")}>
                <Link to="/news-detail" className={cx("header__link")}>
                  chi tiết
                </Link>
              </li> */}
            </ul>
            <div className={cx("header__sub")}>
              <Button
                // onClick={showSwal}
                LinkComponent={Link}
                to="/tours"
                className={cx("header__sub-btn")}
                variant="contained"
                color="primary"
              >
                Khám phá
              </Button>
            </div>
            <div className={cx("acc__mobile")}>
              {user && <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2, marginLeft: 0 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  
                >
                  <Avatar sx={{ width: 32, height: 32 }}
                    alt={dataAuth.Name}
                    src={dataAuth.photoUrl ? dataAuth.photoUrl : "L"}>L</Avatar>
                </IconButton>
              </Tooltip>}

              {user ? <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  component={Link}
                  to="/edit-profile"
                  onClick={handleClose}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <PermIdentityIcon />
                  Quản lý tài khoản
                </MenuItem>
                <Divider />

                <MenuItem>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                    onClick={() => {
                      handleLogout();
                      handleClose();
                    }}
                  >
                    <Logout fontSize="small" />
                    Đăng xuất
                  </div>
                </MenuItem>
              </Menu> : <Button
                component={Link}
                to="/auth"
                sx={{
                  bgcolor: "white",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  "&:hover": {
                    bgcolor: "whitesmoke",
                  },
                }}
              >
                Đăng nhập
              </Button>}

            </div>
          </header>
        </div>
      </div>
    </div>
  );
}

export default Header;
