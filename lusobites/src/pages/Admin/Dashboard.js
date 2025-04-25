// src/pages/Admin/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #2a6fc8;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const AdminGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const AdminCard = styled(Link)`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const CardIcon = styled.div`
  font-size: 2.5rem;
  color: #2a6fc8;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const AdminStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background-color: #f8fafc;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #2a6fc8;
  margin-bottom: 0.5rem;
`;

const StatTitle = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const Dashboard = () => {
  // Você pode adicionar hooks useEffect para buscar estatísticas reais da API
  // Por enquanto, usaremos valores estáticos
  const stats = {
    totalRecipes: 27,
    totalUsers: 145,
    totalComments: 348,
    monthlyVisits: 12500
  };
  
  return (
    <PageContainer>
      <Title>Painel de Administração</Title>
      
      <AdminStats>
        <StatCard>
          <StatNumber>{stats.totalRecipes}</StatNumber>
          <StatTitle>Receitas Publicadas</StatTitle>
        </StatCard>
        
        <StatCard>
          <StatNumber>{stats.totalUsers}</StatNumber>
          <StatTitle>Usuários Registrados</StatTitle>
        </StatCard>
        
        <StatCard>
          <StatNumber>{stats.totalComments}</StatNumber>
          <StatTitle>Comentários</StatTitle>
        </StatCard>
        
        <StatCard>
          <StatNumber>{stats.monthlyVisits.toLocaleString()}</StatNumber>
          <StatTitle>Visitas este Mês</StatTitle>
        </StatCard>
      </AdminStats>
      
      <AdminGrid>
        <AdminCard to="/admin/recipes">
          <CardIcon>🍳</CardIcon>
          <CardTitle>Gerenciar Receitas</CardTitle>
          <CardDescription>Adicionar, editar e remover receitas</CardDescription>
        </AdminCard>
        
        <AdminCard to="/admin/add-recipe">
          <CardIcon>➕</CardIcon>
          <CardTitle>Nova Receita</CardTitle>
          <CardDescription>Adicionar uma nova receita ao site</CardDescription>
        </AdminCard>
        
        <AdminCard to="/admin/users">
          <CardIcon>👤</CardIcon>
          <CardTitle>Usuários</CardTitle>
          <CardDescription>Gerenciar usuários e permissões</CardDescription>
        </AdminCard>
        
        <AdminCard to="/admin/comments">
          <CardIcon>💬</CardIcon>
          <CardTitle>Comentários</CardTitle>
          <CardDescription>Moderar comentários dos usuários</CardDescription>
        </AdminCard>
        
        <AdminCard to="/admin/analytics">
          <CardIcon>📊</CardIcon>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>Visualizar estatísticas do site</CardDescription>
        </AdminCard>
        
        <AdminCard to="/admin/settings">
          <CardIcon>⚙️</CardIcon>
          <CardTitle>Configurações</CardTitle>
          <CardDescription>Ajustar configurações do site</CardDescription>
        </AdminCard>
      </AdminGrid>
    </PageContainer>
  );
};

export default Dashboard;