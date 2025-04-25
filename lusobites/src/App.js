// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
// Importar outras páginas conforme necessário

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Adicione outras rotas conforme necessário */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;