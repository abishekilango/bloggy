const express = require('express');
const router = express.Router();

const {
	test,
	user_create,
	user_getAll,
	user_checkValidity,
} = require('../controllers/user.controller');

router.get('/test', test);
router.post('/create', user_create);
router.get('/', user_getAll);
router.get('/check', user_checkValidity);

module.exports = router;
