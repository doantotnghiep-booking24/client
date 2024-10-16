import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import styles from "./sider.module.scss";
import classNames from "classnames/bind";
import ClearIcon from "@mui/icons-material/Clear";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import Pagination from "@mui/material/Pagination";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
const cx = classNames.bind(styles);
const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
];

export default function SideBarComponent({ reviewButton }) {
  const [state, setState] = React.useState({
    right: false,
  });
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: {
          xs: "100%", // Full width on extra small screens
          sm: 400, // 400px on small screens
          md: 750, // 700px on medium screens and up
        },
      }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div>
        <div className={cx("box-top")}>
          <div className={cx("box-1")}>
            <h4>Guest reviews for Căn hộ cao cấp The Sóng Vũng Tàu</h4>
            <Button
              style={{ padding: "5px" }}
              onClick={toggleDrawer(reviewButton, false)}
            >
              <ClearIcon />
            </Button>
          </div>
          <Button
            style={{ padding: "5px", marginTop: "10px", fontWeight: "700" }}
            variant="outlined"
          >
            Viết Đánh giá
          </Button>
        </div>
        <div className={cx("box-top")}>
          {" "}
          <div className={cx("box-1")}>
            <h4>Các đánh giá</h4>
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
              <InputLabel id="demo-select-small-label">
                Sắp xếp đánh giá theo:
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <div className={cx("slider-item")}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <div>
                <h3 style={{ margin: 0 }}>{"Tran Quoc Duong"}</h3>
                <p
                  className="review-date"
                  style={{ margin: 0, fontSize: "12px" }}
                >
                  October 1, 2024
                </p>
                <Rating name="size-small" defaultValue={1} size="small" />
                <p
                  className="review-content"
                  style={{
                    textOverflow: "ellipsis",
                    whiteSpace: "wrap",
                    overflow: "hidden",
                  }}
                >
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. In
                  velit beatae officiis, deserunt doloribus autem ad voluptas
                  ducimus voluptates ea natus rem dolore. Soluta recusandae, eum
                  in sint totam earum.
                </p>

                <ImageList
                  sx={{ width: 250, height: 90 }}
                  cols={3}
                  rowHeight={50}
                  style={{
                    margin: 0,
                  }}
                >
                  {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        srcSet={`${item.img}?w=160&h=160&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.img}?w=160&h=160&fit=crop&auto=format`}
                        alt={item.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
                <Button variant="text">
                  <ThumbUpOffAltIcon />
                </Button>
                <Button variant="text">
                  <ThumbDownOffAltIcon />
                </Button>
              </div>
            </div>
            <Divider />
            <div className={cx("slider-item")}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <div>
                <h3 style={{ margin: 0 }}>{"Tran Quoc Duong"}</h3>
                <p
                  className="review-date"
                  style={{ margin: 0, fontSize: "12px" }}
                >
                  October 1, 2024
                </p>
                <Rating name="size-small" defaultValue={1} size="small" />
                <p
                  className="review-content"
                  style={{
                    textOverflow: "ellipsis",
                    whiteSpace: "wrap",
                    overflow: "hidden",
                  }}
                >
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. In
                  velit beatae officiis, deserunt doloribus autem ad voluptas
                  ducimus voluptates ea natus rem dolore. Soluta recusandae, eum
                  in sint totam earum.
                </p>
                <Button variant="text">
                  <ThumbUpOffAltIcon />
                </Button>
                <Button variant="text">
                  <ThumbDownOffAltIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            padding: "10px",
          }}
        >
          <Pagination count={10} shape="rounded" />
        </div>
      </div>
      <Divider />
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(reviewButton, true)}
            variant="outlined"
            sx={{ marginLeft: "10px", marginTop: "10px" }}
          >
            {"Tất cả đánh giá"}
          </Button>
          <SwipeableDrawer
            anchor={reviewButton}
            open={state[reviewButton]}
            onClose={toggleDrawer(reviewButton, false)}
            onOpen={toggleDrawer(reviewButton, true)}
            sx={{
              "& .MuiDrawer-paper": {
                // Target the drawer paper (the actual content area)
                borderTopLeftRadius: "10px", // Set border-radius for top-left
                borderBottomLeftRadius: "10px", // Set border-radius for bottom-left
                width: {
                  xs: "100%", // Full width on extra small screens
                  sm: 450, // 400px on small screens
                  md: 770, // 700px on medium screens and up
                },
              },
            }}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
