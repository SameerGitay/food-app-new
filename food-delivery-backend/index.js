const express = require('express')
const connectDB = require('./dbConnection')
const userRouter = require('./routes/user')

connectDB()

const app = express()
const port = 7000

app.get('/',(req,res)=>{
    res.send('Hello World!')
})

app.use(express.json())
app.use('/api',userRouter)
app.listen(port,()=>{
    console.log(`lisetening on port ${port}`)
})