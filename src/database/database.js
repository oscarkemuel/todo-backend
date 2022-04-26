var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')

        const createTaskTable = 
        `CREATE TABLE task (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50), 
        description VARCHAR(100),
        tag_id INTEGER NOT NULL,  
        maked BIT NOT NULL
        )`

        const createTagTable = 
        `
        CREATE TABLE tag (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name VARCHAR(15)
        )
        `

        db.run(createTaskTable,
        (err) => {
            if (err) {
                // Table already created
            console.log('Failed to create task table.')
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO task (name, description, tag_id, maked) VALUES (?,?,?,?)'
                db.run(insert, ["Tarefa 1","Descrição tarefa 1", 1, 0])
                db.run(insert, ["Tarefa 2","Descrição tarefa 2", 1, 0])
            }
        });

        db.run(createTagTable,
        (err) => {
            if (err) {
                // Table already created
                console.log('Failed to create tag table.')
        }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO tag (name) VALUES (?)'
                db.run(insert, ["backend"]);
                db.run(insert, ["frontend"]);
            }
        }
        );
    }
});


module.exports = db
