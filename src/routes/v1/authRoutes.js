import express from "express";
import registerController from "../../controllers/v1/auth/registerController.js";
import loginController from "../../controllers/v1/auth/loginController.js";
const router = express.Router();

router
	.post("/register", registerController.register)
	.post("/login", loginController.login);

export default router;
