import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";

const auth = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).json({
			success: false,
			message: "Unauthorized",
		});
	}
	const token = authHeader.split(" ")[1];
	try {
		jwt.verify(token, JWT_SECRET, (err, user) => {
			if (err) {
				return res.status(401).json({
					success: false,
					message: "Unauthorized",
				});
			}
			req.user = user;
			next();
		});
	} catch (err) {
		return res.status(500).send({
			message: "Something went wrong on the server",
			error: err.message,
			success: false,
		});
	}
};

export default auth;
