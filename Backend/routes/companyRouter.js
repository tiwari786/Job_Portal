import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { companyRegister, getCompany, getCompanyById, updateCompany } from "../controllers/compnayController.js";

const companyRouter = express.Router();

companyRouter.route("/register").post(isAuthenticated, companyRegister);
companyRouter.route("/get").get(isAuthenticated, getCompany);
companyRouter.route("/get/:id").get(isAuthenticated, getCompanyById)
companyRouter.route("/update/:id").put(isAuthenticated, updateCompany)

export default companyRouter;