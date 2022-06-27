const userService = require("../services/userService.js");
const tagService = require("../services/tagService.js");

const SERVER_ERROR_MESSAGE = "Sorry! An error happened while processing your request";
const USER_NOT_FOUND_MESSAGE = "User not found";
const USER_HEADER_NOT_FOUND_MESSAGE = "userId header is required";
