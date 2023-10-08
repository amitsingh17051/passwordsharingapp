import User from "../models/user.model.js";

const admin = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id);

        return res.send(user.role);
		if (user.role === "admin" || user.role === "superadmin" || user.role === "manager") {
			next();
		} else {
			return res.status(401).json({
				success: false,
				message: "Unauthorized",
			});
		}
	} catch (err) {
		return res.status(500).send({
			message: "Something went wrong on the server",
			error: err.message,
			success: false,
		});
	}
};

export default admin;
