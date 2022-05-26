const taskService = require("../services/userService.js");
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