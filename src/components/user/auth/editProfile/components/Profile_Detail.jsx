/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  TextField,
  Button,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  MenuItem,
  Select,
} from "@mui/material";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { dataCountry } from "../../../../../data/mockDataCountry";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../../../redux/features/AuthSlice";
import ModalEditImg from "./modal/ModalEditImg";
function createData(name, title, historyItem) {
  return {
    name,
    title,
    history: historyItem,
  };
}

function Row({
  row,
  openIndex,
  setOpenIndex,
  handleInputChange,
  handleSave,
  setFormValues,
  formValues,
}) {
  const isOpen = openIndex === row.name;

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell
          align="left"
          sx={{
            width: "30%",
            fontSize: "17px",
            fontFamily:
              "BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;",
          }}
        >
          {row.name}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          align="left"
          sx={{
            width: "60%",
            fontSize: "15px",
            fontFamily:
              "BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;",
          }}
        >
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, padding: 0 }}>
              {row.history?.map((historyRow) => (
                <div
                  key={historyRow.id}
                  style={{
                    display: "block", // Chuyển sang dạng khối đứng để mỗi input ở dòng riêng
                    padding: "5px 0", // Thêm khoảng cách giữa các dòng
                  }}
                >
                  {historyRow.name === "country" ? (
                    <Select
                      name="country"
                      value={formValues.country || ""}
                      onChange={(e) => handleInputChange(row.name, e)}
                      displayEmpty
                      sx={{
                        marginBottom: "10px",
                        width: "100%",
                        maxWidth: "150px",
                      }} // Đảm bảo Select có độ rộng hợp lý
                    >
                      <MenuItem value="" disabled>
                        Chọn quốc gia
                      </MenuItem>
                      {dataCountry.map((option) => (
                        <MenuItem key={option.code} value={option.code}>
                          {option.name} + {option.phone}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : historyRow.name === "phoneNumber" ? (
                    <TextField
                      type={historyRow.type}
                      name="phoneNumber"
                      defaultValue={historyRow.value}
                      placeholder="Enter your phone number"
                      onChange={(e) => handleInputChange(row.name, e)}
                      fullWidth // Đặt độ rộng input tối đa
                      sx={{
                        marginBottom: "10px",
                        "& .MuiInputBase-root": { height: "34px" },
                      }}
                    />
                  ) : historyRow.name === "gender" ? (
                    <Select
                      name="gender"
                      value={formValues.gender || ""}
                      onChange={(e) => handleInputChange(row.name, e)}
                      displayEmpty
                      fullWidth
                      sx={{
                        width: "100%",
                      }}
                    >
                      <MenuItem value="" disabled>
                        Chọn giới tính
                      </MenuItem>
                      <MenuItem value="male">Nam</MenuItem>
                      <MenuItem value="female">Nữ</MenuItem>
                      <MenuItem value="other">Khác</MenuItem>
                    </Select>
                  ) : (
                    <TextField
                      type={historyRow.type}
                      name={historyRow.name}
                      defaultValue={historyRow.value}
                      placeholder={historyRow.span}
                      onChange={(e) => handleInputChange(row.name, e)}
                      fullWidth
                      sx={{
                        marginBottom: "10px",
                        "& .MuiInputBase-root": { height: "34px" },
                      }}
                    />
                  )}
                </div>
              ))}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  marginTop: "10px",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#006ce4" }}
                  onClick={handleSave}
                >
                  Lưu
                </Button>
              </Box>
            </Box>
          </Collapse>

          {!isOpen && <span>{row.title}</span>}
        </TableCell>

        <TableCell>
          <Button
            size="small"
            onClick={() => {
              if (isOpen) {
                setOpenIndex(null);
                setFormValues({});
              } else {
                setOpenIndex(row.name);
              }
            }}
            variant="text"
            disabled={openIndex !== null && openIndex !== row.name}
            sx={{
              textTransform: "capitalize",
              fontSize: "13px",
              fontWeight: "bold",
            }}
          >
            {isOpen ? "Hủy" : "Edit"}
          </Button>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    history: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        span: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  openIndex: PropTypes.string,
  setOpenIndex: PropTypes.func.isRequired,
  formValues: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

const Profile_Detail = () => {
  const dispatch = useDispatch();
  const dataAuth = useSelector((state) => state.auth);
  const [openIndex, setOpenIndex] = React.useState(null);
  const [formValues, setFormValues] = React.useState({});
  const [user, setUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [urlImg, setUrlImg] = useState("");
  const getUserFromCookies = () => {
    const dataCookie = Cookies.get("auth");
    if (dataCookie) {
      try {
        const userData = JSON.parse(dataCookie);
        setUser(userData);
        setFormValues({
          ...formValues,
        });
      } catch (error) {
        console.error("Lỗi khi parse JSON từ cookie:", error);
      }
    } else {
      setUser({});
      setFormValues({});
    }
  };

  useEffect(() => {
    getUserFromCookies();
  }, []);

  const rows = [
    createData("Name", user.Name || "", [
      {
        id: 1,
        span: "Enter your Name",
        name: "Name",
        value: user.Name || "",
      },
    ]),
    createData("Tên hiển thị", user?.disPlayName || "Chọn tên hiển thị", [
      {
        id: 2,
        span: "Enter your DisplayName",
        name: "disPlayName",
        value: user.disPlayName || "", // Cập nhật value từ state
      },
    ]),
    createData("Địa chỉ email", user.Email || "", [
      {
        id: 3,
        span: "Enter your Email",
        name: "Email",
        value: user.Email || "",
      },
    ]),
    createData("Số điện thoại", "Thêm số điện thoại của bạn", [
      {
        id: 1,
        span: "Enter your Country",
        name: "country",
      },
      {
        id: 2,
        span: "Enter your Phone Number",
        name: "phoneNumber",
        type: "number",
        value: formValues.phoneNumber || "", // Lấy từ formValues nếu cần
      },
    ]),
    createData("Ngày sinh", "Nhập ngày sinh của bạn", [
      {
        id: 3,
        span: "Enter your Date Of Birth",
        name: "dateOfBirth",
        type: "date",
        value: formValues.dateOfBirth || "", // Lấy từ formValues nếu cần
      },
    ]),
    createData("Giới tính", "Chọn giới tính của bạn", [
      {
        id: 1,
        span: "Enter your Gender",
        name: "gender",
      },
    ]),
    createData("Địa chỉ", "Thêm địa chỉ của bạn", [
      {
        id: 1,
        span: "Enter your Address",
        name: "address",
      },
    ]),
  ];
  const handleInputChange = (rowName, e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    const api = `https://bookingtravel-44jm.onrender.com/User/Edit-User/${user._id}`;

    const formData = new FormData();

    if (formValues.photoUrl) {
      formData.append("photoUrl", formValues.photoUrl);
    }

    for (const key in formValues) {
      if (key !== "photoUrl") {
        formData.append(key, formValues[key]);
      }
    }

    try {
      const res = await axios.put(api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const updatedUser = { ...user, ...res.data.data };
      dispatch(updateUser(res.data.data));
      setUser(updatedUser);
      setOpenIndex(null);
      setIsOpen(false);
      setFormValues({});
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeImg = (img) => {
    setIsOpen(true);
    console.log("img", img);
    setUrlImg(img);
  };


  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <h2 style={{ fontWeight: "bold", color: "black" }}>
            Thông tin cá nhân
          </h2>
          <h6>Cập nhật thông tin của bạn và tìm hiểu cách nó được sử dụng.</h6>
        </Box>
        <Box
          onClick={() => handleChangeImg(user?.photoUrl)}
          sx={{
            height: "70px",
            width: "70px",
            position: "relative",
            cursor: "pointer",
          }}
        >
          <Avatar
            src={user?.photoUrl ? user?.photoUrl : "L"}
            sx={{ width: 66, height: 66 }}
          />
          <CenterFocusWeakIcon
            sx={{
              color: "white",
              position: "absolute",
              bottom: 7,
              left: "20px",
            }}
          />
        </Box>
      </div>
      <Divider />
      <TableContainer
        component={Paper}
        sx={{ border: "none", boxShadow: "none" }}
      >
        <Table
          aria-label="collapsible table"
          sx={{ borderCollapse: "collapse", "& th, & td": { border: "none" } }}
        >
          <TableBody>
            {rows.map((row) => (
              <React.Fragment key={row.name}>
                <Row
                  row={row}
                  openIndex={openIndex}
                  setOpenIndex={setOpenIndex}
                  formValues={formValues}
                  handleInputChange={handleInputChange}
                  handleSave={handleSave}
                  setFormValues={setFormValues}
                />
                <Divider />
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <ModalEditImg
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        urlImg={urlImg}
        setUrlImg={setUrlImg}
        setFormValues={setFormValues}
        handleSave={handleSave}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Profile_Detail;
