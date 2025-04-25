const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'O título é obrigatório'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'A descrição é obrigatória'],
  },
  ingredients: [{
    quantity: String,
    name: String,
    unit: String
  }],
  instructions: [{
    type: String,
    required: [true, 'As instruções são obrigatórias']
  }],
  prepTime: {
    type: Number,
    required: [true, 'O tempo de preparo é obrigatório']
  },
  cookTime: {
    type: Number,
    required: [true, 'O tempo de cozimento é obrigatório']
  },
  servings: {
    type: Number,
    required: [true, 'O número de porções é obrigatório']
  },
  category: {
    type: String,
    required: [true, 'A categoria é obrigatória'],
    enum: ['doce', 'prato-principal', 'entrada', 'inovacoes']
  },
  country: {
    type: String,
    required: [true, 'O país de origem é obrigatório']
  },
  imageUrl: {
    type: String,
    required: [true, 'A imagem é obrigatória']
  },
  youtubeUrl: {
    type: String
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema);