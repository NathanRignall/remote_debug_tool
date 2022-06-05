var express = require("express");
var router = express.Router();

const Gpio = require("onoff").Gpio;
const powerRelay = new Gpio(26, "out");

router.get("/power1", (req, res) => {
  powerRelay.read((err, value) => {
    if (err) {
      throw err;
    }

    res.status(200).json({
      state: value,
    });
  });
});

router.post("/power1", (req, res) => {
  const state = req.body.state;

  powerRelay.write(state, (err) => {
    if (err) {
      throw err;
    }

    res.status(200).json({
      state: state,
    });
  });
});