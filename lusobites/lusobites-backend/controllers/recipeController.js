const Recipe = require('../models/Recipe');

// Obter todas as receitas
exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    
    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar receitas',
      error: error.message
    });
  }
};

// Obter receita por ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Receita não encontrada'
      });
    }
    
    res.status(200).json({
      success: true,
      data: recipe
    });
  } catch (error) {
    res.status(500).json({
      success: false,