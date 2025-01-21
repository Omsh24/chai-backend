// require('dotenv').config({path: './env'})

// import mongoose from "mongoose"
// import { DB_NAME } from "./constants";

// THIS IS THE SECOND WAY
import connectDB from "./db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path: './env'
})

connectDB()










// THIS IS THE FIRST APPROACH TO CONNECT DB 
/*
import express from "express"
const app = express()

// this is an effi and this is the general syntax for it
// it is basically a function that is directly executed without calling it
;( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        app.on("error", () => {
            console.log("Error: ", error)
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("Error: ", error)
        throw err
    }
} )()
*/