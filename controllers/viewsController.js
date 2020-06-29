const Recipe = require('../models/recipeModel');
// const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.alerts = (req, res, next) => {
   const { alert } = req.query;

   if (alert === 'booking')
      res.locals.alert =
         "Your booking was successful! Please check your email for a confirmation. If your booking booking doesn't show up here immediately, please come back later";

   next();
};

// Various Page View Routes

exports.getHomepage = catchAsync(async (req, res, next) => {

   res.status(200).render('index', {
      title: "Welcome"
   });
});

// Recipe View Routes

exports.getRecipe = catchAsync(async (req, res, next) => {
   // Get Recipe data from collection
   const recipe = await Recipe.findOne({ slug: req.params.slug }).populate({
      path: 'reviews',
      fields: 'review rating user'
   });

   if (!recipe) {
      return next(new AppError('There is no recipe with that name', 404));
   }

   res.status(200).render('recipe', {
      title: `${recipe.name}`,
      recipe
   });
});

// Login & Sign Up View Routes

exports.getLoginForm = (req, res) => {

   res.status(200).render('login', {
      title: 'Log into your account'
   });
};

exports.getSignupForm = (req, res) => {

   res.status(200).render('signup', {
      title: 'Create your account'
   });
};

// Account View Routes

exports.getAccount = (req, res) => {

   res.status(200).render('account', {
      title: 'Your account',
      currentPage: 'my-settings'
   });
};



// Profile View Routes