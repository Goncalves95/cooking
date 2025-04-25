// src/pages/Admin/RecipeManagement.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { recipeService } from '../../services/api';

// Adicionar estilos aqui...

const RecipeManagement = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        const response = await recipeService.getAll(token);
        
        if (response.data && response.data.success) {
          setRecipes(response.data.data);
        } else {
          setRecipes(response.data || []);
        }
      } catch (error) {
        console.error('Erro ao buscar receitas:', error);
        setError('Falha ao carregar receitas.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipes();
  }, []);
  
  const handleDeleteRecipe = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta receita?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      await recipeService.delete(id, token);
      
      // Atualizar a lista após excluir
      setRecipes(recipes.filter(recipe => (recipe._id || recipe.id) !== id));
      
      alert('Receita excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir receita:', error);
      alert('Falha ao excluir receita.');
    }
  };
  
  if (loading) {
    return <p>Carregando receitas...</p>;
  }
  
  if (error) {
    return <p>{error}</p>;
  }
  
  return (
    <div>
      <h1>Gerenciar Receitas</h1>
      
      <Link to="/admin/add-recipe">
        <button>Adicionar Nova Receita</button>
      </Link>
      
      <table>
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Título</th>
            <th>Categoria</th>
            <th>País</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {recipes.length > 0 ? (
            recipes.map(recipe => (
              <tr key={recipe._id || recipe.id}>
                <td>
                  <img 
                    src={recipe.imageUrl} 
                    alt={recipe.title} 
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                </td>
                <td>{recipe.title}</td>
                <td>{recipe.category}</td>
                <td>{recipe.country}</td>
                <td>
                  <Link to={`/admin/edit-recipe/${recipe._id || recipe.id}`}>
                    <button>Editar</button>
                  </Link>
                  <button onClick={() => handleDeleteRecipe(recipe._id || recipe.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nenhuma receita encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeManagement;