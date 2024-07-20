import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';

import Header from './components/layouts/header';
import Footer from './components/layouts/footer';
import Home from './components/pages/home';
import Details from './components/pages/details';
import './styles/app.module.scss';



function App() {

  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/details" element={<Details/>} />
        </Routes>
      <Footer />
    </Router>
      
  )
}

export default App
