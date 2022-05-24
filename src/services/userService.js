const genericRepository = require("../repository/genericRepository.js");
const userRepository = require("../repository/userRepository.js");

login = async (payload) => {

    let user = null;
    let userData = null;
    let wrongPasswordMessage = {message = "wrong email / password", data: null}

    try {
        let user = await getUserByEmail(payload.email);
        userData = {
            name: user.name,
            email: user.email
        }

    } catch(err){
        // user doesn't exist with given email
        console.log(err);
        return wrongPasswordMessage;
    }

    return validatePassword(payload.password, user.password)?  
        {message: "logged in", data: userData}: wrongPasswordMessage;

}

// Todo: finish it
validatePassword = () => {
    return true;
}


create = async (payload) => {
    let data = null;
    try {
        // TODO: Implemente criptography
        data = await userRepository.createUser(payload.name, payload.email, payload.password);
    } catch(err){
        console.log(err);
    }
    return data;
}

getUserByEmail = async (email) => {
    let user = null;
    try {
        user = await genericRepository.getByField("user", "email", email);
    } catch(err){
        console.log(err);
        throw err;
    }
    return user;

}


module.exports = {
    login,
    create
}