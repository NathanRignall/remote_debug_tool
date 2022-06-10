var express = require("express");
var router = express.Router();

const Gpio = require("onoff").Gpio;
const relay1 = new Gpio(26, "out");
const relay2 = new Gpio(19, "out");

relay1.write(1);
relay2.write(1);

router.get("/1", (req, res) => {
  relay1.read((err, value) => {
    if (err) {
      throw err;
    }

    res.status(200).json({
      state: value,
    });
  });
});

router.post("/1", (req, res) => {
  const state = req.body.state;

  relay1.write(state, (err) => {
    if (err) {
      throw err;
    }

    res.status(200).json({
      state: state,
    });
  });
});

router.get("/2", (req, res) => {
  relay2.read((err, value) => {
    if (err) {
      throw err;
    }

    res.status(200).json({
      state: value,
    });
  });
});

router.post("/2", (req, res) => {
  const state = req.body.state;

  relay2.write(state, (err) => {
    if (err) {
      throw err;
    }

    res.status(200).json({
      state: state,
    });
  });
});

module.exports = router;