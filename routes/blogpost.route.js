const express = require('express');
const router = express.Router();

const {
	test,
	blogpost_create,
	blogpost_getById,
	blogpost_get_all,
	blogpost_modify,
	blogpost_delete,
} = require('../controllers/blogpost.controller');

router.get('/test', test);
router.post('/create', blogpost_create);
router.get('/:id', blogpost_getById);
router.get('/', blogpost_get_all);
router.post('/:id/modify', blogpost_modify);
router.delete('/:id/delete', blogpost_delete);

module.exports = router;
