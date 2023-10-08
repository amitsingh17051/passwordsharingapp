import express from "express";
import credentialController from "../../controllers/v1/credential/credentialController.js"
import auth from "../../middlewares/auth.js"
import admin from "../../middlewares/admin.js"

const router = express.Router();

router
	.post("/create", [auth, admin],  credentialController.create)
	.post("/seed", credentialController.seed)
	.post("/delete/:id", credentialController.delete)
	.post("/update/:id", credentialController.update)
	.get("/", [auth], credentialController.get)
	.get("/:id", credentialController.getOne)

export default router;
