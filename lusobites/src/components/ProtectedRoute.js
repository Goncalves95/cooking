// src/components/ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdmin = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticação
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    setIsAuthenticated(!!token);
    setUserRole(user.role || 'user');
    setLoading(false);
  }, []);

  if (loading) {
    // Exibir spinner ou mensagem de carregamento
    return <div>Carregando...</div>;
  }

  // Se não estiver autenticado, redirecionar para login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se a rota requerer admin e o usuário não for admin
  if (isAdmin && userRole !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  // Se tudo estiver ok, renderizar o componente filho
  return children;
};

export default ProtectedRoute;