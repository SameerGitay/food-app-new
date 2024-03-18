const mongoose = require('mongoose')

const {Schema} = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true,
        enum:{
            values:['pune','mumbai','bangalore'],
            message: 'We do not serve in {VALUE}'
        }
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLength: 8,
        maxLength: 12
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user',UserSchema)