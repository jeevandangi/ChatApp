import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

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



export { app }