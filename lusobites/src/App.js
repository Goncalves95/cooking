// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import RecipeDetail from './pages/RecipeDetail/RecipeDetail';
// Importar outras páginas conforme necessário

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Adicione outras rotas conforme necessário */}
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/category/:category" element={<Home />} />
        <Route path="/country/:country" element={<Home />} />
        <Route path="/login" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;