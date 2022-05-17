var express = require('express');
var router = express.Router();

const spawn = require("child_process").spawn;

router.get('/', (req, res, next) => {

  res.status(200).json({
    state: 1,
  })
})

router.post('/', (req, res, next) => {
  const state = req.body.state;

})

module.exports = router;
