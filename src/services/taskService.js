const db = require("../database/initializer.js");

list = () => {
    const query = "select * from task"
    const params = []

    return new Promise(function(resolve, reject) {
        db.all(query, params, function(err, rows)  {
            if(err) reject("Read error: " + err.message)
            else {
                resolve(rows)
            }
        })
    }) 
}

getById = (id) => {
    const query = "SELECT * FROM task WHERE id = ?";
    const params = [id]

    return new Promise(function(resolve, reject) {
        db.get(query, params, function(err, row)  {
            if(err) reject("Read error: " + err.message)
            else {
                resolve(row)
            }
        })
    })
}

create = (payload) => {
    const query = "INSERT INTO task (name, description, tag_id) VALUES (?,?,?)"
    const params = [payload.name, payload.description, payload.tag];

    return new Promise(function(resolve, reject) {
        db.run(query, params,
            function(err)  {
                if(err) reject(err.message)
                else    resolve(true)
        })
    })
}

module.exports = {
    list,
    getById,
    create
}