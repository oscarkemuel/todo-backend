var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err

    }else{
        console.log('\nConnected to the SQLite database.')

        const createTaskTable = 
        `CREATE TABLE task (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50), 
        description VARCHAR(100),
        tag_id INTEGER NOT NULL,  
        marked BIT NOT NULL DEFAULT 0
        )`

        const createTagTable = 
        `
        CREATE TABLE tag (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name VARCHAR(15)
        )
        `

        db.run(createTaskTable, (error) => {
            if(error) console.log(error.message);
        })

        db.run(createTagTable, (error) => {
            if(error) console.log(error.message);
        })
    }
});


module.exports = db
