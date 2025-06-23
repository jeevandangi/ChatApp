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
        origin: "*",
        credentials: true
    }
))
app.use(express.json())
app.use(cookieParser())

// routes


app.use(errorHandler)


export { app }