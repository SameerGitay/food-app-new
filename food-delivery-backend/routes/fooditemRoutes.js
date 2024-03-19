const express = require('express')
const food_item = require('../models/FoodItems')
const categories = require('../models/FoodCategory')

const foodItemRouter = express.Router()


foodItemRouter.post('/items',async (req,res)=>{
    try{
        const foodItems = await food_item.find({})

        res.json({success: true,data: foodItems})     
    }catch(error){
        console.log(err)
        res.status(400).json({success:false,msg:"Error retrieving products list"})
    }
})

foodItemRouter.post('/categories',async (req,res)=>{
    try{
        const foodCatogories = await categories.find({})

        res.json({success: true, data: foodCatogories})
    }catch(error){
        console.log(error)
        res.status(400).json({success: false, msg: "Error retrieving products categories"})
    }
})

module.exports = foodItemRouter