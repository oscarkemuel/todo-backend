const db = require("../database/initializer.js");

create = (name, userId) => {
    const query = "INSERT INTO tag (name, user_id) VALUES (?,?)"
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
   create
}