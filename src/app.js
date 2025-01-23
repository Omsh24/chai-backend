import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// to recieve data - it can be in many forms
// means that we are accepting json files
app.use(express.json({limit: "16kb"}))
// to get data from url- which can be in many forms
app.use(express.urlencoded({extended: true, limit: "16kb"}))
// to store all the public assets
app.use(express.static("public"))
app.use(cookieParser())

// routes import
import userRouter from './routes/user.routes.js'

// routes declaration
app.use("/api/v1/users", userRouter)

export { app }