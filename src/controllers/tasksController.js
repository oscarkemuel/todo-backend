exports.list = (req, res) => {
  res.status(200).json([{ name: 'task 1'}, {name: 'task 2'}, {name: 'task 3'}])
}

exports.get = (req, res) => {
  const id = req.params.id;

  res.status(200).json({name: `task ${id}`})
}
