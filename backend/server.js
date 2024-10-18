import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from "mongoose";
import {Userrouter} from "./routers/user.js"
import cookieParser from "cookie-parser";
dotenv.config()

const app = express();
app.use(cors({
    origin:[`${process.env.FRONTEND_URL}`],
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())

mongoose.connect(`${process.env.URL}`)
app.use('/',Userrouter)

app.listen(process.env.PORT,(err)=>{
    if(err) console.log(err)
    console.log(`server started on ${process.env.PORT}`)})

