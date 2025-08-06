import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import './App.css'
import MenuVendedor from './features/vendedores/menuVendedor/menuVendedor';

function App() {
  
  return (
    <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<MenuVendedor />} />
        </Routes>
    </Router>
  )
}

export default App
