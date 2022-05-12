import express from 'express';

let router = express.Router();

router.get('/', function(req, res, next) {
  res.send({ hello: 'world' });
});

export default router;
