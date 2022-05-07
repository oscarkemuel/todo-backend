const db = require("../database/initializer.js");
const taskService = require("../services/taskService.js")
const tagService = require("../services/tagService.js")
const validator = require("../validators");

const SERVER_ERROR_MESSAGE = "Sorry! An error happened while processing your request";

list = async (req, res) => {
  const tasks = await taskService.list();
  if(tasks === null){
    return res.status(500).json(SERVER_ERROR_MESSAGE);
  }

  return res.status(200).json(tasks);
}

get = async (req, res) => {
  const id = req.params.id;

  const task = await taskService.getById(id);
  if(task === null){
    return res.status(500).json(SERVER_ERROR_MESSAGE);
  }

  return res.status(200).json(task);
}

store = async (req, res) => {
  const body = req.body;
  let payload;

  try {
    payload = validator.createTaskValidator(body);
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

module.exports = {
  list,
  get,
  store
}
