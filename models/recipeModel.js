const mongoose = require('mongoose');
const slugify = require('slugify');

const recipeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A recipe must have a name'],
            trim: true,
            maxlength: [50, 'A recipe name must have less or equal to 40 characters'],
            minlength: [5, 'A recipe name must have more or equal to 10 characters']
        },
        slug: String,
        description: {
            type: String,
            trim: true
        },
        imageCover: {
            type: String,
            required: [true, 'A recipe must have a cover image']
        },
        imageThumb: String,
        servings: {
            type: Number,
            required: [true, 'A recipe must have a servings']
        },
        prepTime: Number,
        cookTime: Number,
        difficulty: {
            type: String,
            required: [true, 'A recipe must have a difficulty'],
            enum: {
                values: ['easy', 'medium', 'hard'],
                message: 'Difficulty is either: easy, medium or hard'
            }
        },
        ingredients: [
            {
                description: String,
                type: {
                    type: String,
                    default: 'item',
                    enum: ['item', 'heading']
                }
            }
        ],
        method: [String],
        ratingsAverage: {
            type: Number,
            default: 4.5,
            max: [5, 'Rating must be less or equal to 5.0'],
            min: [1, 'Rating must be higher or equal to 1.0'],
            set: value => Math.round(value * 10) / 10
        },
        ratingsQuantity: {
            type: Number,
            default: 0
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false
        },
        likeCount: {
            type: Number,
            default: 0
        },
        favouriteCount: {
            type: Number,
            default: 0
        },
        viewCount: {
            type: Number,
            default: 0
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

recipeSchema.index({ slug: 1 })

// Virtual Populate
recipeSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'recipe',
    localField: '_id'
});

// Slugify Url
recipeSchema.pre('save', function(next) {
    // Skip function if name was not changed
    if (!this.isModified('name')) {
        next()
        return
    }

    this.slug = slugify(this.name, { lower: true });
    next();
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;