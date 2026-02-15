import express from "express";
import authController from "../controllers/authController.js";
import upload from "../middlewares/multer.js";

let authRouter = express.Router();

authRouter.post("/register", upload.single("image"), authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/send_reset_password_email", authController.sendResetCode);
authRouter.get("/get_all_users", authController.getAllUsers);
authRouter.delete("/delete_user/:id", authController.deleteUser);
authRouter.put(
  "/update_profile",
  upload.single("image"),
  authController.updateProfile,
);

authRouter.post("/verify_reset_code", authController.verifyResetCode);

authRouter.post("/reset_password", authController.resetPassword);

export default authRouter;
