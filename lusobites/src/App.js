// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Dashboard from './pages/Admin/Dashboard';
import AddRecipe from './pages/Admin/AddRecipe';
import RecipeManagement from './pages/Admin/RecipeManagement';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import MainLayout from './layouts/MainLayout';
// Outros imports...

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/receitas" element={<MainLayout>...</MainLayout>} />
        
        {/* Rotas de Admin */}
        <Route path="/admin" element={
          <ProtectedRoute isAdmin={true}>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/dashboard" element={
          <ProtectedRoute isAdmin={true}>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/recipes" element={
          <ProtectedRoute isAdmin={true}>
            <AdminLayout>
              <RecipeManagement />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/add-recipe" element={
          <ProtectedRoute isAdmin={true}>
            <AdminLayout>
              <AddRecipe />
            </AdminLayout>
          </ProtectedRoute>
        } />
        
        {/* Adicione mais rotas de admin aqui */}
      </Routes>
    </Router>
  );
}

export default App;