var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = process.env.NODE_ENV === 'test' ? ':memory:' : 'db.sqlite'

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message);
      throw err;

    } else {
        console.log('\nConnected to the SQLite database.');
        console.log("creating tables");
        createDbTables();

    }
});

let createTasksTable = () => {

    const createTaskTable = `CREATE TABLE IF NOT EXISTS task (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50) NOT NULL,
        description VARCHAR(100) NOT NULL,
        tag_id INTEGER NOT NULL,
        marked BIT NOT NULL DEFAULT 0,
        FOREIGN KEY (tag_id) REFERENCES tag (id)
    )`;

    db.run(createTaskTable, (error) => {
        if(error) console.log(error.message);
    })

}

let createTagsTable = () => {

    const createTagTable = `CREATE TABLE IF NOT EXISTS tag (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
        name VARCHAR(15) NOT NULL
    )`

    db.run(createTagTable, (error) => {
        if(error) console.log(error.message);
    })

}

let createUserTable = () => {

    const createUserTable = `CREATE TABLE IF NOT EXISTS user (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(20) NOT NULL
    )`

    db.run(createUserTable, (error) => {
        if(error) console.log(error.message);
    })

}

let createTokenTable = () => {
    const createUserTable = `CREATE TABLE IF NOT EXISTS token (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
        token VARCHAR(100) NOT NULL,
        userId INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES user (id)
      
    )`

    db.run(createUserTable, (error) => {
        if(error) console.log(error.message);
    })

}

let createDbTables = () => {
    createUserTable();
    createTasksTable();
    createTokenTable();
    createTagsTable();
}


module.exports = db
