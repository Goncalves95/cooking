// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Gerar token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_for_development', {
    expiresIn: '30d',
  });
};

// Login - implementação direta para evitar problemas com controladores
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log(`Tentativa de login para: ${email}`);

    // Validação básica
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, forneça email e senha'
      });
    }

    // Encontrar usuário
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      console.log(`Usuário não encontrado: ${email}`);
      return res.status(401).json({
        success: false,
        message: 'Email ou senha inválidos'
      });
    }
    
    console.log(`Usuário encontrado: ${user.name}`);

    // Verificar senha
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      console.log(`Senha incorreta para: ${email}`);
      return res.status(401).json({
        success: false,
        message: 'Email ou senha inválidos'
      });
    }
    
    console.log(`Login bem-sucedido para: ${email}`);

    // Resposta bem-sucedida
    res.json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role || 'user',
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error(`Erro no login: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Erro no servidor',
      error: error.message
    });
  }
});

// Função middleware de proteção básica
const protect = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Acesso não autorizado, token não fornecido'
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_for_development');
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }
    
    next();
  } catch (error) {
    console.error('Erro de autenticação:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Não autorizado',
      error: error.message
    });
  }
};

// Rota para obter perfil do usuário
router.get('/me', protect, async (req, res) => {
  try {
    res.json({
      success: true,
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role || 'user'
    });
  } catch (error) {
    console.error(`Erro ao obter perfil: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Erro no servidor',
      error: error.message
    });
  }
});

// Rota para registro de novos usuários
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validação básica
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, preencha todos os campos'
      });
    }

    // Verificar se o usuário já existe
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Este email já está em uso'
      });
    }

    // Criar usuário
    const user = await User.create({
      name,
      email,
      password, // será hasheada no modelo
      role: 'user' // por padrão, novos registros são usuários comuns
    });

    res.status(201).json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error(`Erro no registro: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Erro no servidor',
      error: error.message
    });
  }
});

// Rota para criar um usuário admin (apenas para desenvolvimento)
router.post('/create-admin', async (req, res) => {
  try {
    // Verificar se já existe algum admin
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (adminExists) {
      return res.status(400).json({
        success: false,
        message: 'Já existe um administrador no sistema'
      });
    }
    
    // Criar um usuário admin padrão
    const admin = await User.create({
      name: 'Admin LusoBites',
      email: 'admin@lusobites.com',
      password: 'Admin123!', // será hasheada no modelo
      role: 'admin'
    });
    
    res.status(201).json({
      success: true,
      message: 'Administrador criado com sucesso',
      admin: {
        name: admin.name,
        email: admin.email
      }
    });
  } catch (error) {
    console.error(`Erro ao criar admin: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Erro no servidor',
      error: error.message
    });
  }
});

module.exports = router;