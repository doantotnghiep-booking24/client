import classNames from "classnames/bind";
import styles from "./news__detail.module.scss";
import { Link, useParams } from "react-router-dom"; // Thêm import useParams
import { useQuery } from "@tanstack/react-query";
import { fetchNewDetails } from "../../../services/fetchNewDetails";
import { fetchNewsData } from "../../../services/fetchNews";
import { fetchFeaturedLocationData } from "../../../services/fetchFeaturedLocation";
import { fetchFeaturedLocationDetail } from "../../../services/fetchFeaturedLocationDetail";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);

function NewsDetail() {
  const [querylocation, setQuerylocation] = useState([])
  const [querynews, setQuerynews] = useState([])
  // const querynews = useQuery({
  //   queryKey: ["news"],
  //   queryFn: fetchNewsData,
  //   initialData: [],
  //   staleTime: 180000,
  // });
  useEffect(() => {
    const handleGetNewsData = async () => {
      const res = await fetchNewsData()
      setQuerynews(res)

    }
    handleGetNewsData()
  }, [])
  // const querylocation = useQuery({
  //   queryKey: ["featured"],
  //   queryFn: fetchFeaturedLocationData,
  //   initialData: [],
  //   staleTime: 180000,
  // });
  useEffect(() => {
    const handleGetfetchFeaturedLocation = async () => {
      const res = await fetchFeaturedLocationData()
      console.log(res);
      setQuerylocation(res)

    }
    handleGetfetchFeaturedLocation()
  }, [])

  const { id } = useParams(); // Lấy id từ URL
  const { data: newsItem } = useQuery({
    queryKey: ["news", id],
    queryFn: () => fetchNewDetails(id),
  });

  const { data: Featured_LocationItem } = useQuery({
    queryKey: ["featured", id],
    queryFn: () => fetchFeaturedLocationDetail(id),
  });
  console.log(Featured_LocationItem);
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
      {newsItem && (
        <div className={cx("container")}>
          <div className={cx("content")}>
            <div className={cx("content__main")}>
              <div className={cx("content__home")}>
                <div className={cx("list__image")}>
                  <div className={cx("image-heading")}>
                    <img src={newsItem.Image[0]?.path} alt={newsItem.Name} />
                  </div>
                  <div className={cx("image-sub")}>
                    <img
                      src={newsItem.Image[1]?.path}
                      alt={newsItem.Name}
                      className={cx("img1")}
                    />
                    <img
                      src={newsItem.Image[2]?.path}
                      alt={newsItem.Name}
                      style={{ marginTop: 15 }}
                      className={cx("img2")}
                    />
                  </div>
                </div>
                <div
                  className={cx("new-detail")}
                  style={{ display: "flex", marginTop: "10px" }}
                >
                  <div className={cx("left-detail")} style={{ width: "65%" }}>
                    <h4 className={cx("name")}>
                      {newsItem.Name}
                    </h4>
                    <h5 className={cx("title")} >
                      {newsItem.Title}
                    </h5>
                    <p
                      className={cx("description")}
                    // style={{ fontSize: "1.2vw" }}
                    >
                      {newsItem.Content}
                    </p>
                  </div>
                  <div
                    className={cx("right-detail")}
                    style={{
                      marginLeft: "6%",
                      height: "fit-content",
                      width: "29%",
                      backgroundColor: "#fff",
                      marginTop: "30px",
                      padding: "5px", // Thêm padding để nội dung không sát lề
                      borderRadius: "5px", // Bo góc cho container
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Đổ bóng nhẹ
                    }}
                  >
                    <h2
                      style={{
                        marginLeft: "15px",
                        fontSize: "1.8rem",
                        fontWeight: "bold",
                        color: "#333",
                        marginBottom: "20px",
                      }}
                    >
                      Các bài viết khác
                    </h2>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {querynews.filter(item => !item.isDeleted)
                        .sort(() => Math.random() - 0.5)
                        .slice(0, 7)
                        .map((item) => (
                          <li
                            key={item._id}
                            style={{ marginBottom: "15px", display: "flex" }}
                          >
                            {/* Hình ảnh */}
                            <Link to={`/detail/${item._id}`} >
                              <img
                                src={item.Image[0]?.path}
                                alt={item.Name}
                                style={{
                                  cursor: 'pointer',
                                  minWidth: "100px",
                                  maxWidth: "100px",
                                  height: "70px",
                                  objectFit: "cover",
                                  borderRadius: "5px",
                                  marginRight: "10px",
                                  marginLeft: "10px",
                                }}
                              />
                            </Link>
                            {/* Nội dung */}
                            <div>
                              <Link
                                to={`/detail/${item._id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "#333",
                                  fontWeight: "500",
                                  fontSize: "1rem",
                                  display: "block", // Đảm bảo nội dung nằm trên một dòng
                                  whiteSpace: "nowrap", // Không xuống dòng
                                  overflow: "hidden", // Ẩn phần tràn
                                  textOverflow: "ellipsis", // Hiển thị dấu chấm lửng nếu bị tràn
                                  maxWidth: "140px", // Đặt chiều rộng tối đa để kiểm soát độ dài
                                }}
                              >
                                {item.Name}
                              </Link>
                              <p
                                style={{
                                  marginTop: "5px",
                                  fontSize: "0.8rem",
                                  display: "block", // Đảm bảo nội dung nằm trên một dòng
                                  whiteSpace: "nowrap", // Không xuống dòng
                                  overflow: "hidden", // Ẩn phần tràn
                                  textOverflow: "ellipsis", // Hiển thị dấu chấm lửng nếu bị tràn
                                  maxWidth: "140px", // Đặt chiều rộng tối đa để kiểm soát độ dài
                                }}
                              >
                                {" "}
                                {item.Content}
                              </p>
                              <p
                                style={{
                                  margin: "5px 0 0",
                                  fontSize: "0.85rem",
                                  color: "#888",
                                }}
                              >
                                {new Date(item.Cretate_At).toLocaleDateString()}
                              </p>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {Featured_LocationItem && (
        <div className={cx("container")}>
          <div className={cx("content")}>
            <div className={cx("content__main")}>
              <div className={cx("content__home")}>
                <div className={cx("list__image")}>
                  <div className={cx("image-heading")}>
                    <img
                      src={Featured_LocationItem.Image_Location[0]?.path}
                      alt={Featured_LocationItem.Name_Location}
                    />
                  </div>
                  <div className={cx("image-sub")}>
                    <img
                      src={Featured_LocationItem.Image_Location[1]?.path}
                      alt={Featured_LocationItem.Name_Location}
                      className={cx("img1")}
                    />
                    <img
                      src={Featured_LocationItem.Image_Location[2]?.path}
                      alt={Featured_LocationItem.Name_Location}
                      style={{ marginTop: 15 }}
                      className={cx("img2")}
                    />
                  </div>
                </div>
                <div
                  className={cx("new-detail")}
                  style={{ display: "flex", marginTop: "10px" }}
                >
                  <div
                    className={cx("left-detail")}
                    style={{ width: "65%", marginRight: "5%" }}
                  >
                    <h4 className={cx("name")} style={{ fontSize: "calc(1.275rem + .3vw)" }}>
                      {Featured_LocationItem.Name_Location}
                    </h4>
                    <h5 className={cx("title")} style={{ fontSize: "1.25rem" }}>
                      {Featured_LocationItem.Address_Location}
                    </h5>
                    <p
                      className={cx("description")}
                      style={{ fontSize: "14px" }}
                    >
                      {Featured_LocationItem.Description}
                    </p>
                  </div>
                  <div
                    className={cx("right-detail")}
                    style={{
                      marginLeft: "13px",
                      height: "fit-content",
                      width: "29%",
                      backgroundColor: "#fff",
                      marginTop: "30px",
                      padding: "5px", // Thêm padding để nội dung không sát lề
                      borderRadius: "5px", // Bo góc cho container
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Đổ bóng nhẹ
                    }}
                  >
                    <h2
                      style={{
                        marginLeft: "15px",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#333",
                        marginBottom: "20px",
                        textAlign: 'center'
                      }}
                    >
                      Các bài viết khác
                    </h2>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {querylocation.filter(item => !item.isDeleted)
                        .sort(() => Math.random() - 0.5)
                        .slice(0, 7)
                        .map((item) => (
                          <li
                            key={item._id}
                            style={{ marginBottom: "15px", display: "flex" }}
                          >
                            {/* Hình ảnh */}
                            <Link to={`/detail/${item._id}`}>
                              <img
                                src={item.Image_Location[0]?.path}
                                alt={item.Name_Location}
                                style={{
                                  cursor: 'pointer',
                                  minWidth: "100px",
                                  maxWidth: "100px",
                                  height: "70px",
                                  objectFit: "cover",
                                  borderRadius: "5px",
                                  marginRight: "10px",
                                  marginLeft: "10px",
                                }}
                              />
                            </Link>

                            {/* Nội dung */}
                            <div>
                              <Link
                                to={`/detail/${item._id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "#333",
                                  fontWeight: "500",
                                  fontSize: "1rem",
                                  display: "block", // Đảm bảo nội dung nằm trên một dòng
                                  whiteSpace: "nowrap", // Không xuống dòng
                                  overflow: "hidden", // Ẩn phần tràn
                                  textOverflow: "ellipsis", // Hiển thị dấu chấm lửng nếu bị tràn
                                  maxWidth: "140px", // Đặt chiều rộng tối đa để kiểm soát độ dài
                                }}
                              >
                                {item.Name_Location}
                              </Link>
                              <p
                                style={{
                                  marginTop: "5px",
                                  fontSize: "0.8rem",
                                  display: "block", // Đảm bảo nội dung nằm trên một dòng
                                  whiteSpace: "nowrap", // Không xuống dòng
                                  overflow: "hidden", // Ẩn phần tràn
                                  textOverflow: "ellipsis", // Hiển thị dấu chấm lửng nếu bị tràn
                                  maxWidth: "140px", // Đặt chiều rộng tối đa để kiểm soát độ dài
                                }}
                              >
                                {" "}
                                {item.Address_Location}
                              </p>
                              <p
                                style={{
                                  margin: "5px 0 0",
                                  fontSize: "0.85rem",
                                  color: "#888",
                                }}
                              >
                                {item.City_Location}
                              </p>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewsDetail;
