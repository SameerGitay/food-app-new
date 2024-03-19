const express = require('express')
const {body,validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const userRouter = express.Router()

const validateEmail  = ()=> body('email','Invalid Email').notEmpty().trim().isEmail()
const validatePassword = () => body('password','Password should be 8-12 characters long').notEmpty().isLength({ min: 8, max:12 });

userRouter.post('/user',
validateEmail(),
validatePassword(),
async (req,res)=>{
    try{

        const validationErrors = validationResult(req)
        if(!validationErrors.isEmpty()){
            console.log(validationErrors.array())
            res.status(400).json({success:false,msg:"Error creating user"})
        }else{
            const salt = await  bcrypt.genSalt(10)
            const passwordHash = await bcrypt.hash(req.body.password.trim(),salt)

            const user = await User.create({
                name: req.body.name.trim(),
                password: passwordHash,
                email: req.body.email.trim(),
                city: req.body.city.trim()
            })
            user.password = undefined
            res.json({success:true,result: user})
        }
    }catch(error){
        console.log(error)
        res.status(400).json({success:false, msg:"Error creating user"})
    }
})

module.exports = userRouter
