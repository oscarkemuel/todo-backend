const genericRepository = require("../repository/genericRepository.js");
const userRepository = require("../repository/userRepository.js");
const bcrypt = require('bcrypt');

const Encrypt = {
    cryptPassword: (password) =>
        bcrypt.genSalt(10)
        .then((salt => bcrypt.hash(password, salt)))
        .then(hash => hash),

    comparePassword: (password, hashPassword) =>
        bcrypt.compare(password, hashPassword)
        .then(resp => resp)
}

login = async (payload) => {

    let user = null;
    let userData = null;
    let wrongPasswordMessage = {message : "wrong email / password", data: null}

    try {
        user = await getUserByEmail(payload.email);
        userData = {
            id: user.id,
            name: user.name,
            email: user.email
        }

    } catch(err){
        // user doesn't exist with given email
        return wrongPasswordMessage;
    }

    return await  Encrypt.comparePassword(payload.password, user.password)?  
        {message: "logged in", data: userData}: wrongPasswordMessage;
}

create = async (payload) => {
    let data = null;
    try {
        let password = await Encrypt.cryptPassword(payload.password);
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

getUserById = async (id) => {
    let user = null;
    try {
        user = await genericRepository.getById("user", id);
    } catch(err){
        console.log(err);
        throw err;
    }
    return user;
}

userExistsWithId = async (id) => {
    let user = null;
    try {
        user = await genericRepository.getById("user", id);
    } catch(err){
        console.log(err);
        throw err;
    }
    return user !== null;
}

module.exports = {
    login,
    create,
    getUserByEmail,
    getUserById,
    userExistsWithId
}