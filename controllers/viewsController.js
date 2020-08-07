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

exports.getHomePage = catchAsync(async (req, res, next) => {

    const popularRecipes = await Recipe.find().limit(4).sort({ viewCount: -1 })
    const latestRecipes = await Recipe.find().limit(3).sort({ createdAt: -1 })

    res.status(200).render('index', {
        title: "Meals You Can Make Tonight",
        description: "Zesty Recipes is the community for you, to discover new and exciting recipes.",
        pageUrl: `https://${req.get('host')}${req.originalUrl}`,
        popularRecipes,
        latestRecipes
    });
});

exports.getGuidesPage = catchAsync(async (req, res, next) => {

    res.status(200).render('guides', {
       title: "Guides",
       description: "Learn about the differences of your favourite ingredients and how to use them in tasty recipes.",
       pageUrl: `https://${req.get('host')}${req.originalUrl}`,
    });
 });

 exports.getBlog = catchAsync(async (req, res, next) => {

    res.status(200).render('blog', {
       title: "Blog",
       description: "News and announcements for all things Zesty.",
       pageUrl: `https://${req.get('host')}${req.originalUrl}`,
    });
 });

exports.getAboutPage = catchAsync(async (req, res, next) => {

    res.status(200).render('about', {
       title: "About",
       pageUrl: `https://${req.get('host')}${req.originalUrl}`,
    });
 });

 exports.getCareersPage = catchAsync(async (req, res, next) => {

    res.status(200).render('careers', {
       title: "Working at Zesty",
       pageUrl: `https://${req.get('host')}${req.originalUrl}`,
    });
 });

 exports.getContactPage = catchAsync(async (req, res, next) => {

    res.status(200).render('contact', {
       title: "Contact us",
       pageUrl: `https://${req.get('host')}${req.originalUrl}`,
    });
 });

 exports.getTermsPage = catchAsync(async (req, res, next) => {

    res.status(200).render('terms', {
       title: "Terms and Conditions",
       pageUrl: `https://${req.get('host')}${req.originalUrl}`,
    });
 });

 exports.getPrivacyPage = catchAsync(async (req, res, next) => {

    res.status(200).render('privacy', {
       title: "Privacy Policy",
       pageUrl: `https://${req.get('host')}${req.originalUrl}`,
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

    // Update recipe page count - to help with popular recipes until more reviews and likes
    await Recipe.findOneAndUpdate({ slug: req.params.slug }, {$inc: { viewCount: 1 }  })

    res.status(200).render('recipe', {
        title: `${recipe.name}`,
        description: `${recipe.description}`,
        pageUrl: `https://${req.get('host')}${req.originalUrl}`,
        recipe
    });
});

exports.getRecipes = catchAsync(async (req, res, next) => {
    // Get Recipe data from collection
    const recipes = await Recipe.find();

    res.status(200).render('recipes', {
        title: 'All recipes',
        pageUrl: `https://${req.get('host')}${req.originalUrl}`,
        recipes
    });
});

// Login & Sign Up View Routes

exports.getLoginForm = (req, res) => {

    res.status(200).render('login', {
        title: 'Log into your account',
        pageUrl: `https://${req.get('host')}${req.originalUrl}`
    });
};

exports.getSignupForm = (req, res) => {

    res.status(200).render('signup', {
        title: 'Create your account',
        pageUrl: `https://${req.get('host')}${req.originalUrl}`,
    });
};

exports.getForgotPassword = (req, res) => {

    res.status(200).render('forgotpassword', {
    title: 'Forgot Password?',
    pageUrl: `https://${req.get('host')}${req.originalUrl}`,
    });
 };

// Account View Routes

exports.getAccount = (req, res) => {

    res.status(200).render('account', {
        title: 'Your account',
        currentPage: 'my-settings',
        pageUrl: `https://${req.get('host')}${req.originalUrl}`,
    });
};

// Search View

exports.search = catchAsync(async (req, res, next) => {
    const query = req.params.query;

    // console.log(query)

    const search = await Recipe.find(
        {
            $text: {
                $search: query
            }
        }, 
    {
        score: { $meta: 'textScore' }
    }).sort({
        score: { $meta: 'textScore'}
    }).limit(30)

    res.status(200).render('search', {
        title: `Search results for ${query}`,
        pageUrl: `https://${req.get('host')}${req.originalUrl}`,
        search,
        query
    });
});



// Profile View Routes