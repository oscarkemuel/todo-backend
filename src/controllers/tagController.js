const userService = require("../services/userService.js");
const tagService = require("../services/tagService.js");

const SERVER_ERROR_MESSAGE = "Sorry! An error happened while processing your request";
const USER_NOT_FOUND_MESSAGE = "User not found";
const USER_HEADER_NOT_FOUND_MESSAGE = "userId header is required";
const NO_TAG_FOUND_MESSAGE = "Tag not found with given id";

get = async (req, res) => {
    const tagId = req.params.id;
    let userId = req.headers.userid;
    if (userId === undefined || userId === null) {
        return res.status(403).send({ message: USER_HEADER_NOT_FOUND_MESSAGE });
    }
    userId = Number(userId);
    if (!userService.userExistsWithId(userId)) {
        return res.status(400).json({ message: USER_NOT_FOUND_MESSAGE });
    }
    
    const tag = await tagService.getById(tagId, userId);
    if (tag === null) {
        return res.status(500).json(SERVER_ERROR_MESSAGE);
    }
    
    if(tag === undefined){
        return res.status(404).json({message: NO_TAG_FOUND_MESSAGE});
    }
    
    return res.status(200).json(tag);
}

list = async (req, res) => {
    let userId = req.headers.userid;
    if (userId === undefined || userId === null) {
        return res.status(403).send({ message: USER_HEADER_NOT_FOUND_MESSAGE });
    }
    userId = Number(userId);
    if (!userService.userExistsWithId(userId)) {
        return res.status(400).json({ message: USER_NOT_FOUND_MESSAGE });
    }
    const tags = await tagService.list(userId);
    if (tags === null) {
        return res.status(500).json(SERVER_ERROR_MESSAGE);
    }
    return res.status(200).json(tags);
}

module.exports = {
    get,
    list
}
  