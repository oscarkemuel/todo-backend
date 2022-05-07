const db = require("../database/initializer.js");

getById = (table, id) => {
    const query = `SELECT * FROM ${table} WHERE id = ?`;
    const params = [id];

    return new Promise(function(resolve, reject) {
        db.get(query, params, function(err, row)  {
            if(err) reject("Read error: " + err.message)
            else {
                resolve(row)
            }
        })
    })
}

list = (table) => {
    const query = `SELECT * FROM ${table}`;
    return new Promise(function(resolve, reject) {
        db.all(query, [], function(err, rows)  {
            if(err) reject("Read error: " + err.message)
            else {
                resolve(rows)
            }
        })
    }) 
}

module.exports = {
    getById,
    list
}