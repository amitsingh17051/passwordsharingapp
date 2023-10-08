// All used packaged 
import express from "express";
import cors from "cors";
import path from "path";
import multer from "multer";


// configration files
import { PORT, ORIGIN_URL } from "./config/index.js";
import 'dotenv/config'
import dbConnection from "./utils/dbConnection.js";

// Routes
import authRoutes from "./routes/v1/authRoutes.js";
import credentailsRoutes from "./routes/v1/credentialsRoutes.js";

var app = express();

// Set Cors to all 
app.use(
	cors({
		origin: "*",
	})
);


app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static("public"));
app.use(express.json());
app.get("/", (req, res) => {
	res.json({ msg: "Hello from the other side" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/credentail", credentailsRoutes);


app.listen(PORT, async () => {
	console.log(`Listeing on port no ${PORT}`);
	await dbConnection();
});