const db = require("../database/database.js");
const validator = require("../validators");


list = (req, res) => {
  const sql = "select * from task"
  const params = []

  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({erro: { message: "Erro na listagem" }});
        return;
      }
      res.status(200).json(rows);
    });

  // res.status(200).json([{ name: 'task 1'}, {name: 'task 2'}, {name: 'task 3'}])
}

get = (req, res) => {
  const sql = "SELECT * FROM task WHERE id = ?";
  const params = [req.params.id]

  db.all(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({erro: { message: "Erro ao buscar" }});
      return;
    }
    res.status(200).json(row);
  });
}

store = (req, res) => {
  const body = req.body;
  let payload;

  try {
    payload = validator.createTaskValidator(body);
  } catch (error) {
    return res.status(400).json({message: error.message})
  }

  const insertSql = "INSERT INTO task (name, description, tag_id) VALUES (?,?,?)"

  db.run(insertSql, [payload.name, payload.description, 1])

  res.status(201).json(payload);
}

module.exports = {
  list,
  get,
  store
}
