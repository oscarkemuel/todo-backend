const db = require("../database/initializer.js");

getByName = (name, userId) => {
    const query = "SELECT * FROM tag WHERE name = ? AND user_id = ?";
    const params = [name, userId];

    return new Promise(function(resolve, reject) {
        db.get(query, params, function(err, row)  {
            if(err) reject("Read error: " + err.message)
            else {
                resolve(row)
            }
        })
    })
}

create = (name, userId) => {
    const query = "INSERT INTO tag (name, user_id) VALUES (?,?)";
    const params = [name, userId];

    return new Promise(function(resolve, reject) {
        db.run(query, params,
            function(err)  {
                if(err) reject(err.message)
                else    resolve(true)
        })
    })
}

module.exports = {
    getByName,
    create
}