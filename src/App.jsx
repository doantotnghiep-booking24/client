import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';

import Header from './components/layouts/header';
import Footer from './components/layouts/footer';
import Home from './components/pages/home';
import './styles/app.module.scss';



function App() {

  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      <Footer />
    </Router>
      
  )
}

export default App
