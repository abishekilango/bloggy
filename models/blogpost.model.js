const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogpostSchema = new Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		author: { type: String, required: true },
		timestamp: { type: String, required: true },
	},
	{ collection: 'blogposts' }
);

module.exports = mongoose.model('Blogpost', BlogpostSchema);
