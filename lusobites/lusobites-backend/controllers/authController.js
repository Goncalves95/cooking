// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Função para gerar token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_production', {
    expiresIn: '30d',
  });
};

// @desc    Autenticar usuário e gerar token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log(`Tentativa de login: ${email}`);
    
    // Validação de entrada
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, forneça email e senha'
      });
    }
    
    // Encontrar usuário pelo email
    const user = await User.findOne({ email }).select('+password');
    
    // Se usuário não encontrado
    if (!user) {
      console.log(`Usuário não encontrado: ${email}`);
      return res.status(401).json({
        success: false,
        message: 'Email ou senha inválidos'
      });
    }
    
    console.log(`Usuário encontrado: ${user.name}, Papel: ${user.role || 'não definido'}`);
    
    // Verificar senha
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      console.log(`Senha incorreta para: ${email}`);
      return res.status(401).json({
        success: false,
        message: 'Email ou senha inválidos'
      });
    }
    
    // Gerar token JWT
    const token = generateToken(user._id);
    
    // Resposta bem-sucedida
    res.status(200).json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role || 'user',
      token
    });
    
  } catch (error) {
    console.error(`Erro no login: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Erro no servidor',
      error: error.message
    });
  }
};

module.exports = { loginUser, generateToken };