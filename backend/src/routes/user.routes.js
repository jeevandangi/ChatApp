import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import { upload } from "../../../../backend/src/middlewares/multer.middlewares.js";


const userRoutes = Router()


userRoutes.route("/register").post(upload.single("profile"), registerUser)

export { userRoutes }