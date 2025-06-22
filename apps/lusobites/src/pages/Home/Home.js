// src/pages/Home/Home.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Configuração do serviço de API
// Se você já tem o arquivo services/api.js, importe assim:
// import { recipeService } from '../../services/api';

// Se ainda não criou o arquivo services/api.js, use esta configuração temporária:
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

const recipeService = {
  getFeatured: () => api.get('/recipes/featured')
};

// Definição dos componentes estilizados
const HeroSection = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
              url('/images/mediterranean-food-hero.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 0 2rem;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Button = styled(motion.button)`
  background-color: #fcd34d; // Amarelo
  color: #333;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  
  &:hover {
    background-color: #f9c22e;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin: 3rem 0 2rem;
  color: #2a6fc8; // Azul principal
`;

const CategorySection = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const CategoryCard = styled(motion.div)`
  height: 200px;
  border-radius: 12px;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), 
              url(${props => props.image});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.03);
  }
`;

const RecipesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ViewAllButton = styled(Link)`
  display: block;
  text-align: center;
  margin: 2rem auto;
  background-color: transparent;
  border: 2px solid #2a6fc8; // Azul principal
  color: #2a6fc8;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
  width: fit-content;
  
  &:hover {
    background-color: #2a6fc8;
    color: white;
  }
`;

const AdBanner = styled.div`
  background-color: #f8f9fa;
  padding: 2rem;
  text-align: center;
  margin: 3rem 0;
  border-radius: 8px;
  
  p {
    margin-bottom: 1rem;
    color: #666;
  }
`;

const Home = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Buscar receitas em destaque da API real
    const fetchFeaturedRecipes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await recipeService.getFeatured();
        
        // Verificar se a resposta tem a estrutura esperada
        if (response.data && response.data.success && response.data.data) {
          setFeaturedRecipes(response.data.data);
        } else {
          setFeaturedRecipes(response.data || []);
        }
      } catch (error) {
        console.error('Erro ao buscar receitas em destaque:', error);
        setError('Falha ao carregar receitas. Por favor, tente novamente mais tarde.');
        
        // Opcional: dados de fallback
        setFeaturedRecipes([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedRecipes();
  }, []);
  
  const categories = [
    { name: 'Doces', image: '/images/desserts.jpg', link: '/categorias/doce' },
    { name: 'Pratos Principais', image: '/images/main-dishes.jpg', link: '/categorias/prato-principal' },
    { name: 'Entradas', image: '/images/appetizers.jpg', link: '/categorias/entrada' },
    { name: 'Inovações', image: '/images/innovations.jpg', link: '/categorias/inovacoes' }
  ];
  
  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            LusoBites
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Descubra os sabores autênticos da culinária mediterrânea
          </HeroSubtitle>
          <Link to="/receitas" style={{ textDecoration: 'none' }}>
            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Explorar Receitas
            </Button>
          </Link>
        </HeroContent>
      </HeroSection>
      
      <CategorySection>
        <SectionTitle>Categorias</SectionTitle>
        <CategoryGrid>
          {categories.map((category, index) => (
            <Link key={index} to={category.link} style={{ textDecoration: 'none' }}>
              <CategoryCard 
                image={category.image}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {category.name}
              </CategoryCard>
            </Link>
          ))}
        </CategoryGrid>
      </CategorySection>
      
      <AdBanner>
        <p>Publicidade</p>
        <div style={{ background: '#ddd', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Anúncio 728x90
        </div>
      </AdBanner>
      
      <SectionTitle>Receitas em Destaque</SectionTitle>
      
      {error && (
        <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
      )}
      
      {loading ? (
        <p style={{ textAlign: 'center' }}>Carregando receitas...</p>
      ) : (
        <>
          <RecipesGrid>
            {featuredRecipes.length > 0 ? (
              featuredRecipes.map(recipe => (
                <RecipeCard key={recipe._id || recipe.id} recipe={recipe} />
              ))
            ) : (
              <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
                Nenhuma receita em destaque encontrada.
              </p>
            )}
          </RecipesGrid>
          <ViewAllButton to="/receitas">Ver Todas as Receitas</ViewAllButton>
        </>
      )}
    </>
  );
};

export default Home;