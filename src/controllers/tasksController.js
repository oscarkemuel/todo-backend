var db = require("../database/database.js")

exports.list = (req, res) => {
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

exports.get = (req, res) => {
  const id = req.params.id;
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
