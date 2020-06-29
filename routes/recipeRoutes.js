const express = require('express');
const recipeController = require('./../controllers/recipeController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/')
    .get(recipeController.getAllRecipes)
    .post(authController.protect, authController.restrictTo('chef', 'editor', 'admin'), recipeController.createRecipe);

router.route('/:id')
    .get(recipeController.getRecipe)
    // .patch(authController.protect, authController.restrictTo('chef', 'editor', 'admin'), recipeController.uploadRecipeImages, recipeController.resizeRecipeImages, recipeController.updateRecipe)
    .delete(authController.protect, authController.restrictTo('chef', 'editor', 'admin'), recipeController.deleteRecipe);

// router.route('/recipe-stats')
//     .get(recipeController.getRecipeStats);

module.exports = router;
