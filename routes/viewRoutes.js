const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(viewsController.alerts);

// Various Page View Routes
router.get('/', authController.isLoggedIn, viewsController.getHomePage);
router.get('/about', authController.isLoggedIn, viewsController.getAboutPage);
// router.get('/blog', authController.isLoggedIn, viewsController.getBlog);
// router.get('/newsletter', authController.isLoggedIn, viewsController.getNewletterPage);
router.get('/careers', authController.isLoggedIn, viewsController.getCareersPage);
router.get('/contact', authController.isLoggedIn, viewsController.getContactPage);
router.get('/terms', authController.isLoggedIn, viewsController.getTermsPage);
router.get('/privacy', authController.isLoggedIn, viewsController.getPrivacyPage);

// Recipe View Routes
router.get('/recipes', authController.isLoggedIn, viewsController.getRecipes);
router.get('/recipe/:slug', authController.isLoggedIn, viewsController.getRecipe);

// // Login & Sign Up View Routes
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup', authController.isLoggedIn, viewsController.getSignupForm);
router.get('/password/new', authController.isLoggedIn, viewsController.getForgotPassword);

// // Account View Routes
// router.get('/account', authController.protect, viewsController.getAccount);
// router.get('/account/password', authController.protect, viewsController.getAccountPassword);

// // Profile View Routes
// router.get('/user/:username', authController.isLoggedIn, viewsController.getProfile);
// router.get('/user/:username/likes', authController.isLoggedIn, viewsController.getProfileLikes);
// router.get('/user/:username/favourites', authController.isLoggedIn, viewsController.getProfileFavourites);

module.exports = router;
