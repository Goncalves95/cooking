// routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getRecipes, 
  getRecipeById, 
  createRecipe, 
  updateRecipe, 
  deleteRecipe,
  getRecipesByCategory,
  getRecipesByCountry,
  getFeaturedRecipes
} = require('../controllers/recipeController');
const { protect, authorize } = require('../middlewares/auth');

router.route('/')
  .get(getRecipes)
  .post(protect, authorize('admin'), createRecipe);

router.route('/featured')
  .get(getFeaturedRecipes);

router.route('/:id')
  .get(getRecipeById)
  .put(protect, authorize('admin'), updateRecipe)
  .delete(protect, authorize('admin'), deleteRecipe);

router.route('/category/:category')
  .get(getRecipesByCategory);

router.route('/country/:country')
  .get(getRecipesByCountry);

module.exports = router;