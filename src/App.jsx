import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/user/layouts/header";
import Footer from "./components/user/layouts/footer";
import Home from "./components/user/pages/home";
import Details from "./components/user/pages/details";
import ListTravel from "./components/user/list__travel";
import Booking from "./components/user/booking";
import BookingHistory from "./components/user/booking__history";
import FormPasswordReset from "./components/user/auth/reset__password";
import SiginPage from "./components/user/pages/siginPage";
import axios from "axios";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Tour from "./components/user/tours";
import NewsDetail from "./components/user/news__detail";
import Booked from "./components/user/booked";
import "./styles/app.module.scss";

import EditProfile from "./components/user/auth/editProfile/index.jsx";
import Profile_Detail from "./components/user/auth/editProfile/components/Profile_Detail.jsx";
import Setting from "./components/user/auth/editProfile/components/Setting.jsx";
import Tour_Demo from "./components/user/tour_demo/Tour_Demo.jsx";

function App() {
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        const cookieData = Cookies.get("auth");
        if (cookieData) {
          const token = JSON.parse(cookieData).AccessToken;
          console.log(token);

          if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
          }
        }
        console.log("Authorization Header:", config.headers["Authorization"]);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<ListTravel />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/news-detail/:id" element={<NewsDetail />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/tours" element={<Tour_Demo />} />
        <Route path="/tours/:id" element={<Details />} />
        <Route path="/booked" element={<Booked />} />
        <Route path="/booking-history" element={<BookingHistory />} />
        <Route path="/reset-password" element={<FormPasswordReset />} />
        <Route path="/auth" element={<SiginPage />} />
      </Routes>

      <Routes>
        <Route path="/edit-profile" element={<EditProfile />}>
          <Route path="/edit-profile" element={<Profile_Detail />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
