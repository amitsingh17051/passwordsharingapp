import { Schema, model } from "mongoose";

const credentailSchema = new Schema(
	{
        title: { type: String, required: true },
        url: { type: String, required: true },
		username: { type: String, required: true },
		password: { type: String, required: true },
		credentail_details: { type: String, required: false},
		
	},
	{ timestamps: true }
);

export default model("Credentail", credentailSchema, "credentails");
