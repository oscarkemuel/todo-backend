const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// /user/...

router.post('/login', UserController.login);
router.post('/', UserController.create);


module.exports = router;
