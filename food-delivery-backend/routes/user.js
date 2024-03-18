const express = require('express')
const {body,validationResult} = require('express-validator')
const User = require('../models/User')

const userRouter = express.Router()

const validateEmail  = ()=> body('email','Invalid Email').notEmpty().trim().isEmail()

userRouter.post('/user',
validateEmail(),
async (req,res)=>{
    try{

        const validationErrors = validationResult(req)
        if(!validationErrors.isEmpty()){
            console.log(validationErrors.array())
            res.json({success:false,msg:"Error creating user"})
        }else{
            const user = await User.create({
                name: req.body.name.trim(),
                password: req.body.password.trim(),
                email: req.body.email.trim(),
                city: req.body.city.trim()
            })
            res.json({success:true,result: user})
        }
    }catch(error){
        console.log(error)
        res.json({success:false, msg:"Error creating user"})
    }
})

module.exports = userRouter
