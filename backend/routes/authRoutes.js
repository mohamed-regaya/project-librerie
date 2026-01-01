import express from "express";
import authController from "../controllers/authController.js";
import upload from "../middlewares/multer.js";

let authRouter = express.Router();

authRouter.post("/register", upload.single("image"), authController.register);
authRouter.post("/login", authController.login);

export default authRouter;
