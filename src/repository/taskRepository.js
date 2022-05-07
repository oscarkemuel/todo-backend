const db = require("../database/initializer.js");

createTaks = (name, description, tag) => {
    const query = "INSERT INTO task (name, description, tag_id) VALUES (?,?,?)"
    const params = [name, description, tag];

    return new Promise(function(resolve, reject) {
        db.run(query, params,
            function(err)  {
                if(err) reject(err.message)
                else    resolve(true)
        })
    })
}

module.exports = {
    createTaks
}