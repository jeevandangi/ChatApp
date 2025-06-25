import { Router } from "express";
import { getUser, loginUser, registerUser } from "../controllers/user.controllers.js";
import { upload } from "../../../../backend/src/middlewares/multer.middlewares.js";
import { verifyUser } from "../middlewares/verifyUser.middlewares.js";


const userRoutes = Router()


userRoutes.route("/register").post(upload.single("profile"), registerUser)
userRoutes.route("/login").post(loginUser)
userRoutes.route("/getUser").get(verifyUser, getUser)

export { userRoutes }