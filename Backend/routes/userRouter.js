import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import { login, register, updateProfile } from "../controllers/userController";


const userRouter = express.Router();

userRouter.route("/register").post(register)
userRouter.route("/login").post(login)
userRouter.route("/profile/update").post(isAuthenticated, updateProfile)

export default userRouter;