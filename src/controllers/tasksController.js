const db = require("../database/initializer.js");
const taskService = require("../services/taskService.js")
const userService = require("../services/userService.js");
const tagService = require("../services/tagService.js")
const validator = require("../validators");

const SERVER_ERROR_MESSAGE = "Sorry! An error happened while processing your request";
const USER_NOT_FOUND_MESSAGE = "User not found";
const USER_HEADER_NOT_FOUND_MESSAGE = "userId header is required";

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

  console.log({ 
    name: payload.name,
    description: payload.description,
    tag: tag.id,
    user_id: userId
  })

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
    return res.status(201).json(payload);
  }

  return res.status(400);
}

module.exports = {
  list,
  get,
  store
}
