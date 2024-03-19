const mongoose = require('mongoose')

const {Schema} = mongoose
const any = new Schema({any:mongoose.Mixed})

const FoodItemSchema = new Schema({
    CategoryName:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    options:{
        type: [any]
    }
})

module.exports = mongoose.model('food_item',FoodItemSchema)