const db = require("../database/initializer.js");
const genericRepository = require("../repository/genericRepository.js");
const tagRepository = require("../repository/tagRepository.js");

getByName = async (name, userId) => {
    let data = null;
    try {
        data = await genericRepository.getByFieldAndUser("tag", "name", name, userId);
    } catch(err){
        console.log(err);
    }
    return data;
}


create = async (name, userId) => {
    let data = null;
    try {
        data = await tagRepository.create(name, userId);
    } catch(err){
        console.log(err);
    }
    return data;
}


list = async (userId) => {
    let data = null;
    try {
       data = await genericRepository.listByUser("tag", userId);
    } catch (err){
       console.log(err);
    }
   return data;
}

module.exports = {
    getByName,
    create,
    list
}