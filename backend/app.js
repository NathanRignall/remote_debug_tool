const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const socketio = require("socket.io");
const serialport = require("serialport");
const SerialPort = serialport.SerialPort;
const { ReadlineParser } = require('@serialport/parser-readline')

const port_array = [];
const serial_array = [];

// get all the serial ports and map them to the websocket
SerialPort.list().then(
  (ports) => ports.forEach((port, index) => {

    if (port.path != "/dev/ttyAMA0" & port.path != "/dev/ttyS0") {
      console.log(port.path)
      port_array[index] = new SerialPort({ path: port.path, baudRate: 115200 });
      serial_array[index] = port_array[index].pipe(new ReadlineParser({ delimiter: "\n" }));
      serial_array[index].on("data", (data) => {
        io.emit("serial", {
          uuid: uuidv4(),
          data: data,
          port: path.basename(port.path),
        });
      });
    }
  }),
  (err) => console.log(err)
).then(() => {
  console.log(port_array.length);
  console.log(serial_array.length);
});

// load the app
var app = express();

// set the cors allowed all
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true,
};
app.use(cors(corsOptions));

// import the routes
var relayRouter = require("./routes/relay");
var gdbRouter = require("./routes/gdb");

// Create the http server
const server = require("http").createServer(app);

// Create the Socket IO server on the top of http server
const io = socketio(server, {
  cors: {
    origin: ["app://.*", "http://localhost:3080"],
    methods: ["GET", "POST"],
  },
});

// view engine setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// attach the routes
app.use("/relay", relayRouter);
app.use("/gdb", gdbRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// socket stuff
io.on("connection", (socket) => {
  console.log("a user connected");
});

module.exports = { app: app, server: server };
