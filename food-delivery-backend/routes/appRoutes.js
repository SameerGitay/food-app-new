const express = require('express')
const { body, validationResult } = require('express-validator')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const appRouter = express.Router()

const jwtSecret = 'mygofoodapplicationreactbootstrap'

const validateEmail = () => body('email', 'Invalid login id or password').notEmpty().trim().isEmail()

appRouter.post('/login',
    validateEmail(),
    async (req, res) => {
        try {
            const validationErrors = validationResult(req)

            if (!validationErrors.isEmpty()) {
                console.log(validationErrors.array())
                res.status(400).json({ success: false, msg: "Invalid login id or password" })
            } else {
                const email = req.body.email
                const userData = await User.findOne({ email });
                if (!userData){
                    res.status(400).json({ success: false, msg: "Invalid login id or password" })
                } else {
                    const salt = await bcrypt.genSalt(10)
                    const passwordMatch = await bcrypt.compare(req.body.password,userData.password)
                    if ( !passwordMatch ) {
                        res.status(400).json({ success: false, msg: "Invalid login id or password" })
                    } else {
                        const authToken = jwt.sign({user:userData.id},jwtSecret)
                        res.json({ success: true, authToken })
                    }
                }
            }
        }catch(error){
            console.log(error)
            res.status(400).json({ success: false, msg: "Invalid login id or password" })
        }
        
    })

module.exports = appRouter