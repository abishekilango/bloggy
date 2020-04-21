const User = require('../models/user.model');

exports.test = (req, res) => {
	res.send('Greetings frm test controller');
};

exports.user_create = async (req, res) => {
	try {
		let user = await User.findOne({ username: req.query.username });
		if (!user) {
			user = new User({
				username: req.query.username,
				password: req.query.password,
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
		} else if (user.password !== req.query.password) {
			res.send('Invalid credentials');
		} else {
			res.status(200).send('User data valid');
		}
	} catch (err) {
		console.log(err);
	}
};
