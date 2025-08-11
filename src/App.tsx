import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import './App.css'

import MenuPrincipal from "./features/administrador/pages/menuPrincipal/menuPrincipal";
import Login from "./features/administrador/pages/login/login";

function App() {
  
  return (
    <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MenuPrincipal />} />
        </Routes>
    </Router>
  )
}

export default App
