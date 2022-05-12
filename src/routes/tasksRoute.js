import express from 'express';
let router = express.Router();
import TasksController from '../controllers/tasksController';

const taskControlle = new TasksController();

router.get('/', taskControlle.list);
router.get('/:id', taskControlle.get);
router.post('/', taskControlle.store);



export default router;
