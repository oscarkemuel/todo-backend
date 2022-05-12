import TaskService from "../services/taskService.js";
import TagService from "../services/tagService.js";
import { createTaskValidator } from "../validators";

const SERVER_ERROR_MESSAGE = "Sorry! An error happened while processing your request";

export default class TaskController {
  taskService;
  tagService;

  constructor() {
    this.taskService = new TaskService();
    this.tagService = new TagService();
  }

  async list(req, res){
    const tasks = await this.taskService.list();

    if(tasks === null){
      return res.status(500).json(SERVER_ERROR_MESSAGE);
    }

    return res.status(200).json(tasks);
  }

  async get(req, res){
    const id = req.params.id;

    const task = await taskService.getById(id);
    if(task === null){
      return res.status(500).json(SERVER_ERROR_MESSAGE);
    }

    return res.status(200).json(task);
  }

  async store(req, res){
    const body = req.body;
    let payload;

    try {
      payload = createTaskValidator(body);
    } catch (error) {
      return res.status(400).json({message: error.message})
    }

    let tag;

    tag = await tagService.getByName(payload.tag);

    if(tag === undefined) {
      await tagService.create(payload.tag);

      tag = await tagService.getByName(payload.tag);
    }

    const taskIsCreated = await taskService.create({ 
      name: payload.name,
      description: payload.description,
      tag: tag.id
    });

    if(taskIsCreated === null){
      return res.status(500).json(SERVER_ERROR_MESSAGE);
    }

    if(taskIsCreated) {
      return res.status(201).json(payload);
    }

    return res.status(400);
  }
}
