const axios = require('axios').default;
axios.defaults.baseURL = 'https://murmuring-citadel-74728.herokuapp.com/api';

const Blogpost = require('../models/blogpost.model');

exports.test = (req, res) => {
	res.send('Greetings frm test controller');
};

exports.blogpost_create = async (req, res) => {
	const blogpost = new Blogpost({
		title: req.body.title,
		content: req.body.content,
		author: req.query.username,
		timestamp: new Date().toISOString(),
	});

	if (blogpost.title.trim() === '' || blogpost.content.trim() === '') {
		return res.send('Must not be empty');
	}

	try {
		const response = await axios.get('/users/check', {
			params: {
				username: req.query.username,
				password: req.query.password,
			},
		});

		if (response.data === 'User data valid') {
			await blogpost.save();
			res.send('Blogpost added');
		} else {
			res.send(response.data);
		}
	} catch (err) {
		console.log(err);
	}
};

exports.blogpost_getById = async (req, res) => {
	try {
		const blogpost = await Blogpost.findById(req.params.id);
		res.send(blogpost);
	} catch (err) {
		console.log(err);
	}
};

exports.blogpost_get_all = async (req, res) => {
	try {
		const blogposts = await Blogpost.find().sort({ timestamp: -1 });
		res.send(blogposts);
	} catch (err) {
		console.log(err);
	}
};

exports.blogpost_modify = async (req, res) => {
	try {
		const blogpost = await Blogpost.findById(req.params.id);
		if (blogpost.author !== req.query.username) {
			res.send('Not Editable');
			return;
		}

		const response = await axios.get('/users/check', {
			params: {
				username: req.query.username,
				password: req.query.password,
			},
		});

		if (response.data === 'User data valid') {
			await Blogpost.findByIdAndUpdate(req.params.id, {
				$set: {
					title: req.body.title,
					content: req.body.content,
					timestamp: new Date().toISOString(),
				},
			});
			res.send('Blogpost Modified');
		} else {
			res.send(response.data);
		}
	} catch (err) {
		console.log(err);
	}
};

exports.blogpost_delete = async (req, res) => {
	try {
		const blogpost = await Blogpost.findById(req.params.id);
		if (blogpost.author !== req.query.username) {
			res.send('Cannot Delete');
			return;
		}

		const response = await axios.get('/users/check', {
			params: {
				username: req.query.username,
				password: req.query.password,
			},
		});

		if (response.data === 'User data valid') {
			await Blogpost.findByIdAndDelete(req.params.id);
			res.send('Deleted Successfully');
		} else {
			res.send(response.data);
		}
	} catch (err) {
		console.log(err);
	}
};
