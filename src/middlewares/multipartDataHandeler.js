import multer from "multer";
import path from 'path'

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, "public/assets/"),
	filename: (req, file, cb) => {
		const uniqueName = `${Date.now()}-${Math.round(
			Math.random() * 1e9
		)}${path.extname(file.originalname)}`;
		cb(null, uniqueName);
	},
});

const handleMultipartData = multer({
	storage,
	limits: { fileSize: 1000000 * 10 },
}).single("media"); // 10mb

export default handleMultipartData;