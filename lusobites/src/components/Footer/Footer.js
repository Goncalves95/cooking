import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #2a6fc8; // Azul principal
  color: white;
  padding: 3rem 2rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #fcd34d; // Amarelo
`;

const FooterLink = styled(Link)`
  color: white;
  text-decoration: none;
  transition: color 0.3s;
  
  &:hover {
    color: #fcd34d; // Amarelo
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterGrid>
        <FooterSection>
          <FooterTitle>LusoBites</FooterTitle>
          <p>Sua fonte de inspiração para culinária mediterrânea.</p>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Categorias</FooterTitle>
          <FooterLink to="/categorias/doce">Doces</FooterLink>
          <FooterLink to="/categorias/prato-principal">Pratos Principais</FooterLink>
          <FooterLink to="/categorias/entrada">Entradas</FooterLink>
          <FooterLink to="/categorias/inovacoes">Inovações</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Links Úteis</FooterTitle>
          <FooterLink to="/sobre">Sobre Nós</FooterLink>
          <FooterLink to="/contato">Contato</FooterLink>
          <FooterLink to="/privacidade">Política de Privacidade</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Redes Sociais</FooterTitle>
          <FooterLink to="https://instagram.com" >Instagram</FooterLink>
          <FooterLink to="https://youtube.com" >YouTube</FooterLink>
          <FooterLink to="https://facebook.com" >Facebook</FooterLink>
        </FooterSection>
      </FooterGrid>
      
      <Copyright>
        © {new Date().getFullYear()} LusoBites. Todos os direitos reservados.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;