import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background-color: white;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Category = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(252, 211, 77, 0.9); // Amarelo
  color: #333;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
`;

const Country = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(42, 111, 200, 0.9); // Azul
  color: white;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
  color: #333;
`;

const Description = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 0.8rem;
`;

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/receitas/${recipe.id}`} style={{ textDecoration: 'none' }}>
      <Card
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ImageContainer>
          <Image src={recipe.imageUrl} alt={recipe.title} />
          <Category>{recipe.category}</Category>
          <Country>{recipe.country}</Country>
        </ImageContainer>
        <Content>
          <Title>{recipe.title}</Title>
          <Description>{recipe.description}</Description>
          <Stats>
            <span>⏱️ {recipe.prepTime} mins</span>
            <span>👤 {recipe.servings} porções</span>
            <span>⭐ {recipe.rating}/5</span>
          </Stats>
        </Content>
      </Card>
    </Link>
  );
};

export default RecipeCard;