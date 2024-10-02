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
import Tour from "./components/user/tours";
import "./styles/app.module.scss";

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/list" element={<ListTravel />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/tours" element={<Tour />} />
        <Route path="/booking-history" element={<BookingHistory />} />
        <Route path="/reset-password" element={<FormPasswordReset />} />
        <Route path="/auth" element={<SiginPage />} />
      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
