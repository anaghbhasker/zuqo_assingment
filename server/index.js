import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'


import connectDB from './config/dbConnection.js'
import userRouter from './controller/userController.js'

//////  VARIABLES

const app= express()
const PORT=process.env.PORT
const FRONTEND_URL=process.env.FRONTEND_URL
const DATABASE_URL=process.env.DATABASE_URL


//////  VARIABLES


/////DATABASE

connectDB(DATABASE_URL)

/////DATABASE


app.use(bodyParser.json({ limit:'200mb',extended: true }));
app.use(bodyParser.urlencoded({ limit:'200mb',extended:true,parameterLimit:500000000 }))


app.use(cors({
    origin:[FRONTEND_URL],
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials:true
}))


app.use(morgan('dev'))
app.use(express.json({extended: false, limit: '50mb'}));
app.use(express.urlencoded({ extended:false }));


/////////routes


app.use('/',userRouter)


/////////routes




app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})



