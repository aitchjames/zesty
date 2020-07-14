const multer = require('multer');
const sharp = require('sharp');
const Recipe = require('./../models/recipeModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');

exports.getRecipes = factory.getAll(Recipe);
exports.getRecipe = factory.getOne(Recipe, { path: 'reviews' });
exports.createRecipe = factory.createOne(Recipe);
exports.updateRecipe = factory.updateOne(Recipe);
exports.deleteRecipe = factory.deleteOne(Recipe);

exports.likeRecipe = catchAsync(async (req, res, next) => {
    // Get likes from requesting user
    const likes = req.user.likes.map(obj => obj.toString());

    // Check if current recipe is in likes array
    const operator = likes.includes(req.params.id) ? '$pull' : '$addToSet';
    const user = await User.findByIdAndUpdate(req.user._id,
        { [operator]: { likes: req.params.id }},
        { new: true }
    )
    
    if (operator == '$addToSet') {
        await Recipe.findOneAndUpdate({ _id: req.params.id }, {$inc: { likeCount: 1 }  })
    }

    if (operator == '$pull') {
        await Recipe.findOneAndUpdate({ _id: req.params.id }, {$inc: { likeCount: -1 }  })
    }

    res.status(200).json({
        status: 'success',
        data: {
            id: user._id,
            user: user.name,
            username: user.username,
            likes: user.likes,
            favourites: user.favourites
        }
    });
})

exports.favouriteRecipe = catchAsync(async (req, res, next) => {
    // Get favourites from requesting user
    const favourites = req.user.favourites.map(obj => obj.toString());

    // Check if current recipe is in favourites array
    const operator = favourites.includes(req.params.id) ? '$pull' : '$addToSet';
    const user = await User.findByIdAndUpdate(req.user._id,
        { [operator]: { favourites: req.params.id }},
        { new: true }
    )

    if (operator == '$addToSet') {
        await Recipe.findOneAndUpdate({ _id: req.params.id }, {$inc: { favouriteCount: 1 }  })
    }

    if (operator == '$pull') {
        await Recipe.findOneAndUpdate({ _id: req.params.id }, {$inc: { favouriteCount: -1 }  })
    }

    res.status(200).json({
        status: 'success',
        data: {
            user: user.name,
            username: user.username,
            likes: user.likes,
            favourites: user.favourites
        }
    });
})

exports.searchRecipe = catchAsync(async (req, res, next) => {
    const query = req.params.query;

    // const search = await Recipe.find(
    //     {
    //         $text: {
    //             $search: query
    //         }
    //     }, 
    // {
    //     score: { $meta: 'textScore' }
    // }).sort({
    //     score: { $meta: 'textScore'}
    // }).limit(30)

    // TODO actually query DB

    res.status(200).json({
        status: 'success',
        data: query
    });
})