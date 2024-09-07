import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/layouts/header";
import Footer from "./components/layouts/footer";
import Home from "./components/pages/home";
import Details from "./components/pages/details";
import ListTravel from "./components/list__travel";
import Booking from "./components/booking";
import BookingHistory from "./components/booking__history";
import FormPasswordReset from "./components/auth/reset__password";
import SiginPage from "./components/pages/siginPage";
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
        <Route path="/booking-history" element={<BookingHistory />} />
        <Route path="/reset-password" element={<FormPasswordReset />} />
        <Route path="/auth" element={<SiginPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
