const genericRepository = require("../repository/genericRepository.js");
const taskRepository = require("../repository/taskRepository.js");

list = async (userId) => {
    let data = null;
    try {
       data = await genericRepository.listByUser("task", userId);
    } catch (err){
       console.log(err);
    }
   return data;
}

getById = async (id, userId) => {
    let data = null;
    try {
        data = await genericRepository.getByIdAndUser("task", id, userId);
    } catch(err){
        console.log(err);
    }
    return data;
}

create = async (payload) => {
    let data = null;
    try {
        data = await taskRepository.createTask(payload.name, payload.description, payload.tagId, payload.userId);
    } catch(err){
        console.log(err);
    }
    return data;
}

update = async (payload, taskId) => {
    let data = null;
    try {
        data = await taskRepository.updateTask(taskId, payload.name, payload.description, payload.tagId);
    } catch(err){
        console.log(err);
    }
    return data;
}

deleteTask = async (id) => {
    let data = null;
    try {
        data = await taskRepository.deleteTask(id);
    } catch(err){
        console.log(err);
    }
    return data;
}

toggleTaskMarker = async (id) => {
    const isMarked = await taskRepository.isMarked(id);

    if(isMarked){
        try {
            const data = await taskRepository.unmarkTask(id);
            return data;
        }catch(err){
            console.log(err);
            return false;
        }
    } else {
        try {
            const data = await taskRepository.markTask(id);
            return data;
        }catch(err){
            console.log(err);
            return false;
        }
    }
}



module.exports = {
    list,
    getById,
    create,
    update,
    deleteTask,
    toggleTaskMarker
}