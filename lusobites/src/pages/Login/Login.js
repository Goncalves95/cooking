// src/pages/Login/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// Estilos (mesmos de antes)
const LoginContainer = styled.div`
  max-width: 450px;
  margin: 4rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #2a6fc8;
  margin-bottom: 2rem;
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
  color: #444;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #2a6fc8;
    box-shadow: 0 0 0 2px rgba(42, 111, 200, 0.2);
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #2a6fc8;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #235da8;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background-color: #fee2e2;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
`;

const DebugInfo = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #666;
  white-space: pre-wrap;
`;

// Componente Login
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [debug, setDebug] = useState('');
  
  // Manipular alterações nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Função para adicionar informações de debug
  const addDebug = (info) => {
    setDebug(prev => prev + '\n' + info);
  };
  
  // Manipular envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Limpar estados
    setError('');
    setDebug('Iniciando processo de login...');
    setLoading(true);
    
    try {
      // Validação básica
      if (!formData.email || !formData.password) {
        setError('Por favor, preencha todos os campos.');
        setLoading(false);
        return;
      }
      
      addDebug(`Tentando login com email: ${formData.email}`);
      
      // Determinar a URL base da API - ajuste conforme necessário
      let baseURL = '';
      
      // Se estamos em desenvolvimento (localhost)
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        baseURL = 'http://localhost:5000/api';
      } else {
        // Para ambiente de produção (ajuste conforme sua configuração)
        baseURL = '/api';
      }
      
      const loginURL = `${baseURL}/auth/login`;
      addDebug(`URL da API: ${loginURL}`);
      
      // Configuração da requisição
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      
      addDebug('Enviando requisição...');
      
      // Fazer a requisição
      const response = await axios.post(loginURL, formData, config);
      
      addDebug(`Resposta recebida: Status ${response.status}`);
      
      // Verificar se a resposta contém token
      if (response.data && response.data.token) {
        addDebug('Token recebido com sucesso!');
        
        // Salvar token no localStorage
        localStorage.setItem('token', response.data.token);
        
        // Salvar dados do usuário
        const userData = {
          _id: response.data._id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role || 'user'
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        
        addDebug(`Papel do usuário: ${userData.role}`);
        
        // Redirecionar com base no papel
        if (userData.role === 'admin') {
          addDebug('Redirecionando para dashboard de admin...');
          navigate('/admin/dashboard');
        } else {
          addDebug('Redirecionando para página inicial...');
          navigate('/');
        }
      } else {
        // Resposta sem token
        throw new Error('Resposta inválida: token não encontrado');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      
      let errorMessage = 'Falha ao fazer login. Tente novamente.';
      
      // Adicionar detalhes específicos do erro para debug
      addDebug(`ERRO: ${error.message}`);
      
      if (error.response) {
        // O servidor respondeu com status diferente de 2xx
        addDebug(`Status de erro: ${error.response.status}`);
        addDebug(`Dados do erro: ${JSON.stringify(error.response.data, null, 2)}`);
        
        // Usar mensagem de erro do servidor, se existir
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        addDebug('Sem resposta do servidor. Verifique se o backend está rodando.');
        errorMessage = 'Falha na comunicação com o servidor. Verifique sua conexão.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  // Função para limpar o formulário (para testes)
  const handleClear = () => {
    setFormData({ email: '', password: '' });
    setError('');
    setDebug('');
  };
  
  // Função para preencher com credenciais de teste
  const handleFillTest = () => {
    setFormData({ 
      email: 'admin@lusobites.com', 
      password: 'Admin123!' 
    });
    setDebug('Credenciais de teste preenchidas.');
  };
  
  return (
    <LoginContainer>
      <Title>Login LusoBites</Title>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="password">Senha</Label>
          <Input 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </FormGroup>
        
        <Button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
        
        {/* Botões auxiliares para desenvolvimento - remova em produção */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <Button 
            type="button" 
            onClick={handleClear}
            style={{ backgroundColor: '#6c757d', flex: 1 }}
          >
            Limpar
          </Button>
          <Button 
            type="button" 
            onClick={handleFillTest}
            style={{ backgroundColor: '#28a745', flex: 1 }}
          >
            Teste
          </Button>
        </div>
      </Form>
      
      {/* Área de debug - remova em produção */}
      {debug && <DebugInfo>{debug}</DebugInfo>}
    </LoginContainer>
  );
};

export default Login;