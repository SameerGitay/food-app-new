const express = require('express')
const connectDB = require('./dbConnection')
const userRouter = require('./routes/userRoutes')
const appRouter = require('./routes/appRoutes')
const foodItemRouter = require('./routes/fooditemRoutes')

connectDB()

const app = express()
const port = 7000

// app.get('/',(req,res)=>{
//     res.send('Hello World!')
// })

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})
app.use(express.json())
app.use('/api',userRouter)
app.use('/api',appRouter)
app.use('/api',foodItemRouter)
app.listen(port,()=>{
    console.log(`lisetening on port ${port}`)
})