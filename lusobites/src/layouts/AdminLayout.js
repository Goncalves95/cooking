// src/layouts/AdminLayout.js
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #1e293b;
  color: white;
  padding: 1.5rem 0;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    z-index: 100;
    transition: transform 0.3s;
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 250px;
  background-color: #f8fafc;
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Header = styled.header`
  background-color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2a6fc8;
`;

const SidebarNavigation = styled.nav`
  margin-top: 2rem;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: ${({ isActive }) => isActive ? 'white' : '#94a3b8'};
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;
  
  &:hover {
    background-color: #334155;
    color: white;
  }
  
  ${({ isActive }) => isActive && `
    background-color: #334155;
    border-left: 4px solid #2a6fc8;
  `}
`;

const NavIcon = styled.span`
  margin-right: 0.75rem;
  font-size: 1.25rem;
`;

const NavLabel = styled.span`
  font-size: 0.95rem;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
`;

const UserInfo = styled.div`
  margin-right: 1rem;
`;

const UserName = styled.div`
  font-weight: 600;
  color: #334155;
`;

const UserRole = styled.div`
  font-size: 0.8rem;
  color: #64748b;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #dc2626;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.95rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Content = styled.div`
  padding: 2rem;
`;

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Menu items para a sidebar
  const menuItems = [
    { path: '/admin/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/admin/recipes', icon: '🍲', label: 'Receitas' },
    { path: '/admin/add-recipe', icon: '➕', label: 'Adicionar Receita' },
    { path: '/admin/users', icon: '👥', label: 'Usuários' },
    { path: '/admin/comments', icon: '💬', label: 'Comentários' },
    { path: '/admin/analytics', icon: '📊', label: 'Analytics' },
    { path: '/admin/settings', icon: '⚙️', label: 'Configurações' }
  ];
  
  // Buscar informações do usuário do localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  // Função para fazer logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  
  // Verificar se o menu está ativo
  const isActive = (path) => location.pathname === path;
  
  // Alternar sidebar mobile
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  return (
    <LayoutContainer>
      <Sidebar isOpen={sidebarOpen}>
        <Logo style={{ textAlign: 'center', padding: '0 1.5rem' }}>LusoBites Admin</Logo>
        
        <SidebarNavigation>
          {menuItems.map((item) => (
            <NavItem 
              key={item.path} 
              to={item.path} 
              isActive={isActive(item.path)}
              onClick={() => setSidebarOpen(false)}
            >
              <NavIcon>{item.icon}</NavIcon>
              <NavLabel>{item.label}</NavLabel>
            </NavItem>
          ))}
        </SidebarNavigation>
      </Sidebar>
      
      <MainContent>
        <Header>
          <MobileMenuButton onClick={toggleSidebar}>
            ☰
          </MobileMenuButton>
          
          <UserSection>
            <UserInfo>
              <UserName>{user.name || 'Administrador'}</UserName>
              <UserRole>{user.role === 'admin' ? 'Administrador' : 'Usuário'}</UserRole>
            </UserInfo>
            
            <LogoutButton onClick={handleLogout}>
              Sair
            </LogoutButton>
          </UserSection>
        </Header>
        
        <Content>
          {children}
        </Content>
      </MainContent>
    </LayoutContainer>
  );
};

export default AdminLayout;