import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { createJob, getAdminJobs, getAllJobs, jobById } from "../controllers/jobController.js"

const jobRouter = express.Router()

jobRouter.route("/post").post(isAuthenticated, createJob)
jobRouter.route("/get").get(isAuthenticated, getAllJobs)
jobRouter.route("/getadminjobs").get(isAuthenticated, getAdminJobs)
jobRouter.route("/get/:id").get(isAuthenticated, jobById)

export default jobRouter;