// src/pages/Admin/AddRecipe.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const PageContainer = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #2a6fc8;
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #2a6fc8;
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #2a6fc8;
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #2a6fc8;
  }
`;

const IngredientsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const IngredientItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 3fr auto;
  gap: 0.5rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
  
  &.primary {
    background-color: #2a6fc8;
    color: white;
    
    &:hover {
      background-color: #2161b2;
    }
  }
  
  &.secondary {
    background-color: #f1f1f1;
    color: #333;
    
    &:hover {
      background-color: #e0e0e0;
    }
  }
  
  &.danger {
    background-color: #e63946;
    color: white;
    
    &:hover {
      background-color: #d13240;
    }
  }
`;

const InstructionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InstructionItem = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.5rem;
  align-items: center;
`;

const SubmitButton = styled(Button)`
  padding: 1rem;
  font-size: 1.1rem;
  margin-top: 1rem;
`;

const AddRecipe = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'prato-principal',
    country: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    imageUrl: '',
    youtubeUrl: '',
    ingredients: [{ quantity: '', unit: '', name: '' }],
    instructions: ['']
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index][field] = value;
    setFormData({
      ...formData,
      ingredients: updatedIngredients
    });
  };
  
  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { quantity: '', unit: '', name: '' }]
    });
  };
  
  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients.splice(index, 1);
    setFormData({
      ...formData,
      ingredients: updatedIngredients
    });
  };
  
  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...formData.instructions];
    updatedInstructions[index] = value;
    setFormData({
      ...formData,
      instructions: updatedInstructions
    });
  };
  
  const handleAddInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, '']
    });
  };
  
  const handleRemoveInstruction = (index) => {
    const updatedInstructions = [...formData.instructions];
    updatedInstructions.splice(index, 1);
    setFormData({
      ...formData,
      instructions: updatedInstructions
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Quando o backend estiver pronto, substituir por chamada real
      // const response = await axios.post('/api/recipes',