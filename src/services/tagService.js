import { db } from "../database/initializer.js";

export default class TaskService {
    async getByName(name) {
        const query = "SELECT * FROM tag WHERE name = ?";
        const params = [name]
    
        return new Promise(function(resolve, reject) {
            db.get(query, params, function(err, row)  {
                if(err) reject("Read error: " + err.message)
                else {
                    resolve(row)
                }
            })
        })
    }

    async create(name) {
        const query = "INSERT INTO tag (name) VALUES (?)"
        const params = [name];
    
        return new Promise(function(resolve, reject) {
            db.run(query, params,
                function(err)  {
                    if(err) reject(err.message)
                    else    resolve(true)
            })
        })
    }
}
