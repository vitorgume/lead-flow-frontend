import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
        <Route path="/menu" element={<MenuPrincipal />} />
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App
