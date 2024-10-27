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

import "./styles/app.module.scss";

function App() {
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        const cookieData = Cookies.get("auth");
        if (cookieData) {
          const token = JSON.parse(cookieData).AccessToken;
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
        <Route path="/news-detail" element={<NewsDetail />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/tours" element={<Tour />} />
        <Route path="/tours/:id" element={<Details />} />
        <Route path="/booking-history" element={<BookingHistory />} />
        <Route path="/reset-password" element={<FormPasswordReset />} />
        <Route path="/auth" element={<SiginPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
