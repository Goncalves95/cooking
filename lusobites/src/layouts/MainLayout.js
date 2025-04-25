// src/layouts/MainLayout.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

// Estilos do Layout
const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: #2a6fc8;
  text-decoration: none;
  display: flex;
  align-items: center;
  
  span {
    color: #fcd34d;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    position: absolute;
    flex-direction: column;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    padding: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }
`;

const NavLink = styled(Link)`
  color: #444;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: color 0.2s;
  
  &:hover {
    color: #2a6fc8;
  }
  
  ${props => props.active && `
    color: #2a6fc8;
    font-weight: 600;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: #2a6fc8;
      border-radius: 1.5px;
    }
  `}
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

const Main = styled.main`
  flex: 1;
`;

const Footer = styled.footer`
  background-color: #1e293b;
  color: white;
  padding: 3rem 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #fcd34d;
`;

const FooterLink = styled(Link)`
  color: #e2e8f0;
  text-decoration: none;
  margin-bottom: 0.75rem;
  transition: color 0.2s;
  
  &:hover {
    color: white;
  }
`;

const FooterText = styled.p`
  color: #e2e8f0;
  margin-bottom: 0.75rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 1.25rem;
  transition: color 0.2s;
  
  &:hover {
    color: #fcd34d;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding: 1.5rem 0;
  background-color: #0f172a;
  color: #94a3b8;
  font-size: 0.9rem;
`;

// Componente Principal
const MainLayout = ({ children }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  // Verifica se o link está ativo
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };
  
  // Toggle menu móvel
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Fecha o menu móvel quando um link é clicado
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <LayoutContainer>
      <Header>
        <HeaderContent>
          <Logo to="/">
            Luso<span>Bites</span>
          </Logo>
          
          <MobileMenuButton onClick={toggleMobileMenu}>
            {mobileMenuOpen ? '✕' : '☰'}
          </MobileMenuButton>
          
          <Nav isOpen={mobileMenuOpen}>
            <NavLink 
              to="/" 
              active={isActive('/')} 
              onClick={closeMobileMenu}
            >
              Início
            </NavLink>
            <NavLink 
              to="/receitas" 
              active={isActive('/receitas')} 
              onClick={closeMobileMenu}
            >
              Receitas
            </NavLink>
            <NavLink 
              to="/categorias" 
              active={isActive('/categorias')} 
              onClick={closeMobileMenu}
            >
              Categorias
            </NavLink>
            <NavLink 
              to="/sobre" 
              active={isActive('/sobre')} 
              onClick={closeMobileMenu}
            >
              Sobre
            </NavLink>
            <NavLink 
              to="/contato" 
              active={isActive('/contato')} 
              onClick={closeMobileMenu}
            >
              Contato
            </NavLink>
            <NavLink 
              to="/login" 
              active={isActive('/login')} 
              onClick={closeMobileMenu}
            >
              Login
            </NavLink>
          </Nav>
        </HeaderContent>
      </Header>
      
      <Main>
        {children}
      </Main>
      
      <Footer>
        <FooterContent>
          <FooterColumn>
            <FooterTitle>LusoBites</FooterTitle>
            <FooterText>
              Descubra os sabores autênticos da culinária mediterrânea com nossas receitas tradicionais e inovações culinárias.
            </FooterText>
            <SocialLinks>
              <SocialIcon href="https://facebook.com"  rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </SocialIcon>
              <SocialIcon href="https://instagram.com"  rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </SocialIcon>
              <SocialIcon href="https://pinterest.com"  rel="noopener noreferrer">
                <i className="fab fa-pinterest"></i>
              </SocialIcon>
              <SocialIcon href="https://youtube.com"  rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </SocialIcon>
            </SocialLinks>
          </FooterColumn>
          
          <FooterColumn>
            <FooterTitle>Links Rápidos</FooterTitle>
            <FooterLink to="/receitas">Receitas</FooterLink>
            <FooterLink to="/categorias/prato-principal">Pratos Principais</FooterLink>
            <FooterLink to="/categorias/doce">Sobremesas</FooterLink>
            <FooterLink to="/categorias/entrada">Entradas</FooterLink>
            <FooterLink to="/categorias/inovacoes">Inovações</FooterLink>
          </FooterColumn>
          
          <FooterColumn>
            <FooterTitle>Informações</FooterTitle>
            <FooterLink to="/sobre">Sobre Nós</FooterLink>
            <FooterLink to="/contato">Contato</FooterLink>
            <FooterLink to="/termos">Termos de Uso</FooterLink>
            <FooterLink to="/privacidade">Política de Privacidade</FooterLink>
          </FooterColumn>
          
          <FooterColumn>
            <FooterTitle>Contato</FooterTitle>
            <FooterText>
              <i className="fas fa-envelope"></i> contato@lusobites.com
            </FooterText>
            <FooterText>
              <i className="fas fa-phone"></i> +351 123 456 789
            </FooterText>
            <FooterText>
              <i className="fas fa-map-marker-alt"></i> Lisboa, Portugal
            </FooterText>
          </FooterColumn>
        </FooterContent>
        
        <Copyright>
          &copy; {new Date().getFullYear()} LusoBites. Todos os direitos reservados.
        </Copyright>
      </Footer>
    </LayoutContainer>
  );
};

export default MainLayout;