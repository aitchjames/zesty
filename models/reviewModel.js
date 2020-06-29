const mongoose = require('mongoose');
const Recipe = require('./../models/recipeModel');

const reviewSchema = new mongoose.Schema(
    {
        review: {
            type: String,
            required: [true, 'Review can not be empty']
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Review must belong to a user']
        },
        recipe: {
            type: mongoose.Schema.ObjectId,
            ref: 'Recipe',
            required: [true, 'Review must belong to a recipe']
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

reviewSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        select: 'name photo'
    });
    next();
});

reviewSchema.statics.calcAverageRatings = async function(recipeId) {
    const stats = await this.aggregate([
        {
            $match: { recipe: recipeId }
        },
        {
            $group: {
                _id: '$recipe',
                nRatings: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }
        }
    ]);
    if (stats.length > 0) {
        await Recipe.findByIdAndUpdate(recipeId, {
            ratingsQuantity: stats[0].nRating,
            ratingsAverage: stats[0].avgRating
        });
    } else {
        await Recipe.findByIdAndUpdate(recipeId, {
            ratingsQuantity: 0,
            ratingsAverage: 4.5
        });
    }
};

// Prevent user from submitting two reviews on the same recipe
reviewSchema.index({ recipe: 1, user: 1 }, { unique: true });

// Middleware for calculating average ratings when review is submitted, updated or deleted
reviewSchema.post('save', function() {
    // This points to current review
    this.constructor.Review.calcAverageRatings(this.recipe);
});

reviewSchema.pre(/^findOneAnd/, async function(next) {
    this.r = await this.findOne();
    next();
});

reviewSchema.post(/^findOneAnd/, async function() {
    // await this.findOne() does not work here, as query has already executed
    await this.r.constructor.calcAverageRatings(this.r.recipe);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
