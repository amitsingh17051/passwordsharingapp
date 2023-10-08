import User from "../../../models/user.model.js";
import bcrypt from "bcrypt";


const registerController = {
	async register(req, res) {
		
		const { password, name, role, email } = req.body;
		try {
			
			const isExist = await User.exists({ email });

		
			if (isExist) {
				return res.status(401).json({
					success: false,
					message: "Unauthorized",
				});
			}
			
			const hashedPassword =  await bcrypt.hash(password, 10);
			//return res.status(200).json(isExist);

			const newUser = new User({
				name: name,
				email: email,
				password: hashedPassword,
				role: role,
			});
		
			const saveUser = await newUser.save();
			res.status(201).json(saveUser);
		} catch (err) {
			return res.status(500).send({
				message: "Something went wrong on the server",
				error: err.message,
				success: false,
			});
		}
	},
};

export default registerController;