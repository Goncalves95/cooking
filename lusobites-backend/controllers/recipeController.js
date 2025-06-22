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
      message: 'Erro ao buscar receita',
      error: error.message
    });
  }
};

// controllers/recipeController.js (continuação)
// Criar nova receita
exports.createRecipe = async (req, res) => {
    try {
      const recipe = await Recipe.create(req.body);
      
      res.status(201).json({
        success: true,
        data: recipe
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Erro ao criar receita',
        error: error.message
      });
    }
  };
  
  // Atualizar receita
  exports.updateRecipe = async (req, res) => {
    try {
      const recipe = await Recipe.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      
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
      res.status(400).json({
        success: false,
        message: 'Erro ao atualizar receita',
        error: error.message
      });
    }
  };
  
  // Excluir receita
  exports.deleteRecipe = async (req, res) => {
    try {
      const recipe = await Recipe.findByIdAndDelete(req.params.id);
      
      if (!recipe) {
        return res.status(404).json({
          success: false,
          message: 'Receita não encontrada'
        });
      }
      
      res.status(200).json({
        success: true,
        data: {}
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Erro ao excluir receita',
        error: error.message
      });
    }
  };
  
  // Obter receitas por categoria
  exports.getRecipesByCategory = async (req, res) => {
    try {
      const recipes = await Recipe.find({ category: req.params.category });
      
      res.status(200).json({
        success: true,
        count: recipes.length,
        data: recipes
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar receitas por categoria',
        error: error.message
      });
    }
  };
  
  // Obter receitas por país
  exports.getRecipesByCountry = async (req, res) => {
    try {
      const recipes = await Recipe.find({ country: req.params.country });
      
      res.status(200).json({
        success: true,
        count: recipes.length,
        data: recipes
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar receitas por país',
        error: error.message
      });
    }
  };
  
  // Obter receitas em destaque
  exports.getFeaturedRecipes = async (req, res) => {
    try {
      const recipes = await Recipe.find({ isFeatured: true });
      
      res.status(200).json({
        success: true,
        count: recipes.length,
        data: recipes
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar receitas em destaque',
        error: error.message
      });
    }
  };