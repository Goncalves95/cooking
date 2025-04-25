// src/pages/RecipeDetail/RecipeDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import AdBanner from '../../components/Advertisement/AdBanner';
import { Helmet } from 'react-helmet-async';

const RecipeContainer = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const RecipeHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
`;

const RecipeInfo = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2a6fc8; // Azul principal
  margin-bottom: 1rem;
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 1.5rem;
`;

const Tags = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Tag = styled.span`
  background-color: ${props => props.primary ? '#2a6fc8' : '#fcd34d'};
  color: ${props => props.primary ? 'white' : '#333'};
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const RecipeContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 2fr;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #2a6fc8; // Azul principal
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f0f0f0;
`;

const IngredientsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const IngredientItem = styled.li`
  padding: 0.8rem 0;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:before {
    content: "•";
    color: #fcd34d; // Amarelo
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
`;

const InstructionsList = styled.ol`
  padding-left: 1.2rem;
`;

const InstructionItem = styled.li`
  margin-bottom: 1.2rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid #f0f0f0;
  line-height: 1.6;
  
  &:last-child {
    border-bottom: none;
  }
`;

const VideoContainer = styled.div`
  margin: 3rem 0;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
`;

const Video = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const AdContainer = styled.div`
  margin: 3rem 0;
  text-align: center;
  
  .ad-label {
    color: #999;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }
  
  .ad-placeholder {
    background-color: #f0f0f0;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
  }
`;

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // Quando o backend estiver pronto, substituir por chamada real
        // const response = await axios.get(`/api/recipes/${id}`);
        // setRecipe(response.data.data);
        
        // Dados mockados para demonstração
        setTimeout(() => {
          setRecipe({
            id: 1,
            title: 'Bacalhau à Brás',
            description: 'Um clássico da culinária portuguesa, feito com lascas de bacalhau, batata palha e ovos. Esta receita tradicional combina o sabor intenso do bacalhau com a textura crocante da batata e a cremosidade dos ovos.',
            category: 'prato-principal',
            country: 'Portugal',
            prepTime: 30,
            cookTime: 15,
            servings: 4,
            rating: 4.8,
            imageUrl: 'https://example.com/bacalhau.jpg',
            youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            ingredients: [
              { quantity: '400', name: 'bacalhau dessalgado', unit: 'g' },
              { quantity: '500', name: 'batata palha', unit: 'g' },
              { quantity: '6', name: 'ovos', unit: '' },
              { quantity: '2', name: 'cebolas médias', unit: '' },
              { quantity: '3', name: 'dentes de alho', unit: '' },
              { quantity: '2', name: 'folhas de louro', unit: '' },
              { quantity: '50', name: 'azeitonas pretas', unit: 'g' },
              { quantity: '', name: 'azeite', unit: 'q.b.' },
              { quantity: '', name: 'sal e pimenta', unit: 'q.b.' },
              { quantity: '', name: 'salsa picada', unit: 'q.b.' }
            ],
            instructions: [
              'Desfie o bacalhau em lascas pequenas, removendo todas as espinhas e pele.',
              'Corte as cebolas em meia-lua fina e pique os dentes de alho.',
              'Numa frigideira grande, aqueça um fio generoso de azeite e adicione as cebolas, o alho e as folhas de louro. Refogue em fogo médio até a cebola ficar translúcida.',
              'Adicione o bacalhau e refogue por cerca de 5 minutos.',
              'Bata os ovos numa tigela, tempere com sal (pouco, o bacalhau já é salgado) e pimenta.',
              'Adicione a batata palha à frigideira e misture bem com o bacalhau.',
              'Despeje os ovos batidos e mexa suavemente até os ovos começarem a coalhar mas ainda ficarem cremosos.',
              'Finalize com azeitonas pretas e salsa picada.',
              'Sirva imediatamente, acompanhado de salada verde.'
            ]
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError('Erro ao carregar a receita. Por favor, tente novamente.');
        setLoading(false);
      }
    };
    
    fetchRecipe();
  }, [id]);
  
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '3rem' }}>Carregando receita...</div>;
  }
  
  if (error) {
    return <div style={{ textAlign: 'center', padding: '3rem', color: 'red' }}>{error}</div>;
  }
  
  return (
    <RecipeContainer>
      <RecipeHeader>
        <ImageContainer>
          <RecipeImage src={recipe.imageUrl} alt={recipe.title} />
        </ImageContainer>
        
        <RecipeInfo>
          <Title>{recipe.title}</Title>
          
          <Tags>
            <Tag>{recipe.category.replace('-', ' ')}</Tag>
            <Tag primary>{recipe.country}</Tag>
          </Tags>
          
          <MetaInfo>
            <MetaItem>
              <span role="img" aria-label="clock">⏱️</span>
              <span>Preparo: {recipe.prepTime} min</span>
            </MetaItem>
            <MetaItem>
              <span role="img" aria-label="pot">🍲</span>
              <span>Cozimento: {recipe.cookTime} min</span>
            </MetaItem>
            <MetaItem>
              <span role="img" aria-label="people">👥</span>
              <span>Serve: {recipe.servings} pessoas</span>
            </MetaItem>
            <MetaItem>
              <span role="img" aria-label="star">⭐</span>
              <span>Avaliação: {recipe.rating}/5</span>
            </MetaItem>
          </MetaInfo>
          
          <Description>{recipe.description}</Description>
        </RecipeInfo>
      </RecipeHeader>
      
      <AdContainer>
        <div className="ad-label">Publicidade</div>
        <AdBanner slot="1234567890" format="auto" />
        <div className="ad-placeholder">Anúncio 728x90</div>
      </AdContainer>
      
      <RecipeContent>
        <div>
          <SectionTitle>Ingredientes</SectionTitle>
          <IngredientsList>
            {recipe.ingredients.map((ingredient, index) => (
              <IngredientItem key={index}>
                {ingredient.quantity} {ingredient.unit} {ingredient.name}
              </IngredientItem>
            ))}
          </IngredientsList>
        </div>
        
        <div>
          <SectionTitle>Modo de Preparo</SectionTitle>
          <InstructionsList>
            {recipe.instructions.map((instruction, index) => (
              <InstructionItem key={index}>{instruction}</InstructionItem>
            ))}
          </InstructionsList>
        </div>
      </RecipeContent>
      
      {recipe.youtubeUrl && (
        <>
          <SectionTitle>Vídeo Tutorial</SectionTitle>
          <VideoContainer>
            <Video 
              src={recipe.youtubeUrl} 
              title={recipe.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </VideoContainer>
        </>
      )}
      
      <AdContainer>
        <div className="ad-label">Publicidade</div>
        <AdBanner slot="1234567890" format="auto" />
        <div className="ad-placeholder">Anúncio 300x250</div>
      </AdContainer>
    </RecipeContainer>
  );
};

export default RecipeDetail;