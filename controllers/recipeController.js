const multer = require('multer');
const sharp = require('sharp');
const Recipe = require('./../models/recipeModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');

exports.getRecipes = factory.getAll(Recipe);
exports.getRecipe = factory.getOne(Recipe, { path: 'reviews' });
exports.createRecipe = factory.createOne(Recipe);
exports.updateRecipe = factory.updateOne(Recipe);
exports.deleteRecipe = factory.deleteOne(Recipe);