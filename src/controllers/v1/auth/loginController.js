import User from "../../../models/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET, USER_TOKEN_EXPIRES_IN } from "../../../config/index.js";
import bcrypt from "bcrypt";

const loginController = {
	async login(req, res) {
		const { email, password } = req.body;
		try {
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(401).json({
					success: false,
					message: "Username or password is wrong!",
				});
			}

			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				return res.status(401).json({
					success: false,
					message: "Username or password is wrong!",
				});
			}
			const generateToken = jwt.sign(
				{
					id: user._id,
					isAdmin: user.role,
				},
				JWT_SECRET,
				{ expiresIn: USER_TOKEN_EXPIRES_IN }
			);
			res.status(201).json({
				access_token: generateToken,
			});
		} catch (err) {
			return res.status(500).send({
				message: "Something went wrong on the server",
				error: err.message,
				success: false,
			});
		}
	},
};

export default loginController;
