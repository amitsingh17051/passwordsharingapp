import dotenv from "dotenv";
dotenv.config();

export const { PORT, DB_URI, JWT_SECRET, USER_TOKEN_EXPIRES_IN, ORIGIN_URL } =
	process.env;