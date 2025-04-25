// src/pages/Admin/EditRecipe.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { recipeService } from '../../services/api';

// Você pode reutilizar os mesmos estilos do AddRecipe.js
// ...

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  
  // Estado inicial do formulário (mesmo que AddRecipe)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    country: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    imageUrl: '',
    youtubeUrl: '',
    ingredients: [],
    instructions: []
  });
  
  // Buscar dados da receita
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setIsFetching(true);
        setError(null);
        
        const response = await recipeService.getById(id);
        
        if (response.data && (response.data.success || response.data)) {
          // Ajustar conforme a estrutura da sua API
          const recipe = response.data.data || response.data;
          
          setFormData({
            ...recipe,
            prepTime: recipe.prepTime?.toString() || '',
            cookTime: recipe.cookTime?.toString() || '',
            servings: recipe.servings?.toString() || '',
            // Garantir que ingredientes e instruções estejam no formato esperado
            ingredients: recipe.ingredients?.length ? recipe.ingredients : [{ quantity: '', unit: '', name: '' }],
            instructions: recipe.instructions?.length ? recipe.instructions : ['']
          });
        }
      } catch (error) {
        console.error('Erro ao buscar receita:', error);
        setError('Não foi possível carregar os dados da receita. Tente novamente.');
      } finally {
        setIsFetching(false);
      }
    };
    
    fetchRecipe();
  }, [id]);
  
  // Handlers para alterações nos campos (mesmos que AddRecipe)
  const handleChange = (e) => {
    // ...
  };
  
  const handleIngredientChange = (index, field, value) => {
    // ...
  };
  
  const handleAddIngredient = () => {
    // ...
  };
  
  const handleRemoveIngredient = (index) => {
    // ...
  };
  
  const handleInstructionChange = (index, value) => {
    // ...
  };
  
  const handleAddInstruction = () => {
    // ...
  };
  
  const handleRemoveInstruction = (index) => {
    // ...
  };
  
  // Envio do formulário para atualizar a receita
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      
      // Obter token do localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('Você precisa estar logado como administrador para editar receitas.');
        navigate('/login');
        return;
      }
      
      // Validações básicas (mesmas que AddRecipe)
      // ...
      
      // Criar objeto final para enviar à API
      const recipeData = {
        ...formData,
        prepTime: Number(formData.prepTime),
        cookTime: Number(formData.cookTime),
        servings: Number(formData.servings),
        ingredients: formData.ingredients.filter(ing => ing.name.trim() !== ''),
        instructions: formData.instructions.filter(inst => inst.trim() !== '')
      };
      
      // Chamada à API
      const response = await recipeService.update(id, recipeData, token);
      
      // Resposta de sucesso
      if (response.data && response.data.success) {
        alert('Receita atualizada com sucesso!');
        navigate('/admin/recipes');
      } else {
        throw new Error('Falha ao atualizar receita');
      }
    } catch (error) {
      console.error('Erro ao atualizar receita:', error);
      alert(error.response?.data?.message || 'Erro ao atualizar receita. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isFetching) {
    return <p>Carregando dados da receita...</p>;
  }
  
  if (error) {
    return <p>{error}</p>;
  }
  
  return (
    <PageContainer>
      <Title>Editar Receita</Title>
      
      <Form onSubmit={handleSubmit}>
        {/* Mesmos campos do AddRecipe.js */}
        {/* ... */}
        
        <SubmitButton 
          type="submit" 
          className="primary" 
          disabled={isLoading}
        >
          {isLoading ? 'Salvando...' : 'Salvar Alterações'}
        </SubmitButton>
      </Form>
    </PageContainer>
  );
};

export default EditRecipe;