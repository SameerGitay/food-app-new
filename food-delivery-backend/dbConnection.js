const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://sameersqr:A2iEDAA14dB0zncO@cluster0.7a3pwf6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const mongoConnect = async () =>{
    try {
        await mongoose.connect(mongoURI,{
            "dbName": "gofood"
        });
        console.log('Connected to db')
      } catch (error) {
        console.log('Error connecting to db')
      }
}

module.exports = mongoConnect