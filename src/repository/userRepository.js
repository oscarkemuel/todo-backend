const db = require("../database/initializer.js");

createUser = (name, email, password) => {
    const query = "INSERT INTO user (name, email, password) VALUES (?,?,?)"
    const params = [name, email, password];

    return new Promise(function(resolve, reject) {
        db.run(query, params,
            function(err)  {
                if(err) reject(err.message)
                else    resolve(true)
        })
    })
}

module.exports = {
    createUser
}
