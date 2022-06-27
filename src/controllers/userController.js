const userService = require("../services/userService.js");
const validator = require("../validators");

login = async (req, res) => {
    const body = req.body;
    let payload = validator.userLoginValidator(body);
    const response = await userService.login(payload);
    if(response.data == null){
        return res.status(403).json(response);
    }
  
    return res.status(200).json(response);
}

create = async (req, res) => {
    const body = req.body;
    let payload = validator.userCreationValidator(body);
    let user = await userService.getUserByEmail(payload.email);
    if(user != null){
        return res.status(400).json({message: "User already exists"});
    }
    const response = await userService.create(payload);
    return res.status(201).json(response);
}

module.exports = {
    login,
    create,
}