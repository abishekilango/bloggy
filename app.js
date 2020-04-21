const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const blogpost = require('./routes/blogpost.route');
const user = require('./routes/user.route');

const app = express();
const router = express.Router();

const mongoose = require('mongoose');
const db_url = process.env.MONGODB_URL;
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.use('/blogposts', blogpost);
router.use('/users', user);
app.use('/api', router);

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`server running on port ${port}`);
});
