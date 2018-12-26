var express = require('express');
var router = express.Router();

router.get('/hola', function (req, res, next) {
  res.send('prueba api 2 funcionando perfecto');
});

module.exports = router;
