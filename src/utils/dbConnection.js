import mongoose from "mongoose";
import { DB_URI } from "../config/index.js";

mongoose.connection.on("connected", () => {
	console.log(`DB connected...[${DB_URI}]`);
});

mongoose.connection.on("disconnected", () => {
	console.log("DB Cconnection erro ..X.X..");
});

const dbConnection = async () => {
	try {
		await mongoose.connect(DB_URI);
	} catch (err) {
		console.log("connection error", err.message);
	}
};

export default dbConnection;