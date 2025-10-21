import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { login, logout, register, updateProfile } from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.route("/register").post(register)
userRouter.route("/login").post(login)
userRouter.route("/logout").get(logout)
userRouter.route("/profile/update").post(isAuthenticated, updateProfile)

export default userRouter;