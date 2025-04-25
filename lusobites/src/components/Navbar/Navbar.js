import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #2a6fc8; // Azul principal
  span {
    color: #e63946; // Vermelho
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 70%;
  height: 100vh;
  background-color: #ffffff;
  z-index: 100;
  padding: 2rem;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const NavItem = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
  
  &:hover {
    color: #fcd34d; // Amarelo
  }
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <NavContainer>
      <Logo>Luso<span>Bite</span></Logo>
      
      <NavLinks>
          <NavItem to="/">Início</NavItem>
          <NavItem to="/categorias">Receitas</NavItem>
          <NavItem to="/paises">Países</NavItem>
          <NavItem to="/contato">Contato</NavItem>
          <NavItem to="/sobre">Sobre Nós</NavItem>
      </NavLinks>
      
      <Hamburger onClick={() => setIsMenuOpen(true)}>
        ☰
      </Hamburger>
      
      {isMenuOpen && (
        <MobileMenu
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", damping: 25 }}
        >
          <motion.div onClick={() => setIsMenuOpen(false)}>✕</motion.div>
          <NavItem to="/">Início</NavItem>
          <NavItem to="/categorias">Receitas</NavItem>
          <NavItem to="/paises">Países</NavItem>
          <NavItem to="/contato">Contato</NavItem>
          <NavItem to="/sobre">Sobre Nós</NavItem>
        </MobileMenu>
      )}
    </NavContainer>
  );
};

export default Navbar;