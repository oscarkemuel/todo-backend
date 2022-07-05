const db = require("../database/initializer.js");
const taskService = require("../services/taskService.js")
const userService = require("../services/userService.js");
const tagService = require("../services/tagService.js")
const validator = require("../validators");

const SERVER_ERROR_MESSAGE = "Sorry! An error happened while processing your request";
const USER_NOT_FOUND_MESSAGE = "User not found";
const USER_HEADER_NOT_FOUND_MESSAGE = "userId header is required";
const TASK_CREATED_MESSAGE = "Task created";
const TASK_UPDATED_MESSAGE = "Task updated";
const TASK_DELETED_MESSAGE = "Task deleted";
const TASK_NOT_FOUND_MESSAGE = "Task not found with given id";
const TASK_TOGGLED_MESSAGE = "Task marking sucessfully processed";

list = async (req, res) => {
  let userId = req.headers.userid;
  if(userId === undefined || userId === null){ 
    return res.status(403).send({message: USER_HEADER_NOT_FOUND_MESSAGE});
  }
  userId = Number(userId);
  if(!userService.userExistsWithId(userId)) {
    return res.status(400).json({message: USER_NOT_FOUND_MESSAGE});
  }
  const tasks = await taskService.list(userId);
  if(tasks === null){
    return res.status(500).json(SERVER_ERROR_MESSAGE);
  }
  return res.status(200).json(tasks);
}

get = async (req, res) => {
  const taskId = req.params.id;
  let userId = req.headers.userid;
  if(userId === undefined || userId === null){ 
    return res.status(403).send({message: USER_HEADER_NOT_FOUND_MESSAGE});
  }
  userId = Number(userId);
  if(!userService.userExistsWithId(userId)) {
    return res.status(400).json({message: USER_NOT_FOUND_MESSAGE});
  }
  const task = await taskService.getById(taskId, userId);
  if(task === null){
    return res.status(500).json(SERVER_ERROR_MESSAGE);
  }

  if(task === undefined) {
    return res.status(404).json({message: TASK_NOT_FOUND_MESSAGE});
  }

  return res.status(200).json(task);
}

store = async (req, res) => {
  const body = req.body;
  let userId = req.headers.userid;
  let payload;

  if(userId === undefined || userId === null){ 
    return res.status(403).send({message: USER_HEADER_NOT_FOUND_MESSAGE});
  }
  userId = Number(userId);
  if(!userService.userExistsWithId(userId)) {
    return res.status(400).json({message: USER_NOT_FOUND_MESSAGE});
  }

  try {
    payload = validator.createTaskValidator(body);
  } catch (error) {
    return res.status(400).json({message: error.message})
  }

  let tag;

  tag = await tagService.getByName(payload.tag, userId);

  if(tag === undefined) {
    await tagService.create(payload.tag, userId);
    tag = await tagService.getByName(payload.tag, userId);
  }

  const taskIsCreated = await taskService.create({ 
    name: payload.name,
    description: payload.description,
    tagId: tag.id,
    userId: userId
  });

  if(taskIsCreated === null){
    return res.status(500).json(SERVER_ERROR_MESSAGE);
  }

  if(taskIsCreated) {
    return res.status(201).json({message: TASK_CREATED_MESSAGE});
  }

  return res.status(400);
}

update = async (req, res) => {
  const body = req.body;
  const taskId = req.params.id;
  let userId = req.headers.userid;
  let payload;

  if(userId === undefined || userId === null){
    return res.status(403).send({message: USER_HEADER_NOT_FOUND_MESSAGE});
  }
  userId = Number(userId);
  if(!userService.userExistsWithId(userId)) {
    return res.status(400).json({message: USER_NOT_FOUND_MESSAGE});
  }
  
  try {
    payload = validator.createTaskValidator(body);
  } catch (error) {
    return res.status(400).json({message: error.message})
  }

  let tag;
  tag = await tagService.getByName(payload.tag, userId);

  if(tag === undefined) {
    await tagService.create(payload.tag, userId);
    tag = await tagService.getByName(payload.tag, userId);
  }

  const task = await taskService.getById(taskId, userId);
  if(task === undefined) {
    return res.status(404).json({message: TASK_NOT_FOUND_MESSAGE});
  }

  const taskIsUpdated = await taskService.update({
    name: payload.name,
    description: payload.description,
    tagId: tag.id,
    userId: userId
  }, taskId);

  if(taskIsUpdated === null){
    return res.status(500).json(SERVER_ERROR_MESSAGE);

  } 
  return res.status(200).json({message: TASK_UPDATED_MESSAGE});
}


deleteTask = async (req, res) => {
  const taskId = req.params.id;
  let userId = req.headers.userid;
  if(userId === undefined || userId === null){
    return res.status(403).send({message: USER_HEADER_NOT_FOUND_MESSAGE});
  }
  userId = Number(userId);
  if(!userService.userExistsWithId(userId)) {
    return res.status(400).json({message: USER_NOT_FOUND_MESSAGE});
  }
  const task = await taskService.getById(taskId, userId);
  if(task === undefined) {
    return res.status(404).json({message: TASK_NOT_FOUND_MESSAGE});
  }
    
  const taskIsDeleted = await taskService.deleteTask(taskId, userId);
  if(taskIsDeleted === null){
    return res.status(500).json(SERVER_ERROR_MESSAGE);
  }
  if(taskIsDeleted) {
    return res.status(200).json({message: TASK_DELETED_MESSAGE});
  }
  return res.status(400);
}

toggleTaskMarker = async (req, res) => {
  const taskId = req.params.id;
  let userId = req.headers.userid;
  if(userId === undefined || userId === null){
    return res.status(403).send({message: USER_HEADER_NOT_FOUND_MESSAGE});
  }
  userId = Number(userId);
  if(!userService.userExistsWithId(userId)) {
    return res.status(400).json({message: USER_NOT_FOUND_MESSAGE});
  }
  const task = await taskService.getById(taskId, userId);
  if(task === undefined) {
    return res.status(404).json({message: TASK_NOT_FOUND_MESSAGE});
  }
  const toggleSucessfull = await taskService.toggleTaskMarker(taskId, userId);
  if(toggleSucessfull){
    return res.status(200).json({message: TASK_TOGGLED_MESSAGE});
  } else {
    return res.status(500).json(SERVER_ERROR_MESSAGE);
  }
}


module.exports = {
  list,
  get,
  store,
  update,
  deleteTask,
  toggleTaskMarker
}
