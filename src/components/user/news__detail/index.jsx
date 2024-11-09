import classNames from "classnames/bind";
import styles from "./news__detail.module.scss";
import { Link, useParams } from 'react-router-dom'; // Thêm import useParams
import { useQuery } from '@tanstack/react-query';
import { fetchNewDetails } from "../../../services/fetchNewDetails";
import { fetchNewsData } from "../../../services/fetchNews";

const cx = classNames.bind(styles);

function NewsDetail() {
  const querynews = useQuery({ queryKey: ['news'], queryFn: fetchNewsData, initialData: [], staleTime: 180000 })


  const { id } = useParams(); // Lấy id từ URL
  const { data: newsItem } = useQuery({
    queryKey: ["news", id],
    queryFn: () => fetchNewDetails(id),
  });
  console.log(newsItem);

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
                    <img
                      src={newsItem.Image[0]?.path}
                      alt={newsItem.Name}
                    />
                  </div>
                  <div className={cx("image-sub")}>
                    <img
                      src={newsItem.Image[1]?.path}
                      alt={newsItem.Name}
                    />
                    <img
                      src={newsItem.Image[2]?.path}
                      alt={newsItem.Name}
                      style={{ marginTop: 10 }}
                    />
                  </div>
                </div>
                <div className="new-detail" style={{ display: 'flex', marginTop: '10px' }}>
                  <div className="left-detail" style={{ width: '65%', marginRight: '5%' }}>
                    <h4 className={cx("name")}>{newsItem.Name}</h4>
                    <h5 className={cx("title")}>{newsItem.Title}</h5>
                    <p className={cx("description")} >{newsItem.Content}</p>
                  </div>
                  <div className="right-detail" style={{ width: '30%', backgroundColor: '#fff' }}>
                    <h2>CÁC BÀI VIẾT KHÁC</h2>
                    {querynews.data.sort(() => Math.random() - 0.5).slice(0, 3).map((item) => (
                      <Link to={`/news-detail/${item._id}`} key={item._id} style={{ textDecoration: 'none' }}>
                        <div >
                          <img key={item._id}
                            src={item.Image[0].path}
                            alt={item.Name} style={{ width: '99%', height: '150px' }} />
                          <p style={{ textDecoration: 'none', fontSize: '1.2vw' }}>{item.Name} </p>
                        </div>
                      </Link>
                    ))}
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
