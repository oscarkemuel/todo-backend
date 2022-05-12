import { db } from "../database/initializer.js"

export default class TaskRepository {
    createTask = (name, description, tag) => {
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
}
