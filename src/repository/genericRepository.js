const db = require("../database/initializer.js");

getByIdAndUser = (table, id, userId) => {
    const query = `SELECT * FROM ${table} WHERE id = ? AND user_id = ?`;
    const params = [id, userId];

    return new Promise(function(resolve, reject) {
        db.get(query, params, function(err, row)  {
            if(err) reject("Read error: " + err.message)
            else {
                resolve(row)
            }
        })
    })
}

getByFieldAndUser = (table, fieldName, fieldValue, userId) => {
    const query = `SELECT * FROM ${table} WHERE ${fieldName} = ? AND user_id = ?`;
    const params = [fieldValue, userId];

    return new Promise(function(resolve, reject) {
        db.get(query, params, function(err, row)  {
            if(err) reject("Read error: " + err.message)
            else {
                resolve(row)
            }
        })
    })
}

listByUser = (table, userId) => {
    const query = `SELECT * FROM ${table} WHERE user_id = ?`;
    return new Promise(function(resolve, reject) {
        db.all(query, [userId], function(err, rows)  {
            if(err) reject("Read error: " + err.message)
            else {
                resolve(rows)
            }
        })
    }) 
}


getById = (table, id, userId) => {
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

getByField = (table, fieldName, fieldValue) => {
    const query = `SELECT * FROM ${table} WHERE ${fieldName} = ?`;
    const params = [fieldValue];

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
    getByField,
    list,
    getByIdAndUser,
    getByFieldAndUser,
    listByUser
}