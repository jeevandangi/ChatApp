import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.middlewares.js";

const app = express();

dotenv.config({
    path: "./.env"
})
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
))
app.use(express.json({
    limit: "16kb",
    extended: true
}))
app.use(cookieParser())
app.use(express.urlencoded({
    limit: "16kb",
    extended: true
}))

// routes
import { userRoutes } from "./routes/user.routes.js"

app.use("/api/v1/users", userRoutes)

app.use(errorHandler)


export { app }