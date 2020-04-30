const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.test = (req, res) => {
	res.send('Greetings frm test controller');
};

exports.user_create = async (req, res) => {
	try {
		let user = await User.findOne({ username: req.query.username });
		if (!user) {
			const hashedPassword = await bcrypt.hash(req.query.password, 10);
			user = new User({
				username: req.query.username,
				password: hashedPassword,
			});
			await user.save();
			res.status(201).send('User created');
		} else {
			res.send('User already exists');
		}
	} catch (err) {
		console.log(err);
	}
};

exports.user_getAll = async (req, res) => {
	try {
		const users = await User.find();
		res.send(users);
	} catch (err) {
		console.log(err);
	}
};

exports.user_checkValidity = async (req, res) => {
	try {
		const user = await User.findOne({ username: req.query.username });
		if (!user) {
			res.send('User data not found');
		} else if (await bcrypt.compare(req.query.password, user.password)) {
			res.status(200).send('User data valid');
		} else {
			res.send('Invalid credentials');
		}
	} catch (err) {
		console.log(err);
	}
};
