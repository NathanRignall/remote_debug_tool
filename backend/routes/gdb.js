
var express = require("express");
var router = express.Router();

const spawn = require('child_process').spawn;

var child;

var status = {
    running: false,
}

var scriptOutput = "";

// start the GDB seession if not already running
router.post("/start", (req, res) => {
    if (status.running) {
        res.status(500).json({
            message: "GDB Server already running",
        });
    } else {
        console.log("START GDB");
        status.running = true;

        child = spawn('openocd', ['--file','interface/raspberrypi-swd.cfg', '--file','target/rp2040.cfg']);

        res.status(200).json({
            message: "Started GDB Server",
        });


        // load the listeners to the GDB instance
        child.stdout.setEncoding('utf8');
        child.stdout.on('data', function (data) {

            console.log('stdout: ' + data);

            data = data.toString();
            scriptOutput += data;
        });

        child.stderr.setEncoding('utf8');
        child.stderr.on('data', function (data) {

            console.log('stderr: ' + data);

            data = data.toString();
            scriptOutput += data;
        });


        child.on('close', function (code) {
            console.log("CLOSED GDB");
            status.running = false;
        });

    }
});

router.post("/stop", (req, res) => {
    if (status.running) {
        console.log("KILLED GDB");
        status.running = false;
        child.kill();

        res.status(200).json({
            message: "Stopped GDB Server",
        });
    } else {

        res.status(500).json({
            message: "GDB server not running",
        });
    }
});

module.exports = router;