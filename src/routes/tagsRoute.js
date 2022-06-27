const express = require('express');
const router = express.Router();
const TagController = require('../controllers/tagController');

// /tags
router.get('/', TagController.list);
router.get('/:id', TagController.get);

module.exports = router;
