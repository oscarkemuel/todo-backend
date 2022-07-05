const express = require('express');
const router = express.Router();
const TasksController = require('../controllers/tasksController')

// /tasks
router.get('/', TasksController.list);
router.get('/:id', TasksController.get);
router.put('/:id', TasksController.update);
router.delete('/:id', TasksController.deleteTask);
router.post('/', TasksController.store);
router.post('/mark/:id', TasksController.toggleTaskMarker);

module.exports = router;
