// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Carregar variáveis de ambiente
dotenv.config();

// Conectar ao banco de dados
connectDB();

// Inicializar o app
const app = express();

// Configuração avançada do CORS
const allowedOrigins = [
  // URL de produção do seu frontend (ajuste para o seu domínio real)
  'https://lusobites.vercel.app',
  'https://www.lusobites.com',
  
  // URLs de desenvolvimento
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

// Middleware para CORS aprimorado
app.use(cors({
  origin: function(origin, callback) {
    // Permitir requisições sem origin (como Apps mobile ou Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado pela política de CORS'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true, // Permitir cookies/auth
  maxAge: 86400 // Cache de preflight por 24 horas
}));

// Middleware para body parser
app.use(express.json({ limit: '50mb' })); // Aumentar limite se precisar enviar imagens
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Middleware para segurança
app.use((req, res, next) => {
  // Forçar HTTPS em produção
  if (process.env.NODE_ENV === 'production' && req.header('x-forwarded-proto') !== 'https') {
    return res.redirect(`https://${req.header('host')}${req.url}`);
  }
  
  // Headers de segurança
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  next();
});

// Montar rotas
app.use('/api/recipes', require('./routes/recipeRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Rota de teste
app.get('/', (req, res) => {
  res.send('API do LusoBites está funcionando!');
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Erro específico de CORS
  if (err.message.includes('CORS')) {
    return res.status(403).json({
      success: false,
      message: 'Acesso não permitido devido à política de CORS'
    });
  }
  
  res.status(500).json({
    success: false,
    message: 'Erro no servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Um erro ocorreu'
  });
});

// Definir porta
const PORT = process.env.PORT || 5000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});