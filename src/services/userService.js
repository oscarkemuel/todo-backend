const crypto = require("cryptojs");
const genericRepository = require("../repository/genericRepository.js");
const userRepository = require("../repository/userRepository.js");

login = async (payload) => {

    let user = null;
    let userData = null;
    let wrongPasswordMessage = {message : "wrong email / password", data: null}

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

validatePassword = (typedPassword, databasePassword) => {
    return encriptPassword(typedPassword) === databasePassword;
}

encryptPassword = (password) => {
    return crypto.SHA3(password);
}

create = async (payload) => {
    let data = null;
    try {
        let password = encryptPassword(payload.password);
        data = await userRepository.createUser(payload.name, payload.email, password);
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