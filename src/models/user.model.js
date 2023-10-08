import { Schema, model } from "mongoose";

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, unique: true, required: true },
		password: { type: String, required: true },
		role: { type: String, default: "executive" },
	},
	{ timestamps: true }
);

export default model("User", userSchema, "users");
