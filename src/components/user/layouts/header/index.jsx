import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Button } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import ReorderIcon from "@mui/icons-material/Reorder";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import classNames from "classnames/bind";
import styles from "./header.module.scss";
import { addAuth, logoutAuth } from "../../../../redux/features/AuthSlice";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
// import Swal from "sweetalert2";

const cx = classNames.bind(styles);

function Header() {
  // const showSwal = () => {
  //   Swal.fire({
  //     title: "Đặt vé thành công!",
  //     text: "Cảm ơn bạn đã đặt vé",
  //     icon: "success",
  //     confirmButtonText: "OK",
  //   });
  // };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const dataAuth = useSelector((state) => state.auth);
  const navigate = useNavigate();

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
      const res = await axios.post(api, { token: dataAuth.RefreshToken });
      const data = await res.data;

      if (data.NewAccessToken) {
        dispatch(
          addAuth({
            ...dataAuth,
            AccessToken: data.NewAccessToken,
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
    if (dataAuth.AccessToken) {
      if (isTokenExpired(dataAuth.AccessToken)) {
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

  // Hàm để kiểm tra quyền đặt hàng
  const canPlaceOrder = () => {
    return dataAuth.AccessToken && !isTokenExpired(dataAuth.AccessToken);
  };

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
                  Nguyễn Huy Tưởng, Đà Nẵng
                </span>
              </a>
            </div>
            <div className={cx("navbar__action")}>
              <div className={cx("navbar__social")}>
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
              </div>
              {/* account mui */}

              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}> L</Avatar>
                </IconButton>
              </Tooltip>
              <label htmlFor="">{dataAuth && dataAuth.Name}</label>

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
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
                <MenuItem component={Link} to="/auth" onClick={handleClose}>
                  <Avatar fontSize="small" /> Tài khoản của tôi
                </MenuItem>
                <Divider />
                <MenuItem
                  component={Link}
                  to="/reset-password"
                  onClick={handleClose}
                >
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Cài đặt tài khoản
                </MenuItem>

                <MenuItem>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Đăng xuất
                </MenuItem>
              </Menu>
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
            <Link to="/" className={cx("logo")}>
              <img
                src="https://apps.odoo.com/web/image/loempia.module/31305/icon_image?unique=4696166"
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
                  Chuyến đi
                </Link>
              </li>
              {/* <li className={cx("header__item")}>
                <Link to="/booking" className={cx("header__link")}>
                  Đặt vé
                </Link>
              </li> */}
              <li className={cx("header__item")}>
                <Link to="/news-detail" className={cx("header__link")}>
                  chi tiết 
                </Link>
              </li>
              <li className={cx("header__item")}>
                <Link to="/booking-history" className={cx("header__link")}>
                  Lịch sửa đặt vé
                </Link>
              </li>
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
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>L</Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
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
                <MenuItem component={Link} to="/auth" onClick={handleClose}>
                  <Avatar fontSize="small" /> Tài khoản của tôi
                </MenuItem>
                <Divider />
                <MenuItem
                  component={Link}
                  to="/reset-password"
                  onClick={handleClose}
                >
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Cài đặt tài khoản
                </MenuItem>

                <MenuItem>
                  <div
                    style={{ display: "flex", alignItems: "center" }}
                    onClick={() => {
                      handleLogout();
                      handleClose();
                    }}
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Đăng xuất
                  </div>
                </MenuItem>
              </Menu>
            </div>
          </header>
        </div>
      </div>
    </div>
  );
}

export default Header;
