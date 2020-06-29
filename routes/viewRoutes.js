const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(viewsController.alerts);

// Various Page View Routes
router.get('/', authController.isLoggedIn, viewsController.getHomepage);
router.get('/about', authController.isLoggedIn, viewsController.getTourspage);
router.get('/blog', authController.isLoggedIn, viewsController.getTourspage);
router.get('/newsletter', authController.isLoggedIn, viewsController.getTourspage);
router.get('/careers', authController.isLoggedIn, viewsController.getTour);
router.get('/support', authController.isLoggedIn, viewsController.getTour);
router.get('/branding', authController.isLoggedIn, viewsController.getTour);
router.get('/terms', authController.isLoggedIn, viewsController.getTour);
router.get('/privacy', authController.isLoggedIn, viewsController.getTour);

// Recipe View Routes
router.get('/recipes', authController.isLoggedIn, viewsController.getTour);
router.get('/recipe/:slug', authController.isLoggedIn, viewsController.getTour);

// Login & Sign Up View Routes
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup', authController.isLoggedIn, viewsController.getSignupForm);

// Account View Routes
router.get('/account', authController.protect, viewsController.getAccount);
router.get('/account/password', authController.protect, viewsController.getMyTours);

// Profile View Routes
router.get('/user/:username', authController.isLoggedIn, viewsController.getMyTours);
router.get('/user/:username/likes', authController.isLoggedIn, viewsController.getMyTours);
router.get('/user/:username/favourites', authController.isLoggedIn, viewsController.getMyTours);

module.exports = router;
