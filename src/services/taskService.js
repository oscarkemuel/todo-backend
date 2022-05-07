const genericRepository = require("../repository/genericRepository.js");
const taskRepository = require("../repository/taskRepository.js");

list = async () => {
   let data = null;
   try {
       data = await genericRepository.list("task");
   } catch (err){
       console.log(err);
   }
   return data;
}

getById = async (id) => {
    let data = null;
    try {
        data = await genericRepository.getById("task", id);
    } catch(err){
        console.log(err);
    }
    return data;
}

create = async (payload) => {
    let data = null;
    try {
        data = await taskRepository.createTaks(payload.name, payload.description, payload.tag);
    } catch(err){
        console.log(err);
    }
    return data;
}

module.exports = {
    list,
    getById,
    create
}