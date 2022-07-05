const db = require("../database/initializer.js");

createTask = (name, description, tag, user) => {
    const query = "INSERT INTO task (name, description, tag_id, user_id) VALUES (?,?,?,?)"
    const params = [name, description, tag, user];

    return new Promise(function(resolve, reject) {
        db.run(query, params,
            function(err)  {
                if(err) reject(err.message)
                else    resolve(true)
        })
    })
}

updateTask = (id, name, description, tag) => {
    const query = "UPDATE task SET name = ?, description = ?, tag_id = ? WHERE id = ?"
    const params = [name, description, tag, id];

    return new Promise(function(resolve, reject) {
        db.run(query, params,
            function(err)  {
                if(err) reject(err.message)
                else    resolve(true)
        })
    })
}

deleteTask = (id) => {
    const query = "DELETE FROM task WHERE id = ?"
    const params = [id];

    return new Promise(function(resolve, reject) {
        db.run(query, params,
            function(err)  {
                if(err) reject(err.message)
                else    resolve(true)
        })
    })
}

module.exports = {
    createTask,
    updateTask,
    deleteTask
}