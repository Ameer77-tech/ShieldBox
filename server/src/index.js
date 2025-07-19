import express from 'express'
const app = express()

import dotenv from 'dotenv'
dotenv.config()

import connectdb from '../config/DbConn.js'

import cookieParser from 'cookie-parser'

import authRoutes from '../routes/authRoutes/auth.route.js'


app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

connectdb()

const PORT = process.env.PORT || 3000

app.use('/api/auth', authRoutes)


app.get('/',(req,res)=>{
    res.send("Running")
})

app.listen(PORT,()=>{
    console.log("Running")
})