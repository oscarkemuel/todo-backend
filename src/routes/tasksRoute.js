const express = require('express');
const router = express.Router();
const TasksController = require('../controllers/tasksController')

// /tasks
router.get('/', TasksController.list);
router.get('/:id', TasksController.get);
router.post('/', TasksController.store);

module.exports = router;
