import Credentail from "../../../models/credential.model.js";
import { generateCredetials } from "../../../models/seeders/credentials.seeder.js";


const registerController = {
	async get(req, res) {
		const { page = 1, limit = 10, search = "", sort = "title", genre = "All"} = req.query;

		try {
			const credentials = await Credentail.find()
				.limit(limit * 1)
				.skip((page - 1) * limit)
				.exec();


			const count = await Credentail.count();

			res.status(200).json({
				credentials,
				totalPages: Math.ceil(count / limit),
				currentPage: page
			});
		} catch (err) {
			return res.status(500).send({
				message: "Something went wrong on the server",
				error: err.message,
				success: false,
			});
		}
	},
    async create(req, res) {
		
		const { title, url, username, password, credentail_details } = req.body;
		try {
			
			const isExist = await Credentail.exists({ title });

		
			if (isExist) {
				return res.status(401).json({
					success: false,
					message: "Credentials already exists",
				});
			}

			const newCredentail = new Credentail({
				title,
                url,
				username,
				password,
				credentail_details
			});
		
			const saveCredentail = await newCredentail.save();
			res.status(201).json(saveCredentail);
		} catch (err) {
			return res.status(500).send({
				message: "Something went wrong on the server",
				error: err.message,
				success: false,
			});
		}
	},
	async seed(req, res){
		const { quantity } = req.query;

		const credetials = generateCredetials(50);

		Credentail.insertMany(credetials)
			.then(docs => {
				console.log()
				return res.status(201).send(`${docs.length} credentials have been inserted into the database.`)
			})
			.catch(err => {
				console.error(err);
				console.error(`${err.writeErrors?.length ?? 0} errors occurred during the insertMany operation.`);
			});
		
	},
	async delete(req, res){
		const id  = req.params.id
		try {
			const credetial = await Credentail.deleteOne({ _id: id });
			return res.status(200).json(credetial)
		} catch (err) {
			return res.status(500).send({
				message: "Something went wrong on the server",
				error: err.message,
				success: false,
			});
		}
	},
	async getOne(req, res){
		const id  = req.params.id
		try {
			const credetial = await Credentail.findById(id);
			return res.status(200).json(credetial)
		} catch (err) {
			return res.status(500).send({
				message: "Something went wrong on the server",
				error: err.message,
				success: false,
			});
		}
	},
	async update(req, res) {
		
		const { title, url, username, password, credentail_details } = req.body;
		const id  = req.params.id

		try {
			
			const isNull = await Credentail.findById(id);
			
			if (isNull == null) {
				return res.status(401).json({
					success: false,
					message: "Credential id not exits",
				});
			}

			const updateCredentail = await Credentail.findOneAndUpdate({_id: id}, {
				title,
                url,
				username,
				password,
				credentail_details
			});
		
			
			res.status(201).json(req.body);
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